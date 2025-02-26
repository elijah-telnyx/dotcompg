import { styled, theme } from '../../styles';

import LinkComponent from '../Link';
import RawMarkdown from './RawMarkdown';

type ViewportKey = keyof typeof theme.viewports;

export const getTableRowColumns = (
  itemsLength: number,
  viewport: ViewportKey
): { [key: number]: number } => {
  const columns = Math.floor(
    Number(theme.gridNumColums[viewport].value) / itemsLength
  );

  const remainingColumns =
    Number(theme.gridNumColums[viewport].value) % itemsLength;

  if (viewport === 'xs') {
    return new Array(itemsLength).fill(null).reduce(
      (columnsIndexes, _, index) => ({
        ...columnsIndexes,
        [index]: index === 0 ? columns + remainingColumns : columns,
      }),
      {}
    );
  }

  return new Array(itemsLength).fill(null).reduce(
    (columnsIndexes, _, index) => ({
      ...columnsIndexes,
      [index]:
        remainingColumns && index === itemsLength - 1
          ? columns + remainingColumns
          : columns,
    }),
    {}
  );
};

export const QuotePart = styled('span', {
  display: 'block',

  '&:not(:last-child)': {
    marginBlockEnd: '$medium',
  },
});

export const Link = styled(LinkComponent, {
  '& svg': {
    verticalAlign: 'middle',
    width: 18,
    height: 18,
  },
  variants: {
    caption: {
      true: {
        '& > span': {
          typography: '$p.caption.mobile',
        },
        '@small': {
          '& > span': {
            typography: '$p.caption',
          },
        },
      },
    },
  },
});

export const Iframe = styled('iframe', {
  '@lessThanSmall': {
    maxHeight: '100%',
  },
  maxWidth: '100%',
});

export const HIGHLIGHT_GLOBAL_CLASS = 'highlight';
const highlightStyle = {
  borderRadius: '$medium',
  marginBlockStart: '$xl',
  padding: '$medium',

  '@medium': {
    borderRadius: '$semilarge',
    marginBlockStart: '$xxl',
    padding: '$xl',
  },

  // special margin/padding for highlighted elements
  '& h1, & h2, & h3': {
    margin: 0,
  },
};

export const Div = styled('div', {
  typography: '$p.mobile',
  '@medium': {
    typography: '$p',
  },
  table: {
    overflow: 'auto',
  },
  variants: {
    highlight: {
      true: {
        ...highlightStyle,
        backgroundColor: '$tan', // no room for custom background colors when used in a div
      },
      false: {},
    },
    backgroundColor: {
      black: {},
      blue: {
        backgroundColor: '$blue',
        color: '$cream',
      },
      citron: {
        backgroundColor: '$citron',
      },
      cream: {
        backgroundColor: '$cream',
        color: '$black',
      },
      green: {
        backgroundColor: '$green',
      },
      tan: {
        backgroundColor: '$tan',
      },
    },
    tableColor: {
      black: {},
      blue: {
        table: { '---bgColor': 'none !important' },
        'thead, tbody': { backgroundColor: '$blue', color: '$cream' },
      },
      citron: {
        table: { '---bgColor': 'none !important' },
        'thead, tbody': { backgroundColor: '$citron' },
      },
      cream: {
        table: { '---bgColor': 'none !important' },
        'thead, tbody': { backgroundColor: '$cream', color: '$black' },
      },
      green: {
        table: { '---bgColor': 'none !important' },
        'thead, tbody': { backgroundColor: '$green' },
      },
      tan: {
        table: { '---bgColor': 'none !important' },
        'thead, tbody': { backgroundColor: '$tan' },
      },
    },
  },
});

export const MarkdownWrapper = styled(RawMarkdown, {
  variants: {
    hideOverflow: {
      true: {
        overflow: 'hidden',
      },
    },
    highlight: {
      true: highlightStyle,
      false: {},
    },
    backgroundColor: {
      black: {},
      blue: {
        backgroundColor: '$blue',
      },
      citron: {
        backgroundColor: '$citron',
      },
      cream: {},
      green: {
        backgroundColor: '$green',
      },
      tan: {
        backgroundColor: '$tan',
      },
    },
  },
});

export const ToolTip = styled('strong', {
  position: 'relative',
  cursor: 'help',
  backgroundColor: '$citron',
  padding: '$xxxs',
  fontWeight: 'normal',
  zIndex: 1,
  '> em': {
    fontStyle: 'normal',
  },
  '> em > em': {
    display: 'none',
  },
  '&:hover': {
    '~ span': {
      display: 'block',
    },
    '> em > em': {
      display: 'block',
      width: 'max-content',
      maxWidth: '275px',
      position: 'absolute',
      padding: '$xs',
      bottom: '125%',
      backgroundColor: '$black',
      color: '$cream',
      borderRadius: '$medium',
      fontSize: '$xs',
      '@medium': {
        left: '50%',
        transform: 'translateX(-50%)',
        '&::after': {
          content: 'attr(data-tooltip)',
          position: 'absolute',
          top: '99%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
          border: '10px solid transparent',
          borderTopColor: '$black',
        },
      },
    },
  },
});

export const ToolTipBlur = styled('span', {
  display: 'none',
  zIndex: 0,
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backdropFilter: 'blur(5px)' /* Apply blur to the background */,
});
