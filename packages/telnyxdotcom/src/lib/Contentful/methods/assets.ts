import { generateSchema } from 'utils/schemas';
import type * as T from 'lib/Pricing/@types';

import Api from 'lib/Api';
import type { ApiCostCode, NetworkMapData } from 'lib/Pricing/api';
import type { FreshHomePage, HomePage } from '../types';
import type { GetNetworkMapDataResponse } from 'lib/Coverage/types';
import entries from 'lib/Contentful/entries';
import getClient, { type GetClientOptions } from 'lib/Contentful/client';
import { getEnabledNetworkMap } from 'lib/Static/data/our-network';
import { getBlogPageData } from 'lib/Contentful/resources';
import { type ItemsProps } from 'components/FreshHome/BlogSection/BlogSection';
const client = getClient();

export const fetchUSDCostCodesAsset = () => {
  return client.getAsset(entries.assets.usdCostCodes).then((asset) => {
    const jsonApi = Api.create({ baseUrl: 'https:' + asset.fields.file.url });

    return jsonApi.get<Record<T.CostCodes, ApiCostCode>>('');
  });
};

export const getRCSSubmissionFormAsset = ({ preview }: GetClientOptions) => {
  return getClient({ preview })
    .getAsset(entries.assets.rcsSubmissionForm)
    .then((asset) => Api.get<Record<string, string>>('https:' + asset.fields.file.url));
};

export const getHomePageData = async ({ preview: _preview }: GetClientOptions) => {
  return await import('../../Static/data/homepage.json').then((data) => {
    return {
      ...data,
      seo: {
        ...data?.seo,
        schema: generateSchema({
          type: 'default',
          payload: { description: 'Communications, Wireless, Networking, Storage. At the edge.' },
        }),
      },
    } as unknown as HomePage;
  });
};

export const getFreshHomePageData = async ({ preview: _preview }: GetClientOptions) => {
  const blogItems = (await getBlogPageData({ query: { page: 1, limit: 24 } })).articles.items as ItemsProps;
  return await import('../../Static/data/homepageFresh.json').then((data) => {
    data.sections.blog.items = blogItems;
    return {
      ...data,
      seo: {
        ...data?.seo,
        schema: generateSchema({
          type: 'default',
          payload: { description: 'Communications, Wireless, Networking, Storage. At the edge.' },
        }),
      },
    } as unknown as FreshHomePage;
  });
};

export const getInteractiveHomePageData = async ({ preview: _preview }: GetClientOptions) => {
  return await import('../../Static/data/homepageInteractive.json').then((data) => {
    return {
      ...data,
      seo: {
        ...data.seo,
        schema: generateSchema({
          type: 'default',
          payload: { description: 'Communications, Wireless, Networking, Storage. At the edge.' },
        }),
      },
    } as unknown as HomePage;
  });
};

export const getOurNetworkCoveragePageData = async ({ preview }: GetClientOptions, { iot = {} }: NetworkMapData) => {
  const networkMapCoverageData = await getClient({ preview })
    .getAsset(entries.assets.networkMapCoverageData)
    .then((asset) => Api.get<GetNetworkMapDataResponse>('https://' + asset.fields.file.url));

  return getEnabledNetworkMap(networkMapCoverageData, { iot });
};
