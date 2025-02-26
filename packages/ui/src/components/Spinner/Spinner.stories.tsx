import type { StoryObj, Meta } from '@storybook/react';
import Spinner, { type SpinnerProps } from './Spinner';

const componentMeta: Meta<SpinnerProps> = {
  title: 'Components/Spinner',
  component: Spinner,
  args: {},
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
};

export default componentMeta;

export const Default: StoryObj<SpinnerProps> = {
  args: {},
};

export const Medium: StoryObj<SpinnerProps> = {
  args: {
    size: 'medium',
  },
};

export const Big: StoryObj<SpinnerProps> = {
  args: {
    size: 'big',
  },
};

export const Dark: StoryObj<SpinnerProps> = {
  args: {
    background: 'dark',
  },
  parameters: {
    backgrounds: {
      default: 'Cream',
    },
  },
};
