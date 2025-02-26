import React, { useRef, type RefObject } from 'react';
import useBrowserLayoutEffect from '../../utils/hooks/useBrowserLayoutEffect';

const CSS_VAR_SCROLL_SNAP_POSITION = '--scrollSnapPosition';
const SNAP_THRESHOLD_PX = 10;
const intersectionObserverOptions: IntersectionObserverInit = {
  threshold: [0, 0.25, 0.5, 0.75, 1],
};
export const SCROLL_RESET_INTERVAL_MS = 1000;

const setScrollSnapPosition = (position: number | string) => {
  document.documentElement.style.setProperty(
    CSS_VAR_SCROLL_SNAP_POSITION,
    position.toString()
  );
};

function useScrollSnapPosition<T extends HTMLElement>(
  ref: RefObject<T>,
  scope?: {
    startElementId: string;
    stopElementId: string;
  },
  snapThreshold = SNAP_THRESHOLD_PX,
  resetInterval = SCROLL_RESET_INTERVAL_MS
) {
  const tickingRef = useRef(false);
  const [position, setPosition] = React.useState<number>(0);
  const [visible, setVisible] = React.useState<boolean>();

  useBrowserLayoutEffect(function onInitialContainerScroll() {
    const refElement = ref.current;
    let startElement: HTMLElement | null;
    let stopElement: HTMLElement | null;
    let startObserver: IntersectionObserver;
    let stopObserver: IntersectionObserver;

    if (scope) {
      startElement = document.getElementById(scope.startElementId);
      stopElement = document.getElementById(scope.stopElementId);

      if (startElement && stopElement) {
        // entry.boundingClientRect means past below section
        startObserver = new IntersectionObserver(([entry]) => {
          setVisible(
            entry.intersectionRatio >= 0.5 || entry.boundingClientRect?.top < 0
          );
        }, intersectionObserverOptions);

        stopObserver = new IntersectionObserver(([entry]) => {
          // not passed below section yet, but already visible which means it has pass through startElement
          setVisible(
            (visible) => visible && entry.boundingClientRect?.bottom > 0 // `bottom` as it's past element, below the tree
          );
        }, intersectionObserverOptions);

        startObserver.observe(startElement);
        stopObserver.observe(stopElement);
      }
    }

    function onScroll() {
      if (tickingRef.current) return;

      window.requestAnimationFrame(() => {
        const scrollTop = Number(refElement?.scrollTop) - snapThreshold; // account for snapping

        if (scrollTop <= 0) {
          setPosition(0);
        } else {
          const scrollRatio =
            Math.trunc(
              ((scrollTop + snapThreshold) / window.innerHeight) * 10
            ) / 10;

          setPosition(scrollRatio);
        }

        tickingRef.current = false;
      });

      tickingRef.current = true;
    }

    if (!refElement) return;

    const resetIntervalRef = setInterval(() => {
      // reset on snap not happened after some secs
      if (position > 0 && position < 1) {
        setPosition(0);
      }
    }, resetInterval);

    refElement.addEventListener('scroll', onScroll);
    return () => {
      clearInterval(resetIntervalRef);
      refElement.removeEventListener('scroll', onScroll);
      if (startObserver && startElement) startObserver.unobserve(startElement);
      if (stopObserver && stopElement) stopObserver.unobserve(stopElement);
    };
  }, []);

  useBrowserLayoutEffect(() => {
    setScrollSnapPosition(position);
  }, [position]);

  return { position, visible };
}
export default useScrollSnapPosition;
