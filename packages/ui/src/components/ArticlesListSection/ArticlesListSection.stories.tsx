import type { Meta, StoryObj } from '@storybook/react';
import ArticlesListSection, {
  type ArticlesListSectionProps,
} from './ArticlesListSection';

const generateItems = (numberOfItems: number) =>
  Array(numberOfItems)
    .fill(undefined)
    .map((_, index) => {
      const id = (index + 1).toString();

      const item: ArticlesListSectionProps['items'][number] = {
        id,
        tagline: 'Guides and Tutorials',
        heading: `Introducing Telnyx Cloud VPN: Now in Open Beta - ${id}`,
        href: '#',
        author: {
          name: 'Emily Wynne',
          media: {
            src: 'https://images.ctfassets.net/taysl255dolk/NuyPNQz6waKcnkfhcJAn3/1a35e90957b8b331b72908b84c38e277/photo__1_.jpg',
            alt: 'Emily Wynne picture',
          },
        },
      };

      return item;
    });

const componentMeta: Meta<typeof ArticlesListSection> = {
  title: 'Layout/Articles List Section',
  component: ArticlesListSection,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    items: generateItems(12),
    pagination: {
      pageCounter: {
        currentPage: 1,
        totalPages: 10,
      },
      previous: {
        href: '/resources/page/1',
      },
      next: {
        href: '/resources/page/2',
      },
    },
  },
};

export default componentMeta;

type story = StoryObj<ArticlesListSectionProps>;

export const Default: story = {};

export const WithText: story = {
  args: {
    title: 'View all articles',
  },
};
