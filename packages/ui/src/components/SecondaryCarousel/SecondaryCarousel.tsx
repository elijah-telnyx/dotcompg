import { useId } from 'react';
import BaseCarousel from '../BaseCarousel';
import CarouselCard, { type CarouselCardProps } from '../CarouselCard';
import { CardSizes, CardWrapper } from './SecondaryCarousel.styled';

export interface SecondaryCarouselProps {
  items: (Omit<CarouselCardProps, 'isDark'> & { id: string })[];
  isDark?: boolean;
  semanticHeading?: boolean;
}

const SecondaryCarouselCard = (props: CarouselCardProps) => {
  return (
    <CardWrapper>
      <CarouselCard {...props} />
    </CardWrapper>
  );
};

const SecondaryCarousel = ({
  items,
  isDark,
  semanticHeading,
}: SecondaryCarouselProps) => {
  const carouselId = useId();
  const parsedItems = items.map((item, index) => ({
    id: String(index) + carouselId,
    props: { ...item, id: item.id + carouselId, isDark },
  }));

  return (
    <BaseCarousel
      isDark={isDark}
      cardSizes={CardSizes}
      cardComponent={(props) =>
        SecondaryCarouselCard({ ...props, semanticHeading })
      }
      items={parsedItems}
    />
  );
};

export default SecondaryCarousel;
