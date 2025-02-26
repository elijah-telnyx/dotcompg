import { styled } from '../../styles';
import Grid from '../Grid';

export const TestimonialHeader = styled(Grid.Item, {
  fontSize: '$xl',
  fontWeight: '$extrabold',
  textAlign: 'center',
  marginBottom: '$large',
});

export const Testimonial = styled('blockquote', {
  '@lessThanSmall': {
    margin: '$small 0',
    gridItemWidth: 4,
  },
  '@small': {
    gridItemWidth: 8,
  },
  '@medium': {
    gridItemWidth: 4,
  },
});

export const Quote = styled('p', {
  typography: '$quote.mobile',
  fontSize: '$large',
});

export const Quoter = styled('p', {
  marginTop: '$large',
  typography: '$quote.mobile',
  fontStyle: 'normal',
  fontSize: '$medium',
});

export const G2Link = styled('p', {
  marginTop: '$xl',
  fontWeight: '$extrabold',
  textAlign: 'center',
  '> a': {
    textDecoration: 'underline',
  },
});
