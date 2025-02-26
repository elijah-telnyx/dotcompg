import type { Meta, StoryObj } from '@storybook/react';

import Resources, { type ResourcesProps } from './Resources';

const componentMeta: Meta<ResourcesProps> = {
  title: 'Layout/Resources',
  component: Resources,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<ResourcesProps>;

export const Default: Story = {
  args: {
    tagline: 'Resources',
    cards: [
      {
        heading: 'Build with an authentication API',
        copy: `Configuration guides to quickly add an authentication service to your app using SMS, Voice, Flash Call and/or WhatsApp.`,
        icon: {
          src: '',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <g clip-path="url(#clip0_702_3511)">
        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#000000" stroke-width="8"/>
    </g>
    <defs>
        <clipPath id="clip0_702_3511">
            <rect width="32" height="32" fill="currentColor"/>
        </clipPath>
    </defs>
</svg>`,
          alt: 'check',
        },
        link: {
          href: '#',
          text: 'Explore docs',
          type: 'link',
          linkKind: 'cta',
          linkIcon: {
            src: '',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <g clip-path="url(#clip0_2558_1250)">
              <path d="M3.29289 15.2929L2.58579 16L4 17.4142L4.70711 16.7071L3.29289 15.2929ZM4.70711 16.7071L12.8671 8.54709L11.4529 7.13288L3.29289 15.2929L4.70711 16.7071Z" fill="black"/>
              <path d="M15.7028 3.03247C16.4846 2.77188 17.2283 3.51562 16.9678 4.29738L14.7119 11.065C14.4768 11.7703 13.5817 11.9816 13.0561 11.4559L8.5443 6.94415C8.01865 6.4185 8.22994 5.52343 8.93518 5.28835L15.7028 3.03247Z" fill="black"/>
          </g>
          <defs>
              <clipPath id="clip0_2558_1250">
                  <rect width="20" height="20" fill="white"/>
              </clipPath>
          </defs>
      </svg>`,
            alt: 'external',
          },
          backgroundColor: 'cream',
        },
        withIconBorder: true,
      },
      {
        heading: 'How secure is two-factor authentication?',
        copy: `If you're worried about protecting your sensitive and personal information, learn how two-factor authentication can help.`,
        icon: {
          src: '',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <g clip-path="url(#clip0_702_3511)">
        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#000000" stroke-width="8"/>
    </g>
    <defs>
        <clipPath id="clip0_702_3511">
            <rect width="32" height="32" fill="currentColor"/>
        </clipPath>
    </defs>
</svg>`,
          alt: 'check',
        },
        link: {
          href: '#',
          text: 'Read article',
          type: 'link',
          linkKind: 'cta',
          linkIcon: {
            src: '',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clip-path="url(#clip0_2558_1236)">
        <path d="M1 9L-4.37114e-08 9L4.37114e-08 11L1 11L1 9ZM1 11L13 11L13 9L1 9L1 11Z" fill="black"/>
        <path d="M19.2111 9.10557C19.9482 9.4741 19.9482 10.5259 19.2111 10.8944L12.4472 14.2764C11.7823 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 11.7823 5.39116 12.4472 5.72361L19.2111 9.10557Z" fill="black"/>
    </g>
    <defs>
        <clipPath id="clip0_2558_1236">
            <rect width="20" height="20" fill="white"/>
        </clipPath>
    </defs>
</svg>`,
            alt: 'read',
          },
          backgroundColor: 'cream',
        },
        withIconBorder: true,
      },
      {
        heading: 'What is two-factor authentication?',
        copy: `We dive into how two-factor authentication works to add an extra layer of security, the different types of 2FA and more.`,
        icon: {
          src: '',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <g clip-path="url(#clip0_702_3511)">
        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#000000" stroke-width="8"/>
    </g>
    <defs>
        <clipPath id="clip0_702_3511">
            <rect width="32" height="32" fill="currentColor"/>
        </clipPath>
    </defs>
</svg>`,
          alt: 'check',
        },
        link: {
          href: '#',
          text: 'Read article',
          type: 'link',
          linkKind: 'cta',
          linkIcon: {
            src: '',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clip-path="url(#clip0_2558_1236)">
        <path d="M1 9L-4.37114e-08 9L4.37114e-08 11L1 11L1 9ZM1 11L13 11L13 9L1 9L1 11Z" fill="black"/>
        <path d="M19.2111 9.10557C19.9482 9.4741 19.9482 10.5259 19.2111 10.8944L12.4472 14.2764C11.7823 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 11.7823 5.39116 12.4472 5.72361L19.2111 9.10557Z" fill="black"/>
    </g>
    <defs>
        <clipPath id="clip0_2558_1236">
            <rect width="20" height="20" fill="white"/>
        </clipPath>
    </defs>
</svg>`,
            alt: 'read',
          },
          backgroundColor: 'cream',
        },
        withIconBorder: true,
      },
    ],
  },
};

export const WithCodes: Story = {
  args: {
    tagline: 'Resources',
    heading: 'Start building',
    copy: 'Our code is your code.',
    cards: [
      {
        icon: {
          src: '',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <g clip-path="url(#clip0_702_3511)">
            <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#000000" stroke-width="8"/>
        </g>
        <defs>
            <clipPath id="clip0_702_3511">
                <rect width="32" height="32" fill="currentColor"/>
            </clipPath>
        </defs>
    </svg>`,
          alt: 'check',
        },
        heading: 'Documentation',
        copy: `Explore tutorials to activate and configure IoT SIM cards on Raspberry Pi, PepWave and other popular devices. Or, browse our in-depth API reference.`,
        link: {
          href: '#',
          type: 'link',
          linkKind: 'cta',
          text: 'Explore docs',
          linkIcon: {
            src: '',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <g clip-path="url(#clip0_2558_1250)">
              <path d="M3.29289 15.2929L2.58579 16L4 17.4142L4.70711 16.7071L3.29289 15.2929ZM4.70711 16.7071L12.8671 8.54709L11.4529 7.13288L3.29289 15.2929L4.70711 16.7071Z" fill="black"/>
              <path d="M15.7028 3.03247C16.4846 2.77188 17.2283 3.51562 16.9678 4.29738L14.7119 11.065C14.4768 11.7703 13.5817 11.9816 13.0561 11.4559L8.5443 6.94415C8.01865 6.4185 8.22994 5.52343 8.93518 5.28835L15.7028 3.03247Z" fill="black"/>
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
        withIconBorder: true,
      },
      {
        icon: {
          src: '',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <g clip-path="url(#clip0_702_3511)">
        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#000000" stroke-width="8"/>
    </g>
    <defs>
        <clipPath id="clip0_702_3511">
            <rect width="32" height="32" fill="currentColor"/>
        </clipPath>
    </defs>
</svg>`,
          alt: 'check',
        },
        heading: 'Cellular data for Point of Sale IoT',
        copy: `Does your Point of Sale IoT system leverage cellular data? Read about ways to optimize connectivity for your PoS IoT devices.`,
        link: {
          href: '#',
          type: 'link',
          linkKind: 'cta',
          text: 'Download eBook',
          linkIcon: {
            src: '',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <g clip-path="url(#clip0_2558_1240)">
              <path d="M11 0V-1H9V0H11ZM9 0V12H11V0H9Z" fill="black"/>
              <path d="M1 11V19H19V11" stroke="black" stroke-width="2" stroke-linecap="square"/>
              <path d="M10.8944 15.2111C10.5259 15.9482 9.4741 15.9482 9.10557 15.2111L5.72361 8.44721C5.39116 7.78231 5.87465 7 6.61804 7L13.382 7C14.1253 7 14.6088 7.78231 14.2764 8.44721L10.8944 15.2111Z" fill="black"/>
          </g>
          <defs>
              <clipPath id="clip0_2558_1240">
                  <rect width="20" height="20" fill="white"/>
              </clipPath>
          </defs>
      </svg>`,
            alt: 'download',
          },
        },
        withIconBorder: true,
      },
      {
        icon: {
          src: '',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <g clip-path="url(#clip0_702_3511)">
        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#000000" stroke-width="8"/>
    </g>
    <defs>
        <clipPath id="clip0_702_3511">
            <rect width="32" height="32" fill="currentColor"/>
        </clipPath>
    </defs>
</svg>`,
          alt: 'check',
        },
        heading: 'Create a private LTE network with Telnyx Wireless',
        copy: `Learn why private LTE networks are essential for secure IoT, and find out how to build one with Private Wireless Gateways and IoT SIM Cards.`,
        link: {
          href: '#',
          type: 'link',
          linkKind: 'cta',
          text: 'Read article',
          linkIcon: {
            src: '',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <g clip-path="url(#clip0_2558_1236)">
              <path d="M1 9L-4.37114e-08 9L4.37114e-08 11L1 11L1 9ZM1 11L13 11L13 9L1 9L1 11Z" fill="black"/>
              <path d="M19.2111 9.10557C19.9482 9.4741 19.9482 10.5259 19.2111 10.8944L12.4472 14.2764C11.7823 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 11.7823 5.39116 12.4472 5.72361L19.2111 9.10557Z" fill="black"/>
          </g>
          <defs>
              <clipPath id="clip0_2558_1236">
                  <rect width="20" height="20" fill="white"/>
              </clipPath>
          </defs>
      </svg>`,
            alt: 'internal',
          },
        },
        withIconBorder: true,
      },
    ],
    codes: [
      {
        heading: 'PHP',
        code: `
      $telnyx = new  \\Telnyx\\Client('YOUR_ACCESS_KEY');
      $telnyx = new \\telnyx\\Objects\\Message();
      $telnyx->originator = '$telnyx';
      $telnyx->recipients = [31612345678];
      $telnyx->body = 'This is a test message.';

      $$telnyx->messages->create($message);`,
      },
      {
        heading: 'Node',
        code: `
    const telnyx = require('telnyx')('YOUR_API_KEY');

    const { data: simCard } = await telnyx.simCards.update(
      id,
      { tags: ['region_7', 'int_cards'] }
    );`,
      },
      {
        heading: 'Python',
        code: `
    import telnyx
    telnyx.api_key = "YOUR_API_KEY"

    res = telnyx.SIMCard.retrieve(id)
    res.created_at = "2018-02-02T22:25:27.521Z"
    res.iccid = "89310410106543789301"

    res.save()`,
      },
    ],
  },
};
