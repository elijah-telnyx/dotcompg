import type { Meta, StoryObj } from '@storybook/react';
import HomePageCtaDarkSection, { type HomePageCtaDarkSectionProps } from '.';

const Main: Meta<HomePageCtaDarkSectionProps> = {
  title: 'Components/HomePageCtaDarkSection',
  component: HomePageCtaDarkSection,
  args: {
    tagline: 'Sign up',
    heading: 'Connect with us',
    copy: 'Sign up for our marketing newsletter for new products and feature updates, tutorials, and events.',
    backgroundColor: 'black',
    form: {
      ctaButton: {
        backgroundColor: 'black', // for some wierd reason having a Primary Button Kind and Dark Background gives a cream button.
        type: 'button',
        text: 'Submit',
        href: '/sign-up',
      },
      input: {
        id: 'email',
        name: 'email',
        type: 'email',
        placeholder: 'Enter business email',
        isDark: true,
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

type story = StoryObj<HomePageCtaDarkSectionProps>;

export const WithContent: story = {};
