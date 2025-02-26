import Markdown from '../../Markdown';
import Table from '../../Table';
import type { TablesSectionTableProps } from '../TablesSection';
import Tables from './Tables';
import * as css from './Tables.styles';
import useHiddenTable from './useHiddenTable';
import TableFooter from './TableFooter';

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

const TwoColumnsTable = ({
  caption,
  head,
  body,
  tableTheme,
  footer,
  innerTables,
  id,
  copy,
}: TablesSectionTableProps<2>) => {
  const mainTableId = id || caption.replace(/\s/g, '-');
  const { hiddenTable, toggleTable } = useHiddenTable({
    footer,
  });

  return (
    <css.TablesContainer id={mainTableId}>
      <Table.Root tableTheme={tableTheme}>
        <Table.Caption>{caption}</Table.Caption>
        {copy && (
          <Table.Copy>
            <Content>{copy}</Content>
          </Table.Copy>
        )}
        {head && (
          <Table.THead>
            <Table.Row>
              {head.map(({ label }) => (
                <Table.HeaderCell
                  category={label.category}
                  scope='col'
                  small={4}
                  xs={2}
                  key={label.value}
                >
                  <Content>{label.value}</Content>
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.THead>
        )}
        <Table.TBody
          css={{
            '@lessThanMedium': {
              paddingBlock: '$medium',
            },
          }}
        >
          {body.map(({ label, data }) => (
            <Table.Row key={label.value.split(' ').join('-')}>
              <Table.HeaderCell
                typographyType={label.typographyType}
                category={label.category}
                small={4}
                xs={2}
              >
                {label.tooltip ? (
                  <Table.Tooltip {...label.tooltip} tableTheme={tableTheme}>
                    {label.value}
                  </Table.Tooltip>
                ) : (
                  label.value
                )}
              </Table.HeaderCell>
              <Table.DataCell
                typographyType={data.typographyType}
                medium={8}
                small={4}
                xs={2}
              >
                <Markdown options={{ forceBlock: false }}>
                  {data.value}
                </Markdown>
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

export default TwoColumnsTable;
