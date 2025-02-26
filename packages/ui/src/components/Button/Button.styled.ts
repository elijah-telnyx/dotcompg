import { Background, Kind, Variant } from './constants';
import { styled, keyframes, theme } from '../../styles';

const borderSize = '2px';
/**
 * this is required because the typography save some spacing at the bottom for
 * specific characters like "g".
 */
const typographyOffset = '4px';

const reduceBorderSize = (padding: string): string => {
  const [paddingValue] = padding.split('px');
  const [borderValue] = borderSize.split('px');
  return Number(paddingValue) - Number(borderValue) + 'px';
};

const paddingSpacingDesktop = reduceBorderSize(theme.space.medium.value);
const paddingSpacingMobile = reduceBorderSize(theme.space.small.value);

const moveLeftToRight = keyframes({
  '0%': {
    transform: 'translateX(0%)',
  },
  to: {
    transform: 'translateX(calc(100% + (var(--spacing) *2) ))',
  },
});
const moveShadowLeftToRight = keyframes({
  '0%': { transform: 'translate(var(--spacing) * -1)' },
  to: { transform: 'translate(calc(100% + (var(--spacing) * 2)))' },
});
export const ShadowText = styled('span', {
  display: 'none',
  position: 'absolute',
  right: 'calc(100% + var(--spacing))',
  top: 'var(--spacing)',
});

export const ButtonContent = styled('span', {
  display: 'block',
});

export const ButtonIcon = styled('span', {
  display: 'inline-block',
  marginLeft: '$xxs',
  width: '$lineHeights$small',
  height: '$lineHeights$small',

  '@medium': {
    width: '$lineHeights$medium',
    height: '$lineHeights$medium',
  },
  verticalAlign: 'middle',
});

export const Button = styled('button', {
  display: 'inline-block',
  cursor: 'pointer',
  position: 'relative',
  borderRadius: '$xxxl',
  border: `${borderSize} solid transparent`,
  overflow: 'hidden',
  padding: 'var(--spacing)',
  paddingBottom: `calc(var(--spacing) - ${typographyOffset})`,
  whiteSpace: 'nowrap',
  // typography
  fontFamily: '$formula',
  fontSize: '$small',
  fontWeight: '$extrabold',
  lineHeight: '$medium',
  textAlign: 'center',
  textTransform: 'uppercase',
  '--spacing': paddingSpacingMobile,
  // viewport - desktop
  '@medium': {
    '--spacing': paddingSpacingDesktop,
    fontSize: '$medium',
    lineHeight: '$xs',
  },
  // on hover
  '&:hover': {
    [`& ${ButtonContent}`]: {
      display: 'block',
      animation: `4s linear ${moveLeftToRight} infinite`,
    },
    [`& ${ShadowText}`]: {
      display: 'block',
      animation: `4s linear ${moveShadowLeftToRight} infinite`,
    },
  },
  '&[disabled]': {
    opacity: 0.5,
    userSelect: 'none',
    pointerEvents: 'none',
  },
  // variants
  defaultVariants: {
    kind: Kind.primary,
    background: Background.light,
    variant: undefined,
  },
  variants: {
    kind: {
      [Kind.text]: {
        '--spacing': '$space$xs',
        borderRadius: 0,
        border: 'none',
        backgroundColor: 'transparent',
        color: 'inherit',
        height: 'inherit',
        display: 'flex',
        alignItems: 'center',
        [`& ${ShadowText}`]: {
          top: 'unset',
        },
      },
      [Kind.primary]: {},
      [Kind.secondary]: {},
      [Kind.list]: {
        fontSize: '$small',
        lineHeight: '$small',
        padding: `${reduceBorderSize(theme.space.xs.value)} ${
          theme.space.small.value
        }`,
        paddingBottom: `calc(${reduceBorderSize(
          theme.space.xs.value
        )} - ${typographyOffset})`,
        textTransform: 'none',

        '@medium': {
          fontSize: '$medium',
          lineHeight: '$medium',
        },

        '&:hover': {
          [`& ${ButtonContent}`]: {
            animation: 'none',
          },
          [`& ${ShadowText}`]: {
            animation: 'none',
          },
        },
      },
      [Kind.social]: {
        borderColor: '$grayHoverDarkBackground',
        borderWidth: '1px',
        backgroundColor: '$cream',
        color: '$grayHoverLightBackground',
        fontFamily: '$inter',
        fontWeight: '$semibold',
        fontSize: '$small',
        lineHeight: '$xs',
        textTransform: 'unset',

        '&:hover': {
          backgroundColor: 'white',

          [`& ${ButtonContent}`]: {
            animation: 'none',
          },
          [`& ${ShadowText}`]: {
            animation: 'none',
          },
        },

        '@medium': {
          fontSize: '$small',
          lineHeight: '$xs',
        },
      },
      [Kind.microsoft]: {
        // https://learn.microsoft.com/en-us/azure/active-directory/develop/howto-add-branding-in-azure-ad-apps
        // match google
        borderColor: '#DADCE0',
        borderWidth: '1px',
        borderRadius: '$xs',
        backgroundColor: 'white',
        color: '#3C4043',
        fontFamily: '"Google Sans",arial,sans-serif',
        fontWeight: '$medium',
        fontSize: '$xs',
        lineHeight: '$xs',
        textTransform: 'unset',
        '--spacing': '$space$small',
        paddingInline: 'var(--spacing)',
        paddingBlock: '9px',

        '&:hover': {
          backgroundColor: '#2F2F2F',
          borderColor: '#2F2F2F',
          color: 'white',

          [`& ${ButtonContent}`]: {
            animation: 'none',
          },
          [`& ${ShadowText}`]: {
            animation: 'none',
          },
        },

        '@medium': {
          '--spacing': '$space$small',
          fontSize: '$xs',
          lineHeight: '$xs',
        },
      },
    },
    background: {
      [Background.light]: {
        '&:active': {
          borderColor: '$grayHoverLightBackground',
          backgroundColor: '$grayHoverLightBackground',
        },
      },
      [Background.dark]: {
        '&:active': {
          borderColor: '$grayHoverDarkBackground',
          backgroundColor: '$grayHoverDarkBackground',
        },
      },
    },
    variant: {
      [Variant.header]: {
        '--spacing': reduceBorderSize(theme.space.xs.value),
        padding: 'var(--spacing)',
        paddingBottom: `calc(var(--spacing) - ${typographyOffset})`,
        color: '$black',
        '@small': {
          fontSize: '$xs',
          lineHeight: '$xs',
        },
      },
    },
  },
  compoundVariants: [
    {
      kind: Kind.primary,
      background: Background.light,
      css: {
        borderColor: '$black',
        backgroundColor: '$black',
        color: '$cream',
      },
    },
    {
      kind: Kind.primary,
      background: Background.dark,
      css: {
        borderColor: '$cream',
        backgroundColor: '$cream',
      },
    },
    {
      kind: Kind.secondary,
      background: Background.light,
      css: {
        color: '$black',
        borderColor: 'currentColor',
      },
    },
    {
      kind: Kind.secondary,
      background: Background.dark,
      css: {
        color: '$cream',
        borderColor: 'currentColor',
      },
    },
    {
      kind: Kind.list,
      background: Background.light,
      css: {
        borderColor: '$cream',
        backgroundColor: '$cream',
        color: '$black',

        '&:active': {
          borderColor: '$black',
          backgroundColor: '$black',
          color: '$cream',
        },
      },
    },
    {
      kind: Kind.list,
      background: Background.dark,
      css: {
        borderColor: '$black',
        backgroundColor: '$black',
        color: '$cream',

        '&:active': {
          borderColor: '$cream',
          backgroundColor: '$cream',
          color: '$black',
        },
      },
    },
    {
      kind: Kind.social,
      background: Background.light,
      css: {
        '&:active': {
          borderColor: '$green',
          backgroundColor: '$cream',
          color: '$grayHoverLightBackground',
        },
      },
    },
  ],
});

export const SpinnerWrapper = styled('div');
