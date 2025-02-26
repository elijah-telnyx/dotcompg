// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from 'next';

import { CLOUDFLARE_API_KEY, CLOUDFLARE_ZONE_ID } from 'env';

export type CFPurgeResponse = {
  status: string;
  success: boolean;
  errors: unknown;
  result?: { id: string };
  messages?: unknown;
};

const handler: NextApiHandler<CFPurgeResponse> = async (req, res) => {
  try {
    if (!req.body) {
      throw [{ message: 'Missing body' }];
    }

    /**
     * https://developers.cloudflare.com/api/operations/zone-purge
     */
    const data = await fetch(`https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    }).then((res) => res.json());

    if (!data.success) {
      throw data.errors;
    }
    res.status(200).json({ success: true, status: 'ok', ...data });
  } catch (errors) {
    res.status(500).json({ success: false, status: 'error', errors });
  }
};
export default handler;
