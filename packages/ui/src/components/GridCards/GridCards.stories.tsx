import type { Meta, StoryObj } from '@storybook/react';

import type { CardProps } from '../Cards';
import GridCards, { type GridCardsProps } from './GridCards';

const componentMeta: Meta<GridCardsProps> = {
  title: 'Layout/Grid Cards',
  component: GridCards,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<GridCardsProps>;

const generateItems = (numberOfItems: number) =>
  Array(numberOfItems)
    .fill(undefined)
    .map((_, index) => {
      const item: CardProps = {
        media: {
          src: `https://images.ctfassets.net/taysl255dolk/71fII8QIQ7d3yJsOleBrEO/4f590f2d27e0b4367e5961a8b0b5d81f/blog-hero-cloud-vpn.png`,
          alt: 'card image',
        },
        tagline: 'Guides and Tutorials',
        heading: `Introducing Telnyx Cloud VPN: Now in Open Beta - ${
          index + 1
        }`,
        copy: `It's easier than ever to harness our private global backbone for your apps, devices and endpoints.`,
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
        clickable: true,
      };

      return item;
    });

export const Default: Story = {
  args: {
    heading: 'Browse our latest articles and updates',
    items: generateItems(12),
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
