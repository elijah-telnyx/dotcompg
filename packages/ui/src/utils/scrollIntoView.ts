import { ScrollDirection } from '../components/Header/HeaderContainer/useScrollDirection';

export const scrollIntoView = (
  element: Element | null,
  { offset = 0 }: { offset?: number } = {}
) => {
  if (!element) {
    console.warn('Element is not defined');
    return;
  }
  const elementTop = element.getBoundingClientRect().top;
  const bodyTop = document.body.getBoundingClientRect().top;

  const header = document.querySelector(
    '[data-header-direction]'
  ) as HTMLElement;

  const isHeaderVisible =
    header?.dataset?.headerDirection === ScrollDirection.UP;

  const headerHeight = isHeaderVisible ? 0 : 72;

  const offsetPosition = elementTop - bodyTop - (offset + headerHeight);

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
};
