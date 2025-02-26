import type { Meta, StoryObj } from '@storybook/react';

import RadioGroup, { type RadioGroupProps } from '.';

const componentMeta: Meta<RadioGroupProps> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    options: {
      showPanel: true,
    },
  },
};

export default componentMeta;

type Story = StoryObj<RadioGroupProps>;

export const Default: Story = {
  args: {
    items: [
      {
        value: 'ai',
        name: 'AI',
      },
      {
        value: 'cloud-storage',
        name: 'Cloud Storage',
      },
    ],
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    items: [
      {
        value: 'ai',
        name: 'AI',
      },
      {
        value: 'cloud-storage',
        name: 'Cloud Storage',
      },
    ],
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'ai',
    items: [
      {
        value: 'ai',
        name: 'AI',
      },
      {
        value: 'cloud-storage',
        name: 'Cloud Storage',
      },
    ],
  },
};

export const WithDisabledItem: Story = {
  args: {
    items: [
      {
        value: 'ai',
        name: 'AI',
      },
      {
        value: 'cloud-storage',
        name: 'Cloud Storage',
      },
      {
        value: 'new',
        name: 'Coming soon',
        disabled: true,
      },
    ],
  },
};
