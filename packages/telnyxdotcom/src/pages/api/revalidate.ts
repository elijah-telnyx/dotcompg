import type { NextApiHandler } from 'next';

import { logger } from 'utils/logger';
import { spaces } from 'lib/Contentful';
import { LEGACY_PAGE_TYPES, PAGE_TYPES } from 'lib/Contentful/methods/sitemap';
import api from 'lib/Api';
import { CLOUDFLARE_API_KEY, CLOUDFLARE_ZONE_ID, RUNTIME_ENV } from 'env';
import constants from 'constants/env';

interface ConsulData {
  Node: object;
  Service: {
    ID: string;
    Service: string;
    Tags: string[];
    Address: string;
    TaggedAddresses: {
      lan_ipv4: {
        Address: string;
        Port: number;
      };
      wan_ipv4: {
        Address: string;
        Port: number;
      };
    };
    Meta: {
      'external-source': string;
      k8s_cluster: string;
      podip: string;
      site: string;
      version: string;
    };
    Port: number;
    Weights: {
      Passing: number;
      Warning: number;
    };
    EnableTagOverride: boolean;
    Proxy: {
      Mode: string;
      MeshGateway: object;
      Expose: object;
    };
    Connect: object;
    CreateIndex: number;
    ModifyIndex: number;
  };
}

const SERVICE = 'telnyxdotcom';
const STATEFUL_SERVICE = 'telnyxdotcom-stateful';
const CONSUL_HOST = 'consul.internal.telnyx.com';
const DEV_CONSUL_HOST = 'consuldev.internal.telnyx.com';
const PORT = 3000;

interface ErrorResponse {
  status: 'error';
  message: string;
}

export type RevalidateContentfulWebhookParams = {
  slug?: string;
  contentTypeId?: string;
  spaceId?: string;
  tag?: string;
};

export type RevalidateResponse = {
  status: string;
  instances?: PromiseSettledResult<RevalidateResponse>[];
  revalidated?: boolean;
  now?: number;
  origin_address?: string;
  path?: string;
};

const validateRequest = (path?: string) => {
  if (!path) {
    throw new Error('path is required');
  }

  if (Array.isArray(path)) {
    throw new Error('path as Array is not supported, expected string');
  }
};

const getPathByContentfulWebhook = ({ slug, contentTypeId, spaceId, tag }: RevalidateContentfulWebhookParams) => {
  if (!slug || !contentTypeId || !spaceId) {
    throw new Error('"slug", "contentTypeId" and "spaceId" are required');
  }

  if (spaceId === spaces.blog) {
    const legacyPageType = LEGACY_PAGE_TYPES[contentTypeId as keyof typeof LEGACY_PAGE_TYPES];
    return `${legacyPageType.parentUrl}/${slug}`;
  }

  const pageType = PAGE_TYPES[contentTypeId as keyof typeof PAGE_TYPES];

  if (!pageType) {
    throw new Error('page type for "contentTypeId" and "spaceId" not found');
  }

  if (!tag) {
    return `${pageType.parentUrl}/${slug}`;
  }

  const pageTag = tag as (typeof pageType.tagUrls)[number];

  if (!pageType.tagUrls.length || !pageType.tagUrls.includes(pageTag)) {
    throw new Error('"tag" not found');
  }

  return `${pageType.parentUrl}/${tag}/${slug}`;
};

const getConsulDataByEnv = (env: typeof RUNTIME_ENV) => {
  // DOTCOM-3405
  const DISABLE_IN_MEMORY_CACHE = process.env.DISABLE_IN_MEMORY_CACHE === 'true';
  const serviceName = DISABLE_IN_MEMORY_CACHE ? STATEFUL_SERVICE : SERVICE;
  const host = env === 'production' ? CONSUL_HOST : DEV_CONSUL_HOST;
  const protocol = constants.protocol;
  logger(`DISABLE_IN_MEMORY_CACHE=${DISABLE_IN_MEMORY_CACHE}`);

  return {
    dcs_url: `${protocol}://${host}/v1/catalog/datacenters`,
    service_name: serviceName,
    services_url: `${protocol}://${host}/v1/health/service/${serviceName}`,
  };
};

const revalidateInstances = async (path: string, env: typeof RUNTIME_ENV) => {
  const { dcs_url, service_name, services_url } = getConsulDataByEnv(env);
  logger(`revalidating page ${path} across all ${env} ${service_name} instances...`);
  /**
   * need to loop through available DCs to get all instances because it does't support multiple DCs at once
   */
  const dcs = await api.get<string[]>(dcs_url);
  const instances = await Promise.all(
    dcs.map(async (dc) => await api.get<ConsulData[]>(services_url, { queryParams: { dc } }))
  );

  const addresses = instances.flatMap((instance) => {
    return instance.map(({ Service }) => Service.Address);
  });
  logger(
    `revalidating page ${path} on the following ${env} ${service_name} instances addresses... ${addresses.toString()}`
  );

  const data = await Promise.allSettled(
    addresses.filter(Boolean).map(
      async (address) =>
        await api.get<RevalidateResponse>(`http://${address}:${PORT}/api/revalidate`, {
          queryParams: { origin_address: address, path },
        })
    )
  );
  logger(`page ${path} revalidated across all ${env} ${service_name} instances`);

  return data;
};

const handler: NextApiHandler<RevalidateResponse | ErrorResponse> = async (req, res) => {
  const { path: reqPath, origin_address: origAddress } = req.query;

  try {
    const path = (reqPath as string) || getPathByContentfulWebhook(req.body as RevalidateContentfulWebhookParams);

    validateRequest(path);

    if (path && origAddress) {
      await res.revalidate(path);

      const revalidateData = {
        path: path,
        status: 'ok',
        revalidated: true,
        now: Date.now(),
      };

      logger(`revalidate address:${origAddress}`, { data: revalidateData, severity: 'info' });

      return res.status(200).json(revalidateData);
    }

    const instancesRevalidatedData = await revalidateInstances(path, 'production');

    logger(`purging cache for page ${path}...`);
    const data = await fetch(`https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        files: [`https://telnyx.com${path}`],
      }),
    }).then((res) => res.json());

    if (!data.success) {
      throw new Error('Page API Revalidate failed on cache purge', { cause: data.errors });
    }

    res.status(200).json({
      status: 'ok',
      path,
      instances: instancesRevalidatedData,
      now: Date.now(),
    });
    logger(`cache purged for page ${path}`);
  } catch (e) {
    console.error(e);
    return res.status(400).json({
      status: 'error',
      message: (e as Error).message,
    });
  }

  try {
    const path = (reqPath as string) || getPathByContentfulWebhook(req.body as RevalidateContentfulWebhookParams);
    await revalidateInstances(path, 'staging');
  } catch (e) {
    console.error(e);
  }
};
export default handler;
