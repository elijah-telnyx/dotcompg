import { CarouselCard, type CarouselCardProps } from './CarouselCard';
import BaseCarousel from '../BaseCarousel';
import { CardSizes, carouselItemCSS } from './Carousel.styled';

export interface CarouselProps {
  items: CarouselCardProps[];
  itemsBackgroundColor?: CarouselCardProps['backgroundColor'];
  isDark?: boolean;
  initialActiveItem?: number;
}

const Carousel = ({
  itemsBackgroundColor,
  items,
  isDark,
  initialActiveItem,
}: CarouselProps) => {
  const parsedItems = items.map((item) => ({
    id: item.heading.replace(' ', '-'),
    props: { ...item, backgroundColor: itemsBackgroundColor },
  }));

  return (
    <BaseCarousel
      isDark={isDark}
      cardSizes={CardSizes}
      cardComponent={CarouselCard}
      items={parsedItems}
      itemWrapperCSS={carouselItemCSS}
      initialActiveItem={initialActiveItem}
    />
  );
};

export default Carousel;
