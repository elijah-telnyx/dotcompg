import { useRef, type ReactNode } from 'react';
import useBrowserLayoutEffect from '../../utils/hooks/useBrowserLayoutEffect';
import * as css from './ScrollToTheSideOnScroll.styled';

export interface ScrollToTheSideOnScrollProps {
  children: ReactNode[];
  withGradientBorder?: boolean;
}

const ScrollToTheSideOnScroll = ({
  children,
  withGradientBorder,
}: ScrollToTheSideOnScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToTheLeft = () => {
    if (containerRef.current) {
      const scrollPosition = window.scrollY;
      containerRef.current.scrollTo(scrollPosition, 0);
    }
  };

  useBrowserLayoutEffect(() => {
    if (window) {
      window.addEventListener('scroll', scrollToTheLeft);
      return () => {
        window.removeEventListener('scroll', scrollToTheLeft);
      };
    }
  }, []);

  const content = (
    <css.StyledContainer ref={containerRef}>
      <css.StyledItemsWrapper>{children}</css.StyledItemsWrapper>
    </css.StyledContainer>
  );

  if (withGradientBorder) {
    return (
      <css.StyledGradientBackground>{content}</css.StyledGradientBackground>
    );
  }

  return content;
};

export default ScrollToTheSideOnScroll;
