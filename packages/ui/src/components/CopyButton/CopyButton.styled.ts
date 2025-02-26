import { keyframes, styled } from '../../styles';
import type { ThemedCSS } from '../../styles/config/stitches.config';
import CopyIcon from '../Icons/Copy';

export const fadeOutTimer = 1.2;

const transition: ThemedCSS = {
  transitionDuration: '0.2s',
  transitionTimingFunction: 'ease-out',
  transitionProperty: 'all',
};

const display: Record<string, ThemedCSS> = {
  visible: {
    opacity: 1,
  },
  invisible: {
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'linear',
  },
};

const disappear = keyframes({
  '0%': {
    opacity: 1,
  },
  '90%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
});

export const ButtonText = styled('span', {
  position: 'absolute',
  '&[data-state="copied"]': {
    animation: `${disappear} ${fadeOutTimer - 0.1}s 0.1s`,
  },
  '&[data-visible="false"]': {
    display: 'none',
  },
  variants: {
    position: {
      left: {
        right: `calc(100% + 2px)`,
      },
      right: {
        left: `calc(100% + 2px)`,
      },
    },
  },
});

export const Icon = styled(CopyIcon, {});

export const Button = styled('button', {
  position: 'relative',
  color: '$$color',
  display: 'flex',
  alignItems: 'center',
  gap: '$xxxs',
  ...transition,
  [`${ButtonText}`]: {
    ...display.invisible,
  },
  '&:hover': {
    color: '$$hoverColor',
    [`${ButtonText}`]: {
      ...display.visible,
    },
  },
  variants: {
    isDark: {
      true: {
        $$color: '$colors$cream',
        $$hoverColor: '$colors$grayHoverDarkBackground',
      },
      false: {
        $$color: '$colors$black',
        $$hoverColor: '$colors$grayHoverLightBackground',
      },
    },
  },
});
