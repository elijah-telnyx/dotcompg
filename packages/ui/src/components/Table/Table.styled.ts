import { css, styled, theme } from '../../styles';
import Grid from '../Grid';
import TypographyCTA from '../Typography/CTA';
import { Heading3 } from '../Typography/Heading/Heading.styled';
import Paragraph from '../Typography/Paragraph';
import TypographyParagraph from '../Typography/Paragraph';

const tableStyles = css({
  paddingBlock: '$medium',
  marginInline: 0,
  backgroundColor: '$$bgColor',
  boxShadow: '0 0 0 100vmax $$bgColor',
  clipPath: 'inset(0 -100vmax)',
  width: '100%',

  '@medium': {
    boxShadow: 'unset',
    clipPath: 'none',
    paddingBlock: '$large',
  },
});

const cellStyles = css({
  borderSpacing: 0,
  boxSizing: 'border-box',
  textAlign: 'initial',
  paddingBlock: '$medium',

  '@medium': {
    padding: '$large',
  },
});

export const Table = styled(Grid.Container, {
  scrollMarginTop: '$xl',
  '@medium': {
    scrollMarginTop: '$huge',
  },
  variants: {
    blog: {
      true: {
        marginBlockStart: '$medium',
      },
    },
    tableTheme: {
      green: {
        $$bgColor: theme.colors.green.value,
        color: '$black',
      },
      blue: {
        $$bgColor: theme.colors.blue.value,
        color: '$cream',
      },
      tan: {
        $$bgColor: theme.colors.tan.value,
        color: '$black',
      },
      citron: {
        $$bgColor: theme.colors.citron.value,
        color: '$black',
      },
    },
  },
  defaultVariants: {
    tableTheme: 'green',
  },
});

export const Caption = styled(Grid.FullWidthItem, Heading3, {
  color: 'initial',
  boxSizing: 'border-box',
  marginBlockEnd: '$medium',
  textAlign: 'initial',
});

export const TR = styled(Grid.Container);

export const TH = styled(Grid.Item, cellStyles, TypographyCTA, {
  variants: {
    category: {
      true: {
        typography: '$h2.category.mobile',
        '@medium': {
          typography: '$h2.category',
        },
      },
    },
    typographyType: {
      Paragraph: {
        typography: '$p.mobile',
        paddingBlock: '$xs',

        '@medium': {
          paddingBlock: '$medium',
          typography: '$p',
        },
      },
      Heading: {
        typography: '$h2.category.mobile',
        whiteSpace: 'nowrap',
        '@medium': {
          typography: '$h2.category',
        },
      },
    },
  },
});

export const TD = styled(Grid.Item, cellStyles, TypographyParagraph, {
  variants: {
    typographyType: {
      Paragraph: {
        paddingBlock: '$xs',

        '@medium': {
          paddingBlock: '$medium',
        },
      },
      Heading: {
        typography: '$h2.category.mobile',
        whiteSpace: 'nowrap',
        '@medium': {
          typography: '$h2.category',
        },
      },
    },
  },
});

export const THead = styled(Grid.FullWidthItem, tableStyles, {
  paddingBlock: '$medium 0',

  '@medium': {
    borderTopLeftRadius: '$medium',
    borderTopRightRadius: '$medium',
    boxShadow: 'unset',
    clipPath: 'none',
    paddingBlock: '$large 0',

    '& ~ tbody': {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      paddingBlockStart: 0,
    },
  },
});

export const TBody = styled(Grid.FullWidthItem, tableStyles, {
  paddingBlock: '0 $medium',

  '@medium': {
    borderRadius: '$medium',
    boxShadow: 'unset',
    clipPath: 'none',
    paddingBlock: '$large',
  },
});

export const TableFooter = styled('div', {
  marginTop: '$xs',
  '@medium': {
    marginTop: '$medium',
  },
});

export const TableFooterItem = styled(Paragraph, {
  '& + &': {
    marginTop: '$medium',
  },
});

export const CellContent = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$xxs',
  '& > button': {
    width: '100%',
  },
  '@medium': {
    '& > button': {
      width: 'unset',
    },
  },
});

export const Copy = styled(Grid.FullWidthItem, TypographyParagraph, {
  color: '$black',
  marginBlockEnd: '$large',
});
