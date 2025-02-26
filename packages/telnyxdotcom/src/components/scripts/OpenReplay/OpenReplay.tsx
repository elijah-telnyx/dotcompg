import { useEffect } from 'react';
import constants from 'constants/env';
import { errorLogger } from 'utils/errorHandler/errorLogger';
import { type StartPromiseReturn } from '@openreplay/tracker/lib/app';
import { type InputModeT } from '@openreplay/tracker/lib/modules/input';
import SegmentService from 'services/Segment/SegmentService';

declare global {
  // https://github.com/typescript-eslint/typescript-eslint/issues/3617
  // eslint-disable-next-line no-var
  var OpenReplay: StartPromiseReturn;
}

// https://docs.openreplay.com/en/sdk/constructor/#example
export const OpenReplay = () => {
  useEffect(() => {
    async function load() {
      const { enabled, defaultInputMode, ...trackerOptions } = constants.openReplay;

      if (enabled) {
        try {
          // https://github.com/openreplay/openreplay/issues/1414#issuecomment-1634109942
          const OpenReplayTracker = await import('@openreplay/tracker');
          const tracker = new OpenReplayTracker.default({
            ...trackerOptions,
            defaultInputMode: defaultInputMode as InputModeT, // make sure to cast `defaultInputMode` to `InputMode` to avoid invalid values from constants/env to propagate to OpenReplay
          });
          const openReplaySessionInfo = await tracker.start();

          global.OpenReplay = openReplaySessionInfo;

          if (global.OpenReplay.success && SegmentService.anonymousId) {
            tracker.setUserAnonymousID(SegmentService.anonymousId);

            if (SegmentService.strictUserId) {
              tracker.setUserID(SegmentService.strictUserId);
            }

            if (global.OptanonActiveGroups) {
              tracker.setMetadata('optanon_active_groups', global.OptanonActiveGroups);
            }
          } else {
            errorLogger({
              error: new Error('Open Replay failed to set anonymous id'),
              data: JSON.stringify(global.OpenReplay),
              url: window.location.pathname,
            });
          }
        } catch (e) {
          errorLogger({
            error: new Error('Open Replay failed to load'),
            data: JSON.stringify(e),
            url: window.location.pathname,
          });
        }
      }
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // load just once on mount

  return <></>;
};

export default OpenReplay;
