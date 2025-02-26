import { useEffect, useRef, useState } from 'react';
import type { CustomerLogosProps } from './CustomerLogos';

const SWAP_INTERVAL_MS = 2000;

function getRandomNumber(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const useLogoSwapper = ({
  logos,
  maxVisibleLogos: MAX_LOGOS,
}: Required<Pick<CustomerLogosProps, 'logos' | 'maxVisibleLogos'>>) => {
  const indices = logos.map((_, index) => index);
  const [displayedIndices, setDisplayedIndices] = useState(
    indices.slice(0, MAX_LOGOS)
  );
  const intervalRef = useRef<NodeJS.Timeout>();
  const lastIndexRef = useRef<number>();

  const swapLogo = () => {
    // get random index to change
    let indexToChange = getRandomNumber(0, MAX_LOGOS - 1);
    while (indexToChange === lastIndexRef.current) {
      indexToChange = getRandomNumber(0, MAX_LOGOS - 1);
    }
    lastIndexRef.current = indexToChange;

    setDisplayedIndices((displayed) => {
      // get indices that are not currently displayed
      const notDisplayedIndices = indices.filter((i) => !displayed.includes(i));

      // pick random index from those not displayed
      const notDisplayedIndex = getRandomNumber(
        0,
        notDisplayedIndices.length - 1
      );
      const nextIndex = notDisplayedIndices[notDisplayedIndex];
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
      return displayed.map((index, idx) =>
        idx === indexToChange ? nextIndex : index
      );
    });
  };

  const shouldAnimate = logos.length > MAX_LOGOS;

  useEffect(() => {
    if (shouldAnimate) {
      intervalRef.current = setTimeout(() => {
        swapLogo();
      }, SWAP_INTERVAL_MS);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  });

  return {
    images: displayedIndices.map((index) => logos[index]),
  };
};

export default useLogoSwapper;
