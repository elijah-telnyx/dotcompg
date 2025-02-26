import type { Meta, StoryObj } from '@storybook/react';
import Tabs, { type TabsWithMarkdownProps } from './TabsWithMarkdown';

const componentMeta: Meta<typeof Tabs> = {
  title: 'Layout/Tabs',
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

export const TabsWithMarkdown: StoryObj<TabsWithMarkdownProps> = {
  args: {
    heading: 'Tab heading',
    tabList: [
      {
        id: 'tab-1',
        label: 'Our network',
        copy: 'More points of presence give you lower latency anywhere on earth. Multi-cloud architecture provides peace-of-mind redundancy.\n![Our network](//images.ctfassets.net/2vm221913gep/53dgOYiBF01d8bbninOW6p/a4c17e3deb6ef5d2d56ff85ae10cb0e8/out_network.png)',
      },
      {
        id: 'tab-2',
        label: 'Competitor networks',
        copy: 'More points of presence give you lower latency anywhere on earth. Multi-cloud architecture provides peace-of-mind redundancy.\n![Our network](//images.ctfassets.net/2vm221913gep/53dgOYiBF01d8bbninOW6p/a4c17e3deb6ef5d2d56ff85ae10cb0e8/out_network.png)',
      },
    ],
    defaultValue: 'tab-1',
    dark: false,
  },
};
