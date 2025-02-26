import type { Meta, StoryObj } from '@storybook/react';

import BaseCtaBanner, { type BaseCtaBannerProps } from './BaseCtaBanner';

const componentMeta: Meta<typeof BaseCtaBanner> = {
  title: 'Components/Base Cta Banner',
  component: BaseCtaBanner,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<BaseCtaBannerProps>;

export const Default: Story = {
  args: {
    heading: 'Sign up',
    copy: 'Start building with our self-service Mission Control portal.',
    ctaButtons: [
      { text: 'Sign up', href: '#signup', type: 'button' },
      {
        text: 'Contact us',
        href: '#contactus',
        type: 'button',
        buttonKind: 'secondary',
      },
    ],
  },
};

export const Centered: Story = {
  args: {
    heading: 'Sign up',
    copy: 'Start building with our self-service Mission Control portal.',
    centered: true,
    ctaButtons: [
      { text: 'Sign up', href: '#signup', type: 'button' },
      {
        text: 'Contact us',
        href: '#contactus',
        type: 'button',
        buttonKind: 'secondary',
      },
    ],
    spacingTop: 'continuous',
    hasOverflow: false,
    backgroundColor: 'cream',
    spacingBottom: 'contrasting',
  },
};

export const WithTwoColumns: Story = {
  args: {
    heading: 'Sign up and start building.',
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
