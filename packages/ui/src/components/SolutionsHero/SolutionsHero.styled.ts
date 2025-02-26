import { styled } from '../../styles';
import { generateHeroImageNextSectionTopSpace } from '../../styles/utils';
import Section from '../Section';

const imageContainerHeights = {
  xs: 126,
  small: 259,
  medium: 392,
  large: 430,
  xl: 465,
};

const imagePaddingSpaces = {
  xs: 48,
  small: 48,
  medium: 96,
  large: 96,
  xl: 96,
};

export const SectionWrapper = styled(Section, {
  variants: {
    hasMedia: {
      true: {
        // pulls up the element that comes after this section
        '& + *': {
          ...generateHeroImageNextSectionTopSpace(
            imageContainerHeights,
            imagePaddingSpaces,
            {
              borderRadius: '$medium $medium 0 0',
              '@medium': {
                borderRadius: '$large $large 0 0',
              },
            }
          ),
        },
      },
    },
  },
});

export const HeadingWrapper = styled('div', {
  display: 'flex',
  alignItems: 'baseline',
  gap: '$medium',

  '@medium': {
    gap: '$large',
  },
});

export const IconWrapper = styled('div', {
  '--wrapperSize': '$sizes$small',
  '--iconSize': '28px',
  backgroundColor: '$green',
  borderRadius: '$xl',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'var(--wrapperSize)',
  width: 'var(--wrapperSize)',
  flexShrink: 0,

  // make sure any child wrappers respect size
  '& *': {
    height: 'var(--iconSize)',
    width: 'var(--iconSize)',
  },

  '@medium': {
    '--wrapperSize': '$sizes$large',
    '--iconSize': '56px',
  },

  variants: {
    backgroundColor: {
      black: {
        '& svg': {
          backgroundColor: '$tan',
        },
      },
      blue: {
        '& svg': {
          backgroundColor: '$tan',
        },
      },
      citron: {},
      cream: {},
      green: {
        '& svg': {
          backgroundColor: '$tan',
        },
      },
      tan: {},
    },
  },
});

export const MediaWrapper = styled('div', {
  position: 'relative',
  height: imageContainerHeights.xs,

  '@small': {
    height: imageContainerHeights.small,
  },

  '@medium': {
    height: imageContainerHeights.medium,
  },

  '@large': {
    height: imageContainerHeights.large,
  },

  '@xl': {
    height: imageContainerHeights.xl,
  },

  '& img': {
    borderRadius: '$medium',

    '@medium': {
      borderRadius: '$large',
    },
  },
});

export const CtaButtonsWrapper = styled('div', {
  display: 'flex',
  gap: '$xs',
  flexDirection: 'column',
  marginBottom: '$medium',

  '@small': {
    flexDirection: 'row',
    gap: '$medium',
  },

  '@medium': {
    gap: '$xl',
  },
});
