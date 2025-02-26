import { styled } from '../../styles';
import Grid from '../Grid';

import Section from '../Section';
import HeadingTypography from '../Typography/Heading';

export const SectionWrapper = styled(Section, {
  textAlign: 'center',
});

export const CtaContainer = styled(Grid.Container, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$large',

  '@small': {
    paddingBlockEnd: '$xxl', // from small and forward, CTA looks like a different section
  },

  '@medium': {
    gap: '$xxl',
  },
});

export const MediaContainer = styled('div', {
  aspectRatio: '16/9',
  minHeight: 200,
  width: '100%',
  paddingBlockStart: '$large', // on mobile CTA and Media behave like a single-section
  position: 'relative',

  '@small': {
    minHeight: 405,
    paddingBlockStart: '$xxl', // from small and forward, Media looks like a different section
  },

  '@medium': {
    minHeight: 576,
    paddingBlockStart: '$xxl',
  },

  '@large': {
    minHeight: 810,
  },

  '@xl': {
    minHeight: 1080,
  },
});

export const Heading = styled(HeadingTypography, {
  '@medium': {
    typography: '$h1.alt',
  },
  '@large': {
    typography: '$h1',
  },
});

export const CtaForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$large',

  '@small': {
    flexDirection: 'row',
    paddingBlockEnd: '$large',
  },

  '@medium': {
    paddingBlockEnd: '$xxl',
  },
});
