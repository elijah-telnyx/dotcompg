import { useRef } from 'react';
import * as css from './FeatureCarouselSection.styled';
import {
  CardAuthor,
  CardHeading,
  CardMedia,
  CardRoot,
  CardTagline,
  type CarouselCardProps,
} from '../CarouselCard/CarouselCard';
import { isDarkBackgroundColor } from '../../styles/constants/backgroundColorOptions';
import { ArrowLeft, ChevronRight } from '../Icons';
import Section, { type SectionProps } from '../Section/Section';
import { useSwipe, useCarousel } from './hooks';

export interface FeatureCarouselProps {
  items: (CarouselCardProps & { id: string })[];
  isDark?: boolean;
}

const FeatureCarousel = ({ items, isDark = false }: FeatureCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const carousel = useCarousel({
    containerRef,
    totalItems: items.length,
  });

  const { isDraggingRef, handlers: swipeHandlers } = useSwipe({
    onDelta: (delta) =>
      carousel.setCameraPosition((prev) => prev - delta * 1.2),
    onEnd: () => carousel.moveToClosestItem(),
  });

  // Used to give the impression of infinite rotation
  const toRotateItems = { first: items[0], last: items[items.length - 1] };
  const carouselItems = [toRotateItems.last, ...items, toRotateItems.first];

  const navigationButtonTopPosition =
    (carousel.cardMediaHeight - css.navigationButtonSize) / 2;

  return (
    <css.Wrapper ready={carousel.inited}>
      <css.CarouselContainer ref={containerRef}>
        <css.CarouselWrapper
          {...swipeHandlers}
          style={{
            transform: `translate3d(-${carousel.cameraPosition}px, 0px, 0px)`,
          }}
        >
          {carouselItems.map((item, index) => {
            const itemProps = carousel.getItemProps(index);
            const tagline = {
              name:
                typeof item.tagline === 'string'
                  ? item.tagline
                  : item.tagline.name,
              color:
                typeof item.tagline === 'string'
                  ? undefined
                  : item.tagline?.color,
            };

            return (
              <css.CarouselItem key={index} {...itemProps}>
                <CardRoot
                  href={item.href}
                  label={`${tagline.name} ${item.heading} by ${item.author.name}`}
                  forceNotInteractive={!itemProps.active}
                  onMouseDown={(e) => e?.preventDefault()}
                  onClick={(event) => {
                    const closestItem = carousel.getClosestItem();

                    if (isDraggingRef.current) {
                      event?.preventDefault();
                      return;
                    }

                    if (index < closestItem) {
                      carousel.prevItem();
                      event?.preventDefault();
                      return;
                    }

                    if (index > closestItem) {
                      carousel.nextItem();
                      event?.preventDefault();
                      return;
                    }
                  }}
                >
                  {item.media && (
                    <CardMedia
                      media={{ ...item.media, preload: itemProps.active }}
                    />
                  )}

                  <css.CardInfo active={itemProps.active}>
                    <CardTagline isDark={isDark} color={tagline.color}>
                      {tagline.name}
                    </CardTagline>
                    <CardHeading isDark={isDark} htmlAs='h2'>
                      {item.heading}
                    </CardHeading>
                    <CardAuthor author={item.author} isDark={isDark} />
                  </css.CardInfo>
                </CardRoot>
              </css.CarouselItem>
            );
          })}
        </css.CarouselWrapper>
      </css.CarouselContainer>

      <css.NavigationButton
        aria-label='Go to previous item'
        onClick={carousel.prevItem}
        style={{ top: navigationButtonTopPosition }}
        isDark={isDark}
        previous
      >
        <ArrowLeft
          height={css.navigationButtonSize}
          width={css.navigationButtonSize}
        />
      </css.NavigationButton>

      <css.NavigationButton
        aria-label='Go to next item'
        onClick={carousel.nextItem}
        style={{ top: navigationButtonTopPosition }}
        isDark={isDark}
        next
      >
        <ChevronRight
          height={css.navigationButtonSize}
          width={css.navigationButtonSize}
        />
      </css.NavigationButton>
    </css.Wrapper>
  );
};

export type FeatureCarouselSectionProps = Omit<FeatureCarouselProps, 'isDark'> &
  SectionProps;

export const FeatureCarouselSection = ({
  backgroundColor,
  spacingTop,
  spacingBottom,
  ...featureCarouselProps
}: FeatureCarouselProps & SectionProps) => {
  const isDark = isDarkBackgroundColor(backgroundColor);
  return (
    <Section
      backgroundColor={backgroundColor}
      spacingTop={spacingTop}
      spacingBottom={spacingBottom}
      htmlAs='div'
    >
      <FeatureCarousel {...featureCarouselProps} isDark={isDark} />
    </Section>
  );
};

export default FeatureCarouselSection;
