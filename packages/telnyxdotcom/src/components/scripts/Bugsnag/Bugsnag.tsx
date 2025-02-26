import { start as startBugsnag } from 'lib/Bugsnag';
import useBrowserLayoutEffect from 'utils/hooks/useBrowserLayoutEffect';

export const Bugsnag = () => {
  useBrowserLayoutEffect(() => {
    startBugsnag();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // load just once on mount

  return <></>;
};

export default Bugsnag;
