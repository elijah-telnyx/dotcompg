import { styled } from '../../styles';
import Section from '../Section';
import {
  Container as NetworkMapSprite,
  Tooltip as NetworkMapTooltip,
} from './NetworkMapSprite/NetworkMapSprite.styled';
import { height as headerHeight } from '../Header/constants';

export const NetworkMapBackground = styled('div', {
  position: 'absolute',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  backgroundColor: '$blue',
});

export const NetworkMapBackgroundGradient = styled('div', {
  position: 'absolute',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',

  // need to be different cause the radial-gradient focus on same map parts even though height gets bigger and shifted around
  '@medium': {
    backgroundImage: `radial-gradient(49.68% 41.51% at 33.74% 54.94%, rgba(254, 253, 245, 0.31) 1.23%, rgba(254, 253, 245, 0.00) 53.79%)`,
  },

  '@large': {
    backgroundImage: `radial-gradient(61.92% 55.05% at 51.74% 40.1%, rgba(254, 253, 245, 0.31) 1.23%, rgba(254, 253, 245, 0.00) 53.79%)`,
  },

  '@xl': {
    backgroundImage: `radial-gradient(73.66% 64.5% at 51.74% 40.1%, rgba(254, 253, 245, 0.31) 1.23%, rgba(254, 253, 245, 0.00) 53.79%)`,
  },
});

export const FilterWrapper = styled('div', {
  borderRadius: '$large',
  backgroundColor: '$cream',
  boxShadow: '$blackBackgroundBlue',
  marginBlockStart: '$medium',
  marginInline: '$small',
  paddingBlock: '$large',
  paddingInline: '$medium',
  zIndex: 1,

  '@small': {
    marginBlockStart: '$medium',
    marginInline: '$large',
    paddingBlock: '$xl',
    paddingInline: '$large',
  },

  '@medium': {
    marginBlockStart: '$medium',
    marginInline: '$medium',
  },

  '@large': {
    marginBlockStart: '$xxl',
    marginInlineStart: '$large',
    marginInlineEnd: 0,
    maxWidth: 352,
  },

  '@xl': {
    marginBlockStart: '$xxl',
    marginInlineStart: '$large',
    minWidth: 534,
    maxWidth: 534,
    paddingBlock: '$xxl',
    paddingInline: '$large',
  },
});

export const Filter = styled('div', {
  display: 'flex',
  rowGap: '$large',
  columnGap: '$medium',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginBlockStart: '$large',
  width: '100%',

  '@small': {
    marginBlockStart: '$xl',
  },

  '@medium': {
    columnGap: '$xs',
    rowGap: '$medium',
  },

  '@large': {
    columnGap: '$medium',
    rowGap: '$xl',
  },
});

export const Heading2 = styled('h2', {
  color: '$black',
  typography: '$h2.mobile',

  '@xl': {
    typography: '$h2',
  },
});

export const FilterItem = styled('div', {
  width: 298,
  display: 'flex',
  flexDirection: 'column',
  gap: '$xs',

  '@xl': {
    width: '100%',
  },
});

export const CTAWrapper = styled('div', {
  marginBlockStart: '$large',

  '@small': {
    marginBlockStart: '$xl',
  },
});

export const SectionWrapper = styled(Section, {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  gap: '$xs',
  overflow: 'hidden',
  $$spriteTransform: 'none',
  $$spriteTransformOrigin: '50% 50% 0',
  $$tooltipTransfom: 'translateX(-50%)',

  height: `calc(100vh - ${headerHeight.xs}px)`, // this is due to header size and scroll snap

  '&:focus-within, &:hover': {
    top: 0,
  },

  [`& ${NetworkMapBackground}, & ${NetworkMapSprite}`]: {
    transition: 'all 1s ease-in-out',
  },

  [`& ${NetworkMapSprite}`]: {
    transform: '$$spriteTransform',
    transformOrigin: '$$spriteTransformOrigin',
  },
  [`& ${NetworkMapTooltip}`]: {
    transform: '$$tooltipTransform',
  },

  '@large': {
    alignItems: 'flex-start',
    flexDirection: 'row',
    height: `calc(100vh - ${headerHeight.large}px)`,
  },
  '@xl': {
    gap: '$medium',
  },

  variants: {
    transparent: {
      true: {
        backgroundColor: 'transparent',
      },
    },
    region: {
      all: {},
      na: {
        $$spriteTransform: 'scale(1.6)',
        $$spriteTransformOrigin: '-26% 17%',
        $$tooltipTransform: 'scale(0.6)',

        '@small': {
          $$spriteTransformOrigin: '-26% 22%',
        },

        '@large': {
          $$spriteTransform: 'scale(1.4)',
          $$spriteTransformOrigin: '-60% 15%',
        },
      },
      eu: {
        $$spriteTransform: 'scale(2.8)',
        $$spriteTransformOrigin: '51% 42%',
        $$tooltipTransform: 'scale(0.4)',

        '@large': {
          $$spriteTransform: 'scale(2.6)',
          $$spriteTransformOrigin: '52% 41%',
        },
        '@xl': {
          $$spriteTransformOrigin: '60% 42%',
        },
      },
      as: {
        $$spriteTransform: 'scale(2.2)',
        $$spriteTransformOrigin: '100% 62%',
        $$tooltipTransform: 'scale(0.4)',

        '@medium': {
          $$spriteTransformOrigin: '100% 58%',
        },

        '@large': {
          $$spriteTransformOrigin: '100% 62%',
        },
      },
      sa: {
        $$spriteTransform: 'scale(2.4)',
        $$spriteTransformOrigin: '18% 100%',
        $$tooltipTransform: 'scale(0.4)',

        '@large': {
          $$spriteTransformOrigin: '20% 100%',
        },
      },
      af: {
        $$spriteTransform: 'scale(2.6)',
        $$spriteTransformOrigin: '56% 82%',
        $$tooltipTransform: 'scale(0.4)',

        '@small': {
          $$spriteTransformOrigin: '54% 82%',
        },

        '@large': {
          $$spriteTransform: 'scale(2.2)',
          $$spriteTransformOrigin: '56% 82%',
        },
      },
      oc: {
        $$spriteTransform: 'scale(3)',
        $$spriteTransformOrigin: '100% 100%',
        $$tooltipTransform: 'scale(0.4)',
      },
    },
  },
});
