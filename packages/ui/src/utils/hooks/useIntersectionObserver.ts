import { useRef, useState, type RefObject } from 'react';

import useBrowserLayoutEffect from '../../utils/hooks/useBrowserLayoutEffect';

export function useIntersectionObserver<T extends Element>(
  options: IntersectionObserverInit,
  observerRef?: RefObject<T>
) {
  // Initialize the state for the intersection observer entry
  // This state will hold information about the intersection between the observed element and its container const [entry, setEntry] = useState();
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const elementRef = useRef<T>(null);
  const observedRef = observerRef || elementRef;

  useBrowserLayoutEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Update our state when observer callback fires
      setEntry(entry);
    }, options);
    if (observedRef.current) {
      observer.observe(observedRef.current);
    }
    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return { entry, observerRef: elementRef };
}
