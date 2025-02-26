import type { NextApiRequest, NextApiResponse } from 'next';
import { Analytics } from '@segment/analytics-node';
import { FULL_INTEGRATIONS } from 'services/Segment';
import segment from 'lib/Segment';
import constants from 'constants/env';

const IS_LOCAL = constants.env === 'dev';

/**
 * Segment Track - /api/s/t
 * minimal path to reduce likelihood of blocked by adblocker
 */
export default async function segmentTrack(req: NextApiRequest, res: NextApiResponse) {
  const { cookies, headers } = req;
  const { type, data } = req.body;
  const userAgent = headers['user-agent'];
  const ip = (headers['x-forwarded-for'] || '').toString();

  // grab userId if present
  let userId;
  if (cookies?.ajs_user_id) userId = cookies?.ajs_user_id.replace(/"/g, '');

  // if no anonymousId, send a randomly generated one
  // otherwise grab existing to include in call to segment
  let anonymousId;
  if (cookies?.ajs_anonymous_id) {
    anonymousId = cookies?.ajs_anonymous_id;

    // Remove quotes from the anonymous id since segment's
    // library already wraps it in quotes:
    anonymousId = anonymousId.replace(/"/g, '');
  } else if (data.clientAnonymousId) {
    anonymousId = data.clientAnonymousId;
  } else {
    // Add prefix to know it's refreshed
    anonymousId = `NEW-${segment.anonymousId}`;

    if (IS_LOCAL) {
      // Add prefix for easier debugging
      anonymousId = `DEV-${anonymousId}`;
    }

    res.setHeader('Set-Cookie', segment.serializeSegmentAnonymousId(anonymousId));
  }

  const analytics = new Analytics({
    writeKey: String(process.env.ANALYTICS_SEGMENT_WRITE_KEY),
  });
  analytics.track({
    userId,
    context: {
      ip,
      userAgent,
    },
    anonymousId,
    event: type,
    properties: data,
    integrations: FULL_INTEGRATIONS,
  });
  res.status(200).json({ status: 'OK' });
}
