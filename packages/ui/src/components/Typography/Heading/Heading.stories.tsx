import type { Meta, StoryObj } from '@storybook/react';
import Heading, { type HeadingProps } from './Heading';

const componentMeta: Meta<HeadingProps> = {
  title: 'Components/Typography/Heading',
  component: Heading,
  argTypes: {
    level: {
      control: 'inline-radio',
    },
    dark: {
      defaultValue: false,
    },
  },
  parameters: {
    options: {
      showPanel: true,
    },
  },
};

export default componentMeta;

type story = StoryObj<HeadingProps>;

export const H1: story = {
  args: {
    children: 'H1 Your one-stop shop for distributed infrastructure.',
    level: 1,
  },
};

export const H1Alt: story = {
  args: {
    ...H1.args,
    alt: true,
  },
  name: 'H1.Alt',
};

export const H2Category = {
  name: 'H2.Category',
  args: { children: 'H2.CATEGORY', level: 2, category: true },
};

export const H2 = {
  args: {
    children: 'H2 Stay up to date on our latest launch updates:',
    level: 2,
  },
};

export const H2Alt = {
  name: 'H2.Alt',
  args: { ...H2.args, alt: true },
};

export const H3 = { args: { children: 'H3', level: 3 } };

export const H3Alt = {
  name: 'H3.Alt',
  args: { ...H3.args, alt: true },
};
