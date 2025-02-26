import { styled } from 'ui/styles';
import Grid from 'ui/components/Grid';

export const Container = styled(Grid.Container, {
  rowGap: '$large',

  '@small': {
    rowGap: '$xl',
  },

  '@medium': {
    rowGap: 'unset',
  },
});

export const Testimonial = styled('blockquote', {
  '@lessThanSmall': {
    margin: '$small 0',
  },
});

export const Quote = styled('p', {
  fontStyle: 'italic',
  lineHeight: '$medium',
  fontSize: '$medium',
});

export const Quoter = styled('p', {
  marginTop: '$large',
  fontWeight: '$bold',
  fontFamily: '$formula',
});
