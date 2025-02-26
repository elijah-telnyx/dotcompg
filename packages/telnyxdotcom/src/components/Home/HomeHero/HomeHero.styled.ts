import { css, styled } from 'ui/styles';

import { Heading2Category } from 'ui/components/Typography/Heading/Heading.styled';
import { transitionProps } from './constants';
import { height as headerHeight } from 'ui/components/Header/constants';

const transition = 'all 0.3s ease-in-out 0s';

export const ContentWrapper = styled('div', {
  display: 'grid',
  justifyItems: 'center',
  placeItems: 'center',
  gridTemplateRows: 'auto 1fr',
  '@small': {
    marginInline: 'auto',
    width: '100%',
  },
});

export const innerSpace = '$xl';

export const MediaContainer = styled('div', {
  zIndex: 1,
  width: '100%',
  height: '100%',
  marginInline: 'auto',
  display: 'grid',
  paddingBlock: '$xxl',
  maxWidth: '$gridMaxWidth$base',

  '@xs': {
    maxWidth: '$gridMaxWidth$xs',
  },
  '@small': {
    paddingBlock: '$medium',
    maxWidth: '$gridMaxWidth$small',
    gridTemplateRows: 'auto 1fr',
    gap: innerSpace,
    height: '60vh',
    maxHeight: '60vh',
  },

  '@medium': {
    height: '85vh',
    maxHeight: '85vh',
    maxWidth: '$gridMaxWidth$medium',
  },
  '@large': {
    maxWidth: '$gridMaxWidth$large',
  },
  '@xl': {
    maxWidth: '$gridMaxWidth$xl',
  },
});

export const HeaderWrapper = styled('div', {
  display: 'grid',

  gap: '$large',
  '@lessThanSmall': {
    paddingBlock: '$space$xxl',
  },
  maxWidth: '$gridMaxWidth$base',
  '@xs': {
    maxWidth: '$gridMaxWidth$xs',
  },
  '@small': {
    paddingTop: '$space$xh',
    maxWidth: '$gridMaxWidth$small',
    gap: '$xl',
  },
  '@medium': {
    maxWidth: `$gridMaxWidth$xl`, // needed per design based off suggestion of the text being too wide DOTCOM-3570
    textAlign: 'center',
    paddingTop: 96,
  },
  '@large': {
    paddingTop: 152,
  },
  '@xl': {
    gap: '$xxl',
  },
});

export const CtasWrapper = styled('div', {
  display: 'flex',
  gap: '$medium',
  '@medium': {
    justifyContent: 'center',
  },
});

export const VideosWrapper = styled('div', {
  height: '100%',
  width: 'auto',
});

export const Background = styled('div', {
  position: 'relative',
  ...transitionProps,
  '@small': {
    borderRadius: '$large',
  },
  '@lessThanSmall': {
    width: '100%',
    height: '100%',
  },
});

export const BackgroundVideo = styled('video', {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: '100%',
  height: '100%',
  aspectRatio: '16/9',
  objectFit: 'cover',
  '@small': {
    zIndex: -1,
    borderRadius: '0 0 $large $large',
    ...transitionProps,
    '[data-animate="true"] &': {
      borderRadius: '$large',
    },
  },
});

export const BackgroundColorMask = styled('div', BackgroundVideo, {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  position: 'absolute',
  width: '100%',
  height: '100%',
  opacity: 0.65,
});

export const TabContainer = styled('div', {
  display: 'none',

  '@small': {
    ['--tab-width']: '160px',
    ['--offset-left']: '0px',
    display: 'flex',
    justifySelf: 'center',
    backgroundColor: '$cream',
    width: 'max-content',
    marginInline: 'block',
    borderRadius: '100px',
    position: 'relative',
    left: 0,
    '&:after': {
      content: '',
      ...transitionProps,
      position: 'absolute',
      backgroundColor: '$black',
      width: 'var(--tab-width)',
      left: 'var(--offset-left)',
      height: '100%',
      borderRadius: '100px',
    },
  },
  '@medium': {
    ['--tab-width']: '200px',
  },
});

export const Tab = styled('button', {
  zIndex: 1,
  typography: '$h2.category.mobile',
  textAlign: 'center',
  transition,
  '@medium': {
    typography: '$h2.category',
    minWidth: 166,
  },
  padding: '$medium',
  paddingBottom: 12,
  border: '2px solid $transparent',
  '&:first-child': {
    borderRadius: '100px 0 0 100px',
  },
  '&:last-child': {
    borderRadius: '0 100px 100px 0',
  },
  ['&[data-active="true"]']: {
    color: '$cream',
  },
});

const scrollTransitionController = css({
  '@small': {
    [`&, & ${HeaderWrapper}, & ${TabContainer}, & ${Background}, & ${BackgroundVideo}, & ${ContentWrapper}`]: {
      ...transitionProps,
    },
    marginInline: 'auto',
    [`& ${ContentWrapper}`]: {
      scale: 1.1,
    },
    [`& ${TabContainer}`]: {
      opacity: 0,
      pointerEvents: 'none',
      transitionDuration: '400ms',
    },
    [`& ${Background}`]: {
      paddingBlock: innerSpace,

      width: '100vw',
    },
    [`& ${BackgroundVideo}`]: {
      scale: 2.5,
      transitionDelay: '200ms',
      transitionDuration: '400ms',
    },
    '&[data-animate="true"]': {
      [`& ${ContentWrapper}`]: {
        scale: 1,
      },
      [`& ${BackgroundVideo}`]: {
        scale: 1,
      },
      [`& ${HeaderWrapper}`]: {
        marginBottom: 48,
      },
      [`& ${TabContainer}`]: {
        opacity: 1,
        pointerEvents: 'visible',
        transitionDelay: '200ms',
        transitionDuration: '800ms',
      },
      [`& ${Background}`]: {
        width: '89vw',
      },
    },
  },
});

export const Section = styled('section', scrollTransitionController, {
  minHeight: `75vh`,
  display: 'grid',
  maxWidth: '100vw',
  overflow: 'hidden',

  variants: {
    scrollSnap: {
      true: {
        // required for scroll snap. See references
        scrollSnapAlign: 'start',
        scrollSnapStop: 'normal',
        transform: 'translateZ(0px)',
        paddingTop: headerHeight.xs,

        '@medium': {
          paddingTop: headerHeight.xs,
        },

        '@large': {
          paddingTop: headerHeight.large,
        },
      },
    },
  },
});

export const MediaLabel = styled(Heading2Category, {
  marginBottom: '$large',
  zIndex: 1,
  '@small': {
    display: 'none',
  },
});
