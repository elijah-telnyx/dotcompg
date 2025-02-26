import type { Meta, StoryObj } from '@storybook/react';
import { disablePropList } from '../../utils/storybook';
import Button, { type ButtonProps } from './Button';
import { ActionButton, type ActionButtonProps } from './ActionButton';
import ArrowDown from '../Icons/ArrowDown';
import { userEvent, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

const componentMeta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    options: {
      showPanel: true,
    },
  },
  argTypes: {
    kind: {
      control: 'inline-radio',
    },
    background: {
      control: 'inline-radio',
    },
    variant: {
      control: 'inline-radio',
      options: ['header', 'none'],
    },
    ...disablePropList(['as', 'href', 'ref', 'css']),
  },
};

export default componentMeta;

type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};
export const Hover: Story = {
  args: {
    children: 'Hover',
  },
  parameters: { pseudo: { hover: true } },
};

export const Primary: Story = {
  args: {
    children: 'Primary',
    kind: 'primary',
  },
};
const onClickMock = jest.fn();
export const ActionButtonStory: StoryObj<ActionButtonProps> = {
  name: 'ActionButton',
  render(args) {
    return <ActionButton {...args} onClick={onClickMock} />;
  },
  args: {
    icon: ArrowDown,
    kind: 'primary',
    label: 'Action',
  },
  argTypes: {
    showTooltipOnHover: {
      control: 'boolean',
      defaultValue: true,
    },
    kind: {
      control: 'inline-radio',
      options: ['primary', 'secondary'],
      defaultValue: 'primary',
    },
    size: {
      control: 'inline-radio',
      options: ['medium', 'large'],
      defaultValue: 'medium',
    },
    ...disablePropList(['background', 'variant']),
  },
  play: ({ canvasElement }) => {
    const { getByLabelText } = within(canvasElement);
    const button = getByLabelText('Action');
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
    onClickMock.mockClear();
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    kind: 'secondary',
  },
};
export const List: Story = {
  args: {
    children: 'List',
    kind: 'list',
  },
};
export const Header: Story = {
  args: {
    children: 'sign up',
    kind: 'primary',
    background: 'dark',
    variant: 'header',
  },
  parameters: {
    backgrounds: { default: 'Dark' },
  },
};

export const DarkBackground: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button {...args} kind='primary'>
        Primary
      </Button>
      <Button {...args} kind='secondary'>
        Secondary
      </Button>
    </div>
  ),
  args: {
    background: 'dark',
  },
  parameters: {
    backgrounds: { default: 'Dark' },
    options: {
      showPanel: false,
    },
  },
  argTypes: {
    kind: {
      table: {
        disable: true,
      },
    },
  },
};

export const LightBackground: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button {...args} kind='primary'>
        Primary
      </Button>
      <Button {...args} kind='secondary'>
        Secondary
      </Button>
    </div>
  ),
  args: {
    background: 'light',
  },
  parameters: {
    backgrounds: { default: 'Light' },
    options: {
      showPanel: false,
    },
  },
  argTypes: {
    kind: {
      table: {
        disable: true,
      },
    },
  },
};

export const Loading: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button {...args} kind='primary' background='light'>
        Primary
      </Button>
      <Button {...args} kind='secondary' background='dark'>
        Secondary
      </Button>
    </div>
  ),
  args: {
    loading: true,
  },
};

export const LightBackgroundWithIcon: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button {...args} kind='primary'>
        Primary
      </Button>
      <Button {...args} kind='secondary'>
        Secondary
      </Button>
    </div>
  ),
  args: {
    background: 'light',
    icon: {
      src: '',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <g clip-path="url(#clip0_2558_1250)">
            <path d="M3.29289 15.2929L2.58579 16L4 17.4142L4.70711 16.7071L3.29289 15.2929ZM4.70711 16.7071L12.8671 8.54709L11.4529 7.13288L3.29289 15.2929L4.70711 16.7071Z" fill="currentColor"/>
            <path d="M15.7028 3.03247C16.4846 2.77188 17.2283 3.51562 16.9678 4.29738L14.7119 11.065C14.4768 11.7703 13.5817 11.9816 13.0561 11.4559L8.5443 6.94415C8.01865 6.4185 8.22994 5.52343 8.93518 5.28835L15.7028 3.03247Z" fill="currentColor"/>
        </g>
        <defs>
            <clipPath id="clip0_2558_1250">
                <rect width="20" height="20" fill="white"/>
            </clipPath>
        </defs>
    </svg>`,
      alt: 'external',
    },
  },
  parameters: {
    backgrounds: { default: 'Light' },
    options: {
      showPanel: false,
    },
  },
  argTypes: {
    kind: {
      table: {
        disable: true,
      },
    },
  },
};

export const DarkBackgroundWithIcon: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button {...args} kind='primary'>
        Primary
      </Button>
      <Button {...args} kind='secondary'>
        Secondary
      </Button>
    </div>
  ),
  args: {
    background: 'dark',
    icon: {
      src: '',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <g clip-path="url(#clip0_2558_1250)">
            <path d="M3.29289 15.2929L2.58579 16L4 17.4142L4.70711 16.7071L3.29289 15.2929ZM4.70711 16.7071L12.8671 8.54709L11.4529 7.13288L3.29289 15.2929L4.70711 16.7071Z" fill="currentColor"/>
            <path d="M15.7028 3.03247C16.4846 2.77188 17.2283 3.51562 16.9678 4.29738L14.7119 11.065C14.4768 11.7703 13.5817 11.9816 13.0561 11.4559L8.5443 6.94415C8.01865 6.4185 8.22994 5.52343 8.93518 5.28835L15.7028 3.03247Z" fill="currentColor"/>
        </g>
        <defs>
            <clipPath id="clip0_2558_1250">
                <rect width="20" height="20" fill="white"/>
            </clipPath>
        </defs>
    </svg>`,
      alt: 'external',
    },
  },
  parameters: {
    backgrounds: { default: 'Dark' },
    options: {
      showPanel: false,
    },
  },
  argTypes: {
    kind: {
      table: {
        disable: true,
      },
    },
  },
};
