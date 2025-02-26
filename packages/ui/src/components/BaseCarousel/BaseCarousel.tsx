import * as css from './BaseCarousel.styled';

import { ArrowLeft, ChevronRight } from '../Icons';
import { useEffect, useId, useRef, useState } from 'react';

import { convertSizeToNumber } from './utils';
import { theme } from '../../styles';
const { viewports } = theme;

export interface BaseCarouselProps<
  CardComponent extends React.ComponentType<any>
> {
  items: { id: string; props: React.ComponentProps<CardComponent> }[];
  cardComponent: CardComponent;
  cardSizes: {
    xs: { width: number };
    small: { width: number };
    medium: { width: number };
    large: { width: number };
    xl: { width: number };
  };
  isDark?: boolean;
  itemWrapperCSS?: React.ComponentProps<typeof css.BaseCarouselItem>['css'];
  initialActiveItem?: number;
}

type ArrowsProps = {
  next: HTMLButtonElement | null;
  prev: HTMLButtonElement | null;
};

const navBtn = {
  prev: { id: `go-to-previous-item` },
  next: { id: `go-to-next-item` },
};

function BaseCarousel<CardComponent extends React.ComponentType<any>>({
  items,
  cardComponent: CardComponent,
  cardSizes,
  isDark,
  itemWrapperCSS,
  initialActiveItem,
}: BaseCarouselProps<CardComponent>) {
  const gliderRef = useRef(null);
  const [isArrowsHidden, setIsArrowsHidden] = useState(true);

  /*
   * This is required so we don't animate when
   * scrolling to the initialActiveItem
   */
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const arrowsAreDisabled = (arrows: ArrowsProps) => {
    const { next, prev } = arrows || {};
    const isNextDisabled = next?.ariaDisabled === 'true';
    const isPrevDisabled = prev?.ariaDisabled === 'true';
    const isDisabled = isNextDisabled && isPrevDisabled;
    if (isDisabled !== isArrowsHidden) {
      setIsArrowsHidden(isDisabled);
    }
  };

  useEffect(() => {
    setShouldAnimate(true);
  }, []);
  const componentId = useId().replace(/:/g, '-');
  return (
    <css.BaseCarouselWrapper>
      <css.GliderWrapper
        draggable
        hasArrows
        slidesToScroll={1}
        slidesToShow='auto'
        onRefresh={(event: any) => {
          arrowsAreDisabled(event.target?._glider?.arrows);
        }}
        itemWidth={cardSizes.xs.width}
        responsive={[
          {
            breakpoint: convertSizeToNumber(viewports.xs.value),
            settings: { itemWidth: cardSizes.xs.width },
          },
          {
            breakpoint: convertSizeToNumber(viewports.small.value),
            settings: { itemWidth: cardSizes.small.width },
          },
          {
            breakpoint: convertSizeToNumber(viewports.medium.value),
            settings: { itemWidth: cardSizes.medium.width },
          },
          {
            breakpoint: convertSizeToNumber(viewports.large.value),
            settings: { itemWidth: cardSizes.large.width },
          },
          {
            breakpoint: convertSizeToNumber(viewports.xl.value),
            settings: { itemWidth: cardSizes.xl.width },
          },
        ]}
        ref={gliderRef}
        arrows={{
          prev: `#${navBtn.prev.id + componentId}`,
          next: `#${navBtn.next.id + componentId}`,
        }}
        scrollToSlide={initialActiveItem}
        duration={shouldAnimate ? 0.5 : 0}
      >
        {items.map((item) => {
          return (
            <css.BaseCarouselItem
              key={item.id}
              id={item.id}
              css={itemWrapperCSS}
            >
              <CardComponent {...item.props} />
            </css.BaseCarouselItem>
          );
        })}
      </css.GliderWrapper>
      <css.CarouselTriggerWrapper dark={isDark} isHidden={isArrowsHidden}>
        <css.BaseCarouselTrigger
          aria-label='Go to previous item'
          id={navBtn.prev.id + componentId}
        >
          <ArrowLeft />
        </css.BaseCarouselTrigger>
        <css.BaseCarouselTrigger
          aria-label='Go to next item'
          id={navBtn.next.id + componentId}
        >
          <ChevronRight />
        </css.BaseCarouselTrigger>
      </css.CarouselTriggerWrapper>
    </css.BaseCarouselWrapper>
  );
}

export default BaseCarousel;
