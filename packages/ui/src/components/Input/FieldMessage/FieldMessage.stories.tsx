import type { Meta, StoryObj } from '@storybook/react';

import FieldMessage, { type FieldMessageProps } from '.';

const componentMeta: Meta<FieldMessageProps> = {
  title: 'Components/Input/FieldMessage',
  component: FieldMessage,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
};

export default componentMeta;

export const Default: StoryObj<FieldMessageProps> = {
  args: { children: 'Message' },
};

export const Error: StoryObj<FieldMessageProps> = {
  args: { children: 'Error Message', type: 'error' },
};

export const MultilineError: StoryObj<FieldMessageProps> = {
  args: {
    children:
      'To use this service with a free email address, it is mandatory to undergo identity verification with a government-issued ID and facial recognition. You can bypass the need for identity verification by using a company email address.',
    type: 'error',
    multiline: true,
  },
};

export const Info: StoryObj<FieldMessageProps> = {
  args: { children: 'Error Message', type: 'info' },
};

export const Success: StoryObj<FieldMessageProps> = {
  args: { children: 'Success Message', type: 'success' },
};
