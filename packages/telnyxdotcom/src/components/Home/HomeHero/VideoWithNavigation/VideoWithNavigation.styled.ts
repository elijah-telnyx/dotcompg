import { keyframes, styled } from 'ui/styles';

import CtaButton from 'ui/components/CtaButton';
import { innerSpace } from '../HomeHero.styled';
import { transitionProps } from './../constants';
import Label from 'ui/components/Typography/Label';
import type { ThemedCSS } from 'ui/styles/config/stitches.config';

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const Tooltip = styled('div', Label, {
  display: 'none',
  opacity: 0,
  width: 'fit-content',
  color: '$cream',
  position: 'relative',
  placeItems: 'center',
  '&:after': {
    content: '',
    display: 'block',
    bottom: '$xxs',
    borderWidth: 4,
    borderStyle: 'solid',
    position: 'absolute',
    borderColor: '$black transparent transparent transparent',
  },
});

const tooltipHoverStyles: ThemedCSS = {
  display: 'grid',
  animationName: String(fadeIn),
  animationDuration: '500ms',
  animationDelay: '10ms',
  animationTimingFunction: 'ease-out',
  animationFillMode: 'forwards',
};

export const TooltipContent = styled('span', {
  backgroundColor: '$black',
  padding: '$xxs $xs',
  borderRadius: 6,
  position: 'absolute',
  whiteSpace: 'nowrap',
  bottom: 'calc($xxs + $$progressBarHeight)',
});

export const Wrapper = styled('div', {
  gridTemplateRows: '1fr auto',
  display: 'none',
  gap: '$large',
  '@small': {
    gap: innerSpace,
  },
  variants: {
    isActive: {
      true: {
        display: 'grid',
      },
    },
  },
});

const ProgressFill = keyframes({
  from: {
    width: '0%',
  },
  to: {
    width: '100%',
  },
});

export const TimeStampContainerWrapper = styled('div', {
  display: 'grid',
  '@medium': {
    alignItems: 'center',
    gap: '$xl',
    maxWidth: '90%',
    marginInline: 'auto',
    width: '100%',
  },
});

export const TimeStampContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$medium',
  flexGrow: 1,
  flexWrap: 'wrap',
  position: 'relative',
});

export const OuterTimeStampContainer = styled('div', {
  display: 'flex',
  gap: '$medium',
});

export const TimeStamp = styled('button', {
  display: 'none',
  $$progressBarHeight: '8px',

  '@medium': {
    display: 'grid',
    placeItems: 'center',
    flexGrow: 1,
    position: 'relative',
    // hover padding
    '&:after': {
      content: '',
      display: 'block',
      position: 'absolute',
      left: -4,
      right: -4,
      top: -4,
      bottom: -4,
    },
    [`&:hover ${Tooltip}`]: tooltipHoverStyles,
  },
});

export const Divider = styled('div', {
  display: 'none',
  '@medium': {
    height: 36,
    border: '1px solid black',
    alignSelf: 'start',
    display: 'block',
  },
  variants: {
    shouldAdaptToCopy: {
      true: {
        position: 'relative',
        top: 6,
      },
    },
  },
});

export const ProgressBar = styled('span', {
  border: '2px solid $black',
  display: 'block',
  height: '$$progressBarHeight',
  position: 'relative',
  borderRadius: '100px',
  background: '$cream',
  overflow: 'hidden',
  width: '100%',
});

export const Progress = styled('span', {
  background: '$black',
  width: 0,
  bottom: 0,
  left: 0,
  position: 'absolute',
  top: 0,
  variants: {
    animate: {
      true: {
        animationTimingFunction: 'linear',
        animationDirection: 'normal',
        animationFillMode: 'both',
        animationIterationCount: 1,
        animationName: `${ProgressFill}`,
      },
    },
  },
});

export const MultipleVideoWrapper = styled('div', {
  position: 'relative',
  width: '100%',
  '@lessThanSmall': {
    margin: 'auto',
    aspectRatio: '4/3',
    maxWidth: 'calc(100vw - $space$xl)',
  },
});

export const TimestampCopy = styled('p', {
  display: 'none',
  typography: '$p.caption.mobile',
  '@medium': {
    flexBasis: '100%',
    position: 'absolute',
    top: 'calc(100% + 8px)',
    typography: '$p.caption',
  },
});

export const VideoWrapper = styled('div', {
  position: 'relative',
  width: '100%',
  '@lessThanSmall': {
    margin: 'auto',
    aspectRatio: '4/3',
    maxWidth: 'calc(100vw - $space$xl)',
  },
  '@small': {
    scale: 1.2,
    ...transitionProps,
    '[data-animate="true"] &': {
      height: '100%',
      scale: 1,
    },
  },
});

export const Video = styled('video', {
  maxWidth: '100%',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  margin: 'auto',
  maxHeight: '100%',
  boxShadow: '0px 0px 100px 0px #00000033',
  variants: {
    isActive: {
      false: {
        zIndex: -1,
        top: 0,
      },
    },
    mobile: {
      true: {
        display: 'block',
        '@small': {
          display: 'none',
        },
      },
    },
    desktop: {
      true: {
        display: 'none',
        '@small': {
          display: 'block',
        },
      },
    },
  },
});

export const CTA = styled(CtaButton, {
  ...transitionProps,
  transitionProperty: 'opacity',
  transitionDelay: '200ms',
  '@small': {
    '[data-animate="false"] &': {
      transitionDuration: 0,
      transitionDelay: 0,
      opacity: 0,
    },
  },
  '@lessThanMedium': {
    paddingInline: '$medium',
    width: 'fit-content',
    marginLeft: 'auto',
  },
});
