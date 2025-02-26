import { styled } from '../../styles';
import { generateHeroImageNextSectionTopSpace } from '../../styles/utils';
import Section from '../Section';
import Grid from '../Grid';
import GridExtended from '../GridExtended';
import { Name as AuthorName } from '../Author/Author.styled';

const imageContainerHeights = {
  xs: 215,
  small: 350,
  medium: 530,
  large: 580,
  xl: 630,
};

const imagePaddingSpaces = {
  xs: 48,
  small: 48,
  medium: 48,
  large: 48,
  xl: 48,
};

const imageContainerHeightsWithParallax = {
  xs: 215,
  small: 350,
  medium: 410,
  large: 410,
  xl: 410,
};

const imagePaddingSpacesWithParallax = {
  xs: 48,
  small: 48,
  medium: 48,
  large: 48,
  xl: 48,
};

export const SectionWrapper = styled(Section, {
  $$nextSectionTopRadius: '$space$medium',
  $$spacingBottom: '$space$large',

  '@medium': {
    $$nextSectionTopRadius: '$space$large',
    $$spacingBottom: '$space$xxl',
  },

  // this hits another component, so we cannot use local css vars here
  '& + *': {
    borderRadius: '$medium $medium 0 0',

    '@medium': {
      borderRadius: '$large $large 0 0',
    },
  },

  variants: {
    useParallax: {
      true: {},
      false: {},
    },
    hasMedia: {
      false: {
        paddingBottom: 'calc($$spacingBottom + $$nextSectionTopRadius)',
        marginBottom: '-$$nextSectionTopRadius',
      },
    },
  },
  compoundVariants: [
    {
      useParallax: true,
      hasMedia: true,
      css: {
        '& + *': {
          ...generateHeroImageNextSectionTopSpace(
            imageContainerHeightsWithParallax,
            imagePaddingSpacesWithParallax
          ),
        },
      },
    },
    {
      useParallax: false,
      hasMedia: true,
      css: {
        '& + *': {
          ...generateHeroImageNextSectionTopSpace(
            imageContainerHeights,
            imagePaddingSpaces
          ),
        },
      },
    },
  ],
});

export const Container = styled(Grid.Container, {
  rowGap: '$medium',

  '@medium': {
    rowGap: '$large',
  },
});

export const ContainerExtended = styled(GridExtended.Container, {
  rowGap: '$medium',

  '@medium': {
    rowGap: '$large',
  },
});

export const BreadcrumbItem = styled(Grid.Item, {
  marginBottom: '$xl',

  '@medium': {
    marginBottom: '$xxl',
  },
});

export const TagItem = styled(Grid.Item, {
  marginBottom: '$xs',
  display: 'flex !important',
  alignItems: 'center',
  gap: '$large',
});

export const AuthorWrapper = styled('div', {
  [`& ${AuthorName}`]: {
    textDecoration: 'underline',
  },
  variants: {
    isDark: {
      true: {
        color: '$cream',
      },
      false: {
        color: '$black',
      },
    },
  },
});

export const MediaItem = styled(Grid.Item, {
  marginBlockStart: '$medium',

  '@medium': {
    marginBlockStart: '$large',
  },
});

export const PreloadMediaParallax = styled('div', {
  position: 'absolute',
  overflow: 'hidden',
});

export const HeroMediaWrapper = styled('div', {
  aspectRatio: '16/9',
  width: '100%',
  position: 'relative',

  [`& .parallax-banner, & ${PreloadMediaParallax}`]: {
    width: '100%',
    borderRadius: '$medium',
    height: 'inherit', // required for parallax to work

    '@medium': {
      borderRadius: '$large',
    },
  },

  variants: {
    useParallax: {
      false: {
        [`& ${PreloadMediaParallax}`]: {
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        },
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
      },
      true: {
        '@small': {
          height: imageContainerHeightsWithParallax.small,
        },
        '@medium': {
          height: imageContainerHeightsWithParallax.medium,
        },
        '@large': {
          height: imageContainerHeightsWithParallax.large,
        },
        '@xl': {
          height: imageContainerHeightsWithParallax.xl,
        },
      },
    },
  },
});
