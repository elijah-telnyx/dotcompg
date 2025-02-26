import type { Meta, StoryObj } from '@storybook/react';
import type { TablesSectionProps } from './TablesSection';
import TablesSection from './TablesSection';

const componentMeta: Meta<typeof TablesSection> = {
  title: 'Layout/Tables Section',
  component: TablesSection,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
};

export default componentMeta;

export const TwoColumnsTable: StoryObj<TablesSectionProps> = {
  args: {
    heading: 'Pay as you go',
    data: {
      USD: [
        {
          columns: 2,
          caption: 'Services',
          body: [
            {
              label: {
                value: 'Send a fax via Api',
                tooltip: {
                  id: 'tooltip-test',
                  label: 'This is a tooltip',
                  value: 'This is a tooltip',
                },
              },
              data: {
                value:
                  '$0.007 per page + [Sip Trunking](/products/sip-trunks) usage for transmission',
              },
            },
            {
              label: { value: 'Receive a fax via Api' },
              data: {
                value:
                  '$0.007 per page + [Sip Trunking](/products/sip-trunks) usage for transmission',
              },
            },
          ],
        },
      ],
    },
  },
};

export const ThreeColumnsTable: StoryObj<TablesSectionProps> = {
  args: {
    heading: 'Pay as you go',
    data: {
      USD: [
        {
          columns: 3,
          caption: 'Services',
          body: [
            {
              label: {
                value: 'Send a fax via Api',
              },
              data: {
                value:
                  '$0.007 per page + [Sip Trunking](/products/sip-trunks) usage for transmission',
              },
            },
            {
              label: { value: 'Receive a fax via Api' },
              data: {
                value:
                  '$0.007 per page + [Sip Trunking](/products/sip-trunks) usage for transmission',
              },
            },
          ],
        },
      ],
    },
  },
};
