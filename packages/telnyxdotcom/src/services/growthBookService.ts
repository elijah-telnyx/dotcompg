import type { GetServerSidePropsContext } from 'next';
import { configureCache, GrowthBook, setPolyfills, type InitResponse, type TrackingData } from '@growthbook/growthbook';
import SegmentService from 'services/Segment/SegmentService';
import { errorLogger } from 'utils/errorHandler/errorLogger';
import constants from 'constants/env';
import { FEATURES } from 'utils/growthbook';

interface GrowthBookAttributes {
  id: string;
  url?: string;
  host?: string;
  origin?: string;
  userAgent?: string;
  [key: string]: string | string[] | undefined; // for query params and cookies
}

interface InitProps {
  url?: string;
  preview?: boolean;
  context?: GetServerSidePropsContext;
}

interface CheckFeaturesProps {
  growthbook: GrowthBook<Record<string, unknown>>;
  url?: string;
}

interface GetDataProps {
  context?: GetServerSidePropsContext;
}

export const GROWTHBOOK_INIT_TIMEOUT_MS = 1000;

export const initGrowthBook = async ({ context, url }: InitProps) => {
  setPolyfills({
    fetch: (url: Parameters<typeof fetch>[0], opts: Parameters<typeof fetch>[1]) =>
      fetch(url, {
        ...opts,
        // https://nextjs.org/docs/13/app/api-reference/functions/fetch
        next: {
          // Cache feature definitions for 1 minute
          // Implement SDK webhooks to revalidate on demand
          revalidate: constants.growthbook.REVALIDATE_SECONDS,
        },
      }),
  });

  // Disable the built-in cache since we're using Next.js's fetch cache instead
  configureCache({
    disableCache: true,
  });

  let initResponse: InitResponse;
  const attributes: GrowthBookAttributes = {
    id: SegmentService.userId,
    url: context?.resolvedUrl,
    ...(context?.req.cookies || {}),
    ...context?.query,
    host: context?.req.headers.host || '',
    origin: context?.req.headers.origin || '',
    userAgent: context?.req.headers['user-agent'] || '',
  };

  const growthbook = new GrowthBook({
    apiHost: constants.growthbook.API_HOST,
    clientKey: constants.growthbook.CLIENT_KEY,
    // Enable easier debugging of feature flags during development
    enableDevMode: context?.preview,
    attributes,
  });

  try {
    initResponse = await growthbook.init({ timeout: GROWTHBOOK_INIT_TIMEOUT_MS });

    if (!initResponse) throw new Error('Unexpected error on GrowthBook init');

    if (initResponse.error) throw initResponse.error;

    console.log(context ? 'GrowthBook init via Server' : 'GrowthBook init via Client');
  } catch (error) {
    errorLogger({
      error: new Error('Unexpected error on GrowthBook init'),
      data: JSON.stringify(error, undefined, 2),
      url,
    });
  }

  return growthbook;
};

export const checkGrowthBookFeatures = ({ growthbook, url }: CheckFeaturesProps): TrackingData[] => {
  let trackingData: TrackingData[] = [];

  try {
    /**
     * this is needed for:
     * - make sure all existing features from `utils/growthbook` are checked
     * - trigger tracking calls
     * - trigger and update code references
     */
    growthbook.isOn(FEATURES['contact-us-dotcom-3553']);
    trackingData = growthbook.getDeferredTrackingCalls();
  } catch (error) {
    errorLogger({
      error: new Error('Unexpected error on GrowthBook features check'),
      data: JSON.stringify(error, undefined, 2),
      url,
    });
  }

  return trackingData;
};

export const getGrowthBookData = async ({ context }: GetDataProps): Promise<TrackingData[]> => {
  const url = context?.resolvedUrl;
  const growthbook = await initGrowthBook({ context, url });
  const trackingData = checkGrowthBookFeatures({ growthbook, url });

  growthbook.destroy();

  return trackingData;
};
