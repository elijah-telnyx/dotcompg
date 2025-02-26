import type { Meta, StoryObj } from '@storybook/react';

import Card, { type CardProps } from './Card';
import Section from '../Section/Section';
import Grid from '../Grid';

const componentMeta: Meta<CardProps & typeof Card> = {
  title: 'Components/Card',
  component: Card,
  args: {
    children: 'Card',
    form: false,
    sectionOnMobile: false,
    disabled: false,
    stepper: false,
  },
  argTypes: {
    form: {
      type: 'boolean',
    },
    sectionOnMobile: {
      type: 'boolean',
    },
    disabled: {
      type: 'boolean',
    },
    stepper: {
      type: 'boolean',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<CardProps>;

const render = (args: CardProps) => (
  <Section backgroundColor='green'>
    <Grid.Container>
      <Grid.FullWidthItem>
        <Card {...args} />
      </Grid.FullWidthItem>
    </Grid.Container>
  </Section>
);

export const Default: Story = {
  render,
};

export const Form: Story = {
  render,
  args: {
    form: true,
  },
};

export const FormWithSectionOnMobile: Story = {
  render,
  args: {
    form: true,
    sectionOnMobile: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'xs',
    },
  },
};

export const Stepper: Story = {
  render,
  args: {
    stepper: true,
  },
};
