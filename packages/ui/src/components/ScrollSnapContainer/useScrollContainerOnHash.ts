import { type RefObject } from 'react';

import useBrowserLayoutEffect from '../../utils/hooks/useBrowserLayoutEffect';
import { useRouter } from 'next/router';

// timeout needed to wait for any dynamic sections to render
const HASH_NAVIGATION_TIMEOUT_MS = 1000;

// since snap container has its own scrollbar, we need to scroll its inner when URL hash is set to a scroll snap item
export function useScrollContainerOnHash<T extends HTMLElement>(
  containerRef: RefObject<T>,
  deps: unknown[] = [],
  behavior?: 'smooth' | 'auto',
  timeout = HASH_NAVIGATION_TIMEOUT_MS
) {
  const { isReady } = useRouter();

  useBrowserLayoutEffect(
    function onHashNavigationScroll() {
      const containerElement = containerRef.current;
      if (!containerElement || !window.location.hash || !isReady) return;

      setTimeout(() => {
        const hashElement = containerElement.querySelector(
          window.location.hash
        );

        if (hashElement) {
          hashElement.scrollIntoView({
            behavior,
          });
        }
      }, timeout);
    },
    [...deps, isReady]
  );
}

export default useScrollContainerOnHash;
