import type { Meta, StoryObj } from '@storybook/react';
import About, { type AboutProps } from './About';

const componentMeta: Meta<AboutProps> = {
  title: 'Layout/About',
  component: About,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    tag: 'ABOUT',
  },
};

export default componentMeta;

type Story = StoryObj<AboutProps>;

export const Default: Story = {
  args: {
    heading: 'Bring smart devices online, from anywhere',
    copy: 'As the name implies, Internet of Things (IoT) systems hinge on safe, stable internet connections. As such, IoT businesses are shifting device connectivity away from old-age WiFi and ethernet connections in favor of cellular data via IoT SIM cards.',
    media: {
      src: 'https://images.ctfassets.net/2vm221913gep/6F1aKkQRDYBWoqZafnLxg7/66f53b0cb029cd9bb0f2b5089ec9e21f/Product_Detail_Hero_Wireless_IoT-SIM-Card__9_.png',
      alt: 'sim card',
    },
  },
};

export const WithLargeCopy: Story = {
  args: {
    heading: 'Bring smart devices online, from anywhere',
    copy: 'As the name implies, Internet of Things (IoT) systems hinge on safe, stable internet connections. As such, IoT businesses are shifting device connectivity away from old-age WiFi and ethernet connections in favor of cellular data via IoT SIM cards. With stronger security and broad-range coverage, IoT SIM Cards enable vendors to activate, configure and monitor devices remotely, no matter where they’re deployed. IoT vendors across industries are using Telnyx M2M IoT SIM Cards to build the next generation of point of sale, remote sensing, healthcare, mobility and logistics IoT products.',
    media: {
      src: 'https://images.ctfassets.net/2vm221913gep/6F1aKkQRDYBWoqZafnLxg7/66f53b0cb029cd9bb0f2b5089ec9e21f/Product_Detail_Hero_Wireless_IoT-SIM-Card__9_.png',
      alt: 'sim card',
    },
  },
};

export const WithoutImage: Story = {
  args: {
    heading: 'Secure omnichannel APIs for retail & e-commerce',
    copy: 'To deliver exceptional, harmonized customer experiences, you need a technology stack that services the entire business. As businesses reimagine their customer experience, Telnyx is a true infrastructure partner to help modernize and scale your omnichannel communications.',
  },
};

export const WithReverseImage: Story = {
  args: {
    heading: 'Secure omnichannel APIs for retail & e-commerce',
    copy: 'To deliver exceptional, harmonized customer experiences, you need a technology stack that services the entire business. As businesses reimagine their customer experience, Telnyx is a true infrastructure partner to help modernize and scale your omnichannel communications.',
    media: {
      src: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?w=944',
      alt: 'sim card',
    },
    reverse: true,
  },
};

export const WithDarkBackground: Story = {
  args: {
    heading: 'Secure omnichannel APIs for retail & e-commerce',
    copy: 'To deliver exceptional, harmonized customer experiences, you need a technology stack that services the entire business. As businesses reimagine their customer experience, Telnyx is a true infrastructure partner to help modernize and scale your omnichannel communications.',
    media: {
      src: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?w=944',
      alt: 'sim card',
    },
    reverse: true,
    backgroundColor: 'black',
  },
};
