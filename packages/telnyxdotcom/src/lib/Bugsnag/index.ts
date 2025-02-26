import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import constants from 'constants/env';
import SegmentService from 'services/Segment';

export function start() {
  // @ts-ignore
  if (!Bugsnag._client) {
    Bugsnag.start({
      // we need to use @bugsnag/browser due to metadata information.
      // For browser lib, key is public https://github.com/bugsnag/bugsnag-js/issues/595
      apiKey: constants.Bugsnag.NEXT_PUBLIC_BUGSNAG_API_KEY,
      plugins: [new BugsnagPluginReact()],
      appVersion: process.env.NEXT_PUBLIC_BUILD_NUMBER || '0000.00.00.00.00.HEAD',
      releaseStage: constants.env,
      user: { id: SegmentService.anonymousId },
      onError: (event) => {
        const openReplaySessionID = global.OpenReplay?.success && global.OpenReplay.sessionID;
        event.addMetadata('OpenReplay Session', { id: openReplaySessionID });
      },
    });
  }
}

export default Bugsnag;
