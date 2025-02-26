import { useRef } from 'react';
import useBrowserLayoutEffect from './useBrowserLayoutEffect';

export enum ScrollDirection {
  NONE = 'NONE',
  UP = 'UP',
  DOWN = 'DOWN',
}

export const SCROLL_RESET_INTERVAL_MS = 500;

/**
 * @TODO use this to replace HeaderContainer `useScrollDirection` hook
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event#scroll_event_throttling
 */
const useScrollDirection = (
  onDirectionCallback: (direction: ScrollDirection) => void,
  resetInterval = SCROLL_RESET_INTERVAL_MS
) => {
  const scrollDirectionRef = useRef(ScrollDirection.NONE);
  const lastKnownScrollPositionRef = useRef(0);
  const tickingRef = useRef(false);

  useBrowserLayoutEffect(() => {
    function scrollOnTick() {
      if (!tickingRef.current) {
        let scrollDirection = ScrollDirection.NONE;

        if (window.scrollY > lastKnownScrollPositionRef.current) {
          scrollDirection = ScrollDirection.DOWN;
        } else {
          scrollDirection = ScrollDirection.UP;
        }

        lastKnownScrollPositionRef.current = window.scrollY;

        window.requestAnimationFrame(() => {
          if (scrollDirection !== scrollDirectionRef.current) {
            onDirectionCallback(scrollDirection);
          }

          scrollDirectionRef.current = scrollDirection;
          tickingRef.current = false;
        });

        tickingRef.current = true;
      }
    }

    // make sure components using this hook can control trigger count
    const resetIntervalRef = setInterval(() => {
      scrollDirectionRef.current = ScrollDirection.NONE;
    }, resetInterval);
    window.addEventListener('scroll', scrollOnTick);

    return () => {
      clearInterval(resetIntervalRef);
      window.removeEventListener('scroll', scrollOnTick);
    };
  }, []);
};

export default useScrollDirection;
