import { isDarkColor } from '../../../styles/utils';
import Tabs from '../../Tabs';
import type { TablesSectionTableProps } from '../TablesSection';
import Tables from './Tables';
import * as css from './Tables.styles';

export interface TableWithTabsProps {
  caption: string;
  tabs: {
    label: string;
    tables: TablesSectionTableProps[];
  }[];
}

const TableWithTabs = ({
  caption,
  tableTheme,
  tabs,
}: TableWithTabsProps & {
  tableTheme: TablesSectionTableProps['tableTheme'];
}) => {
  const isDark = isDarkColor(tableTheme);

  return (
    <Tabs
      dark={isDark}
      heading={caption}
      tabs={tabs.map(({ label, tables }) => ({
        trigger: {
          label,
          value: label,
        },
        content: (
          <css.TabsContentWrapper onlyOne={tabs.length === 1}>
            {tables.map((tabTable) => {
              return (
                <Tables
                  {...tabTable}
                  key={tabTable.caption}
                  tableTheme={tableTheme}
                />
              );
            })}
          </css.TabsContentWrapper>
        ),
      }))}
    />
  );
};

export default TableWithTabs;
