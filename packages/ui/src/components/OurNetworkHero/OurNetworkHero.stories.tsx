import type { Meta, StoryObj } from '@storybook/react';

import { type OurNetworkHeroProps } from './OurNetworkHero';
import OurNetworkHero from './OurNetworkHero';

const componentMeta: Meta<OurNetworkHeroProps> = {
  title: 'Layout/Hero/Our Network Hero',
  component: OurNetworkHero,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<OurNetworkHeroProps>;

export const Default: Story = {
  args: {
    heading: 'Our private, global network',
  },
};

export const WithCopy: Story = {
  args: {
    heading: 'Our private, global network',
    copy: 'A powerful, secure IP network built over the course of a decade to combine cloud and hyperlocal edge capabilities, we power communications, wireless, networking, and storage from our private, global, multi-cloud IP network.',
  },
};

export const WithCTA: Story = {
  args: {
    heading: 'Our private, global network',
    copy: 'A powerful, secure IP network built over the course of a decade to combine cloud and hyperlocal edge capabilities, we power communications, wireless, networking, and storage from our private, global, multi-cloud IP network.',
    ctaButtons: [
      {
        type: 'button',
        text: 'Sign up',
        href: '/sign-up',
      },
      {
        type: 'button',
        buttonKind: 'secondary',
        text: 'Contact us',
        href: '/sign-up',
      },
    ],
  },
};

export const WithBackground: Story = {
  args: {
    heading: 'Our private, global network',
    copy: 'A powerful, secure IP network built over the course of a decade to combine cloud and hyperlocal edge capabilities, we power communications, wireless, networking, and storage from our private, global, multi-cloud IP network.',
    ctaButtons: [
      {
        type: 'button',
        text: 'Sign up',
        href: '/sign-up',
      },
      {
        type: 'button',
        buttonKind: 'secondary',
        text: 'Contact us',
        href: '/sign-up',
      },
    ],
    media: {
      src: 'https://images.ctfassets.net/2vm221913gep/3iEX34Bj0oP5MnwyjE5oSr/539d3ee077ae731cae695a8ae7385d65/OurNetworkBackgroundImage.webp',
      alt: 'background image network globe',
    },
    networkMap: {
      id: 'global-coverage',
      heading: 'Explore our global coverage',
      copy: 'Filter by product families, services, and regions.',
      filters: {
        services: {
          communications: {
            select: {
              placeholder: 'Services',
              value: 'Inbound Calling',
              items: [
                {
                  name: 'Inbound Calling',
                  value: 'Inbound Calling',
                },
                {
                  name: 'Local Calling',
                  value: 'Local Calling',
                },
                {
                  name: 'Emergency Calling',
                  value: 'Emergency Calling',
                },
                {
                  name: 'Fax support',
                  value: 'Fax support',
                },
                {
                  name: 'Number Portability',
                  value: 'Number Portability',
                },
                {
                  name: 'Two-way SMS',
                  value: '2 Way Sms',
                },
                {
                  name: 'Outbound SMS',
                  value: 'Outbound Sms',
                },
                {
                  name: 'Full PSTN Replacement',
                  value: 'Full PSTN Replacement',
                },
                {
                  name: 'Operator Connect',
                  value: 'Operator Connect',
                },
              ],
            },
            enabledMap: {
              'Inbound Calling': {},
              'Local Calling': {},
              'Emergency Calling': {},
              'Fax support': {},
              'Number Portability': {},
              '2 Way Sms': {},
              'Full PSTN Replacement': {},
              'Operator Connect': {},
            },
          },
          iot: {
            select: {
              placeholder: 'Services',
              value: '5G',
              items: [
                {
                  name: '5G',
                  value: '5G',
                },
                {
                  name: '4G (LTE)',
                  value: '4G (LTE)',
                },
                {
                  name: '3G',
                  value: '3G',
                },
                {
                  name: 'LTE-M',
                  value: 'LTE-M',
                },
                {
                  name: 'NB-IoT',
                  value: 'NB-IoT',
                },
              ],
            },
            enabledMap: {
              '5G': {},
              '4G (LTE)': {},
              '3G': {},
              'LTE-M': {},
              'NB-IoT': {},
            },
          },
          networking: {
            select: {
              placeholder: 'Services',
              value: 'Core PoP',
              items: [
                {
                  name: 'Telephony',
                  value: 'Telephony',
                },
                {
                  name: 'Storage',
                  value: 'Storage',
                },
                {
                  name: 'VXC',
                  value: 'VXC',
                },
                {
                  name: 'Cloud VPN',
                  value: 'Cloud VPN',
                },
                {
                  name: 'Global Edge Router',
                  value: 'Global Edge Router',
                },
              ],
            },
            enabledMap: {
              Telephony: {},
              Storage: {},
              VXC: {},
              'Cloud VPN': {},
              'Global Edge Router': {},
            },
          },
          compute: {
            select: {
              placeholder: 'Services',
              value: 'Cloud storage',
              items: [
                {
                  name: 'AI',
                  value: 'AI',
                },
                {
                  name: 'Cloud storage',
                  value: 'Cloud storage',
                },
              ],
            },
            enabledMap: {
              AI: {},
              'Cloud storage': {},
            },
          },
        },
        cta: {
          communications: {
            href: '/global-coverage',
            text: 'View full coverage',
            type: 'link',
            linkKind: 'cta',
          },
          iot: {
            href: '/iot-global-coverage',
            text: 'View full coverage',
            type: 'link',
            linkKind: 'cta',
          },
        },
      },
    },
  },
};
