import { TooltipArrow } from '@radix-ui/react-tooltip';
import { keyframes, styled } from '../../styles';

export const Wrapper = styled('div', {});

export const Trigger = styled('button', {
  borderRadius: '$round',
  width: 14,
  height: 14,
  display: 'inline-grid',
  placeItems: 'center',
  variants: {
    isDark: { true: {}, false: {} },
    variant: {
      dark: {
        backgroundColor: '$black',
        color: '$white',
      },
      light: {
        backgroundColor: '$tan',
        color: '$black',
      },
    },
  },
  compoundVariants: [
    {
      variant: 'dark',
      isDark: true,
      css: {
        backgroundColor: '$grayEmbed',
      },
    },
  ],
});

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(8px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-8px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-8px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(8px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

export const Content = styled('div', {
  zIndex: '$tooltip',
  maxWidth: 300,

  padding: '$xxs $xs',
  borderRadius: '$small',
  fontSize: '$xxxs',
  lineHeight: '$xxxs',
  fontWeight: '$regular',

  userSelect: 'none',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',

  '&[data-state="delayed-open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
  variants: {
    variant: {
      dark: {
        backgroundColor: '$black',
        color: '$white',
      },
      light: {
        backgroundColor: '$tan',
        color: '$black',
      },
    },
  },
});

export const Arrow = styled(TooltipArrow, {
  fill: '$tan',
});
