import type { Meta, StoryObj } from '@storybook/react';

import Article, { type ArticleProps } from './Article';

const componentMeta: Meta<typeof Article> = {
  title: 'Layout/Article',
  component: Article,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<ArticleProps>;

export const Default: Story = {
  args: {
    breadcrumbLink: {
      href: '/resources',
      text: 'Back to blog',
      type: 'link',
      linkKind: 'cta',
      linkIcon: {
        src: '',
        svg: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_4646_1199)">
          <path d="M21 9L22 9L22 11L21 11L21 9ZM21 11L9.00002 11L9.00002 9L21 9L21 11Z" fill="currentColor" />
          <path
              d="M2.78886 9.10557C2.05181 9.4741 2.05181 10.5259 2.78885 10.8944L9.55279 14.2764C10.2177 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 10.2177 5.39116 9.55279 5.72361L2.78886 9.10557Z"
              fill="currentColor" />
      </g>
      <defs>
          <clipPath id="clip0_4646_1199">
              <rect width="20" height="20" fill="white" />
          </clipPath>
      </defs>
  </svg>`,
        alt: 'back',
      },
      linkDirection: 'rtl',
    },
    tagline: 'Guides and Tutorials • Published 08/26/2022',
    heading: '3 customer engagement tools you need on your platform',
    copy: 'Elevate your customer engagement platform with these three engagement tools.',
    author: {
      icon: {
        src: 'https://images.ctfassets.net/taysl255dolk/4wtANA4Qy1G8izHcOXSpez/6b054c95efcc3cc90068996ed37114b6/TechCrunch-bw-circle-crop-small.png',
        alt: '',
      },
      copy: 'Odhran Reidy',
    },
    media: {
      src: '//images.ctfassets.net/taysl255dolk/29VSIjeilR0mKriJOfZ6cW/80db24fa08eddc36ae8f6aa6056e49c5/customer_engagement_tools_telnyx.png',
      alt: 'Customer Engagement Tools Telnyx',
    },
    body: {
      children: `Customer expectations are evolving and digital communication often dictates how consumers interact with service providers. According to HubSpot, 58% of customers expect brands to make them [feel heard, appreciated and valued](https://blog.hubspot.com/service/customer-service-expectations#top-customer-service-expectations). What better way to meet your customers' expectations than engaging them consistently? 

Customer engagement platforms need flexible tools that enable their clients to serve targeted content, resolve concerns and collect feedback in efforts to make customers feel heard, appreciated and valued.

To meet customers' growing expectations, engagement platforms must use reliable infrastructure so they can deliver high-quality services to brands. This is where communication APIs come in. With the right APIs, customer engagement providers can focus on optimizing features without worrying about platform stability. Here, we'll provide three examples of API-driven customer engagement tools that you can add to your platform.`,
    },
  },
};
