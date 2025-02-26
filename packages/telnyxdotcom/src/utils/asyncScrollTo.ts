const DEFAULT_DELAY = 350;

export const asyncScrollTo = <T extends HTMLElement | Element>(
  element: T,
  options: ScrollToOptions & {
    delay?: number;
  }
): Promise<T> => {
  const delay = options?.delay ?? DEFAULT_DELAY;

  return new Promise((resolve) => {
    element.scrollTo(options);

    setTimeout(() => {
      resolve(element);
    }, delay);
  });
};
