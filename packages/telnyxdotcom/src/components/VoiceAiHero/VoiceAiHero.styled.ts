import { keyframes, styled } from 'ui/styles';
import HeadingComponent from 'ui/components/Typography/Heading';
import Grid from 'ui/components/Grid';
import { MediaDotLottie } from 'ui/components/Media/MediaDotLottie';

export const BaseContainer = styled('section', {
  position: 'relative',
  backgroundColor: '$black',
});

export const HeroViewportWrapper = styled('div', {
  position: 'absolute',
  top: 0,
  bottom: '-70px',
  width: '100vw',
  height: '100vh',
  pointerEvents: 'none',
  zIndex: 1 /* Behind the content */,

  variants: {
    isfixed: {
      true: {
        position: 'fixed',
        top: 'initial',
        bottom: 'initial',
      },
      false: {
        top: 'initial',

        '@large': {
          bottom: '-100px',
        },
      },
    },
  },
});

export const MediaDotLottieWrapper = styled(MediaDotLottie, {
  position: 'absolute',
  zIndex: 0,
  bottom: '50%',
  left: 0,
  right: 0,
  pointerEvents: 'none',

  '@medium': {
    bottom: '25%',
  },

  '@large': {
    bottom: 0,
  },
});

export const GradientDivOne = styled('div', {
  zIndex: 1,
  position: 'absolute',
  bottom: '85px',
  left: 0,
  right: 0,
  height: '100vh',
  width: '100vw',
  background: 'linear-gradient(to top, $black 0%, $black 10%, transparent 55%)',
  pointerEvents: 'none',

  '@large': {
    bottom: '85px',
  },
});

export const GradientDivTwo = styled('div', {
  zIndex: 1,
  position: 'fixed',
  top: '100vh',
  left: 0,
  height: '100vh',
  width: '100%',
  background: 'linear-gradient(to top, $black 0%, rgba(0, 0, 0, .8) 10%, rgba(0, 0, 0, .5) 70%, transparent 90%)',
  pointerEvents: 'none',
  transition: 'top 0.5s ease-in-out',

  variants: {
    move: {
      true: {
        top: 0,
      },
    },
    stick: {
      true: {
        position: 'absolute',
        bottom: 0,
        top: 'initial',
      },
    },
  },
  compoundVariants: [
    {
      move: true,
      stick: true,
      css: {
        position: 'absolute',
        bottom: 0,
        top: 'initial',
      },
    },
    {
      move: false,
      stick: true,
      css: {
        position: 'fixed',
        top: '100vh',
      },
    },
  ],
});

export const HeroContentWrapper = styled('div', {
  position: 'relative',
  bottom: 0,
  top: 0,
});

export const BuildSection = styled('div', {
  zIndex: 3,
  color: '$white',
  minHeight: '100vh',
});

export const FormSection = styled('div', {
  position: 'relative',
  top: 0,
  zIndex: 3,
  color: '$white',
  height: '100vh',
  width: '100vw',
});

export const HEADER_HIGHLIGHT_ICON_SIZE = 20;
const HERO_MAX_WIDTH = 356;
const FOOTER_PARAGRAPH = {
  SMALL: 304,
  MEDIUM: 544,
};

export const TagLine = styled(Grid.FullWidthItem, {
  marginBottom: '$small',

  '> strong': {
    display: 'inline',
  },
});

export const HeaderHighlightSup = styled('sup', {
  position: 'relative',
  display: 'inline-block',
  placeItems: 'center',
  width: HEADER_HIGHLIGHT_ICON_SIZE,
  height: HEADER_HIGHLIGHT_ICON_SIZE,
});

export const HeaderHighlightSupMediaWrapper = styled('span', {
  // scale up to use real size, because the image have some white space around for the animation
  width: HEADER_HIGHLIGHT_ICON_SIZE * 3,
  height: HEADER_HIGHLIGHT_ICON_SIZE * 3,
  position: 'absolute',
  right: -15,
  top: -20,
});

export const HeaderWrapper = styled(Grid.Container, {
  paddingTop: '10%',
  rowGap: 0,
  textAlign: 'center',
});

export const HeadingItem = styled(Grid.Item, {
  gridColumn: 'span 4',

  '@small': {
    gridColumn: 'span 8',
  },

  '@medium': {
    gridColumn: '2 / span 10',
  },

  '@xl': {
    gridColumn: 'span 12',
  },
});

export const gradientLoop = keyframes({
  '0%': { backgroundPosition: '200% 0' },
  '100%': { backgroundPosition: '0%, 0' },
});

export const Heading = styled(HeadingComponent, {
  typography: '$h1.alt.mobile',
  color: '$cream',

  '&:hover': {
    cursor: 'default',
  },

  '@small': {
    maxWidth: HERO_MAX_WIDTH,
    margin: '0 auto',
    typography: '$h1.alt',
  },

  '@medium': {
    typography: '$h1.alt',
    backgroundImage: 'linear-gradient(90deg, $colors$green, $colors$cream, $colors$green)',
    backgroundSize: '200% 100%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: `${gradientLoop} 5s linear infinite`,
  },
});

export const SubHeadingItem = styled(Grid.FullWidthItem, {
  maxWidth: HERO_MAX_WIDTH,
  margin: '0 auto',

  '> p': {
    lineHeight: '$xxs',
    fontSize: '$xs',
  },
});

export const CtaItem = styled(Grid.FullWidthItem, {
  paddingTop: '$xxl',

  '> a': {
    backgroundColor: '$grayDark',
  },
});

export const FooterParagraph = styled('p', {
  maxWidth: FOOTER_PARAGRAPH.SMALL,
  textAlign: 'center',
  margin: '120px auto 0',
  fontSize: '$medium',

  '@small': {
    maxWidth: FOOTER_PARAGRAPH.MEDIUM,
  },
});
