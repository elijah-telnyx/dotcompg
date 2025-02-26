import { keyframes, styled } from '../../styles';
import Caption from '../Typography/Caption';

const constants = {
  borderRadius: 24,
  edgeCardSpace: '$small',
  cardTransitionEffect: '0.2s ease-out',
  autoScrollDuration: '30s',
  layoutChangeBp: '@medium',
};

export const LinkImageRowBannerWrapper = styled('div', {
  maxWidth: '100vw',
  overflow: 'hidden',
  display: 'grid',
  gap: constants.edgeCardSpace,
  // Hack to show box-shadow with overflow hidden
  marginBottom: -60,
  paddingBottom: 60,
});

const autoScrollAnimation = keyframes({
  '0%': { transform: 'translateX(0%)' },
  '100%': { transform: `translateX(-50%)` },
});

export const RowImagesGrid = styled('div', {
  display: 'grid',
  width: 'max-content',
  gridTemplateColumns: 'repeat(auto-fill, 328px)',
  gridAutoFlow: 'column',
  gap: constants.edgeCardSpace,
  animationDuration: constants.autoScrollDuration,
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
  animationName: `${autoScrollAnimation}`,
  // pause hovered, next and previous row
  '&:hover, &:hover ~ &, &:has(~ &:hover)': {
    animationPlayState: 'paused',
  },

  '@xl': {
    gridTemplateColumns: 'repeat(auto-fill, 480px)',
  },

  variants: {
    scrollDirection: {
      left: {
        animationDirection: 'normal',
      },
      right: {
        animationDirection: 'reverse',
      },
    },
  },
});

export const LinkImageWrapper = styled('div', {
  borderRadius: constants.borderRadius,
  maxHeight: 328,
  maxWidth: 328,
  /**
   * If the parent (LinkImageRowBannerWrapper) has a LinkImageWrapper that is hovered,
   * then the opacity of the LinkImageWrapper should be 0.8 but the hovered one should be 1
   */
  [`${LinkImageRowBannerWrapper}:has(&:hover) &:not(&:hover)`]: {
    opacity: 0.8,
  },
  ':hover': {
    boxShadow: '0px 20px 30px 0px #0000004D',
  },
  '@lessThanSmall': {
    marginInline: 'auto',
    boxShadow: '0px 10px 15px 0px #00000026',
  },

  '@xl': {
    maxHeight: 480,
    maxWidth: 480,
  },
});

export const LinkImageContainer = styled('div', {
  overflow: 'hidden',
  display: 'grid',
  borderRadius: constants.borderRadius,
  position: 'relative',
  // accessibility link
  '& > a:before': {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  '& img, & picture, & video': {
    transition: `scale ${constants.cardTransitionEffect}`,
    borderRadius: constants.borderRadius,
  },
  '&:hover': {
    '& img, & picture, & video': {
      scale: 1.3,
    },
  },
});

export const ImageWrapper = styled('div', {
  position: 'relative',
  height: 328,
  width: 328,

  img: {
    objectPosition: 'center',
    objectFit: 'cover',
  },

  '@xl': {
    height: 328,
    width: 480,
  },
});

export const LinkImageLabel = styled(Caption, {
  position: 'absolute',
  left: constants.edgeCardSpace,
  bottom: constants.edgeCardSpace,
  display: 'flex',
  padding: '$xxs $small',
  borderRadius: '$xxxl',
  backgroundColor: '$black',
  color: '$cream',
  '@lessThanMedium': {
    gap: '$xs',
    width: 'calc(100% - 96px)',
    left: '48px',
    justifyContent: 'space-between',
  },
  '@lessThanSmall': {
    width: 'calc(100% - 24px)',
    left: '12px',
  },
  '@medium': {
    fontSize: '$small',
    maxWidth: 'fit-content',
    padding: '$xs $small',
    transition: `all ${constants.cardTransitionEffect}`,
    '& svg': {
      transform: 'translateY(1px)',
      transition: `width ${constants.cardTransitionEffect}`,
      width: 0,
    },
    '*:hover > &': {
      gap: '$xs',
      backgroundColor: '$cream',
      color: '$black',
      '& svg': {
        width: 20,
      },
    },
  },
});
