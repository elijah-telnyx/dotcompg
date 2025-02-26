import Table from 'ui/components/Table';
import { styled } from 'ui/styles';

const TableRoot = styled('table', {
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

const Row = styled(Table.Row, {
  borderBottom: '1px solid #000',
  '&:last-of-type': {
    borderBottom: 'none',
  },
});

const { THead, TBody, HeaderCell, DataCell } = Table;

export interface AvailabilityTableProps {
  metro: {
    localCode: string;
    region: string;
    count: number;
    countDisplay: string | undefined;
  }[];
}

const AvailabilityTable = ({ metro }: AvailabilityTableProps) => (
  <TableRoot>
    <THead>
      <Row>
        <HeaderCell xs={2} small={2} medium={3} category>
          Local Codes
        </HeaderCell>
        <HeaderCell xs={2} small={2} medium={3} category>
          Area Served
        </HeaderCell>
      </Row>
    </THead>
    <TBody>
      {metro.map((local) => (
        <Row key={local.region}>
          <DataCell xs={2} small={2} medium={3}>
            {local.localCode}
          </DataCell>
          <DataCell xs={2} small={2} medium={3}>
            {local.region}
          </DataCell>
        </Row>
      ))}
    </TBody>
  </TableRoot>
);

export default AvailabilityTable;
