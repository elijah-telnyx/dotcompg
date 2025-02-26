import Table from 'ui/components/Table';
import { styled } from 'ui/styles';

export const TableRoot = styled('table', {
  padding: '0 $small',
  display: 'block',
  gridColumn: 'span 4',
  width: '100%',
  backgroundColor: '$cream',
  borderRadius: '$medium',
  boxShadow: '0 0 2rem #6D6D6D40',
  '@medium': {
    gridColumn: 'span 6',
  },
});

export const Row = styled(Table.Row, {
  borderBottom: '1px solid #000',
  '&:last-of-type': {
    borderBottom: 'none',
  },
});
