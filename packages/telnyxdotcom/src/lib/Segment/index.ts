import { v4 as uuidv4 } from 'uuid';
import { serialize, type SerializeOptions } from 'cookie';

export const SEGMENT_COOKIE_ATTRIBUTES: SerializeOptions = {
  // Expire in 3 years, Segment default is 1 year
  maxAge: 94608000000,
  path: '/', // hard-code the path so we don't create duplcate cookies for different paths
  // Specify domain, default is domain name (`telnyx.com`)
  domain: '.telnyx.com',
  // Set explicit value for sameSite, Express does not set
  // any value by default.
  // SameSite value can only be set on secure cookies.
  // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
  sameSite: 'lax',
  secure: true,
};

export const SEGMENT_COOKIE_EXPIRES = 365;

const segment = {
  /**
   * A single uuid per browser session, across any Segment calls for an anonymous user.
   * Instead of letting Segment control the anonymous_id, we generate it and determine when it changes.
   * This is specially important when cookies are not allowed and/or analytics is blocked.
   * See `SegmentService`, `anonymousId` method and `/api/segment/{slug}.js files.
   */
  anonymousId: uuidv4(),
  serializeSegmentAnonymousId(anonymousId: string) {
    // Set cookie with wrapping quotes so the segment client library detects it
    // Otherwise the client library will generate its own anonymous id
    return serialize('ajs_anonymous_id', '"' + anonymousId + '"', SEGMENT_COOKIE_ATTRIBUTES);
  },
};

// https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/identity#anonymous-ids
export default segment;
