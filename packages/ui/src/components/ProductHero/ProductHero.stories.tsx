import type { Meta, StoryObj } from '@storybook/react';
import ProductHero, { type ProductHeroProps } from './ProductHero';

const componentMeta: Meta<ProductHeroProps> = {
  title: 'Layout/Hero/Product Hero',
  component: ProductHero,
  args: {
    heading: 'IoT SIM Cards',
    copy: 'Secure global connectivity for your IoT devices—simplified. Telnyx IoT SIM Cards offer flexible data coverage in 180+ countries and an API to manage and configure SIMs over the air.',
    ctaButtons: [
      {
        type: 'button',
        backgroundColor: 'cream',
        text: 'ORDER A SIM CARD',
        href: '/',
      },
    ],
    ctaCopy: 'Questions? [Ask our experts.](https://google.com)',
    media: {
      src: 'https://images.ctfassets.net/2vm221913gep/5Ig6k7ICLq6sPTHKZ2kOEZ/0a095368f1e0ecee5a9341c570b2aec5/Telnyx_Product_IoTSIM_HIW_1.svg',
      alt: 'office',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<ProductHeroProps>;

export const Default: Story = {};

export const WithBlackBackground: Story = {
  args: {
    backgroundColor: 'black',
  },
};

export const WithTagline = { args: { tagline: 'Tagline' } };

export const WithChannels = {
  args: {
    channels: [
      '10DLC',
      'Toll-free',
      'Short code',
      'Alphanumeric Sender ID',
    ].map((value, id) => ({
      value,
      id,
      href: 'https://telnyx.com',
    })),
  },
};
