import type { Meta, StoryObj } from '@storybook/react';
import HomePageCtaSection, { type HomePageCtaSectionProps } from '.';

const Main: Meta<HomePageCtaSectionProps> = {
  title: 'Components/HomePageCtaSection',
  component: HomePageCtaSection,
  args: {
    tagline: 'Sign up',
    heading: 'Connect with us',
    copy: 'Sign up for our marketing newsletter for new products and feature updates, tutorials, and events.',
    form: {
      ctaButton: {
        type: 'button',
        text: 'Submit',
        href: '/sign-up',
      },
      input: {
        id: 'email',
        name: 'email',
        type: 'email',
        placeholder: 'Enter business email',
      },
      footerCopy:
        'You can unsubscribe at any time. Read our [privacy policy](https://telnyx.com/privacy-policy) and [terms and conditions](https://telnyx.com/terms-and-conditions).',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default Main;

type story = StoryObj<HomePageCtaSectionProps>;

export const WithContent: story = {};
