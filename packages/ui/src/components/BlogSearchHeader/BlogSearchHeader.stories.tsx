import type { Meta, StoryObj } from '@storybook/react';
import BlogSearchHeader, {
  type BlogSearchHeaderProps,
} from './BlogSearchHeader';

const componentMeta: Meta<BlogSearchHeaderProps> = {
  title: 'Layout/Blog Search Header',
  component: BlogSearchHeader,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type story = StoryObj<BlogSearchHeaderProps>;

export const Default: story = {
  args: {
    backToHref: 'https://some-href',
    searchTerm: 'some search',
  },
};
