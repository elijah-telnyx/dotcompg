import type { Meta, StoryObj } from '@storybook/react';
import Select, { type SelectProps } from './Select';
import * as BasicSelect from './Basic';
import { useArgs } from '@storybook/client-api';

const componentMeta: Meta<SelectProps> = {
  title: 'Components/Select',
  component: Select,
  args: {
    id: 'country-filter',
    placeholder: 'Filter by country list',
    items: [
      { name: 'United States', value: 'US' },
      { name: 'Australia', value: 'AU' },
      { name: 'Canada', value: 'CA' },
      { name: 'United Kingdom', value: 'GB' },
    ],
    value: undefined,
  },
};

export default componentMeta;

export const Default: StoryObj<SelectProps> = {};
export const BasicSelectDark: StoryObj<BasicSelect.SelectProps> = {
  name: 'Basic Select - dark theme',
  render: (args) => {
    return (
      <BasicSelect.Select {...args}>
        {[
          { name: 'United States', value: 'US' },
          { name: 'Australia', value: 'AU' },
          { name: 'Canada', value: 'CA' },
          { name: 'United Kingdom', value: 'GB' },
        ].map((option) => (
          <BasicSelect.Option key={option.value} {...option}>
            {option.name}
          </BasicSelect.Option>
        ))}
      </BasicSelect.Select>
    );
  },
  args: {
    theme: 'dark',
  },
};
export const BasicSelectLight: StoryObj<BasicSelect.SelectProps> = {
  name: 'Basic Select - light theme',
  render: (args) => {
    return (
      <BasicSelect.Select {...args}>
        {[
          { name: 'United States', value: 'US' },
          { name: 'Australia', value: 'AU' },
          { name: 'Canada', value: 'CA' },
          { name: 'United Kingdom', value: 'GB' },
        ].map((option) => (
          <BasicSelect.Option key={option.value} {...option}>
            {option.name}
          </BasicSelect.Option>
        ))}
      </BasicSelect.Select>
    );
  },
  args: {
    theme: 'light',
  },
};

export const SmallList: StoryObj<SelectProps> = {
  decorators: [
    (Story) => {
      const [args, setArgs] = useArgs();
      const { value } = args;
      const setValue = (value: string) => {
        setArgs({ ...args, value });
      };
      return Story({
        args: {
          ...args,
          scrollable: false,
          value,
          onValueChange: setValue,
        },
      });
    },
  ],
};

export const WithResetLink: StoryObj<SelectProps> = {
  decorators: [
    (Story) => {
      const [args, setArgs] = useArgs();
      const { value } = args;
      const setValue = (value: string) => {
        setArgs({
          ...args,
          value,
          resetLink: 'http://localhost:6006/?path=/story/components-select',
        });
      };
      return Story({
        args: {
          ...args,
          scrollable: false,
          value,
          onValueChange: setValue,
        },
      });
    },
  ],
};

export const WithPortal: StoryObj<SelectProps> = {
  decorators: [
    (Story) => {
      const [args, setArgs] = useArgs();
      const { value } = args;
      const setValue = (value: string) => {
        setArgs({ ...args, value });
      };
      return Story({
        args: {
          ...args,
          scrollable: false,
          portal: true,
          value,
          onValueChange: setValue,
        },
      });
    },
  ],
};

export const WithValue: StoryObj<SelectProps> = {
  decorators: [
    (Story) => {
      const [args, setArgs] = useArgs();
      const { value } = args;
      const setValue = (value: string) => {
        setArgs({ ...args, value });
      };
      return Story({
        args: {
          ...args,
          scrollable: false,
          value,
          onValueChange: setValue,
        },
      });
    },
  ],
  args: {
    value: 'US',
  },
};

export const WithGroups: StoryObj<SelectProps> = {
  decorators: [
    (Story) => {
      const [args, setArgs] = useArgs();
      const { value } = args;
      const setValue = (value: string) => {
        setArgs({ ...args, value });
      };
      return Story({
        args: {
          ...args,
          scrollable: false,
          items: [
            {
              name: 'America',
              value: 'america',
              items: [
                { name: 'Canada', value: 'CA' },
                { name: 'United States', value: 'US' },
              ],
            },
            {
              name: 'Europe',
              value: 'Europe',
              items: [
                { name: 'Ireland', value: 'IE' },
                { name: 'United Kingdom', value: 'GB' },
              ],
            },
          ],
          value,
          onValueChange: setValue,
        },
      });
    },
  ],
};

export const LongList: StoryObj<SelectProps> = {
  decorators: [
    (Story) => {
      const [args, setArgs] = useArgs();
      const { value } = args;
      const setValue = (value: string) => {
        setArgs({ ...args, value });
      };
      return Story({
        args: {
          ...args,
          value,
          onValueChange: setValue,
        },
      });
    },
  ],
  args: {
    items: [
      {
        name: 'United States',
        value: 'US',
      },
      {
        name: 'Afghanistan',
        value: 'AF',
      },
      {
        name: 'Aland Islands',
        value: 'AX',
      },
      {
        name: 'Albania',
        value: 'AL',
      },
      {
        name: 'Algeria',
        value: 'DZ',
      },
      {
        name: 'American Samoa',
        value: 'AS',
      },
      {
        name: 'Andorra',
        value: 'AD',
      },
      {
        name: 'Angola',
        value: 'AO',
      },
      {
        name: 'Anguilla',
        value: 'AI',
      },
      {
        name: 'Antarctica',
        value: 'AQ',
      },
      {
        name: 'Antigua and Barbuda',
        value: 'AG',
      },
      {
        name: 'Argentina',
        value: 'AR',
      },
      {
        name: 'Armenia',
        value: 'AM',
      },
      {
        name: 'Aruba',
        value: 'AW',
      },
      {
        name: 'Australia',
        value: 'AU',
      },
      {
        name: 'Austria',
        value: 'AT',
      },
      {
        name: 'Azerbaijan',
        value: 'AZ',
      },
    ],
  },
};
