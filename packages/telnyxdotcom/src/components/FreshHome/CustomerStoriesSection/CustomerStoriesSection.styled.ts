import { styled } from 'ui/styles';

export const CustomerStoriesWrapper = styled('div', {
  textAlign: 'center',
  maxWidth: '$gridMaxWidth$xs',
  margin: '0 auto',
  p: {
    maxWidth: '300px',
    margin: '0 auto',
  },
  '@small': {
    maxWidth: '$gridMaxWidth$small',
    p: {
      maxWidth: 'inherit',
    },
  },
  '@medium': {
    maxWidth: '$gridMaxWidth$medium',

    p: {
      maxWidth: '$gridMaxWidth$small',
    },
  },
  '@large': {
    p: {
      maxWidth: '$gridMaxWidth$medium',
    },
  },
  '@xl': {
    p: {
      maxWidth: '$gridMaxWidth$small',
    },
  },
});

export const CtaWrapper = styled('div', {
  marginTop: '$large',
  textAlign: 'center',
});
