import { useState, Children, type PropsWithChildren } from 'react';
import * as css from './LinkImageRowSection.styled';
import Pagination from '../Pagination';
import { useSwipe } from '../../utils/hooks/useSwipe';

const Carousel = ({ children }: PropsWithChildren) => {
  const [activeItem, setActiveItem] = useState(0);
  const childrenArray = Children.toArray(children);

  const goTo = (newActive: number) => {
    if (newActive > childrenArray.length - 1) {
      return setActiveItem(0);
    }
    if (newActive < 0) {
      return setActiveItem(childrenArray.length - 1);
    }
    setActiveItem(newActive);
  };
  const goToNextItem = () => goTo(activeItem + 1);
  const goToPrevItem = () => goTo(activeItem - 1);

  const handlers = useSwipe({
    onSwipeLeft: goToNextItem,
    onSwipeRight: goToPrevItem,
  });

  return (
    <div {...handlers}>
      {childrenArray.map((child, index) => (
        <div key={index} hidden={activeItem !== index}>
          {child}
        </div>
      ))}
      <css.PaginationWrapper>
        <Pagination.Root>
          <Pagination.PreviousButton onClick={goToPrevItem} />
          <Pagination.PageCounter
            currentPage={activeItem + 1}
            totalPages={childrenArray.length}
          />
          <Pagination.NextButton onClick={goToNextItem} />
        </Pagination.Root>
      </css.PaginationWrapper>
    </div>
  );
};

export default Carousel;
