import type { Meta, StoryObj } from '@storybook/react';

import GridList, {
  type GridListProps,
  type GridListItemProps,
} from './GridList';

const componentMeta: Meta<GridListProps> = {
  title: 'Layout/Grid List',
  component: GridList,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<GridListProps>;

const generateItems = (numberOfItems: number) =>
  Array(numberOfItems)
    .fill(undefined)
    .map((_, index) => {
      const item: GridListItemProps = {
        title: `A long title for a card ${index + 1}`,
        slug: 'card',
        copy: `It's easier than ever to harness our private global backbone for your apps, devices and endpoints.`,
        publishDate: `2023-0${index + 1}-30T17:00+00:00`,
        link: {
          href: '#',
          text: 'Read article',
          type: 'link',
          linkKind: 'cta',
          linkIcon: {
            src: '',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clip-path="url(#clip0_2558_1236)">
        <path d="M1 9L-4.37114e-08 9L4.37114e-08 11L1 11L1 9ZM1 11L13 11L13 9L1 9L1 11Z" fill="black"/>
        <path d="M19.2111 9.10557C19.9482 9.4741 19.9482 10.5259 19.2111 10.8944L12.4472 14.2764C11.7823 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 11.7823 5.39116 12.4472 5.72361L19.2111 9.10557Z" fill="black"/>
    </g>
    <defs>
        <clipPath id="clip0_2558_1236">
            <rect width="20" height="20" fill="white"/>
        </clipPath>
    </defs>
</svg>`,
            alt: 'read',
          },
          backgroundColor: 'cream',
        },
        text: '',
        content: '',
      };

      return item;
    });

export const Default: Story = {
  args: {
    items: generateItems(9),
    resetLinkFilter:
      'http://localhost:6006/?path=/story/layout-grid-cards--default',
    filter: {
      id: 'filter',
      placeholder: 'Filter by',
      items: [
        {
          name: 'New Products and Features',
          value: 'New Products and Features',
        },
        {
          name: 'Guides and Tutorials',
          value: 'Guides and Tutorials',
        },
        {
          name: 'News and Events',
          value: 'News and Events',
        },
        {
          name: 'Insights and Resources',
          value: 'Insights and Resources',
        },
        {
          name: 'Messaging',
          value: 'Messaging',
        },
        {
          name: 'Verify API',
          value: 'Verify API',
        },
        {
          name: 'SIP Trunking',
          value: 'SIP Trunking',
        },
        {
          name: 'Fax',
          value: 'Fax',
        },
      ],
    },
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
