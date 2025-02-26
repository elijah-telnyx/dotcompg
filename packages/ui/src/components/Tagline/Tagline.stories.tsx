import type { Meta, StoryObj } from '@storybook/react';
import Tagline, { type TaglineProps } from '.';

const componentMeta: Meta<TaglineProps> = {
  title: 'Components/Tagline',
  component: Tagline,
  args: {
    children: 'Tagline',
  },
  argTypes: {
    color: {
      control: { type: 'inline-radio' },
    },
  },
};

export default componentMeta;

type story = StoryObj<TaglineProps>;

export const Default: story = {};

export const WithColor: story = {
  args: {
    color: 'green',
  },
};
