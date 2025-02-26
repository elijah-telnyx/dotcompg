import { styled } from '../../../styles';
import Plus from '../../Icons/Plus';
import Checkmark from '../../Icons/Checkmark';
import ChevronDown from '../../Icons/ChevronDown';
import type { ThemedCSS } from '../../../styles/config/stitches.config';
import { STICKY } from '../CoverageTableSection.styled';

const gap = 28;

const paddingRight = {
  firstColumn: 48 - gap,
  secondColumn: 72 - gap,
};

export const Root = styled('table', {
  textAlign: 'left',
});

export const Head = styled('thead', STICKY.TABLE_HEADER, {
  display: 'block',
  textTransform: 'uppercase',
  backgroundColor: '$cream',
});

const firstCol = 136 + paddingRight.firstColumn;
const secondCol = 110 + paddingRight.secondColumn;

export const Row = styled('tr', {
  display: 'grid',
  gap: '$medium',
  paddingBottom: '$xs',
  marginBottom: '$xs',
  variants: {
    isServices: {
      true: {
        gridTemplateColumns: `${firstCol}px var(--second-col,${secondCol}px) repeat($$numberOfColumns, 1fr)`,
      },
      false: {
        gridTemplateColumns: `${
          firstCol + secondCol - paddingRight.secondColumn
        }px repeat($$numberOfColumns, 1fr)`,
      },
    },
  },
});

export const Body = styled('tbody', {});

const columnsPadding: ThemedCSS = {
  '&:first-child': {
    paddingRight: paddingRight.firstColumn,
  },
  '&:nth-child(2)': {
    paddingRight: paddingRight.secondColumn,
  },
};

export const HeaderCell = styled('th', columnsPadding, {
  typography: '$h3',
  fontSize: '$xxxs',
  lineHeight: '$xxxs',
});

export const DataCell = styled('td', columnsPadding, {
  variants: {
    semibold: {
      true: {
        'a, span': {
          fontWeight: '$semibold',
          fontSize: '$small',
        },
        fontWeight: '$semibold',
      },
    },
  },
});

const iconSize = {
  width: 24,
  height: 24,
};
export const CrossIcon = styled(Plus, iconSize, {
  rotate: '45deg',
  color: '$tan',
});
export const CheckIcon = styled(Checkmark, iconSize, {
  color: '$greenAlt',
});

export const CellCopy = styled('div', {
  typography: '$p.caption.mobile',
  color: '$grayHoverLightBackground',
});

export const NumberTypeButton = styled('button', {
  typography: '$p.mobile',
  width: '100%',
  paddingBottom: '$xs',
  display: 'flex',
  alignItems: 'center',
  '&:hover, &:focus': {
    color: '$blue',
  },
});

export const ChevronIconContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '10px',
  gridTemplateRows: '10px',
  gap: 1,
  marginRight: '$xs',
});

export const ChevronIcon = styled(ChevronDown, {
  height: 14,
  width: 14,
  variants: {
    up: {
      true: {
        transform: 'rotate(180deg)',
      },
    },
  },
});
