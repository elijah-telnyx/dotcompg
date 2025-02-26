import { styled } from 'ui/styles';
import Heading from 'ui/components/Typography/Heading';

export const ContentWrapper = styled('div', {
  marginBottom: '$xl',
  '@medium': {
    marginBottom: '$xxl',
  },
  '@large': {
    marginBottom: 0,
  },
});

// Tagline doesn't support extending the styles
export const ContentTaglineWrapper = styled('div', {
  marginBottom: '$large',
  '@medium': {
    marginBottom: '$xxl',
  },
});

export const ContentHeading = styled(Heading, {
  marginBottom: '$small',
  '@medium': {
    marginBottom: '$large',
  },
});

export const ContentButtonsWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$large',
  marginTop: '$xl',

  '@large': {
    marginTop: '$xxl',
  },
});
