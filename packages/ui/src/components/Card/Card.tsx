import { styled } from '../../styles';

export interface CardProps {
  stepper?: boolean;
  form?: boolean;
  sectionOnMobile?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

const borderRadius = '$large';

export const disabledFormOverlayStyles = {
  position: 'absolute',
  content: '',
  backgroundColor: 'rgb(254, 253, 245, 0.5)',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  height: '100%',
  width: '100%',
  zIndex: 1,
};

export const Card = styled('div', {
  backgroundColor: '$cream',
  variants: {
    stepper: {
      true: {
        padding: '$xl $large',
        '@lessThanMedium': {
          paddingInline: 0,
          boxShadow: '0 0 0 100vmax $colors$cream',
          clipPath: 'inset(0 -100vmax)',
        },
        '@medium': {
          padding: '$xxl',
          borderRadius,
        },
      },
    },
    form: {
      true: {
        position: 'relative',
        paddingInline: '$large',
        '@small': {
          borderRadius,
          paddingInline: 80,
          paddingBlock: '$xxl',
        },
        '@medium': {
          paddingInline: 80,
          filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
        },
        '@large': {
          paddingInline: 80,
        },
        '@xl': {
          paddingInline: '$xh',
        },
      },
    },
    sectionOnMobile: {
      true: {},
    },
    disabled: {
      true: {
        '&::before': {
          borderRadius,
          ...disabledFormOverlayStyles,
        },
      },
    },
  },
  compoundVariants: [
    {
      form: true,
      sectionOnMobile: true,
      css: {
        paddingBlock: '$xxl',
        '@lessThanSmall': {
          paddingInline: 0,
          boxShadow: '0 0 0 100vmax $colors$cream',
          clipPath: 'inset(0 -100vmax)',
        },
      },
    },
  ],
});

export default Card;
