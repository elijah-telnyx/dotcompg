/**
 * To remove warning when using useLayoutEffect on SSR
 * https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85#gistcomment-3570933
 */
import { useLayoutEffect } from 'react';

const useBrowserLayoutEffect =
  typeof window !== 'undefined'
    ? useLayoutEffect
    : () => {
        /* empty */
      };

export default useBrowserLayoutEffect;
