import { useState, type RefObject } from 'react';
import { config } from '../../styles';
import { height } from '../../components/Header/constants';
import useBrowserLayoutEffect from '../../utils/hooks/useBrowserLayoutEffect';

export function useIsInViewport<T extends Element>(
  ref: RefObject<T>,
  rootMargin?: string,
  threshold?: number | number[]
) {
  // State and setter for storing whether element is visible
  const [intersectionData, setIntersectionData] = useState<{
    isIntersecting: IntersectionObserverEntry['isIntersecting'] | null;
    intersectionRatio: IntersectionObserverEntry['intersectionRatio'];
  }>({
    isIntersecting: null,
    intersectionRatio: 0,
  });
  useBrowserLayoutEffect(() => {
    const headerScrollPaddingY = window.matchMedia(config.media.large).matches
      ? height.large
      : height.xs;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersectionData({
          isIntersecting: entry.isIntersecting,
          intersectionRatio: entry.intersectionRatio,
        });
      },
      {
        rootMargin: rootMargin || `-${headerScrollPaddingY}px 0px 0px 0px`,
        threshold,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return intersectionData;
}
