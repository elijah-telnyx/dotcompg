import Section, { type SectionProps } from 'ui/components/Section';
import SectionHeader from 'ui/components/Section/SectionHeader';
import * as css from './TestimonialsSection.styled';
import Grid from 'ui/components/Grid';
import CustomerLogos from 'ui/components/CustomerLogos';
import { type CustomerLogosProps } from 'ui/components/CustomerLogos';
export interface TestimonialsSectionProps extends SectionProps {
  copy?: string;
  heading?: string;
  tagline?: string;
  testimonials: {
    id: string;
    quote: string;
    quoter?: string;
    quoterTitle?: string;
    cite: string;
  }[];
  logos: CustomerLogosProps;
}

const TestimonialsSection = ({
  copy = "Head to <a href='https://www.g2.com/'>G2.com</a> to read more user reviews. ",
  heading = 'What our customers say about us',
  tagline,
  testimonials,
  logos,
  ...props
}: TestimonialsSectionProps) => {
  return (
    <>
      <Section backgroundColor='green' {...props}>
        <css.Container>
          <Grid.Item xs={4} small={8} medium={12}>
            <SectionHeader copy={copy} heading={heading} tagline={tagline} />
          </Grid.Item>
          {testimonials.map(({ id, quote, quoter, quoterTitle, cite }) => {
            return (
              <Grid.Item key={id} xs={4} small={8} medium={4}>
                <css.Testimonial key={id} cite={cite}>
                  <css.Quote>
                    &quot;&quot;
                    <br />
                    {quote}
                  </css.Quote>
                  <css.Quoter>{`${quoter} - ${quoterTitle}`}</css.Quoter>
                </css.Testimonial>
              </Grid.Item>
            );
          })}
        </css.Container>
      </Section>
      <CustomerLogos {...logos} />
    </>
  );
};

export default TestimonialsSection;
