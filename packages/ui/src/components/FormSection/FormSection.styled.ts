import { styled } from '../../styles';
import { disabledFormOverlayStyles } from '../Card/Card';
import Grid from '../Grid';
import Card from '../Card';
import Section from '../Section';
import HeadingTypography from '../Typography/Heading';

export const TaglineWrapper = styled('div', {
  marginBottom: '$medium',
  '@medium': {
    marginBottom: '$xl',
  },
});

export const MarkdownWrapper = styled('div', {
  marginTop: '$xxl',
  textAlign: 'center',
  paddingInline: '$large',
  textWrap: 'balance',

  variants: {
    horizontal: {
      true: {
        textAlign: 'left',
        marginTop: 0,
        paddingInline: 0,
      },
    },
  },
});

export const SectionWrapper = styled(Section, {
  backgroundSize: 'cover',
  backgroundPosition: 'top center',
  width: '100%',

  variants: {
    fullHeight: {
      true: {
        minHeight: '100vh',
      },
    },

    card: {
      true: {
        '@lessThanSmall': {
          backgroundImage: 'unset !important',
        },
      },
    },

    horizontal: {
      true: {
        '@lessThanMedium': {
          backgroundImage: 'unset !important',
        },
      },
    },
  },
  compoundVariants: [
    {
      card: true,
      horizontal: undefined,
      css: {
        '@lessThanSmall': {
          backgroundColor: '$cream !important',
        },
      },
    },
  ],
});

export const TextItem = styled(Grid.Item, {
  gridColumn: 'span 4',
  '@small': {
    gridColumn: '2 / span 6',
  },
  '@medium': {
    gridColumn: 'span 6',
  },
});

export const ContentWrapper = styled(Grid.Item, {
  textAlign: 'center',
  maxWidth: 'var(--viewports-small)',
  marginInline: 'auto',

  '& ul': {
    listStylePosition: 'inside',
    '& li': {
      display: 'list-item',
    },
  },

  variants: {
    hasHeading: {
      true: {
        marginBlockEnd: '$large',
        '@medium': {
          marginBlockEnd: '$xxl',
        },
      },
    },
    card: {
      false: {
        '@lessThanMedium': {
          padding: '0 $large',
        },
      },
    },
    horizontal: {
      true: {
        textAlign: 'left',
        '@small': {
          marginInline: 0,
          marginBlockEnd: 0,
        },
      },
    },
  },
});

export const Wrapper = styled('div', {
  margin: '0 auto',
  textAlign: 'center',
  '@small': {
    width: 464,
    borderRadius: '$large',
  },
  '@medium': {
    width: 500,
  },
  '@large': {
    width: 504,
  },
  '@xl': {
    width: 544,
  },
  variants: {
    card: {
      false: {
        '@lessThanMedium': {
          padding: '0 $large',
        },
      },
    },
  },
});

export const HorizontalWrapper = styled('div', {
  margin: '0 auto',
  textAlign: 'center',
  '@small': {
    width: 464,
    borderRadius: '$large',
  },
  '@large': {
    width: 504,
  },
  '@xl': {
    width: 544,
  },
});

export const Heading = styled(HeadingTypography, {
  marginBlockEnd: '$xs',
  textWrap: 'balance',
});

export const FormCard = styled(Card, {
  '@lessThanSmall': {
    width: '100%',
  },
  borderRadius: '$large',
  paddingBlock: '$xxl',
  '& input': {
    scrollMargin: '$xxh',
  },
});

export const GridContainerWrapper = styled(Grid.Container, {
  maxWidth: '100%',
});

export const Container = styled(Grid.Container, {
  '@lessThanMedium': {
    rowGap: '$large',
  },
});

export const CtaWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$xs',
  marginBlockStart: '$large',
  '@medium': {
    gap: '$small',
    marginBlockStart: 0,
  },
});

export const CtaCopyWrapper = styled('div', {
  marginBlock: '$small',
  textWrap: 'balance',
  '@medium': {
    marginBlock: '$large',
  },
});

export const LogInWrapper = styled('div', {
  marginTop: '$xl',
});

export const FormInnerWrapper = styled('div', {
  position: 'relative',
  variants: {
    disabled: {
      true: { '&::before': disabledFormOverlayStyles },
    },
  },
});
