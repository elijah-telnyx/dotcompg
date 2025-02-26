import type { TableBodyItem, TablesSectionTableProps } from '../TablesSection';
import type { ReactNode } from 'react';
import Paragraph from '../Typography/Paragraph';
import InfoTooltip from '../InfoTooltip';
import * as css from './Table.styled';

type TableTooltipProps = TableBodyItem['label']['tooltip'] & {
  tableTheme: TablesSectionTableProps['tableTheme'];
  children: ReactNode;
};

const TableTooltip = ({
  label,
  id,
  value,
  tableTheme,
  children,
}: TableTooltipProps) => (
  <css.CellContent>
    <span aria-describedby={label}>{children}</span>
    <InfoTooltip id={id} triggerColor={tableTheme} triggerLabel={label}>
      <Paragraph>{value}</Paragraph>
    </InfoTooltip>
  </css.CellContent>
);

export default TableTooltip;
