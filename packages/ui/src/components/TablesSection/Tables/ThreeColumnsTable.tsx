import type { GridItemProps } from '../../Grid';

import Markdown from '../../Markdown';
import Table from '../../Table';
import type { TablesSectionTableProps } from '../TablesSection';
import TableFooter from './TableFooter';
import Tables from './Tables';
import * as css from './Tables.styles';
import useHiddenTable from './useHiddenTable';

const thDesktopColumns: GridItemProps = {
  xs: 0,
  small: 0,
  medium: 4,
};

const thResponsiveColumns: GridItemProps = {
  xs: 4,
  small: 8,
  medium: 4,
};

const thMobileColumns: GridItemProps = {
  xs: 2,
  small: 4,
  medium: 0,
  large: 0,
  xl: 0,
};

const tdResponsiveColumns: GridItemProps = {
  xs: 2,
  small: 4,
  medium: 4,
};

const Content = ({ children }: { children: string }) => (
  <Markdown
    options={{
      forceBlock: false,
      overrides: {
        span: {
          component: ({ children }) => children,
        },
      },
    }}
  >
    {children}
  </Markdown>
);

const ThreeColumnsTable = ({
  caption,
  body,
  tableTheme,
  footer,
  innerTables,
  id,
  head,
}: TablesSectionTableProps<3>) => {
  const mainTableId = id || caption.replace(/\s/g, '-');
  const { hiddenTable, toggleTable } = useHiddenTable({
    footer,
  });

  return (
    <css.TablesContainer id={mainTableId}>
      <Table.Root tableTheme={tableTheme}>
        <Table.Caption>{caption}</Table.Caption>
        {head && (
          <Table.THead>
            <Table.Row>
              {head.map(({ label }) => (
                <Table.HeaderCell
                  category={label.category}
                  scope='col'
                  {...thDesktopColumns}
                  key={label.value}
                >
                  <Content>{label.value}</Content>
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.THead>
        )}
        <Table.TBody>
          {body.map(({ label, data }) => (
            <Table.Row key={label.value.replace(/\s/g, '-')}>
              <Table.HeaderCell
                typographyType={label.typographyType}
                scope='row'
                {...thResponsiveColumns}
              >
                <Content>{label.value}</Content>
              </Table.HeaderCell>

              {head && (
                <Table.HeaderCell category {...thMobileColumns}>
                  <Content>{head[1].label.value}</Content>
                </Table.HeaderCell>
              )}

              <Table.DataCell {...tdResponsiveColumns}>
                <Content>{data.value[0]}</Content>
              </Table.DataCell>

              {head && (
                <Table.HeaderCell category {...thMobileColumns}>
                  <Content>{head[2].label.value}</Content>
                </Table.HeaderCell>
              )}

              <Table.DataCell {...tdResponsiveColumns}>
                <Content>{data.value[1]}</Content>
              </Table.DataCell>
            </Table.Row>
          ))}
        </Table.TBody>
      </Table.Root>
      {footer?.data.length && (
        <TableFooter
          footer={footer}
          hiddenTable={hiddenTable}
          toggleTable={toggleTable}
        />
      )}
      {hiddenTable && innerTables && (
        <css.InnerTablesWrapper id={innerTables.containerId}>
          <css.InnerTablesContainer>
            {innerTables.tables.map((table) => (
              <css.InnerTableContainer key={table.caption}>
                <Tables {...table} tableTheme={tableTheme} />
              </css.InnerTableContainer>
            ))}
          </css.InnerTablesContainer>
        </css.InnerTablesWrapper>
      )}
    </css.TablesContainer>
  );
};

export default ThreeColumnsTable;
