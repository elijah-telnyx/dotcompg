import { styled } from '../../styles';

export const CtaListWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$huge',
  marginBlockStart: '$xs',

  '@medium': {
    marginBlockStart: '$small',
  },
  '@large': {
    marginBlockStart: '$large',
  },
});

export const CarouselWrapper = styled('div', {
  overflowX: 'hidden',
  marginInline: 'auto',
  marginTop: '$large',
  maxWidth: '100vw',

  '@small': {
    maxWidth: 'calc(100vw - $space$medium)',
  },
  '@medium': {
    marginTop: '$xxl',
    maxWidth: 'calc(100vw - $space$large)',
  },
  '@xl': {
    maxWidth: 'calc(100vw - $space$xl)',
  },
});

export const HeadingP = styled('p', {
  marginTop: '$xxl',
  fontSize: '$large',
  fontWeight: '$extrabold',
  fontFamily: '$formula',
  '@medium': {
    fontSize: '$xxl',
  },
});
