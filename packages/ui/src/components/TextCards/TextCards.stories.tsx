import type { Meta, StoryObj } from '@storybook/react';

import TextCards, { type TextCardsProps } from './TextCards';

const componentMeta: Meta<TextCardsProps> = {
  title: 'Layout/Text Cards',
  component: TextCards,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<TextCardsProps>;

const render: Story['render'] = (args) => <TextCards {...args} />;

export const WithIconCards: Story = {
  render,
  args: {
    tagline: 'Features',
    heading: 'Connect your devices on your terms',
    copy: 'Construct and deploy a device connectivity system that suits your needs and scales with you, via one global SIM card, an intuitive management portal and flexible APIs.',
    items: [
      {
        heading: 'Multi-carrier SIM',
        copy: `Use one SIM card to connect your devices to over 400 LTE, 3G, 2G and LTE-M networks in over 180 countries—including all 4 major incumbents in the U.S.`,
        icon: {
          src: '',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <g clip-path="url(#clip0_702_3511)">
        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#00E3AA" stroke-width="8"/>
    </g>
    <defs>
        <clipPath id="clip0_702_3511">
            <rect width="32" height="32" fill="currentColor"/>
        </clipPath>
    </defs>
</svg>`,
          alt: 'check',
        },
      },
      {
        heading: 'Intelligent network switching',
        copy: `Configure eUICC SIMs to automatically select the best available network, or pin them to a network of your choice.`,
        icon: {
          src: '',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <g clip-path="url(#clip0_702_3511)">
        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#00E3AA" stroke-width="8"/>
    </g>
    <defs>
        <clipPath id="clip0_702_3511">
            <rect width="32" height="32" fill="currentColor"/>
        </clipPath>
    </defs>
</svg>`,
          alt: 'check',
        },
      },
      {
        heading: 'Pay-as-you-go pricing',
        copy: `Only pay for the data you use, with plans starting at $0.01 / MB.`,
        icon: {
          src: '',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <g clip-path="url(#clip0_702_3511)">
        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#00E3AA" stroke-width="8"/>
    </g>
    <defs>
        <clipPath id="clip0_702_3511">
            <rect width="32" height="32" fill="currentColor"/>
        </clipPath>
    </defs>
</svg>`,
          alt: 'check',
        },
      },
      {
        heading: 'Data limits & alerts',
        copy: `Set custom thresholds for alerts & limits across one SIM card or a group of SIM cards.`,
        icon: {
          src: '',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <g clip-path="url(#clip0_702_3511)">
        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#00E3AA" stroke-width="8"/>
    </g>
    <defs>
        <clipPath id="clip0_702_3511">
            <rect width="32" height="32" fill="currentColor"/>
        </clipPath>
    </defs>
</svg>`,
          alt: 'check',
        },
      },
      {
        heading: 'Private LTE networks',
        copy: `Connect devices directly to your corporate network with [Private Wireless Gateways](#) to avoid the dangers and inefficiencies of the public internet.`,
        icon: {
          src: '',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <g clip-path="url(#clip0_702_3511)">
        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#00E3AA" stroke-width="8"/>
    </g>
    <defs>
        <clipPath id="clip0_702_3511">
            <rect width="32" height="32" fill="currentColor"/>
        </clipPath>
    </defs>
</svg>`,
          alt: 'check',
        },
      },
      {
        heading: 'Advanced reporting',
        copy: `Export bespoke reports with in-depth usage data, network registrations, device locations and more.`,
        icon: {
          src: '',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <g clip-path="url(#clip0_702_3511)">
        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#00E3AA" stroke-width="8"/>
    </g>
    <defs>
        <clipPath id="clip0_702_3511">
            <rect width="32" height="32" fill="currentColor"/>
        </clipPath>
    </defs>
</svg>`,
          alt: 'check',
        },
      },
    ],
  },
};

export const WithOrderedCards: Story = {
  render,
  args: {
    tagline: 'How It Works',
    items: [
      {
        heading: 'Set up verification-capable phone numbers',
        copy: `Instantly provision and configure [phone numbers](#) for calling and messaging in 200+ countries via the Telnyx Mission Control Portal.`,
      },
      {
        heading:
          'Configure your application to interact with the Telnyx Verify API',
        copy: `Set up your application to call the Telnyx Verify API when the user submits the correct criteria. This will trigger a PIN code to be sent via SMS, voice, flash call or WhatsApp to the phone number associated with that user's account.`,
      },
      {
        heading: 'Deliver and verify PIN codes',
        copy: `The user receives a code and enters it into your application's PIN code input field. Your application then sends a request to the Verify API with the user's details and entered PIN code to check if it's correct.`,
      },
      {
        heading: 'Verify API responds with appropriate result',
        copy: `If the code matches the one generated, the API will send a positive response, and your application can grant the user access in accordance with your configuration. If it isn't, the API will deliver a negative response, and you can ask the user to try again or request a new code.`,
      },
    ],
    withOrder: true,
  },
};

export const WithDarkBackground: Story = {
  render,
  args: { ...WithIconCards.args, backgroundColor: 'black' },
};
