import { styled } from 'ui/styles';
import H from 'ui/components/Typography/Heading';

export const Tagline = styled(H, {
  marginBottom: '$xl',
  '@medium': {
    marginBottom: '$xxl',
  },
});

export const Heading = styled(H, {
  marginBottom: '$xs',
  '@medium': {
    marginBottom: '$large',
  },
});
