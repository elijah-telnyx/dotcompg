import { styled } from '../../styles';

export const perspective = 1200;

export const navigationButtonSize = 20;

const addIconWithMargin = (width: TemplateStringsArray) => {
  const navigationButtonMargin = 32;

  return `calc(${width.join('').replace(',', '')} + ${
    (navigationButtonSize + navigationButtonMargin) * 2
  }px)`;
};

export const Wrapper = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  marginInline: 'auto',
  width: '100%',
  maxWidth: addIconWithMargin`$gridMaxWidth$base`,
  position: 'relative',
  '@small': {
    maxWidth: addIconWithMargin`$gridMaxWidth$small`,
  },
  '@medium': {
    maxWidth: addIconWithMargin`$gridMaxWidth$medium`,
  },
  '@large': {
    maxWidth: addIconWithMargin`$gridMaxWidth$large`,
  },
  '@xl': {
    maxWidth: addIconWithMargin`$gridMaxWidth$xl`,
  },
  opacity: 0,
  transition: 'opacity linear 120ms',
  variants: { ready: { true: { opacity: 1 } } },
});

export const CarouselContainer = styled('div', {
  marginInline: 'auto',
  position: 'relative',
  overflow: 'hidden',
  zIndex: 1,
  perspective,
  width: '100%',
  // increase spacing for aside items
  maxWidth: 'calc($gridMaxWidth$base + 40px)',
  '@lessThanSmall': {
    paddingBottom: '$xl',
  },
  '@small': {
    maxWidth: '$gridMaxWidth$small',
  },
  '@medium': {
    maxWidth: '$gridMaxWidth$medium',
  },
  '@large': {
    maxWidth: '$gridMaxWidth$large',
  },
  '@xl': {
    maxWidth: '$gridMaxWidth$xl',
  },
});

export const CarouselWrapper = styled('div', {
  transformStyle: 'preserve-3d',
  position: 'relative',
  width: '100%',
  height: '100%',
  zIndex: 1,
  display: 'flex',
  transitionProperty: 'transform',
  boxSizing: 'content-box',
});

export const CardInfo = styled('div', {
  display: 'flex',
  opacity: 0,
  flexDirection: 'column',
  gap: '$medium',
  transitionDuration: '70ms',
  transitionProperty: 'opacity',
  '@medium': { gap: '$large' },
  variants: { active: { true: { opacity: 1 } } },
});

export const CarouselItem = styled('div', {
  zIndex: 0,
  transitionProperty: 'opacity',
  transitionDuration: '100ms',
  transformStyle: 'preserve-3d',
  flexShrink: 0,
  position: 'relative',
  userSelect: 'none',
  width: '100%',
  maxWidth: 304,
  '@small': {
    maxWidth: 488,
  },
  '@medium': {
    maxWidth: 640,
  },
  '@large': {
    maxWidth: 736,
  },
  variants: {
    active: {
      true: {
        zIndex: 1,
      },
    },
    distant: {
      true: {
        zIndex: -1,
        opacity: 0,
      },
    },
  },
});

export const NavigationButton = styled('button', {
  '> svg': {
    width: navigationButtonSize,
    height: navigationButtonSize,
    transition: 'color 0.2s ease-in-out',
  },
  padding: '$xs',

  '@lessThanSmall': {
    flexGrow: 1,
    display: 'grid',
    width: '40%',
  },

  '@small': {
    position: 'absolute',
  },

  variants: {
    next: {
      true: {
        '@lessThanSmall': {
          marginLeft: '$xs',
          justifyContent: 'start',
        },

        '@small': {
          right: 0,
        },
      },
    },
    previous: {
      true: {
        '@lessThanSmall': {
          marginRight: '$xs',
          justifyContent: 'end',
        },

        '@small': {
          left: 0,
        },
      },
    },
    isDark: {
      true: {
        color: '$cream',
        '& :hover': {
          color: '$grayHoverDarkBackground',
        },
      },
      false: {
        color: '$black',
      },
    },
  },
});
