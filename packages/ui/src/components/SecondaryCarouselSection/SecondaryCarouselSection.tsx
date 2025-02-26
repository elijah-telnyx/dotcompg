import { isDarkBackgroundColor } from '../../styles/constants/backgroundColorOptions';
import Grid from '../Grid';
import type { SecondaryCarouselProps } from '../SecondaryCarousel/SecondaryCarousel';
import SecondaryCarousel from '../SecondaryCarousel/SecondaryCarousel';
import Section, { type SectionProps } from '../Section/Section';
import Heading from '../Typography/Heading/Heading';
import * as css from './SecondaryCarouselSection.styled';

export interface SecondaryCarouselSectionProps
  extends Omit<SecondaryCarouselProps, 'isDark'>,
    SectionProps {
  heading?: string;
  semanticHeading?: boolean;
}

export const SecondaryCarouselSection = ({
  heading,
  backgroundColor,
  spacingBottom,
  spacingTop,
  semanticHeading = true,
  ...props
}: SecondaryCarouselSectionProps) => {
  const isDark = isDarkBackgroundColor(backgroundColor);
  return (
    <Section
      backgroundColor={backgroundColor}
      spacingBottom={spacingBottom}
      spacingTop={spacingTop}
    >
      {heading && (
        <Grid.Container>
          <css.HeadingWrapper xs={4} small={8} medium={6} large={6} xl={6}>
            <Heading
              level={2}
              dark={isDark}
              htmlAs={semanticHeading ? 'h3' : 'p'}
            >
              {heading}
            </Heading>
          </css.HeadingWrapper>
        </Grid.Container>
      )}
      <SecondaryCarousel
        {...props}
        isDark={isDark}
        semanticHeading={semanticHeading}
      />
    </Section>
  );
};

export default SecondaryCarouselSection;
