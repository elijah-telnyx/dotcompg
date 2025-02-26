/**
 * @overview Segment page tracking
 *
 * See https://segment.com/docs/guides/how-to-guides/collect-pageviews-serverside/
 */
import type { NextApiRequest, NextApiResponse } from 'next';
import { Analytics } from '@segment/analytics-node';

import constants from 'constants/env';
import segment from 'lib/Segment';
import { FULL_INTEGRATIONS } from 'services/Segment';

// Whether we're running this build locally:
const IS_LOCAL = constants.env === 'dev';

/**
 * Segment Page - /api/s/p
 * minimal path to reduce likelihood of blocked by adblocker
 */
export default async function segmentPage(req: NextApiRequest, res: NextApiResponse) {
  const { cookies, headers, query } = req;
  const userAgent = headers['user-agent'];
  const ip = (headers['x-forwarded-for'] || '').toString();
  const path = req.body?.path;
  const campaign = req.body?.campaign || {};
  const referrer = req.headers.referer;
  const documentReferrer = req.body?.referrer || '';
  const documentTitle = req.body?.title || '';
  const clientAnonymousId = req.body?.clientAnonymousId || '';
  const acceptedCookies = Boolean(req.body?.acceptedCookies);

  // populate campaign object with any utm params
  if (query?.utm_content) campaign.content = query.utm_content;
  if (query?.utm_campaign) campaign.name = query.utm_campaign;
  if (query?.utm_medium) campaign.medium = query.utm_medium;
  if (query?.utm_source) campaign.source = query.utm_source;
  if (query?.utm_term) campaign.keyword = query.utm_term;

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
  } else if (clientAnonymousId) {
    anonymousId = clientAnonymousId;
  } else {
    // Add prefix to know it's refreshed
    anonymousId = `NEW-${segment.anonymousId}`;

    if (IS_LOCAL) {
      // Add prefix for easier debugging
      anonymousId = `DEV-${anonymousId}`;
    }

    res.setHeader('Set-Cookie', segment.serializeSegmentAnonymousId(anonymousId));
  }

  // array of values as comma separated string
  const queryString = new URLSearchParams(
    Object.entries(query).map(([key, value]) => [key, value ? value.toString() : ''])
  ).toString();

  const properties = {
    query: queryString,
    path,
    hostname: req.headers.host,
    name: `${constants.Analytics.pagePrefix}${path}`,

    // Use referrer because that's the page that called this endpoint
    url: referrer,
    referrer: documentReferrer,
    campaign,
    integrations: FULL_INTEGRATIONS,
    acceptedCookies,
  };

  const context = {
    campaign,
    userAgent,
    ip,
    page: {
      path,
      referrer: documentReferrer,
      search: `?${queryString}`,
      title: documentTitle,
      url: referrer,
    },
  };

  try {
    // send a call to segment
    const analytics = new Analytics({
      writeKey: String(process.env.ANALYTICS_SEGMENT_WRITE_KEY),
    });
    analytics.page({
      anonymousId, // either random (matching cookie) or from client
      userId, // might be null
      name: `${constants.Analytics.pagePrefix}${path}`,
      properties,
      context,
      integrations: FULL_INTEGRATIONS,
    });

    res.status(200).json({ status: 'OK' });
  } catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
}
