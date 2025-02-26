import { styled } from '../../styles';
import CTA from '../Typography/CTA';

export const CardSizes = {
  xs: { width: 304, height: 393 },
  small: { width: 304, height: 393 },
  medium: { width: 416, height: 496 },
  large: { width: 416, height: 496 },
  xl: { width: 432, height: 496 },
};

const IconCardSizes = {
  xs: { width: 304, height: 383 },
  small: { width: 304, height: 383 },
  medium: { width: 416, height: 413 },
  large: { width: 416, height: 413 },
  xl: { width: 432, height: 413 },
};

export const ImageWrapper = styled('div', {
  marginBottom: '$xl',
  height: 153,
  width: 272,
  borderRadius: '$medium',
  overflow: 'hidden',
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  '@medium': {
    marginBottom: '$xxl',
    width: 368,
    height: 207,
  },
  '@xl': {
    width: 384,
    height: 216,
  },
});

export const IconWrapper = styled('div', {
  marginBottom: '$xl',
  backgroundColor: '$green',
  borderRadius: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 64,
  height: 64,
  lineHeight: 0,
  '@medium': { width: 72, height: 72 },
});

export const TextWrapper = styled('div');

export const CarouselCardCTA = styled(CTA, {
  textTransform: 'uppercase',
  display: 'inline-flex',
  columnGap: '$xxs',
});

export const CardWrapper = styled('a', {
  borderRadius: '$medium',
  boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
  display: 'block',
  padding: '$medium',
  paddingBottom: '$xxl',
  textAlign: 'center',
  ...CardSizes.xs,

  '@medium': {
    ...CardSizes.medium,
    padding: '$large',
    paddingBottom: '$huge',
  },
  '@xl': {
    ...CardSizes.xl,
    paddingBottom: '$huge',
  },
  variants: {
    variant: {
      image: {},
      icon: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '$xl',
        ...IconCardSizes.xs,
        '@medium': {
          paddingBottom: '$xxl',
          ...IconCardSizes.medium,
        },
        '@xl': {
          ...IconCardSizes.xl,
        },
        [`${CarouselCardCTA}`]: {
          marginTop: 'auto',
        },
      },
    },
    backgroundColor: {
      cream: {
        backgroundColor: '$cream',
        color: '$black',
      },
      black: {
        backgroundColor: '$black',
        color: '$cream',
      },
    },
  },
});

export const carouselItemCSS = {
  [`${TextWrapper}, ${ImageWrapper}`]: {
    transition: 'ease-out scale 0.25s',
  },
  '&:hover': {
    scale: 1.08,
    [`&  ${TextWrapper}`]: {
      // keep same size
      scale: 0.92,
    },
    [`&  ${ImageWrapper}`]: {
      // zoom image
      scale: 1.06,
    },
  },
};

export const CTAIconWrapper = styled('span', {
  width: '$lineHeights$xs',
  height: '$lineHeights$xs',
  lineHeight: 0,
  '* svg': {
    width: '100%',
    height: '100%',
  },
});
