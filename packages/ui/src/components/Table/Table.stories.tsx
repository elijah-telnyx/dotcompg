import type { Meta, StoryObj } from '@storybook/react';
import type { GridItemProps } from '../Grid';
import type { TableProps } from './Table';
import Table from './Table';

const componentMeta: Meta<typeof Table.Root> = {
  title: 'Components/Table',
  component: Table.Root,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
};

export default componentMeta;

const thTwoColumns: GridItemProps = {
  xs: 2,
  small: 4,
};

const tdTwoColumns: GridItemProps = {
  xs: 2,
  small: 4,
  medium: 8,
};

export const TwoColumnsTable: StoryObj<TableProps> = {
  args: {
    tableTheme: 'green',
    children: [
      <Table.Caption key={1}>Make outbound calls pricing</Table.Caption>,
      <Table.TBody key={2}>
        <Table.Row>
          <Table.HeaderCell {...thTwoColumns}>Local calls</Table.HeaderCell>
          <Table.DataCell {...tdTwoColumns}>
            Starting at $0.005 per minute*
          </Table.DataCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell {...thTwoColumns}>Toll-free calls</Table.HeaderCell>
          <Table.DataCell {...tdTwoColumns}>Free</Table.DataCell>
        </Table.Row>
      </Table.TBody>,
    ],
  },
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

const thDesktopColumns: GridItemProps = {
  xs: 0,
  small: 0,
  medium: 4,
};

const tdResponsiveColumns: GridItemProps = {
  xs: 2,
  small: 4,
  medium: 4,
};

export const ThreeColumnsTable: StoryObj<TableProps> = {
  args: {
    children: [
      <Table.Caption key={1}>
        Discounted outbound calling pricing
      </Table.Caption>,
      <Table.THead key={2}>
        <Table.Row>
          <Table.HeaderCell category scope='col' {...thDesktopColumns}>
            Quantity
          </Table.HeaderCell>
          <Table.HeaderCell category scope='col' {...thDesktopColumns}>
            Local calls
          </Table.HeaderCell>
          <Table.HeaderCell category scope='col' {...thDesktopColumns}>
            Toll-free calls
          </Table.HeaderCell>
        </Table.Row>
      </Table.THead>,
      <Table.TBody key={3}>
        <Table.Row>
          <Table.HeaderCell scope='row' {...thResponsiveColumns}>
            Next 900K minutes per month
          </Table.HeaderCell>
          <Table.HeaderCell category {...thMobileColumns}>
            Local calls
          </Table.HeaderCell>
          <Table.DataCell {...tdResponsiveColumns}>
            $0.0018 per minute
          </Table.DataCell>
          <Table.HeaderCell category {...thMobileColumns}>
            Toll-free calls
          </Table.HeaderCell>
          <Table.DataCell {...tdResponsiveColumns}>
            $0.0018 per minute
          </Table.DataCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell scope='row' {...thResponsiveColumns}>
            Next 9M minutes per month
          </Table.HeaderCell>
          <Table.HeaderCell category {...thMobileColumns}>
            Local calls
          </Table.HeaderCell>
          <Table.DataCell {...tdResponsiveColumns}>
            $0.0016 per minute
          </Table.DataCell>
          <Table.HeaderCell category {...thMobileColumns}>
            Toll-free calls
          </Table.HeaderCell>
          <Table.DataCell {...tdResponsiveColumns}>
            $0.0016 per minute
          </Table.DataCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell scope='row' {...thResponsiveColumns}>
            Next 40M minutes per month
          </Table.HeaderCell>
          <Table.HeaderCell category {...thMobileColumns}>
            Local calls
          </Table.HeaderCell>
          <Table.DataCell {...tdResponsiveColumns}>
            $0.0014 per minute
          </Table.DataCell>
          <Table.HeaderCell category {...thMobileColumns}>
            Toll-free calls
          </Table.HeaderCell>
          <Table.DataCell {...tdResponsiveColumns}>
            $0.0014 per minute
          </Table.DataCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell scope='row' {...thResponsiveColumns}>
            Next 50M minutes per month
          </Table.HeaderCell>
          <Table.HeaderCell category {...thMobileColumns}>
            Local calls
          </Table.HeaderCell>
          <Table.DataCell {...tdResponsiveColumns}>
            $0.0012 per minute
          </Table.DataCell>
          <Table.HeaderCell category {...thMobileColumns}>
            Toll-free calls
          </Table.HeaderCell>
          <Table.DataCell {...tdResponsiveColumns}>
            $0.0012 per minute
          </Table.DataCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell scope='row' {...thResponsiveColumns}>
            100M+ minutes per month
          </Table.HeaderCell>
          <Table.HeaderCell category {...thMobileColumns}>
            Local calls
          </Table.HeaderCell>
          <Table.DataCell {...tdResponsiveColumns}>
            $0.001 per minute
          </Table.DataCell>
          <Table.HeaderCell category {...thMobileColumns}>
            Toll-free calls
          </Table.HeaderCell>
          <Table.DataCell {...tdResponsiveColumns}>
            $0.001 per minute
          </Table.DataCell>
        </Table.Row>
      </Table.TBody>,
    ],
  },
};
