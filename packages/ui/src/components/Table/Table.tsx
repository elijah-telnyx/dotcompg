import type {
  HTMLAttributes,
  TableHTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
} from 'react';
import type { GridItemProps } from '../Grid';
import TableTooltip from './TableTooltip';

import * as css from './Table.styled';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  blog?: boolean;
  tableTheme?: 'blue' | 'green' | 'tan';
}

export interface TableTypographyProps {
  category?: boolean;
  typographyType?: 'Paragraph' | 'Heading';
}

const Root = ({ children, ...props }: TableProps) => {
  return (
    <css.Table as='table' {...props}>
      {children}
    </css.Table>
  );
};
Root.displayName = 'Table.Root';

export type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement> &
  GridItemProps & {
    blog?: boolean;
  };
const Caption = ({ children, ...props }: TableCaptionProps) => {
  return (
    <css.Caption htmlAs='caption' {...props}>
      {children}
    </css.Caption>
  );
};
Caption.displayName = 'Table.Caption';

export type TableTHeadProps = HTMLAttributes<HTMLTableSectionElement> &
  GridItemProps;
const THead = ({ children, ...props }: TableTHeadProps) => {
  return (
    <css.THead htmlAs='thead' {...props}>
      {children}
    </css.THead>
  );
};
THead.displayName = 'Table.THead';

export type TableTBodyProps = HTMLAttributes<HTMLTableSectionElement> &
  GridItemProps &
  GridItemProps;
const TBody = ({ children, ...props }: TableTBodyProps) => {
  return (
    <css.TBody htmlAs='tbody' {...props}>
      {children}
    </css.TBody>
  );
};
TBody.displayName = 'Table.TBody';

export type TableRowProps = HTMLAttributes<HTMLTableRowElement>;
const Row = ({ children, ...props }: TableRowProps) => {
  return (
    <css.TR as='tr' {...props}>
      {children}
    </css.TR>
  );
};
Row.displayName = 'Table.Row';

export type TableHeaderCellProps = ThHTMLAttributes<HTMLTableCellElement> &
  GridItemProps &
  TableTypographyProps;

const HeaderCell = ({
  children,
  typographyType,
  ...props
}: TableHeaderCellProps) => {
  return (
    <css.TH htmlAs='th' typographyType={typographyType} {...props}>
      {children}
    </css.TH>
  );
};
HeaderCell.displayName = 'Table.HeaderCell';

export type TableDataCellProps = TdHTMLAttributes<HTMLTableCellElement> &
  GridItemProps &
  TableTypographyProps;
const DataCell = ({
  children,
  typographyType,
  ...props
}: TableDataCellProps) => {
  return (
    <css.TD htmlAs='td' typographyType={typographyType} {...props}>
      {children}
    </css.TD>
  );
};
DataCell.displayName = 'Table.DataCell';

const Footer = css.TableFooter;
Footer.displayName = 'Table.Footer';

const FooterItem = css.TableFooterItem;
FooterItem.displayName = 'Table.FooterItem';

const Copy = css.Copy;

export default {
  Root,
  Caption,
  THead,
  TBody,
  Row,
  HeaderCell,
  DataCell,
  Footer,
  FooterItem,
  Tooltip: TableTooltip,
  Copy,
};
