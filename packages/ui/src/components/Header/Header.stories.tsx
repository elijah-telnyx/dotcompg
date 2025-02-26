import type { Meta, StoryObj } from '@storybook/react';

import Header, { Menu, type HeaderProps } from './Header';
import HeaderDropdown from './HeaderDropdown';
import { within, userEvent } from '@storybook/testing-library';

const navigation = [
  {
    label: 'Products',
    id: 'products',
    items: [
      { label: 'SMS API', href: '/#sms', id: '1' },
      { label: 'Global Numbers', href: '/#global-numbers', id: '1' },
      { label: 'SIP Trunking', href: '/#sip', id: '1' },
      { label: 'IoT SIM Card', href: '/#sim-card', id: '1' },
      { label: 'Voice API', href: '/#voice', id: '1' },
      { label: 'Storage', href: '/#storage', id: '1' },
    ],
    seeMoreLink: {
      label: 'See all products',
      href: '/#see-all-products',
      id: '1',
    },
  },
  { label: 'Solutions', href: '/#solutions', id: '1' },
  {
    label: 'Pricing',
    id: 'pricing',
    items: [
      { label: 'SMS API', href: '/#sms', id: 'sms' },
      { label: 'Global Numbers', href: '/#global-numbers', id: 'numbers' },
      { label: 'SIP Trunking', href: '/#sip', id: 'sip' },
      { label: 'IoT SIM Card', href: '/#sim-card', id: 'card' },
      { label: 'Voice API', href: '/#voice', id: 'voice' },
      { label: 'Storage', href: '/#storage', id: 'storage' },
    ],
    seeMoreLink: {
      label: 'See all products',
      href: '/#see-all-pricing',
      id: '2',
    },
  },
  {
    label: 'Why Telnyx',
    id: 'why-telnyx',
    items: [
      { label: 'About us', href: '/#about-us', id: 'about-us' },
      {
        label: 'Mission Control',
        href: '/#mission-control',
        id: '/#mission-control',
      },
      { label: 'Network', href: '/#network', id: '/#network' },
      { label: 'Partners', href: '/#partners', id: '/#partners' },
      { label: 'Coverage', href: '/#coverage', id: '/#coverage' },
      { label: 'Integrations', href: '/#integrations', id: '/#integrations' },
    ],
  },
  {
    label: 'Resources',
    id: 'resources',
    items: [
      {
        label: 'Customer stories',
        href: '/#customer-stories',
        id: 'customer-stories',
      },
      { label: 'Glossary', href: '/#glossary', id: 'glossary' },
      { label: 'Blog', href: '/#blog', id: 'blog' },
      { label: 'Regulatory', href: '/#regulatory', id: 'regulatory' },
      {
        label: 'Support center',
        href: '/#support-center',
        id: 'support-center',
      },
      {
        label: 'Pricing calculator',
        href: '/#pricing-calculator',
        id: 'pricing-calculator',
      },
    ],
  },
  {
    label: 'Developers',
    id: 'developers',
    items: [
      { label: 'Dev docs', href: 'https://dev-docs', id: 'dev-docs' },
      {
        label: 'Dev community',
        href: 'https://dev-community',
        id: 'dev-community',
      },
    ],
  },
];

const componentMeta: Meta<HeaderProps> = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'Dark' },
  },
  // https://github.com/storybookjs/storybook/issues/20782#issuecomment-1892178858
  subcomponents: {
    Menu,
    HeaderDropdown,
  } as Record<string, React.ComponentType<unknown>>,
  args: {
    navigation,
  },
};

export default componentMeta;

type Story = StoryObj<HeaderProps>;

export const WithContent: Story = {};

export const WithDropdownOpen: Story = {
  play: async ({ canvasElement }) => {
    const { getAllByText } = within(
      canvasElement.parentElement || canvasElement
    );
    await userEvent.click(await getAllByText('Why Telnyx')[0]);
  },
};

export const WithMenuOpen: Story = {
  play: async ({ canvasElement }) => {
    const { getByText } = within(canvasElement);
    await userEvent.click(await getByText('Main menu'));
  },
  parameters: {
    viewport: {
      defaultViewport: 'xs',
    },
  },
};

export const SimpleHeader: Story = {
  args: {
    simpleHeaderFooter: true,
  },
};
