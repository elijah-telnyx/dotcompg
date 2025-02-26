import { useLayoutEffect, useState } from 'react';

interface UseGradientProps {
  containerWithScrollRef: React.RefObject<HTMLElement>;
}

export const useGradient = ({ containerWithScrollRef }: UseGradientProps) => {
  const [hasGradient, setHasGradient] = useState(false);

  const computeClientContainer = () => {
    const container = containerWithScrollRef.current;
    if (!container) return;
    const isOnTop = container.scrollTop === 0;
    if (isOnTop) return setHasGradient(false);

    // give some space for the scroll behavior to kick in
    const scrollPadding = 20;
    setHasGradient(
      container.scrollHeight - scrollPadding > container.clientHeight
    );
  };

  useLayoutEffect(() => {
    const container = containerWithScrollRef.current;
    if (!container) return;

    container?.addEventListener('scroll', computeClientContainer);
    return () => {
      container?.removeEventListener('scroll', computeClientContainer);
    };
  }, []);

  return { hasGradient };
};
