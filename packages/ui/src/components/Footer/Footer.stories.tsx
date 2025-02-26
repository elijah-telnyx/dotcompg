import Footer, { type FooterProps } from './Footer';
import type { Meta, StoryObj } from '@storybook/react';

const navigation = [
  {
    label: 'contact',
    items: [
      { label: 'Data and privacy', href: '#data-and-privacy' },
      { label: 'Report Abuse', href: '#report-abuse' },
      { label: 'Privacy Policy', href: '#privacy-policy' },
      { label: 'Cookie Policy', href: '#cookie-policy' },
      { label: 'Law Enforcement', href: '#law-enforcement' },
      { label: 'Acceptable Use', href: '#acceptable-use' },
    ],
  },
  {
    label: 'company',
    items: [
      {
        label: 'Website Terms and Conditions',
        href: '#website-terms-and-conditions',
      },
      { label: 'Press', href: '#press' },
      { label: 'Release Notes', href: '#release-notes' },
      { label: 'Careers', href: '#careers' },
    ],
  },
];

const componentMeta: Meta<FooterProps> = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    navigation,
  },
};

export default componentMeta;

type Story = StoryObj<FooterProps>;

export const FooterDefault: Story = {};

export const FooterWithThreeColumns = {
  args: {
    navigation: [...navigation, navigation[0]],
  },
};
