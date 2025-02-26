import { isDarkBackgroundColor } from '../../styles/constants/backgroundColorOptions';
import type { CTAButtonProps } from '../CtaButton';
import CtaButton from '../CtaButton';
import Grid from '../Grid';
import type { SectionProps } from '../Section';
import Section from '../Section';
import Carousel, { type CarouselProps } from '../Carousel';
import * as css from './CarouselSection.styled';
import Heading from '../Typography/Heading';

export interface CarouselSectionProps extends SectionProps, CarouselProps {
  tagline: string;
  heading: string;
  ctas?: CTAButtonProps[];
  headingElement?: keyof JSX.IntrinsicElements;
}

const CarouselSection = ({
  ctas,
  tagline,
  heading,
  headingElement,
  initialActiveItem,
  items,
  itemsBackgroundColor,
  ...props
}: CarouselSectionProps) => {
  const isDark = isDarkBackgroundColor(props.backgroundColor);
  return (
    <Section {...props}>
      <Grid.Container>
        <Grid.Item xs={4} small={6} medium={8}>
          <Heading level={2} dark={isDark} category>
            {tagline}
          </Heading>
          <Heading
            htmlAs={headingElement}
            level={2}
            dark={isDark}
            css={{
              marginBlockStart: '$large',

              '@medium': {
                marginBlockStart: '$xxl',
              },
            }}
          >
            {heading}
          </Heading>
          {ctas?.length && (
            <css.CtaListWrapper>
              {ctas.map((button) => (
                <CtaButton
                  {...button}
                  key={button.href}
                  backgroundColor={props.backgroundColor}
                />
              ))}
            </css.CtaListWrapper>
          )}
        </Grid.Item>
      </Grid.Container>
      <css.CarouselWrapper>
        <Carousel
          {...props}
          initialActiveItem={initialActiveItem}
          items={items}
          itemsBackgroundColor={itemsBackgroundColor}
          isDark={isDark}
        />
      </css.CarouselWrapper>
    </Section>
  );
};

export default CarouselSection;
