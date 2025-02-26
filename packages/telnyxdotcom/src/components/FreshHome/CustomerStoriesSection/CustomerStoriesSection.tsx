import 'glider-js/glider.min.css';
import Section, { type SectionProps } from 'ui/components/Section';
import SectionHeader from 'ui/components/Section/SectionHeader';
import Grid from 'ui/components/Grid';
import * as css from './CustomerStoriesSection.styled';
import Carousel, { type CarouselProps } from 'ui/components/Carousel';
import CtaButton, { type CTAButtonProps } from 'ui/components/CtaButton';

export interface CustomerStoriesSectionProps extends SectionProps {
  tagline: string;
  heading: string;
  copy: string;
  items: CarouselProps['items'];
  ctas: CTAButtonProps[];
}

const CustomerStoriesSection = ({ tagline, heading, copy, items, ctas, ...props }: CustomerStoriesSectionProps) => {
  return (
    <Section {...props}>
      <Grid.FullWidthItem>
        <css.CustomerStoriesWrapper>
          <SectionHeader copy={copy} heading={heading} tagline={tagline} variant='center' />
        </css.CustomerStoriesWrapper>
      </Grid.FullWidthItem>
      <Carousel items={items} initialActiveItem={2} itemsBackgroundColor='cream' />
      <css.CtaWrapper>
        {ctas.map((cta) => (
          <CtaButton key={cta.href} {...cta} />
        ))}
      </css.CtaWrapper>
    </Section>
  );
};

export default CustomerStoriesSection;
