import { useLayoutEffect, type RefObject } from 'react';
import { config } from '../../styles';
import { height } from '../../components/Header/constants';

export function useScrollSnapMouseWheel<T extends HTMLElement>(
  ref: RefObject<T>,
  preventMouseWheelScroll?: boolean,
  behavior?: 'smooth' | 'auto'
) {
  useLayoutEffect(() => {
    const refElement = ref.current;
    const isTrackpad = false;
    let firstDeltaY = 0;
    let hasScrolledToExitSnap = false;

    function handleMouseWheelScroll(event: WheelEvent) {
      if (isTrackpad || !refElement) return;

      // havent updated the firstDeltaY yet or changed directions
      if (!firstDeltaY || event.deltaY * firstDeltaY < 0) {
        firstDeltaY = event.deltaY;
      }

      hasScrolledToExitSnap =
        refElement.scrollTop + refElement.clientHeight >=
          refElement.scrollHeight && firstDeltaY > 0;

      if (preventMouseWheelScroll && !hasScrolledToExitSnap)
        event.preventDefault();

      // trigger this just once
      if (firstDeltaY === event.deltaY) {
        // account for our header size
        const headerScrollPaddingY = window.matchMedia(config.media.large)
          .matches
          ? height.large
          : height.xs;

        if (firstDeltaY > 0 && !window.scrollY) {
          window.scrollBy({
            top: headerScrollPaddingY, // down
            behavior,
          });
        } else if (firstDeltaY < 0) {
          window.scrollBy({
            top: -headerScrollPaddingY - window.scrollY, // up
            behavior,
          });
        }

        refElement.scrollBy({
          top: firstDeltaY,
          behavior,
        });
      }
    }

    function detectTrackPad(event: WheelEvent) {
      const { deltaY } = event;

      // mouse wheels fire events with deltaY as a fraction, more precision
      if (deltaY && !Number.isInteger(deltaY)) {
        return false;
      }
      return true;
    }

    // I think this is fine to run just once as we don't expect users to be switching from trackpad to mousewheel in a single session
    document.addEventListener('wheel', detectTrackPad, { once: true });
    refElement?.addEventListener('wheel', handleMouseWheelScroll);

    return () => {
      refElement?.removeEventListener('wheel', handleMouseWheelScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preventMouseWheelScroll]); // e.g.: https://react.dev/reference/react/useLayoutEffect#measuring-layout-before-the-browser-repaints-the-screen
}
