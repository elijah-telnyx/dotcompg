import type { Meta, StoryObj } from '@storybook/react';
import SidebarLinks, { type SidebarLinksProps } from './SidebarLinks';
import Markdown from '../Markdown';

const markdownPage = `
## 1. Host live customer support and sales conversations with Video APIs

Video is an integral part of digital communications. From social media to conferencing to streaming platforms, video is embedded in our lives and daily interactions.

## 2. Collect customer feedback surveys with SMS APIs

Customer feedback is valuable to any business because it enables brands to improve products and services while [creating relevant content](https://www.forbes.com/sites/theyec/2020/08/03/three-reasons-customer-feedback-is-important-for-your-e-commerce-business/?sh=2c22b82243f8) for customers.

## 3. Automate customer service with conversational AI

The increase in customer inquiries during the COVID-19 pandemic illustrates the importance of customer support within business operations. At the beginning of the pandemic, customers reported [record wait times](https://www.washingtonpost.com/technology/2020/04/14/customer-service-coronavirus/) as they attempted to contact service providers.

`;
export const SidebarLinksWithContent = (props: SidebarLinksProps) => {
  return (
    <>
      <SidebarLinks {...props} />
      <Markdown blog>{markdownPage}</Markdown>
    </>
  );
};

const componentMeta: Meta<SidebarLinksProps> = {
  title: 'Components/Sidebar Links',
  component: SidebarLinks,
  args: {
    items: [
      {
        text: 'Host live customer support',
        href: '#host-live-customer-support-and-sales-conversations-with-video-apis',
      },
      {
        text: 'Collect customer feedback',
        href: '#collect-customer-feedback-surveys-with-sms-apis',
      },
      {
        text: 'Automate customer service',
        href: '#automate-customer-service-with-conversational-ai',
      },
    ],
  },
};

export default componentMeta;

type story = StoryObj<SidebarLinksProps>;

export const Default: story = {};
