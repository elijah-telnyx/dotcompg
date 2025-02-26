import type { Meta, StoryObj } from '@storybook/react';

import Button from '../Button';
import CTAMediaBanner, { type CTAMediaBannerProps } from './CTAMediaBanner';

const componentMeta: Meta<CTAMediaBannerProps> = {
  title: 'Layout/CTA Media Banner',
  component: CTAMediaBanner,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    id: 'explore-our-one-stop-shop-for-infra-at-the-edge',
    heading: 'Explore our one-stop shop for infra at the edge.',
    ctaButton: {
      type: 'button',
      text: 'Sign up',
      href: '/sign-up',
    },
    input: {
      id: 'email',
      name: 'email',
      type: 'email',
      placeholder: 'Enter email',
    },
    media: {
      src: 'https://images.ctfassets.net/2vm221913gep/7D85OO4LUXSSRnFRM3cKtl/f355cdcdce6b0c8c8138387e830515b7/Product_Detail_Hero_Comms_Alphanumeric-Sender-ID.png',
      alt: 'edge',
    },
  },
  // https://github.com/storybookjs/storybook/issues/20782#issuecomment-1892178858
  subcomponents: { Button } as Record<string, React.ComponentType<unknown>>,
};

type Story = StoryObj<CTAMediaBannerProps>;

export default componentMeta;

export const Default: Story = {};
