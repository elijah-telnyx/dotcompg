import { styled, theme } from 'ui/styles';
import Grid from 'ui/components/Grid';
import H from 'ui/components/Typography/Heading';
import P from 'ui/components/Typography/Paragraph';
import Section from 'ui/components/Section';

export const SectionWrapper = styled(Section);

export const Container = styled(Grid.Container, {
  '@lessThanSmall': {
    maxWidth: '100%',
  },
});

const topPaddingOffset = {
  xs: Number(theme.space.xs.value.replace('px', '')),
  medium: Number(theme.space.xxl.value.replace('px', '')),
};

export const STICKY = {
  FORM: {
    position: 'sticky',
    zIndex: 2,
    topWithHeader: topPaddingOffset.xs,
    '@medium': {
      topWithHeader: topPaddingOffset.medium,
    },
    variants: {
      singleTab: {
        true: {
          topWithHeader: 0,
        },
      },
    },
  },
  TABLE_HEADER: {
    position: 'sticky',
    zIndex: 1,
    topWithHeader: 0,
  },
} as const;

export const Heading = styled(H, {
  marginBottom: '$xs',
  '@medium': {
    marginBottom: '$large',
  },
});
export const Paragraph = styled(P, {
  marginBottom: '$small',
  '@medium': {
    marginBottom: '$large',
  },
});

export const GridContainer = styled(Grid.Container, {});

export const TextWrapper = styled(Grid.Item, {});

export const LLMComparisonTable = styled(Grid.FullWidthItem, {});

export const MaxWidthXs = styled('div', {
  '@lessThanSmall': {
    maxWidth: theme.gridMaxWidth.base,
    marginInline: 'auto',
  },
});

export const Form = styled('form', STICKY.FORM, {
  display: 'flex',
  gap: '$small',
  paddingBlock: '$large',
  alignItems: 'center',
  backgroundColor: '$cream',
  '@lessThanSmall': {
    maxWidth: theme.gridMaxWidth.base,
    marginInline: 'auto',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  '@small': {
    gap: '$medium',
  },
  '@medium': {
    gap: '$small',
  },
  variants: STICKY.FORM.variants,
});

export const NotFoundMessage = styled('p', {
  typography: '$p.mobile',
  marginTop: '$xl',
});
