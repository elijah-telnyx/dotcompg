import { useEffect } from 'react';

const lockScroll = (element = document.body) => {
  element.style.overflow = 'hidden';
};

const unlockScroll = (element = document.body) => {
  element.style.overflow = '';
};

export function useLockScroll({
  lock,
  element,
}: {
  lock: boolean;
  element?: HTMLElement;
}) {
  useEffect(() => {
    if (lock) {
      lockScroll(element);
    } else {
      unlockScroll(element);
    }

    return () => {
      unlockScroll(element);
    };
  }, [lock, element]);
}
