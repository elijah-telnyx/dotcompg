import { styled } from 'ui/styles';
import { generateHeroImageNextSectionTopSpace } from 'ui/styles/utils';
import Section from 'ui/components/Section';
import Heading from 'ui/components/Typography/Heading';
import Grid from 'ui/components/Grid';

const interactiveContainerHeights = {
  xs: 414,
  small: 414,
  medium: 414,
  large: 532,
  xl: 630,
};

const interactivePaddingSpaces = {
  xs: 48,
  small: 48,
  medium: 96,
  large: 96,
  xl: 96,
};

export const Container = styled(Grid.Container, {
  rowGap: '$medium',
  '@small': {
    rowGap: '$medium',
  },
  '@medium': {
    rowGap: '$xl',
  },
});

export const TaglineWrapper = styled('div', {
  marginBottom: '$medium',
  '@medium': {
    marginBottom: '$xl',
  },
});

export const SectionWrapper = styled(Section, {
  // pulls up the element that comes after this section

  '& + *': {
    ...generateHeroImageNextSectionTopSpace(interactiveContainerHeights, interactivePaddingSpaces, {
      borderRadius: '$medium $medium 0 0',
      '@medium': {
        borderRadius: '$large $large 0 0',
      },
    }),
  },
});

export const InteractiveItem = styled(Grid.FullWidthItem, {
  width: '100%',
});

export const TextWrapper = styled('div', {
  display: 'grid',
  justifyContent: 'left',
  alignItems: 'end',
  gap: '$xxl',
  gridArea: 'main',
});

export const CtaWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$xs',
  '@medium': {
    gap: '$small',
  },
});

export const CtaCopyWrapper = styled('div', {
  marginBlock: '$small',
  '@medium': {
    marginBlock: '$large',
  },
});

export const WrapperCopy = styled('div', {
  marginTop: '$xs',
  marginBottom: '$large',

  '@medium': {
    marginTop: '$small',
    marginBottom: '$xl',
  },
  '@large': {
    marginTop: '$large',
    marginBottom: '$xxl',
  },
});

export const HeadingOne = styled(Heading, {
  '@medium': {
    typography: '$h1.alt',
  },
  '@large': {
    typography: '$h1',
  },
});

export const InteractiveWrapper = styled('div', {
  position: 'relative',
});
