import type { Meta, StoryObj } from '@storybook/react';
import ComposableArticle, {
  type ComposableArticleProps,
} from './ComposableArticle';

const componentMeta: Meta<ComposableArticleProps> = {
  title: 'Layout/Composable Article',
  component: ComposableArticle,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    form: {
      formId: 1470,
      heading: 'Sign up for emails of our latest articles and news',
      smallFieldLayout: true,
    },
    author: {
      id: 'author-emily-wynne',
      copy: 'Emily Wynne',
      icon: {
        src: 'https://images.ctfassets.net/taysl255dolk/NuyPNQz6waKcnkfhcJAn3/1a35e90957b8b331b72908b84c38e277/photo__1_.jpg',
        alt: 'Emily Wynne picture',
      },
      description: {
        children: `Emily is one of our product marketing managers here at Telnyx. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      },
      linkedin: 'https://www.linkedin.com/in/emily-861193a8/',
    },
    socialShareTitle: '3 customer engagement tools you need on your platform',
    socialShareDescription:
      'Elevate your customer engagement platform with these three engagement tools.',
    socialShareUrl:
      'https://telnyx.com/resources/3-customer-engagement-tools-you-need',
  },
};

export default componentMeta;

type Story = StoryObj<ComposableArticleProps>;

export const Default: Story = {
  args: {
    sections: [
      {
        children: `Customer expectations are evolving and digital communication often dictates how consumers interact with service providers. According to HubSpot, 58% of customers expect brands to make them [feel heard, appreciated and valued](https://blog.hubspot.com/service/customer-service-expectations#top-customer-service-expectations). What better way to meet your customers' expectations than engaging them consistently? 

## 1. Host live customer support and sales conversations with Video APIs

Video is an integral part of digital communications. From social media to conferencing to streaming platforms, video is embedded in our lives and daily interactions.`,
      },
      {
        children: `## 2. Collect customer feedback surveys with SMS APIs
  
Customer feedback is valuable to any business because it enables brands to improve products and services while [creating relevant content](https://www.forbes.com/sites/theyec/2020/08/03/three-reasons-customer-feedback-is-important-for-your-e-commerce-business/?sh=2c22b82243f8) for customers.`,
        backgroundColor: 'tan',
      },
      {
        children: `## 3. Automate customer service with conversational AI

The increase in customer inquiries during the COVID-19 pandemic illustrates the importance of customer support within business operations.`,
      },
    ],
  },
};
