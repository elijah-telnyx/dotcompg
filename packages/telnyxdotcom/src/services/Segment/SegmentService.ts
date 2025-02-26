import type { MiddlewareFunction } from '@segment/analytics-next/dist/types/plugins/middleware';
import { AnalyticsBrowser, type Analytics } from '@segment/analytics-next';
import Cookie, { type CookieAttributes } from 'js-cookie';
import constants from 'constants/env';
import SegmentLib, { SEGMENT_COOKIE_ATTRIBUTES, SEGMENT_COOKIE_EXPIRES } from 'lib/Segment';
import { type CampaignParams, loadCampaign } from 'components/scripts/Campaign';
import { loadReferrer } from 'components/scripts/Referrer';

const SEGMENT_WRITE_KEY = constants.Analytics.segment.writeKey;
const PROTOCOL = constants.protocol;
const HOST = constants.host;
const BASE_URL = `${PROTOCOL}://${HOST}`;

export const FULL_INTEGRATIONS = {
  All: true,
  AdRoll: false,
  AdWords: false,
  Amplitude: false,
  FullStory: false,
  'LinkedIn Insight Tag': false,
  'Marketo V2': false,
  'Twitter Ads': false,
  Warehouses: {
    all: true,
  },
};

export const COOKIE_FREE_INTEGRATIONS = {
  All: true,
  AdRoll: false,
  AdWords: false,
  Amplitude: false,
  FullStory: false,
  'Intercom Web (Actions)': false,
  'LinkedIn Insight Tag': false,
  'Marketo V2': false,
  'Twitter Ads': false,
  Warehouses: {
    all: false,
    // `BigQuery` and `Growthbook` stores utm params and cookies so we gotta sync events with their warehouse only after cookie consent is given
    warehouseIds: [constants.Analytics.segment.warehouses.analytics],
  },
};

export type SegmentIntegrations = typeof FULL_INTEGRATIONS | null | undefined;

export const SEGMENT_TRACK_EVENT_NAMES = {
  FORM_SUBMIT: 'Form Submit',
  SIGN_UP_SUCCESS: 'Sign Up Success',
  EXPERIMENT_VIEWED: 'Experiment Viewed',
  SOCIAL_SHARE: 'Social Share',
} as const;

export type SegmentTrackEventName = (typeof SEGMENT_TRACK_EVENT_NAMES)[keyof typeof SEGMENT_TRACK_EVENT_NAMES];

const isFunction = (variable: unknown) => typeof variable === 'function';
const analyticsBrowser = new AnalyticsBrowser();

declare global {
  // https://github.com/typescript-eslint/typescript-eslint/issues/3617
  // eslint-disable-next-line no-var
  var analytics: Analytics | null | undefined; // @ts-ignore
}

class SegmentService {
  private _analytics: Analytics | null | undefined;
  private _acceptedCookies = false;
  private _campaign: CampaignParams = {};
  private _referrer: string | undefined;
  private _anonymousId: string | undefined;

  get analytics() {
    if (global.analytics) return global.analytics;
    return this._analytics;
  }
  set analytics(analytics: Analytics | null | undefined) {
    this._analytics = analytics;
  }

  get acceptedCookies() {
    return this._acceptedCookies;
  }
  set acceptedCookies(accepted: boolean) {
    this._acceptedCookies = accepted;
  }

  get anonymousId() {
    if (this._anonymousId) {
      return this._anonymousId;
    }

    // If segment fails to load
    if (!this.analytics) {
      const cookieId = Cookie.get('ajs_anonymous_id');
      if (cookieId) {
        const sanitizedCookieId = cookieId.replace(/"/g, '');
        this.anonymousId = sanitizedCookieId;
        return sanitizedCookieId;
      }
      if (SegmentLib.anonymousId) {
        this.anonymousId = SegmentLib.anonymousId;
        return SegmentLib.anonymousId;
      }
      console.error('Failed to fetch anonymous_id - Segment not loaded (analytics-next)');
      return;
    }

    // In-memory anonymousId
    const user = isFunction(this.analytics?.user) && this.analytics?.user();
    if (user) {
      const id = user?.anonymousId();
      if (id) {
        // Remove extra quotes from cookie
        const sanitizedId = id.replace(/"/g, '');
        this.anonymousId = sanitizedId;
        return sanitizedId;
      }
    }

    // Cookie anonymousId
    const cookieId = Cookie.get('ajs_anonymous_id');
    if (cookieId) {
      // Remove extra quotes from cookie
      const sanitizedCookieId = cookieId.replace(/"/g, '');
      this.anonymousId = sanitizedCookieId;
      return sanitizedCookieId;
    }

    // Generated anonymousId
    this.anonymousId = SegmentLib.anonymousId;
    return this.anonymousId;
  }

  set anonymousId(id: string | undefined) {
    // avoid generating the segment anonymous id if it's already set
    if (this._anonymousId && !id) return;

    const newAnonId = id || SegmentLib.anonymousId;
    this._anonymousId = newAnonId;
    try {
      Cookie.set('ajs_anonymous_id', newAnonId, {
        domain: SEGMENT_COOKIE_ATTRIBUTES.domain,
        path: SEGMENT_COOKIE_ATTRIBUTES.path,
        sameSite: SEGMENT_COOKIE_ATTRIBUTES.sameSite as CookieAttributes['sameSite'],
        expires: SEGMENT_COOKIE_EXPIRES,
      });

      console.log('Set "ajs_anonymous_id" cookie');
    } catch (err) {
      console.error("Failed to set 'ajs_anonymous_id' cookie", err);
    }
  }

  get userId() {
    if (!this.analytics) {
      const cookieId = Cookie.get('ajs_user_id');
      if (cookieId) return cookieId.replace(/"/g, ''); // Remove extra quotes from cookie
    }
    const user = isFunction(this.analytics?.user) && this.analytics?.user();
    if (user) {
      // In-memory userId
      const id = user?.id();
      if (id) return id;
    }
    // Cookie userId
    const cookieId = Cookie.get('ajs_anonymous_id');
    if (cookieId) return cookieId.replace(/"/g, ''); // Remove extra quotes from cookie
    return this._anonymousId || SegmentLib.anonymousId;
  }
  set userId(id: string) {
    if (!id) return;
    if (!this.analytics) {
      Cookie.set('ajs_user_id', id);
      return;
    }
    this.analytics?.user()?.id(id);
  }

  get strictUserId() {
    if (!this.analytics) {
      const cookieId = Cookie.get('ajs_user_id');
      if (cookieId) return cookieId.replace(/"/g, ''); // Remove extra quotes from cookie
    }
    const user = isFunction(this.analytics?.user) && this.analytics?.user();
    if (user) {
      // In-memory userId
      const id = user?.id();
      if (id) return id;
    }
    return;
  }

  get campaign() {
    return this._campaign;
  }
  set campaign(campaign: CampaignParams) {
    this._campaign = campaign;
  }

  get referrer() {
    return this._referrer;
  }
  set referrer(referrer: string | undefined) {
    this._referrer = referrer;
  }

  load(acceptedCookies = false) {
    // Check if user accepted cookies
    this.acceptedCookies = acceptedCookies;

    try {
      // Check if Segment is already loaded
      if (this.analytics) {
        console.log('Loaded Segment through Script');
        return Promise.resolve();
      }

      // https://github.com/segmentio/analytics-next/tree/master/packages/browser#lazy--delayed-loading
      return Promise.all([
        // Check if user has campaign params

        loadCampaign(),
        // Check if user has referrer

        loadReferrer(),
      ]).then(([campaign, referrer]) => {
        this.campaign = campaign;
        this.referrer = referrer;

        // Load Segment
        global.analytics = null;

        return analyticsBrowser
          .load(
            {
              writeKey: SEGMENT_WRITE_KEY,
            },
            {
              integrations: acceptedCookies ? FULL_INTEGRATIONS : COOKIE_FREE_INTEGRATIONS,
              retryQueue: true,
            }
          )
          .then(([analyticsInstance]) => {
            global.analytics = analyticsInstance;
          });
      });
    } catch (err) {
      console.error('Failed to load Segment - thrown error (analytics-next)', err);
      return Promise.resolve();
    }
  }

  page(url: string, properties: object) {
    if (this.analytics) {
      this.analytics.page(url, {
        acceptedCookies: this.acceptedCookies,
        campaign: this.campaign,
        referrer: this.referrer,
        ...properties,
      });
      return;
    }

    // Fallback - Segment not loaded
    fallbackPage({
      path: url,
      title: document.title,
      acceptedCookies: this.acceptedCookies,
      campaign: this.campaign,
      clientAnonymousId: this.anonymousId,
      ...properties,
    });
  }
  track(eventName: SegmentTrackEventName, properties: object, options?: object) {
    if (this.analytics) {
      this.analytics.track(eventName, { ...properties, acceptedCookies: this.acceptedCookies }, options);
      return;
    }

    // Fallback - Segment not loaded
    fallbackTrack({
      type: eventName,
      data: {
        ...properties,
        acceptedCookies: this.acceptedCookies,
        clientAnonymousId: this.anonymousId,
      },
      options: options,
    });
  }
  identify(traits: object) {
    // Only call Identify if there's a valid user_id
    // A valid user_id match against a user_id in the analytics database
    if (!this.userId) return;
    if (this.analytics) {
      this.analytics.identify(this.userId, {
        ...traits,
        acceptedCookies: this.acceptedCookies,
      });
      return;
    }
    /** No service loaded */
    fallbackIdentify({
      clientAnonymousId: this.anonymousId,
      traits: {
        ...traits,
        acceptedCookies: this.acceptedCookies,
      },
    });
  }
  addSourceMiddleware(middleware: MiddlewareFunction) {
    try {
      if (!this.analytics) {
        console.error('Failed to add Segment Source Middleware - no analytics browser (analytics-next)');
        return;
      }

      return this.analytics.addSourceMiddleware(middleware);
    } catch (err) {
      console.error(err);
    }
  }
}

export default new SegmentService();

/**
 * Middlewares
 */

// DO NOT Track UTM - https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#utm-tracking
export const ignoreUTMSourceMiddleware: MiddlewareFunction = ({ payload, next }) => {
  const searchTextRegex = /\?.*/gi;

  payload.obj.name = payload.obj.name?.replace(searchTextRegex, '');

  if (payload.obj.context) {
    payload.obj.context.campaign = undefined;

    if (payload.obj.context.page) {
      payload.obj.context.page.path = payload.obj.context.page.path?.replace(searchTextRegex, '');
      payload.obj.context.page.url = payload.obj.context.page.url?.replace(searchTextRegex, '');
      payload.obj.context.page.search = undefined;
      payload.obj.context.page.referrer = undefined;
    }
  }

  if (payload.obj.properties) {
    payload.obj.properties.campaign = undefined;
    payload.obj.properties.referrer = undefined;
    payload.obj.properties.name = payload.obj.properties.name?.replace(searchTextRegex, '');
    payload.obj.properties.path = payload.obj.properties.path?.replace(searchTextRegex, '');
    payload.obj.properties.url = payload.obj.properties.url?.replace(searchTextRegex, '');
    payload.obj.properties.search = undefined;
  }

  next(payload);
};

/**
 * Fallback Segment APIs
 */

function handleFallbackError(err: unknown) {
  const msg = 'Failed to send Segment fallback event';
  console.error(msg, err);
}

async function fallbackPage(body = {}) {
  const Axios = (await import(/* webpackChunkName: 'axios' */ 'axios')).default;

  let search = '';
  try {
    search = location.search;
  } catch (err) {
    console.error("Failed to get 'location.search' in SegmentService", err);
  }

  // add the location.search so we can pass any marketing query strings along to segment
  return Axios.post(`${BASE_URL}/api/s/p${search}`, body).catch((err) => handleFallbackError(err));
}
async function fallbackTrack(body = {}) {
  const Axios = (await import(/* webpackChunkName: 'axios' */ 'axios')).default;
  return Axios.post(`${BASE_URL}/api/s/t`, body).catch((err) => handleFallbackError(err));
}
async function fallbackIdentify(body = {}) {
  const Axios = (await import(/* webpackChunkName: 'axios' */ 'axios')).default;
  return Axios.post(`${BASE_URL}/api/s/i`, body).catch((err) => handleFallbackError(err));
}
