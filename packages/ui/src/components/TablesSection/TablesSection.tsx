import { useState } from 'react';
import type { TableProps, TableTypographyProps } from '../Table';
import type { SectionProps } from '../Section';
import type { SelectProps } from '../Select';

import Grid from '../Grid';
import { fullWidthColumns } from '../Grid/Grid';
import Section from '../Section';
import Select from '../Select';
import Tables from './Tables';
import TableWithTabs, { type TableWithTabsProps } from './Tables/TableWithTabs';

import * as css from './TablesSection.styles';

type NumberOfColumns = 2 | 3 | 4;

export type { TableWithTabsProps };

export interface TableBodyItem<C = NumberOfColumns> {
  label: {
    typographyType?: TableTypographyProps['typographyType'];
    value: string;
    category?: TableTypographyProps['category'];
    tooltip?: {
      id: string;
      label: string;
      value: string;
    };
  };
  data: {
    typographyType?: TableTypographyProps['typographyType'];
    value: C extends 2 ? string : string[];
  };
}

export interface TablesSectionTableProps<C = NumberOfColumns> {
  id?: string;
  columns: NumberOfColumns;
  caption: string;
  copy?: string | undefined;
  tableTheme?: TableProps['tableTheme'];
  head?: {
    label: {
      value: string;
      category?: TableTypographyProps['category'];
      tooltip?: {
        id: string;
        label: string;
        value: string;
      };
    };
  }[];
  body: TableBodyItem<C>[];
  footer?: {
    id?: string;
    data: {
      value: string;
      toggleButton?: {
        label: {
          open: string;
          close: string;
        };
        /**
         * table id the toggle button will openS
         */
        innerTableId: string;
      };
    }[];
  };
  innerTables?: {
    containerId: string;
    tables: (TablesSectionTableProps & { id: string })[];
  };
}

const isTableWithTabs = (
  table: TablesSectionTableProps | TableWithTabsProps
): table is TableWithTabsProps => {
  return (table as TableWithTabsProps).tabs !== undefined;
};

export interface TablesSectionProps extends SectionProps {
  heading: string;
  copy?: string;
  data: {
    [currencyCode: string]: (TablesSectionTableProps | TableWithTabsProps)[];
  };
  tableTheme?: TableProps['tableTheme'];
  countryList?: SelectProps['items'];
  countryAlpha2?: SelectProps['value'];
  currencyList?: SelectProps['items'];
  addLocaleToHeading?: (param: string) => string;
  onValueChange?: (value: string | undefined) => void;
}
const TablesSection = ({
  heading,
  copy,
  data,
  id,
  tableTheme,
  countryList,
  countryAlpha2,
  currencyList,
  addLocaleToHeading = (heading: string) => heading,
  onValueChange,
  ...sectionProps
}: TablesSectionProps) => {
  const hasCountry = countryList?.length;
  const hasCurrency = currencyList?.length;
  const firstTableDataKey = Object.keys(data)[0];
  const [targetCurrencyCode, setTargetCurrencyCode] =
    useState<string>(firstTableDataKey);
  const tableData = data[targetCurrencyCode];

  return (
    <Section {...sectionProps}>
      <Grid.Container>
        <Grid.Item
          {...(hasCountry || hasCurrency
            ? {
                xs: 4,
                small: 5,
                medium: 7,
                large: 7,
                xl: 7,
              }
            : fullWidthColumns)}
        >
          <css.TextWrapper>
            <css.Heading level={2} id={id} htmlAs='p'>
              {addLocaleToHeading(heading)}
            </css.Heading>
            {copy && (
              <css.CopyWrapper>
                <css.Copy>{copy}</css.Copy>
              </css.CopyWrapper>
            )}
          </css.TextWrapper>
        </Grid.Item>
        {(hasCountry || hasCurrency) && (
          <css.SelectContainer xs={4} small={8} medium={5} large={5} xl={5}>
            <css.SelectContainerWrapper>
              {countryList?.length && (
                <css.SelectWrapper>
                  <Select
                    triggerLabel='Country'
                    items={countryList}
                    value={countryAlpha2?.toLowerCase()}
                    id='country-filter'
                    placeholder=''
                    hashLinkId={id}
                    onValueChange={onValueChange}
                  />
                </css.SelectWrapper>
              )}
              {currencyList && currencyList.length > 1 && (
                <css.SmallSelectWrapper>
                  <Select
                    triggerLabel='Currency'
                    items={currencyList}
                    value={targetCurrencyCode}
                    onValueChange={(value) => {
                      setTargetCurrencyCode(value as string);
                    }}
                    id='currency-filter'
                    placeholder=''
                    scrollable={false}
                  />
                </css.SmallSelectWrapper>
              )}
            </css.SelectContainerWrapper>
          </css.SelectContainer>
        )}
      </Grid.Container>

      {tableData?.map((table) => {
        if (isTableWithTabs(table)) {
          return (
            <TableWithTabs
              {...table}
              key={table.caption}
              tableTheme={tableTheme}
            />
          );
        }

        return (
          <Tables {...table} tableTheme={tableTheme} key={table.caption} />
        );
      })}
    </Section>
  );
};

export default TablesSection;
