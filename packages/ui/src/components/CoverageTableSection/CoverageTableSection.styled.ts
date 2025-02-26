import { Container as TabsContainer } from './../Tabs/Tabs.styled';
import { styled, theme } from '../../styles';
import Grid from '../Grid';
import H from '../Typography/Heading';
import P from '../Typography/Paragraph';

export const tabsHeight = {
  xs: 58,
  medium: 60,
};

export const filterHeight = {
  xs: 138,
  medium: 96,
};

const topPaddingOffset = {
  xs: Number(theme.space.xs.value.replace('px', '')),
  medium: Number(theme.space.xxl.value.replace('px', '')),
};

export const STICKY = {
  FORM: {
    position: 'sticky',
    zIndex: 2,
    topWithHeader: tabsHeight.xs + topPaddingOffset.xs,
    '@medium': {
      topWithHeader: tabsHeight.medium + topPaddingOffset.medium,
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
    topWithHeader:
      filterHeight.medium + tabsHeight.medium + topPaddingOffset.medium,
    variants: {
      singleTab: {
        true: {
          topWithHeader: filterHeight.medium,
        },
      },
    },
  },
  TABS: {
    position: 'sticky',
    zIndex: 1,
    top: 0,
    background: '$cream',
    '> button': {
      // add top space when sticky
      marginTop: topPaddingOffset.xs,
      '@medium': {
        marginTop: topPaddingOffset.medium,
      },
      background: '$cream',
    },
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

export const TableWrapper = styled(Grid.FullWidthItem, {
  [`& ${TabsContainer}`]: {
    '@medium': {
      paddingInline: '$medium',
      maxWidth: theme.gridMaxWidth.xl,
      width: '100%',
    },
  },
});

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

export const FormFieldWrapper = styled('div', {
  flex: 1,
  '@lessThanSmall': {
    width: '100%',
  },
  '@medium': {
    // 274px is defined by component spec
    // so the 2 fields won't fill half of the available space
    flex: 'unset',
    width: 274,
  },
});

export const NotFoundMessage = styled('p', {
  typography: '$p.mobile',
  marginTop: '$xl',
});
