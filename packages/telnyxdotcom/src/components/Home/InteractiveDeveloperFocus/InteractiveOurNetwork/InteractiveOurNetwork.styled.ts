import { styled } from 'ui/styles';
import {
  Container as NetworkMapSprite,
  Tooltip as NetworkMapTooltip,
} from 'ui/components/NetworkMapSection/NetworkMapSprite/NetworkMapSprite.styled';
import Paragraph from 'ui/components/Typography/Paragraph';

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

  '@xl': {
    backgroundImage: `radial-gradient(73.66% 64.5% at 51.74% 40.1%, rgba(254, 253, 245, 0.31) 1.23%, rgba(254, 253, 245, 0.00) 53.79%)`,
  },
});

export const Copy = styled(Paragraph, {
  display: 'none',

  '@small': {
    display: 'block',
    marginBlockEnd: '$medium',
  },

  '@medium': {
    marginBlockEnd: '$xl',
  },
});

export const TextBlock = styled('div', {
  display: 'grid',
  gap: '$large',
  width: '100%',
  textAlign: 'left',

  '@medium': {
    gap: '$xl',
  },
});

export const HeadingWrapper = styled('div', {
  zIndex: 1,
});

export const FilterWrapper = styled('div', {
  borderRadius: '$medium',
  backgroundColor: '$cream',
  boxShadow: '$blackBackgroundBlue',
  paddingBlock: '$large',
  paddingInline: '$medium',
  zIndex: 1,
  width: '100%',

  '@large': {
    paddingBlock: '$xl',
    paddingInline: '$large',
    margin: 0,
  },
});

export const Filter = styled('div', {
  display: 'flex',
  rowGap: '$large',
  columnGap: '$medium',
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: '100%',

  '@medium': {
    flexWrap: 'nowrap',
    columnGap: '$xs',
    rowGap: '$medium',
  },

  '@large': {
    columnGap: '$medium',
    rowGap: '$xl',
  },

  '@xl': {
    flexWrap: 'wrap',
  },
});

export const FilterItem = styled('div', {
  width: 298,
  display: 'flex',
  flexDirection: 'column',
  gap: '$xs',
});

export const CTAWrapper = styled('div', {
  marginBlockStart: '$large',

  '@small': {
    marginBlockStart: '$xl',
  },
});

export const Wrapper = styled('div', {
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
  backgroundColor: 'transparent',
  height: 'calc(100vh - ($space$xxl * 2))',

  '&:focus-within, &:hover': {
    top: 0,
  },

  [`& ${NetworkMapBackground}, & ${NetworkMapSprite}`]: {
    transition: 'all 1s ease-in-out',
  },

  [`& ${NetworkMapSprite}`]: {
    transform: '$$spriteTransform',
    transformOrigin: '$$spriteTransformOrigin',
    height: '50%',
  },
  [`& ${NetworkMapTooltip}`]: {
    transform: '$$tooltipTransform',
  },

  '@medium': {
    height: 'calc(100vh - ($space$xh * 2))',

    [`& ${NetworkMapSprite}`]: {
      height: '60%',
    },
  },

  '@xl': {
    gap: '$medium',

    [`& ${NetworkMapSprite}`]: {
      height: '100%',
    },
  },

  variants: {
    region: {
      all: {},
      na: {
        $$spriteTransform: 'scale(1.6)',
        $$spriteTransformOrigin: '-20% 20%',
        $$tooltipTransform: 'scale(0.4)',
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',

        [`& ${NetworkMapSprite}`]: {
          height: '100%',
        },

        '@medium': {
          $$spriteTransformOrigin: '-20% 20%',
          $$tooltipTransform: 'scale(0.6)',

          [`& ${NetworkMapSprite}`]: {
            height: '100%',
          },
        },

        '@xl': {
          $$spriteTransformOrigin: '-40% 15%',

          [`& ${NetworkMapSprite}`]: {
            height: '100%',
          },
        },
      },
      eu: {
        $$spriteTransform: 'scale(1.6)',
        $$spriteTransformOrigin: '50% -10%',
        $$tooltipTransform: 'scale(0.4)',
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',

        [`& ${NetworkMapSprite}`]: {
          height: '100%',
        },

        '@medium': {
          $$spriteTransformOrigin: '50% -10%',
          $$tooltipTransform: 'scale(0.6)',

          [`& ${NetworkMapSprite}`]: {
            height: '100%',
          },
        },

        '@xl': {
          $$spriteTransform: 'scale(2.6)',
          $$spriteTransformOrigin: '45% 42%',
          $$tooltipTransform: 'scale(0.4)',

          [`& ${NetworkMapSprite}`]: {
            height: '100%',
          },
        },
      },
      as: {
        $$spriteTransform: 'scale(1.6)',
        $$spriteTransformOrigin: '100% 35%',
        $$tooltipTransform: 'scale(0.4)',
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',

        [`& ${NetworkMapSprite}`]: {
          height: '100%',
        },

        '@medium': {
          $$spriteTransformOrigin: '100% 35%',
          $$tooltipTransform: 'scale(0.6)',

          [`& ${NetworkMapSprite}`]: {
            height: '100%',
          },
        },

        '@xl': {
          $$spriteTransform: 'scale(2.2)',
          $$spriteTransformOrigin: '65% 62%',
          $$tooltipTransform: 'scale(0.4)',

          [`& ${NetworkMapSprite}`]: {
            height: '100%',
          },
        },
      },
      sa: {
        $$spriteTransform: 'scale(1.4)',
        $$spriteTransformOrigin: '0% 100%',
        $$tooltipTransform: 'scale(0.4)',
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',

        [`& ${NetworkMapSprite}`]: {
          height: '100%',
        },

        '@medium': {
          $$spriteTransformOrigin: '0% 100%',
          $$tooltipTransform: 'scale(0.6)',

          [`& ${NetworkMapSprite}`]: {
            height: '100%',
          },
        },

        '@xl': {
          $$spriteTransform: 'scale(2.4)',
          $$spriteTransformOrigin: '20% 100%',
          $$tooltipTransform: 'scale(0.4)',

          [`& ${NetworkMapSprite}`]: {
            height: '100%',
          },
        },
      },
      af: {
        $$spriteTransform: 'scale(1.4)',
        $$spriteTransformOrigin: '60% 60%',
        $$tooltipTransform: 'scale(0.4)',
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',

        [`& ${NetworkMapSprite}`]: {
          height: '100%',
        },

        '@medium': {
          $$spriteTransformOrigin: '60% 60%',
          $$tooltipTransform: 'scale(0.6)',

          [`& ${NetworkMapSprite}`]: {
            height: '100%',
          },
        },

        '@xl': {
          $$spriteTransform: 'scale(2.6)',
          $$spriteTransformOrigin: '45% 80%',
          $$tooltipTransform: 'scale(0.4)',

          [`& ${NetworkMapSprite}`]: {
            height: '100%',
          },
        },
      },
      oc: {
        $$spriteTransform: 'scale(2)',
        $$spriteTransformOrigin: '110% 90%',
        $$tooltipTransform: 'scale(0.4)',
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',

        [`& ${NetworkMapSprite}`]: {
          height: '100%',
        },

        '@medium': {
          $$spriteTransformOrigin: '110% 90%',
          $$tooltipTransform: 'scale(0.6)',

          [`& ${NetworkMapSprite}`]: {
            height: '100%',
          },
        },

        '@xl': {
          $$spriteTransform: 'scale(3)',
          $$spriteTransformOrigin: '85% 100%',
          $$tooltipTransform: 'scale(0.4)',

          [`& ${NetworkMapSprite}`]: {
            height: '100%',
          },
        },
      },
    },
  },
});
