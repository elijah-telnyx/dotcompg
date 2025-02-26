import { keyframes, styled } from 'ui/styles';
import SectionComponent from 'ui/components/Section';
import HeadingComponent from 'ui/components/Typography/Heading';
import Grid from 'ui/components/Grid';

export const HEADER_HIGHLIGHT_ICON_SIZE = 48;

export const HeaderHighlight = styled('span', {
  position: 'relative',
});

export const HeaderHighlightSup = styled('sup', {
  position: 'relative',
  display: 'grid',
  placeItems: 'center',
  marginInline: 'auto',
  width: HEADER_HIGHLIGHT_ICON_SIZE,
  height: HEADER_HIGHLIGHT_ICON_SIZE,
});

export const HeaderHighlightSupMediaWrapper = styled('span', {
  // scale up to use real size, because the image have some white space around for the animation
  width: HEADER_HIGHLIGHT_ICON_SIZE * 3,
  height: HEADER_HIGHLIGHT_ICON_SIZE * 3,
  position: 'absolute',
  right: -HEADER_HIGHLIGHT_ICON_SIZE / 2,
});

export const gradientLoop = keyframes({
  '0%': { backgroundPosition: '200% 0' },
  '100%': { backgroundPosition: '0%, 0' },
});

// this block is to make sure the gradient applies only to the marked text
export const HeaderHighlightMark = styled('mark', {
  display: 'inline-block',
  color: '$cream',
  backgroundImage: 'linear-gradient(90deg, $colors$green, $colors$cream, $colors$green)',
  backgroundSize: '200% 100%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${gradientLoop} 5s linear infinite`,
  '&:hover': {
    cursor: 'default',
  },
});

export const Section = styled(SectionComponent, {});

// per figma design
export const Heading = styled(HeadingComponent, {
  typography: '$h1.alt.mobile',

  '@small': {
    typography: '$h1.alt',
  },

  '@medium': {
    typography: '$h1.alt',
  },

  '@large': {
    typography: '$h2.alt',
  },

  '@xl': {
    typography: '$h1',
  },
});

export const HeaderWrapper = styled(Grid.Container, {
  rowGap: '$large',
  textAlign: 'center',

  '@small': {
    rowGap: '$xl',
  },

  '@xl': {
    rowGap: '$xxl',
  },
});

export const CtasWrapper = styled('div', {
  display: 'flex',
  gap: '$medium',
  justifyContent: 'center',
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

export const ParagraphItem = styled(Grid.Item, {
  gridColumn: 'span 4',

  '@small': {
    gridColumn: 'span 8',
  },

  '@medium': {
    gridColumn: '2 / span 10',
  },
});
