export const lockScroll = (lock: boolean, element = document.body) => {
  element.style.overflow = lock ? 'hidden' : '';
};
