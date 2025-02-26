import type { Meta, StoryObj } from '@storybook/react';

import Button from '../Button';
import CTABanner, { type CtaBannerProps } from './CTABanner';

const componentMeta: Meta<CtaBannerProps> = {
  title: 'Layout/CTA Banner',
  component: CTABanner,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    tag: 'pricing',
    heading: 'Only pay for what you use',
    copy: 'Say goodbye to minimum order quantities and monthly data usage lock-ins. Pay as you go, for what you need and nothing more.',
    pricingCopy: 'Starting at',
    pricingValue: '$0.01/MB',
    pricingCaption: 'per minute',
    ctaButtons: [
      {
        type: 'button',
        text: 'See pricing',
        href: '#',
        backgroundColor: 'cream',
      },
    ],
  },
  // https://github.com/storybookjs/storybook/issues/20782#issuecomment-1892178858
  subcomponents: { Button } as Record<string, React.ComponentType<unknown>>,
};

export default componentMeta;

type Story = StoryObj<CtaBannerProps>;

export const Default: Story = {};

export const WithBlackBackground: Story = {
  args: {
    backgroundColor: 'black',
  },
};

export const WithCreamBackground: Story = {
  args: {
    backgroundColor: 'cream',
  },
};

export const WithBlueBackground: Story = {
  args: {
    backgroundColor: 'blue',
  },
};

export const WithGreenBackground: Story = {
  args: {
    backgroundColor: 'green',
  },
};

export const WithCitronBackground: Story = {
  args: {
    backgroundColor: 'citron',
  },
};

export const WithTanBackground: Story = {
  args: {
    backgroundColor: 'tan',
  },
};

export const With2CTAs: Story = {
  args: {
    backgroundColor: 'citron',
    ctaButtons: [
      {
        type: 'button',
        text: 'Sign up',
        href: '#',
        buttonKind: 'primary',
        backgroundColor: 'citron',
      },
      {
        type: 'button',
        text: 'Contact us',
        href: '#',
        buttonKind: 'secondary',
        backgroundColor: 'citron',
      },
    ],
  },
};

export const WithoutPricingValues: Story = {
  args: {
    tag: '',
    heading: 'Sign up and start building.',
    pricingCopy: '',
    pricingValue: '',
    copy: '',
    backgroundColor: 'green',
    ctaButtons: [
      {
        type: 'button',
        text: 'Sign up',
        href: '#',
        buttonKind: 'primary',
        backgroundColor: 'green',
      },
      {
        type: 'button',
        text: 'Contact us',
        href: '#',
        buttonKind: 'secondary',
        backgroundColor: 'green',
      },
    ],
  },
};
export const WithForm: Story = {
  args: {
    heading: 'Sign up',
    copy: 'Start building with our self-service Mission Control portal',
    backgroundColor: 'tan',
    ctaButtons: [
      {
        type: 'button',
        text: 'Sign up',
        href: '#',
        backgroundColor: 'tan',
      },
      {
        type: 'button',
        text: 'Contact us',
        href: '#',
        buttonKind: 'secondary',
        backgroundColor: 'tan',
      },
    ],
    form: {
      heading: 'Download pricing',
      formId: 1989,
    },
  },
};
