import type { Meta, StoryObj } from '@storybook/react';
import Tabs, { type TabsProps } from './Tabs';

const componentMeta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

export const FourTabs: StoryObj<TabsProps> = {
  args: {
    heading: 'Tab heading',
    tabs: [
      {
        trigger: { label: 'Tab 1', value: 'tab-1' },
        content: 'This is the content for Tab 1',
      },
      {
        trigger: { label: 'Tab 2', value: 'tab-2' },
        content: 'This is the content for Tab 2',
      },
      {
        trigger: { label: 'Tab 3', value: 'tab-3' },
        content: 'This is the content for Tab 3',
      },
      {
        trigger: { label: 'Tab 4', value: 'tab-4' },
        content: 'This is the content for Tab 4',
      },
    ],
    defaultValue: 'tab-2',
    dark: false,
  },
};

export const TabsWithLongText: StoryObj<TabsProps> = {
  args: {
    heading: 'Tab heading',
    tabs: [
      {
        trigger: { label: 'This is a long text 1', value: 'tab-1' },
        content: 'This is the content for Tab 1',
      },
      {
        trigger: { label: 'This is a long text 2', value: 'tab-2' },
        content: 'This is the content for Tab 2',
      },
      {
        trigger: { label: 'This is a long text 3', value: 'tab-3' },
        content: 'This is the content for Tab 3',
      },
    ],
    defaultValue: 'tab-2',
    dark: false,
  },
};
