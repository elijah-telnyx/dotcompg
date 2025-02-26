import type { Meta, StoryObj } from '@storybook/react';

import Faq, { type FaqProps } from './Faq';

const componentMeta: Meta<FaqProps> = {
  title: 'Layout/Faq',
  component: Faq,
  args: {
    tagline: 'Faq',
    questions: [
      {
        id: String(Math.random()),
        question: 'What is an IoT SIM card?',
        answer:
          'Telnyx processes personal data to provide our products and services and for other purposes as outlined in the applicable [Privacy Policy](https://telnyx.com/privacy-policy) for the products you are using or accessing.\n\nWe provide a summary of the data we collect, organized according to different categories in the section titled "[What Kinds of Personal Information Does Telnyx Collect?](https://telnyx.com/privacy-policy#what-kinds-of-personal-information-does-telnyx-collect)"',
      },
      {
        id: String(Math.random()),
        question: 'What is cellular IoT?',
        answer: `The Internet of Things (IoT) refers to the [billions of devices that are connected to the internet, collecting and sharing data](https://www.zdnet.com/article/what-is-the-internet-of-things-everything-you-need-to-know-about-the-iot-right-now/). Cellular IoT simply connects IoT devices using cellular (or mobile) networks. Learn more about IoT connectivity best practices [here](https://telnyx.com/resources/iot-connectivity-guide).`,
      },
      {
        id: String(Math.random()),
        question: 'How much do Telnyx cellular IoT SIM cards cost?',
        answer: `Telnyx charges $1 per SIM card (plus shipping) and then $2 per active SIM per month. You can find more detailed information about Wireless pricing, including data charges [here](https://telnyx.com/pricing/wireless-pricing), or to find out more about discounts for bulk orders, please [get in touch](https://telnyx.com/contact-us).`,
      },
    ],
  },
};

export default componentMeta;

type Story = StoryObj<FaqProps>;

export const Default: Story = {
  args: {},
};

export const WithHeading: Story = {
  args: {
    tagline: '',
    id: 'iot-sim-cards-frequently-asked-questions',
    heading: 'IoT SIM Cards Frequently Asked Questions (FAQ)',
  },
};

export const WithArticleAnswer: Story = {
  args: {
    tagline: 'Faq',
    questions: [
      {
        id: String(Math.random()),
        question: 'Does Telnyx process personal data?',
        answer:
          'Telnyx processes personal data to provide our products and services and for other purposes as outlined in the applicable [Privacy Policy](https://telnyx.com/privacy-policy) for the products you are using or accessing.\n\nWe provide a summary of the data we collect, organized according to different categories in the section titled "[What Kinds of Personal Information Does Telnyx Collect?](https://telnyx.com/privacy-policy#what-kinds-of-personal-information-does-telnyx-collect)"',
        blog: true,
      },
    ],
  },
};
