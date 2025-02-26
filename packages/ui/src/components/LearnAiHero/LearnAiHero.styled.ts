import { styled } from '../../styles';
import { generateHeroImageNextSectionTopSpace } from '../../styles/utils';
import Section from '../Section';
import Grid from '../Grid';
import GridExtended from '../GridExtended';
import MediaComponent from '../Media';
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
    hasMedia: {
      true: {
        // pulls up the element that comes after this section
        '& + *': {
          ...generateHeroImageNextSectionTopSpace(
            imageContainerHeights,
            imagePaddingSpaces
          ),
        },
      },
      false: {
        paddingBottom: 'calc($$spacingBottom + $$nextSectionTopRadius)',
        marginBottom: '-$$nextSectionTopRadius',
      },
    },
  },
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
});

export const AuthorWrapper = styled('div', {
  [`& ${AuthorName}`]: {
    textDecoration: 'underline',
  },
});

export const MediaItem = styled(Grid.Item, {
  marginBlockStart: '$medium',

  '@medium': {
    marginBlockStart: '$large',
  },
});

export const HeroMediaWrapper = styled('div', {
  alignItems: 'center',
  aspectRatio: '16/9',
  display: 'flex',
  width: '100%',
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
});

export const Media = styled(MediaComponent, {
  borderRadius: '$medium',
  '@medium': {
    borderRadius: '$large',
  },

  variants: {
    extendedLayout: {
      true: {
        width: 'initial',
        maxHeight: imageContainerHeights.xl,
      },
    },
  },
});
