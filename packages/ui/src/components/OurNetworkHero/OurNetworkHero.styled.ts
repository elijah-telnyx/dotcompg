import { css, styled, theme } from '../../styles';
import Grid from '../Grid';
import H from '../Typography/Heading';
import P from '../Typography/Paragraph';
import Section from '../Section';
import { MediaImage } from '../Media';
import { height as headerHeight } from '../Header/constants';
import { VISIBILITY_ANIMATION_MS } from '../NetworkGlobe/utils';
import { MOBILE_DEVICE_MAX_HEIGHT_PX } from '../../utils/mobile';

export const ANIMATE_TRANFORM_EASE = 'transform .75s ease-in-out';
export const ANIMATE_OPACITY_EASE = 'opacity .25s ease-in-out';
export const ANIMATE_SCALE_EASE = 'scale .5s ease-out';
export const ANIMATE_HEIGHT_EASE = 'height .5s ease-in-out';
export const ANIMATE_WIDTH_EASE = 'width .5s ease-in-out';
export const ANIMATE_VISIBILITY_EASE = `visibility 0s ease-in-out ${VISIBILITY_ANIMATION_MS}ms`;

export const SectionWrapper = styled(Section, {
  textAlign: 'center',
  transform: 'translateZ(0px)',
  scrollSnapAlign: 'start',
  scrollSnapStop: 'always',
  height: '100vh',
  paddingTop: `calc($space$xxl + ${headerHeight.xs}px) !important`, // 2 * xxl

  '@medium': {
    paddingTop: `calc($space$xh + ${headerHeight.xs}px) !important`, // 2 * xh
  },

  '@large': {
    paddingTop: `calc($space$xh + ${headerHeight.large}px) !important`,
  },

  variants: {
    transparent: {
      true: {
        backgroundColor: 'transparent',
      },
    },
  },
});

export const ButtonsWrapper = styled('div', {
  display: 'flex',
  gap: '$medium',
  marginTop: '$large',
  justifyContent: 'center',

  '@small': {
    flexDirection: 'row',
    marginTop: '$small',
  },

  '@medium': {
    marginTop: '$large',
  },
});

export const HeadingItem = styled(Grid.Item, {
  gridColumn: 'span 4 / auto',

  '@small': {
    gridColumn: '3 / span 4',
  },

  '@medium': {
    gridColumn: '5 / span 4',
  },

  '@large': {
    gridColumn: '3 / span 8',
  },
});

export const CopyItem = styled(Grid.Item, {
  gridColumn: 'span 4 / auto',

  '@small': {
    gridColumn: '2 / span 6',
  },

  '@medium': {
    gridColumn: '3 / span 8',
  },
});

export const Heading = styled(H, {
  '@medium': {
    typography: '$h1.mobile',
  },

  '@large': {
    typography: '$h1',
  },
});

export const Paragraph = styled(P, {
  typography: '$p.lead.mobile',

  '@medium': {
    typography: '$p.lead.mobile',
  },

  '@large': {
    typography: '$p.lead',
  },
});

export const HeroContainer = styled(Grid.Container, {
  '@medium': {
    transition: ANIMATE_TRANFORM_EASE,
    transform: 'translateY(-100vh)',
  },

  [`[data-scroll-snap-position='0'] &`]: {
    '@medium': {
      transform: 'translateY(0)',
    },
  },
});

export const BackgroundGradient = styled('div', {
  pointerEvents: 'none',
  background: `linear-gradient(180deg, ${theme.colors.black.value} 0%, ${theme.colors.blue.value} 62.68%)`,
  height: '200vh',
  position: 'absolute',
  width: '100%',
  top: 0,
  left: 0,
  transition: ANIMATE_TRANFORM_EASE,
  transform: `translateY(${headerHeight.xs}px)`,

  '@large': {
    height: `calc(200vh - ${headerHeight.large}px)`,
    transform: `translateY(${headerHeight.large}px)`,
  },
});

export const BackgroundImage = styled(MediaImage, {
  aspectRatio: '1 / 1',
  objectFit: 'cover',
  width: '100%',
  height: '100%',
  overflowX: 'visible',
});

export const BackgroundImageWrapper = styled('div', {
  position: 'absolute',
  left: '50%',

  maxHeight: MOBILE_DEVICE_MAX_HEIGHT_PX,
  top: 388 + headerHeight.xs, // section padding $xxl + hero form height
  transform: 'translateX(-50%) translateY(0) scale(0.9)',
  transition:
    'opacity .125s ease-in-out, height .5s ease-in-out, width .5s ease-in-out, transform .75s ease-in-out',
  opacity: 0,
  height: '50%',
  width: '100%',

  '@medium': {
    maxHeight: 'none',
    transition: `${ANIMATE_OPACITY_EASE}, ${ANIMATE_SCALE_EASE}, ${ANIMATE_HEIGHT_EASE}, ${ANIMATE_WIDTH_EASE}, ${ANIMATE_TRANFORM_EASE}`,
    top: 556, // section padding $xh + hero form height
    width: '75%',
    height: '75%',
    // hero form height - half section padding $xh
    transform: 'translateX(-50%) translateY(0) scale(0.75)',
  },

  '@large': {
    top: 556 + headerHeight.large, // section padding $xxl + hero form height
    transform: `translateX(-50%) translateY(0) scale(0.75)`,
  },

  '@xl': {
    transform: `translateX(-50%) translateY(0) scale(0.9)`,
  },

  [`[data-scroll-snap-position='0'] &`]: {
    opacity: 1,
    width: '100%',
    height: '100%',
    transform: 'translateX(-50%)',
    // make sure background fades into network map smoothly
    transformOrigin: 'top center',
    transition: `${ANIMATE_OPACITY_EASE}, ${ANIMATE_HEIGHT_EASE}, ${ANIMATE_WIDTH_EASE}, ${ANIMATE_TRANFORM_EASE}`,
  },

  '&:after': {
    content: '',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',

    '@medium': {
      backgroundImage: `radial-gradient(56.31% 56.05% at 51.74% 29.1%, rgba(254, 253, 245, 0.31) 1.23%, rgba(254, 253, 245, 0) 53.79%)`,
    },
    '@large': {
      backgroundImage: `radial-gradient(20.31% 55.05% at 51.74% 40.1%, rgba(254, 253, 245, 0.31) 1.23%, rgba(254, 253, 245, 0.00) 53.79%)`,
    },
    '@xl': {
      backgroundImage: `radial-gradient(21.22% 64.5% at 51.74% 40.1%, rgba(254, 253, 245, 0.31) 1.23%, rgba(254, 253, 245, 0.00) 53.79%)`,
    },
  },
});

const networkMapSnapStyle = css({
  height: '100vh',
  width: '100%',
  scrollSnapAlign: 'start',
  scrollSnapStop: 'always',
});

// network map needs to be visible to give feedback to the user on loading state and also populate the page with content
// this is to have a fallback when js fails or is slow to load
export const NetworkMapLoading = styled('div', networkMapSnapStyle, {});

export const NetworkMap = styled('div', networkMapSnapStyle, {});
