export type SwipeEvent = MouseEvent | TouchEvent | DragEvent;

export const getXPositionFromEvent = (event: SwipeEvent) => {
  if (event instanceof TouchEvent) {
    return event.changedTouches[0].pageX;
  }

  return event.pageX;
};

export const clamp = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, min), max);
};

export const animateValue = (
  start: number,
  end: number,
  duration: number,
  onUpdate: (value: number) => void
) => {
  let startTime: number;

  function update(currentTime: number) {
    if (!startTime) {
      startTime = currentTime;
    }

    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1); // Ensure progress doesn't exceed 1

    const animatedValue = start + (end - start) * progress;

    onUpdate(animatedValue);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
};
