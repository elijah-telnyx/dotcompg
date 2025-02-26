import { styled } from 'ui/styles';
import {
  Container as NetworkMapSprite,
  Tooltip as NetworkMapTooltip,
} from 'ui/components/NetworkMapSection/NetworkMapSprite/NetworkMapSprite.styled';
import { height as headerHeight } from 'ui/components/Header/constants';
import ButtonComponent from 'ui/components/Button';

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
  borderRadius: '$medium',
  backgroundColor: '$cream',
  boxShadow: '$blackBackgroundBlue',
  paddingBlock: '$large',
  paddingInline: '$medium',
  zIndex: 1,
  width: '100%',

  '@small': {
    borderRadius: '$semilarge',
    paddingBlock: '$xl',
    paddingInline: '$large',
  },

  '@medium': {
    marginInline: '$large',
  },

  '@large': {
    marginInline: 0,
  },

  '@xl': {
    paddingBlock: '$xxl',
    paddingInline: '$large',
    width: 448,
    height: 554,
  },

  variants: {
    inline: {
      true: {
        // the overflow effect
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: 'calc(($space$xh * 2) * -1)',
        width: '$gridMaxWidth$xs',

        '@small': {
          marginTop: 'calc(($space$xh) * -1)',
          width: '$gridMaxWidth$small',
        },

        '@medium': {
          marginInline: 'auto',
          width: 'calc($gridMaxWidth$medium - $space$xxl)',
        },

        '@large': {
          marginInline: 0,
          width: '$gridMaxWidth$large',
        },

        '@xl': {
          width: '$gridMaxWidth$xl',
        },
      },
    },
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

export const FilterItem = styled('div', {
  width: 298,
  display: 'flex',
  flexDirection: 'column',
  gap: '$xs',

  '@xl': {
    width: '100%',
  },

  variants: {
    inline: {
      true: {
        width: 252,

        '@small': {
          width: 256,
        },

        '@medium': {
          width: 252,
        },

        '@large': {
          width: 268,
        },
      },
    },
  },
});

export const ButtonWrapper = styled('div', {
  marginBlockStart: '$large',

  '@small': {
    marginBlockStart: '$xl',
  },
});

export const Button = styled(ButtonComponent, {
  '&:disabled, &[aria-disabled="true"]': {
    backgroundColor: '$grayHoverLightBackground',
    borderColor: '$grayHoverLightBackground',
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
});
export const Wrapper = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  height: `calc(100vh - ${headerHeight.xs}px)`,
  backgroundColor: 'transparent',

  '&:focus-within, &:hover': {
    top: 0,
  },

  [`& ${NetworkMapBackground}, & ${NetworkMapSprite}`]: {
    transition: 'all 1s ease-in-out',
  },

  [`& ${NetworkMapSprite}`]: {
    transform: 'none',
    transformOrigin: '50% 50% 0',
  },
  [`& ${NetworkMapTooltip}`]: {
    transform: 'translateX(-50%)',
  },

  '@small': {
    borderRadius: '$semilarge',
  },

  '@large': {
    alignItems: 'center',
    height: `calc(100vh - ${headerHeight.large}px)`,
  },
  '@xl': {
    flexDirection: 'row',
    justifyContent: 'space-evenly',

    [`& ${NetworkMapSprite}`]: {
      width: '60%',
      height: '75%',
    },
  },

  variants: {
    inline: {
      true: {
        marginTop: 'calc($space$xh * 2)',
        paddingTop: 'calc(($space$xh * 2) + $space$large)',
        height: '100%',

        '@large': {
          paddingTop: 'calc($space$xh + $space$large)',
          height: '100%',

          [`& ${NetworkMapTooltip}`]: {
            transform: 'none',
            left: 'initial',
            top: 'initial',
          },
        },
      },
    },
    transparent: {
      true: {
        backgroundColor: 'transparent',
      },
    },
    region: {
      all: {},
      na: {
        [`& ${NetworkMapSprite}`]: {
          transform: 'scale(1.6)',
          transformOrigin: '-26% 17%',
        },
        [`& ${NetworkMapTooltip}`]: {
          transform: 'scale(0.6)',
        },

        '@small': {
          [`& ${NetworkMapSprite}`]: {
            transformOrigin: '-26% 22%',
          },
        },

        '@large': {
          [`& ${NetworkMapSprite}`]: {
            transform: 'scale(1.4)',
            transformOrigin: '-60% 15%',
          },
        },
      },
      eu: {
        [`& ${NetworkMapSprite}`]: {
          transform: 'scale(2.8)',
          transformOrigin: '51% 42%',
        },
        [`& ${NetworkMapTooltip}`]: {
          transform: 'scale(0.4)',
        },

        '@large': {
          [`& ${NetworkMapSprite}`]: {
            transform: 'scale(2.6)',
            transformOrigin: '52% 41%',
          },
        },
        '@xl': {
          [`& ${NetworkMapSprite}`]: {
            transformOrigin: '60% 42%',
          },
        },
      },
      as: {
        [`& ${NetworkMapSprite}`]: {
          transform: 'scale(2.2)',
          transformOrigin: '100% 62%',
        },
        [`& ${NetworkMapTooltip}`]: {
          transform: 'scale(0.4)',
        },

        '@medium': {
          [`& ${NetworkMapSprite}`]: {
            transformOrigin: '100% 58%',
          },
        },

        '@large': {
          [`& ${NetworkMapSprite}`]: {
            transformOrigin: '100% 62%',
          },
        },
      },
      sa: {
        [`& ${NetworkMapSprite}`]: {
          transform: 'scale(2.4)',
          transformOrigin: '18% 100%',
        },
        [`& ${NetworkMapTooltip}`]: {
          transform: 'scale(0.4)',
        },

        '@large': {
          [`& ${NetworkMapSprite}`]: {
            transformOrigin: '20% 100%',
          },
        },
      },
      af: {
        [`& ${NetworkMapSprite}`]: {
          transform: 'scale(2.6)',
          transformOrigin: '56% 82%',
        },
        [`& ${NetworkMapTooltip}`]: {
          transform: 'scale(0.4)',
        },

        '@small': {
          [`& ${NetworkMapSprite}`]: {
            transformOrigin: '54% 82%',
          },
        },

        '@large': {
          [`& ${NetworkMapSprite}`]: {
            transform: 'scale(2.2)',
            transformOrigin: '56% 82%',
          },
        },
      },
      oc: {
        [`& ${NetworkMapSprite}`]: {
          transform: 'scale(3)',
          transformOrigin: '100% 100%',
        },
        [`& ${NetworkMapTooltip}`]: {
          transform: 'scale(0.4)',
        },
      },
    },
  },

  compoundVariants: [
    {
      inline: true,
      region: 'all',
      css: {
        [`& ${NetworkMapTooltip}`]: {
          transform: 'translateX(-50%) !important',
          left: '50% !important',
          top: '50% !important',
        },

        '@large': {
          [`& ${NetworkMapTooltip}`]: {
            transform: 'none',
            left: 'initial',
            top: 'initial',
          },
        },
      },
    },
  ],

  defaultVariants: {
    region: 'all',
  },
});
