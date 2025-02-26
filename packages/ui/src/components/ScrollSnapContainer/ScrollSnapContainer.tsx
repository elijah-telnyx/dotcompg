import { useEffect, useRef, useState, type HTMLAttributes } from 'react';
import useScrollSnapPosition from './useScrollSnapPosition';
import useScrollContainerOnHash from './useScrollContainerOnHash';
import * as css from './ScrollSnapContainer.styled';

export const SCROLL_SNAP_ELEMENT_DATA_ATTRIBUTE = 'data-scroll-snap-position';

export interface ScrollSnapContainerProps
  extends HTMLAttributes<HTMLDivElement> {
  behavior?: 'smooth' | 'auto';
  hideScrollbar?: boolean;
  startPosition?: number;
  stopPosition?: number;
  scope?: {
    startElementId: string;
    stopElementId: string;
  };
  htmlAs?: keyof JSX.IntrinsicElements;
}

const ScrollSnapContainer = ({
  behavior = 'smooth',
  hideScrollbar,
  startPosition,
  stopPosition,
  scope,
  htmlAs,
  ...props
}: ScrollSnapContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { position, visible } = useScrollSnapPosition(containerRef, scope);
  const [stopSnap, setStopSnap] = useState(Boolean(scope));

  useEffect(() => {
    if (startPosition && !stopPosition) {
      setStopSnap(position < startPosition);
    } else if (!startPosition && stopPosition) {
      setStopSnap(position >= stopPosition);
    } else if (startPosition && stopPosition) {
      setStopSnap(position < startPosition || position >= stopPosition);
    }

    if (typeof visible !== 'undefined') {
      setStopSnap(!visible);
    }
  }, [position, visible, startPosition, stopPosition]);

  useScrollContainerOnHash(containerRef, [behavior], behavior);

  return (
    <css.Container
      ref={containerRef}
      {...props}
      behavior={behavior}
      hideScrollbar={hideScrollbar}
      stopSnap={stopSnap}
      as={htmlAs}
      {...{ [SCROLL_SNAP_ELEMENT_DATA_ATTRIBUTE]: position }}
    />
  );
};

export default ScrollSnapContainer;
