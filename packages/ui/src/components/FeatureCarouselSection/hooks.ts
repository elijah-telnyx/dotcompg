import { useEffect, useRef, useState } from 'react';
import useViewportsEffect, {
  type ViewportKey,
} from '../../utils/hooks/useViewportsEffect';
import {
  clamp,
  animateValue,
  getXPositionFromEvent,
  type SwipeEvent,
} from './utils';

const WARP_THRESHOLD = 150;

const VIEWPORT_TRANSFORM_CONFIG = {
  xs: { perspective: 0.8, hOffset: 0.82, vOffset: -0.06 },
  small: { perspective: 0.5, hOffset: 0.75, vOffset: -0.04 },
  medium: { perspective: 0.5, hOffset: 0.6, vOffset: -0.04 },
  large: { perspective: 0.5, hOffset: 0.6, vOffset: -0.04 },
  xl: { perspective: 0.5, hOffset: 0.6, vOffset: -0.04 },
};

export const useCarouselMeasurements = ({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  const [viewport, setViewport] = useState<ViewportKey>();

  const [{ containerWidth, cardWidth, cardMediaHeight }, setStyles] = useState({
    containerWidth: 0,
    cardWidth: 0,
    cardMediaHeight: 0,
  });

  const updateStyles = (viewport: ViewportKey) => {
    const container = containerRef.current;
    const firstCard = container?.firstElementChild?.firstElementChild;

    if (container && firstCard) {
      setStyles({
        containerWidth: Number(
          getComputedStyle(container).width.replace('px', '')
        ),
        cardWidth: Number(getComputedStyle(firstCard).width.replace('px', '')),
        cardMediaHeight: Number(
          getComputedStyle(
            firstCard.querySelector('img') as HTMLImageElement
          ).height.replace('px', '')
        ),
      });
    }

    setViewport(viewport);
  };

  useViewportsEffect({ onViewportChange: updateStyles });

  return {
    viewport,
    cardWidth,
    containerWidth,
    cardMediaHeight,
  };
};

export const useCarousel = ({
  totalItems,
  containerRef,
}: {
  totalItems: number;
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  const [cameraPosition, _setCameraPosition] = useState(0);
  const [inited, setInited] = useState(false);

  const { viewport, cardWidth, cardMediaHeight, containerWidth } =
    useCarouselMeasurements({
      containerRef,
    });

  const getItemPosition = (index: number) => {
    return index * cardWidth;
  };

  const getItemCenter = (index: number) => {
    return getItemPosition(index) + cardWidth / 2;
  };

  const getCameraCenter = () => {
    return cameraPosition + containerWidth / 2;
  };

  const clampedSetCameraPosition = (value: number) => {
    let next = value;

    if (next < WARP_THRESHOLD) {
      next += getItemPosition(totalItems);
    }

    if (next > WARP_THRESHOLD + getItemPosition(totalItems)) {
      next -= getItemPosition(totalItems);
    }

    _setCameraPosition(next);
  };

  const setCameraPosition = (
    funcOrValue: number | ((prev: number) => number),
    duration = 0
  ) => {
    const next =
      typeof funcOrValue === 'function'
        ? funcOrValue(cameraPosition)
        : funcOrValue;

    if (duration) {
      animateValue(cameraPosition, next, duration, clampedSetCameraPosition);
    } else {
      clampedSetCameraPosition(next);
    }
  };

  const getInfoOpacity = (index: number) => {
    const itemCenter = getItemCenter(index);
    const cameraCenter = getCameraCenter();
    const distance = Math.abs(itemCenter - cameraCenter);

    return 1 - clamp(distance / cardWidth, 0, 1);
  };

  const getItemProps = (index: number) => {
    const itemCenter = getItemCenter(index);
    const cameraCenter = getCameraCenter();
    const distance = itemCenter - cameraCenter;
    const absDistance = Math.abs(distance);

    const config = viewport
      ? VIEWPORT_TRANSFORM_CONFIG[viewport]
      : VIEWPORT_TRANSFORM_CONFIG.medium;

    const perspective = absDistance * config.perspective;
    const vOffset = absDistance * config.vOffset;
    const hOffset = absDistance * config.hOffset * (distance > 0 ? -1 : 1);

    const style = {
      filter: `brightness(${Math.max(100 - absDistance * 0.1, 60)}%)`,
      transform: `translate3d(${hOffset}px, ${vOffset}px, -${perspective}px)`,
    };

    return {
      active: distance === 0,
      distant: absDistance > cardWidth * 1.5,
      style,
    };
  };

  const moveToItem = (index: number, duration = 0) => {
    setCameraPosition(
      getItemPosition(index) - (containerWidth - cardWidth) / 2,
      duration
    );
  };

  const getClosestItem = () => {
    const cameraCenter = getCameraCenter();
    return Math.floor(cameraCenter / cardWidth);
  };

  const moveToClosestItem = () => {
    moveToItem(getClosestItem(), 70);
  };

  const nextItem = () => {
    moveToItem(getClosestItem() + 1, 120);
  };

  const prevItem = () => {
    moveToItem(getClosestItem() - 1, 120);
  };

  useEffect(() => {
    if (!cardMediaHeight) {
      return;
    }

    if (inited) {
      moveToClosestItem();
    } else {
      moveToItem(1);
      setInited(true);
    }
    //eslint-disable-next-line
  }, [cardMediaHeight]);

  return {
    inited,
    cardMediaHeight,
    getItemProps,
    getInfoOpacity,
    cameraPosition,
    setCameraPosition,
    moveToClosestItem,
    getClosestItem,
    nextItem,
    prevItem,
  };
};

export const useSwipe = ({
  onDelta,
  onEnd,
}: {
  onDelta: (delta: number) => void;
  onEnd: () => void;
}) => {
  const hasStartedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const lastTouchRef = useRef(0);
  const onEndRef = useRef(onEnd);
  const onDeltaRef = useRef(onDelta);

  onEndRef.current = onEnd;
  onDeltaRef.current = onDelta;

  function onTouchStart(e: { nativeEvent: SwipeEvent }) {
    hasStartedRef.current = true;
    lastTouchRef.current = getXPositionFromEvent(e.nativeEvent);
  }

  useEffect(() => {
    const onTouchMove = (e: SwipeEvent) => {
      const touch = getXPositionFromEvent(e);
      const delta = touch - lastTouchRef.current;

      if (delta && hasStartedRef.current) {
        isDraggingRef.current = true;
        onDeltaRef.current(delta);
      }

      lastTouchRef.current = touch;
    };

    const onTouchEnd = () => {
      onEndRef.current();

      setTimeout(() => {
        hasStartedRef.current = false;
        isDraggingRef.current = false;
      }, 1);
    };

    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('mousemove', onTouchMove);
    window.addEventListener('mouseup', onTouchEnd);

    return () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('mousemove', onTouchMove);
      window.removeEventListener('mouseup', onTouchEnd);
    };
  }, []);

  return {
    handlers: {
      onTouchStart,
      onMouseDown: onTouchStart,
    },
    isDraggingRef,
  };
};
