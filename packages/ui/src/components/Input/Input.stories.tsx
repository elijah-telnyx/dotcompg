import type { Meta, StoryObj } from '@storybook/react';

import Input, { type InputProps } from '.';
import InputPassword from './InputPassword';
import Search from '../Icons/Search';

const componentMeta: Meta<InputProps> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    options: {
      showPanel: true,
    },
  },
};

export default componentMeta;

type Story = StoryObj<InputProps>;

export const Default: Story = {};
Default.args = {
  label: 'First Name',
  id: 'first_name',
  name: 'first_name',
};

export const WithPlaceholder: Story = {
  args: {
    label: 'First Name',
    id: 'first_name',
    name: 'first_name',
    placeholder: 'Jane Doe',
  },
};

export const WithDefaultValue: Story = {
  args: {
    ...WithPlaceholder.args,
    defaultValue: 'Lucas Rosa',
  },
};

export const WithReadOnlyValue: Story = {
  args: {
    ...WithPlaceholder.args,
    value: 'Lucas Rosa',
  },
};

export const WithInvalidValue: Story = {
  args: {
    label: 'Email',
    id: 'email',
    name: 'email',
    type: 'email',
    defaultValue: 'na@me@example.com',
  },
};

export const WithInfo: Story = {
  args: {
    ...WithInvalidValue.args,
    defaultValue: 'lucas@gmail.com',
    message: {
      type: 'info',
      text: 'Informational message',
    },
  },
};

export const WithError: Story = {
  args: {
    ...WithInfo.args,
    message: {
      type: 'error',
      text: 'Please enter a valid email address.',
    },
  },
};

export const WithSuccess: Story = {
  args: {
    ...WithInfo.args,
    message: {
      type: 'success',
      text: 'Success message',
    },
  },
};

export const WithCheckbox: Story = {
  args: {
    label: 'I want to receive marketing emails from Telnyx.',
    id: 'subscription_opt_in',
    name: 'subscription_opt_in',
    type: 'checkbox',
  },
};

export const WithReadOnlyCheckbox: Story = {
  args: {
    label: 'I want to receive marketing emails from Telnyx.',
    id: 'subscription_opt_in_read_only',
    name: 'subscription_opt_in_read_only',
    type: 'checkbox',
    checked: true,
  },
};

export const WithPassword: Story = {
  render: (args) => <InputPassword {...args} />,
  args: {
    label: 'Password',
    id: 'password',
    name: 'password',
    placeholder: 'Password',
  },
};

export const WithSearch: Story = {
  args: {
    id: 'country',
    name: 'country',
    placeholder: 'Search country',
    type: 'search',
    isDark: false,
  },
};

export const WithSearchAndIcon: Story = {
  args: {
    id: 'country',
    name: 'country',
    placeholder: 'Search country',
    type: 'search',
    suffix: <Search />,
    isDark: false,
  },
};

export const AsTextarea: Story = {
  args: {
    label: 'Textarea field',
    id: 'asTextarea',
    name: 'asTextarea',
    placeholder: 'Text area',
    type: 'textarea',
  },
};

export const AsRange: Story = {
  args: {
    id: 'storage_price_calc',
    name: 'storage_price_calc',
    type: 'range',
    min: 1,
    max: 1000,
    step: 1,
    minLabel: 'TB',
    maxLabel: 'TB',
  },
};

export const Radio: Story = {
  render: (args) => (
    <>
      <Input {...args} />
      <Input
        {...args}
        defaultChecked
        id='radioInputDefaultChecked'
        message={{
          text: 'Default checked',
          type: 'info',
        }}
      />
    </>
  ),
  args: {
    type: 'radio',
    label: 'Radio field',
    id: 'radioInput',
    name: 'radioInput',
  },
};
