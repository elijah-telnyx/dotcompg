import { useRef, type TouchEvent } from 'react';

interface useSwipeProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  swipeThreshold?: number;
}

export const useSwipe = ({
  onSwipeLeft,
  onSwipeRight,
  swipeThreshold = 100,
}: useSwipeProps) => {
  const touchstartXRef = useRef(0);
  const touchendXRef = useRef(0);

  function checkDirection() {
    const touchstartX = touchstartXRef.current;
    const touchendX = touchendXRef.current;

    const distance = Math.floor(touchendX - touchstartX);
    const isBetweenThreshold =
      distance < -swipeThreshold || distance > swipeThreshold;

    if (!isBetweenThreshold) return;
    if (touchendX < touchstartX && onSwipeLeft) onSwipeLeft();
    if (touchendX > touchstartX && onSwipeRight) onSwipeRight();
  }

  const onTouchStart = (event: TouchEvent) => {
    touchstartXRef.current = event.changedTouches[0].screenX;
  };
  const onTouchEnd = (event: TouchEvent) => {
    touchendXRef.current = event.changedTouches[0].screenX;
    checkDirection();
  };

  return { onTouchStart, onTouchEnd };
};
