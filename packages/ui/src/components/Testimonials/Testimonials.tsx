import Section from '../Section';
import Grid from '../Grid';
import * as css from './Testimonials.styled';

export interface TestimonialsProps {
  testimonialHeading: string;
  testimonials: {
    id: string;
    quote: string;
    quoter?: string;
    quoterTitle?: string;
    cite: string;
  }[];
}

const Testimonials = ({
  testimonialHeading,
  testimonials,
}: TestimonialsProps) => {
  return (
    <Section spacingTop='continuous' spacingBottom='continuous'>
      <Grid.Container>
        <css.TestimonialHeader xs={4} small={8} medium={12} htmlAs='p'>
          {testimonialHeading}
        </css.TestimonialHeader>
      </Grid.Container>
      <Grid.Container>
        {testimonials.map(({ id, quote, quoter, quoterTitle, cite }) => (
          <css.Testimonial key={id} cite={cite}>
            <css.Quote>&quot;{quote}&quot;</css.Quote>
            <css.Quoter>
              <strong>{quoter}</strong> - {quoterTitle}
            </css.Quoter>
          </css.Testimonial>
        ))}
      </Grid.Container>
      <css.G2Link>
        Read more real user reviews on <a href='https://www.g2.com/'>G2.com</a>
      </css.G2Link>
    </Section>
  );
};

export default Testimonials;
