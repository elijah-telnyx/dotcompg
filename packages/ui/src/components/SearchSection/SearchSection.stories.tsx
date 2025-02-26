import type { Meta, StoryObj } from '@storybook/react';
import SearchSection, { type SearchSectionProps } from './SearchSection';

const componentMeta: Meta<SearchSectionProps> = {
  title: 'Components/SearchSection',
  component: SearchSection,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    searchProps: {
      onSearch: { action: 'search' },
    },
  },
};

export default componentMeta;

type story = StoryObj<SearchSectionProps>;

export const Default: story = {
  args: {
    heading: 'Browse all articles, guides and news',
    backgroundColor: 'black',
    searchProps: {
      id: 'search',
      name: 'search',
    },
  },
};

export const WithInitialSearch: story = {
  args: {
    heading: 'Browse all articles, guides and news',
    backgroundColor: 'black',
    searchProps: {
      id: 'search',
      name: 'search',
      defaultValue: 'Some Article',
    },
  },
};
