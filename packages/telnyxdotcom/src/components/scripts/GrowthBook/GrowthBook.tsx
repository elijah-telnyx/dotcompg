import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { GrowthBook, type TrackingData } from '@growthbook/growthbook';
import SegmentService, { SEGMENT_TRACK_EVENT_NAMES } from 'services/Segment/SegmentService';

interface GrowthBookProps {
  preview: boolean;
  trackingData?: TrackingData[];
}

export const GrowthBookInit = ({ trackingData }: GrowthBookProps) => {
  const router = useRouter();
  const gbRef = useRef<GrowthBook<Record<string, unknown>>>();

  useEffect(() => {
    if (trackingData && router.isReady) {
      trackingData.forEach(({ experiment, result }) => {
        const properties = {
          experimentId: experiment.key,
          variationId: result.key,
          id: SegmentService.anonymousId,
        };

        /**
         * This Event name `MUST` be constant, important for Growthbook <-> BigQuery <-> Segment integration.
         * See Ticket https://telnyx.atlassian.net/browse/DOTCOM-3555. Context:
         * - https://docs.growthbook.io/event-trackers/segment#2-add-exposure-tracking-event
         * - https://docs.growthbook.io/guide/bigquery#2-connect-growthbook-to-bigquery
         * - https://segment.com/docs/connections/storage/catalog/bigquery/#create-a-service-account-for-segment
         */
        SegmentService.track(SEGMENT_TRACK_EVENT_NAMES.EXPERIMENT_VIEWED, properties);
      });
    }

    router.events.on('routeChangeComplete', onRouteChangeGrowthBookUpdate);
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeGrowthBookUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events, router.isReady, trackingData]); // register event listener just once, change if tracking data changes

  /**
   * https://github.com/growthbook/examples/blob/65f63f63ab106569e80b2b1d9d5c6f554bd543a8/next-js-pages/pages/_app.tsx#L34C1-L35C1
   */
  function onRouteChangeGrowthBookUpdate() {
    if (gbRef.current) {
      // Let the GrowthBook instance know when the URL changes so the active. Remove this if we remove next/link usage
      // experiments can update accordingly
      gbRef.current.setURL(window.location.href);
    }
  }

  return <></>;
};

export default GrowthBookInit;
