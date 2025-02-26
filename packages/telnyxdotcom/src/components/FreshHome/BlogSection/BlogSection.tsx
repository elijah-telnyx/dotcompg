import 'glider-js/glider.min.css';
import Section, { type SectionProps } from 'ui/components/Section';
import SectionHeader from 'ui/components/Section/SectionHeader';
import Grid from 'ui/components/Grid';
import * as css from './BlogSection.styled';
import SecondaryCarousel, { type SecondaryCarouselProps } from 'ui/components/SecondaryCarousel';
import CtaButton, { type CTAButtonProps } from 'ui/components/CtaButton';

export type ItemsProps = {
  // for static home validation
  id: string;
  heading: string;
  tagline: {
    color: string;
    name: string;
  };
  author: {
    media: {
      alt: string;
      src: string;
    };
    name: string;
  };
  href: string;
}[];

export interface BlogSectionProps extends SectionProps {
  tagline: string;
  heading: string;
  copy: string;
  items: SecondaryCarouselProps['items'];
  cta: CTAButtonProps;
}

const BlogSection = ({ tagline, heading, copy, items, cta, ...props }: BlogSectionProps) => {
  return (
    <Section {...props}>
      <Grid.FullWidthItem>
        <css.BlogWrapper>
          <SectionHeader copy={copy} heading={heading} tagline={tagline} />
        </css.BlogWrapper>
      </Grid.FullWidthItem>
      <SecondaryCarousel items={items} />
      <css.CtaWrapper>
        <CtaButton {...cta} />
      </css.CtaWrapper>
    </Section>
  );
};

export default BlogSection;
