import { useRouter } from 'next/router';

import constants from 'constants/env';
import SegmentService from 'services/Segment';
import SegmentLib from 'lib/Segment';
import { generateUserHash, updateIntercomSettings } from 'components/scripts/IntercomSettings';
import useBrowserLayoutEffect from 'utils/hooks/useBrowserLayoutEffect';

const PAGE_PREFIX = constants.Analytics.pagePrefix;
const PROTOCOL = constants.protocol;
const HOST = constants.host;

export interface SegmentProps {
  acceptedCookies?: boolean;
}
/**
 * Loads Segment's `analytics-next` library and sets up page tracking
 * References:
 *  - https://segment.com/docs/getting-started/02-simple-install/
 *  - https://github.com/segmentio/analytics-next
 */
export const Segment = ({ acceptedCookies }: SegmentProps) => {
  const router = useRouter();

  function sendPageEvent(url = '/') {
    const currentPage = `${PAGE_PREFIX}${url}`;
    SegmentService.page(currentPage, {
      name: currentPage,
      url: `${PROTOCOL}://${HOST}${url}`,
      path: url,
    });
  }

  useBrowserLayoutEffect(function loadSegmentOnInteractive() {
    SegmentService.load(acceptedCookies).then(async () => {
      sendPageEvent(router.asPath);
      // Do not identify anonymous intercom users
      const userId = SegmentService.strictUserId;

      if (acceptedCookies && userId) {
        const userHash = await generateUserHash(userId);

        if (userHash) {
          updateIntercomSettings({ user_id: userId, user_hash: userHash });
        }
      }
    });
    console.log('Segment Script initiated');
  }, []);

  return <></>;
};

export function setAnonymousId() {
  SegmentService.anonymousId = SegmentLib.anonymousId;
}

export default Segment;
