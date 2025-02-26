import { ROW_HEIGHT, ROW_MAX_HEIGHT, ROW_PADDING_BLOCK } from '../utils';

import { styled } from 'ui/styles';

export const Table = styled('table', {
  paddingInline: '$large',
  paddingTop: '$xxl',
  paddingBottom: '$xl',
  borderRadius: '$large',
  border: '1px solid',

  borderColor: '$grayStroke',
  backgroundColor: '$grayEmbed',
  color: '$cream',

  textAlign: 'left',

  overflowY: 'auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',

  // use the same grid for all table elements but the data cells
  '& thead, & tbody, & tr': {
    gridColumn: '1 / -1',
    display: 'grid',
    gridTemplateColumns: 'subgrid',
  },
});

export const TableTHead = styled('thead', {
  position: 'sticky',
  top: 0,
  zIndex: 1,
  backgroundColor: 'inherit',
  paddingTop: '$small',
});

export const TableHeaderCell = styled('th', {
  typography: '$h2.category',
  marginBottom: '$small',
});

export const TableRow = styled('tr', {
  whiteSpace: 'nowrap',
  // use padding instead of gap, so we can have the background effect on hover with spacing above and below
  '& > *:not(:last-child)': {
    paddingRight: '$xxl',
  },
  '& > *:first-child': {
    paddingLeft: '$xxs',
  },
  '& > *:last-child': {
    paddingRight: '$xxs',
  },
});

export const TableTBody = styled('tbody', {
  fontSize: '$xs',
  lineHeight: '$xxs',
  fontWeight: '$regular',
  fontFamily: '$inter',
  $$radius: '$radii$xs',
  maxHeight: ROW_MAX_HEIGHT,
  overflowX: 'hidden',
  overflowY: 'auto',
  [`& ${TableRow}`]: {
    alignItems: 'center',
    paddingBlock: ROW_PADDING_BLOCK,
    '& > td': {
      height: ROW_HEIGHT,
      display: 'flex',
      alignItems: 'center',
    },
    borderBottom: '1px solid $grayStroke',
    [`&:hover > td`]: {
      backgroundColor: '$black',
    },
  },

  '& td:first-child': {
    borderTopLeftRadius: '$$radius',
    borderBottomLeftRadius: '$$radius',
  },
  '& td:last-child': {
    borderTopRightRadius: '$$radius',
    borderBottomRightRadius: '$$radius',
  },
});

export const TableDataCell = styled('td');

export const TableButtonCell = styled(TableDataCell, {
  textAlign: 'right',
});
