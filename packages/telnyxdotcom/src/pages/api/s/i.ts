import type { NextApiRequest, NextApiResponse } from 'next';
import { Analytics } from '@segment/analytics-node';
import constants from 'constants/env';
import segment from 'lib/Segment';
import errors from 'utils/httpsErrors';

const IS_LOCAL = constants.env === 'dev';

/**
 * Segment Identify - /api/s/i
 * minimal path to reduce likelihood of blocked by adblocker
 */
export default async function segmentIdentify(req: NextApiRequest, res: NextApiResponse) {
  const { cookies, headers } = req;
  const { traits, clientAnonymousId } = req.body;
  const userAgent = headers['user-agent'];
  const ip = (headers['x-forwarded-for'] || '').toString();

  // Grab userId if present. If it's not present, use anonymousId instead. Avoiding email.
  // See https://segment.com/docs/connections/spec/identify#user-id
  let userId = null;
  if (cookies?.ajs_user_id) userId = cookies?.ajs_user_id.replace(/"/g, '');

  // Only call Identify if there's a valid user_id
  // A valid user_id match against a user_id in the analytics database
  if (!userId) {
    return res.status(500).json({
      errors: [errors['unexpected-error']],
    });
  }

  // if no anonymousId, send a randomly generated one
  // otherwise grab existing to include in call to segment
  let anonymousId;
  if (cookies?.ajs_anonymous_id) {
    anonymousId = cookies?.ajs_anonymous_id;

    // Remove quotes from the anonymous id since segment's
    // library already wraps it in quotes:
    anonymousId = anonymousId.replace(/"/g, '');
  } else if (clientAnonymousId) {
    anonymousId = clientAnonymousId;
  } else {
    // Add prefix to know it's refreshed
    anonymousId = `NEW-${segment.anonymousId}`;

    // Set cookie with wrapping quotes so the segment client library detects it
    // Otherwise the client library will generate its own anonymous id

    if (IS_LOCAL) {
      // Add prefix for easier debugging
      anonymousId = `DEV-${anonymousId}`;
    }

    res.setHeader('Set-Cookie', segment.serializeSegmentAnonymousId(anonymousId));
  }

  const analytics = new Analytics({
    writeKey: String(process.env.ANALYTICS_SEGMENT_WRITE_KEY),
  });
  analytics.identify({
    userId,
    context: {
      ip,
      userAgent,
    },
    anonymousId,
    traits,
  });
  res.status(200).json({ status: 'OK' });
}
