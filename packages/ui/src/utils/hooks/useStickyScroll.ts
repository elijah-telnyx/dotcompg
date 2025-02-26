// hooks/useStickyScroll.ts
import { useState, useEffect, useRef } from 'react';

export interface UseStickyScrollOptions {
  onStickyChange?: (isSticky: boolean, isScrollingUp: boolean) => void;
}

interface UseStickyScrollReturn {
  targetRef: React.RefObject<HTMLDivElement>;
  isSticky: boolean;
  isScrollingUp: boolean;
}

export const useStickyScroll = (
  options?: UseStickyScrollOptions
): UseStickyScrollReturn => {
  const [isSticky, setIsSticky] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isUp = currentScrollY < lastScrollY.current;
      setIsScrollingUp(isUp);
      lastScrollY.current = currentScrollY;
      options?.onStickyChange?.(isSticky, isScrollingUp);
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const entry = entries[0];
      const isViewportBelow = entry.boundingClientRect.top < 0;
      const newIsSticky = !entry.isIntersecting && isViewportBelow;

      if (isSticky !== newIsSticky) {
        setIsSticky(newIsSticky);
        options?.onStickyChange?.(newIsSticky, isScrollingUp);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    observerRef.current = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    });

    if (targetRef.current) {
      observerRef.current.observe(targetRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observerRef.current && targetRef.current) {
        observerRef.current.unobserve(targetRef.current);
      }
    };
  }, [isSticky, isScrollingUp, options]);

  return { targetRef, isSticky, isScrollingUp };
};
