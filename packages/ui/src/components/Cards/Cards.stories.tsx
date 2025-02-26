import type { Meta, StoryObj } from '@storybook/react';

import Cards, { type CardsProps } from './Cards';

const componentMeta: Meta<CardsProps> = {
  title: 'Components/Cards',
  component: Cards,
};

export default componentMeta;

type Story = StoryObj<CardsProps>;

export const Default: Story = {
  args: {
    items: [
      {
        heading: 'Multi-carrier SIM',
        copy: `Use one SIM card to connect your devices to over 400 LTE, 3G, 2G and LTE-M networks in over 180 countries—including all 4 major incumbents in the U.S.`,
      },
      {
        heading: 'Intelligent network switching',
        copy: `Configure eUICC SIMs to automatically select the best available network, or pin them to a network of your choice.`,
      },
    ],
  },
};

export const ThreeItems: Story = {
  args: {
    items: [
      {
        heading: 'Documentation',
        copy: `Explore tutorials to activate and configure IoT SIM cards on Raspberry Pi, PepWave and other popular devices. Or, browse our in-depth API reference.`,
      },
      {
        heading: 'Cellular data for Point of Sale IoT',
        copy: `Does your Point of Sale IoT system leverage cellular data? Read about ways to optimize connectivity for your PoS IoT devices.`,
      },
      {
        heading: 'Create a private LTE network with Telnyx Wireless',
        copy: `Learn why private LTE networks are essential for secure IoT, and find out how to build one with Private Wireless Gateways and IoT SIM Cards.`,
      },
    ],
  },
};

export const SixItems: Story = {
  args: {
    items: [
      {
        heading: 'Multi-carrier SIM',
        copy: `Use one SIM card to connect your devices to over 400 LTE, 3G, 2G and LTE-M networks in over 180 countries—including all 4 major incumbents in the U.S.`,
      },
      {
        heading: 'Intelligent network switching',
        copy: `Configure eUICC SIMs to automatically select the best available network, or pin them to a network of your choice.`,
      },
      {
        heading: 'Pay-as-you-go pricing',
        copy: `Only pay for the data you use, with plans starting at $0.01 / MB.`,
      },
      {
        heading: 'Data limits & alerts',
        copy: `Set custom thresholds for alerts & limits across one SIM card or a group of SIM cards.`,
      },
      {
        heading: 'Private LTE networks',
        copy: `Connect devices directly to your corporate network with [Private Wireless Gateways](#) to avoid the dangers and inefficiencies of the public internet.`,
      },
      {
        heading: 'Advanced reporting',
        copy: `Export bespoke reports with in-depth usage data, network registrations, device locations and more.`,
      },
    ],
  },
};

export const FourItemsWithOrder: Story = {
  args: {
    items: [
      {
        heading: 'Multi-carrier SIM',
        copy: `Use one SIM card to connect your devices to over 400 LTE, 3G, 2G and LTE-M networks in over 180 countries—including all 4 major incumbents in the U.S.`,
      },
      {
        heading: 'Intelligent network switching',
        copy: `Configure eUICC SIMs to automatically select the best available network, or pin them to a network of your choice.`,
      },
      {
        heading: 'Pay-as-you-go pricing',
        copy: `Only pay for the data you use, with plans starting at $0.01 / MB.`,
      },
      {
        heading: 'Data limits & alerts',
        copy: `Set custom thresholds for alerts & limits across one SIM card or a group of SIM cards.`,
      },
    ],
    withOrder: true,
  },
};

export const SixItemsWithIcon: Story = {
  args: {
    items: [
      {
        heading: 'Multi-carrier SIM',
        copy: `Use one SIM card to connect your devices to over 400 LTE, 3G, 2G and LTE-M networks in over 180 countries—including all 4 major incumbents in the U.S.`,
        icon: {
          src: '',
          svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_702_3511)">
        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#00E3AA" stroke-width="8" />
    </g>
    <defs>
        <clipPath id="clip0_702_3511">
            <rect width="32" height="32" fill="currentColor" />
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
          svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_702_3511)">
        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#00E3AA" stroke-width="8" />
    </g>
    <defs>
        <clipPath id="clip0_702_3511">
            <rect width="32" height="32" fill="currentColor" />
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
          svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_702_3511)">
        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#00E3AA" stroke-width="8" />
    </g>
    <defs>
        <clipPath id="clip0_702_3511">
            <rect width="32" height="32" fill="currentColor" />
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
          svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_702_3511)">
        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#00E3AA" stroke-width="8" />
    </g>
    <defs>
        <clipPath id="clip0_702_3511">
            <rect width="32" height="32" fill="currentColor" />
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
          svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_702_3511)">
        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#00E3AA" stroke-width="8" />
    </g>
    <defs>
        <clipPath id="clip0_702_3511">
            <rect width="32" height="32" fill="currentColor" />
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
          svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_702_3511)">
        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#00E3AA" stroke-width="8" />
    </g>
    <defs>
        <clipPath id="clip0_702_3511">
            <rect width="32" height="32" fill="currentColor" />
        </clipPath>
    </defs>
</svg>`,
          alt: 'check',
        },
      },
    ],
  },
};

export const ThreeItemsWithLink: Story = {
  args: {
    items: [
      {
        icon: {
          src: '',
          svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_702_3511)">
        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#000000" stroke-width="8" />
    </g>
    <defs>
        <clipPath id="clip0_702_3511">
            <rect width="32" height="32" fill="currentColor" />
        </clipPath>
    </defs>
</svg>`,
          alt: 'checkmark',
        },
        withIconBorder: true,
        heading: 'Documentation',
        copy: `Explore tutorials to activate and configure IoT SIM cards on Raspberry Pi, PepWave and other popular devices. Or, browse our in-depth API reference.`,
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
      },
      {
        icon: {
          src: '',
          svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_702_3511)">
        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#000000" stroke-width="8" />
    </g>
    <defs>
        <clipPath id="clip0_702_3511">
            <rect width="32" height="32" fill="currentColor" />
        </clipPath>
    </defs>
</svg>`,
          alt: 'checkmark',
        },
        withIconBorder: true,
        heading: 'Cellular data for Point of Sale IoT',
        copy: `Does your Point of Sale IoT system leverage cellular data? Read about ways to optimize connectivity for your PoS IoT devices.`,
        link: {
          href: '#',
          text: 'Download eBook',
          type: 'link',
          linkKind: 'cta',
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
          backgroundColor: 'cream',
        },
      },
      {
        icon: {
          src: '',
          svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_702_3511)">
        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#000000" stroke-width="8" />
    </g>
    <defs>
        <clipPath id="clip0_702_3511">
            <rect width="32" height="32" fill="currentColor" />
        </clipPath>
    </defs>
</svg>`,
          alt: 'checkmark',
        },
        withIconBorder: true,
        heading: 'Create a private LTE network with Telnyx Wireless',
        copy: `Learn why private LTE networks are essential for secure IoT, and find out how to build one with Private Wireless Gateways and IoT SIM Cards.`,
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
      },
    ],
  },
};

export const ThreeItemsWithMedia: Story = {
  args: {
    items: [
      {
        media: {
          src: `https://images.ctfassets.net/taysl255dolk/71fII8QIQ7d3yJsOleBrEO/4f590f2d27e0b4367e5961a8b0b5d81f/blog-hero-cloud-vpn.png`,
          alt: 'cloud vpn',
        },
        tagline: 'Guides and Tutorials',
        heading: 'Introducing Telnyx Cloud VPN: Now in Open Beta',
        copy: `It's easier than ever to harness our private global backbone for your apps, devices and endpoints.`,
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
        clickable: true,
      },
      {
        media: {
          src: `https://images.ctfassets.net/taysl255dolk/29VSIjeilR0mKriJOfZ6cW/80db24fa08eddc36ae8f6aa6056e49c5/customer_engagement_tools_telnyx.png`,
          alt: 'customer engagement tools',
        },
        tagline: 'News and Events',
        heading: '3 customer engagement tools you need on your platform',
        copy: `Elevate your customer engagement platform with these three engagement tools.`,
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
        clickable: true,
      },
      {
        media: {
          src: `https://images.ctfassets.net/taysl255dolk/4NqmpNHi60z5s2sHX8KTe4/eb40e1f014b401348869d36f752882b1/1020x571_call_center_illustration_direct_inward_dialing.jpg`,
          alt: 'direct inward dialing',
        },
        tagline: 'New Products and Features',
        heading: 'What is Direct Inward Dialing?',
        copy: `Direct Inward Dialing (DID) is a service that enables businesses to receive inbound calls without extensions or operators.`,
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
        clickable: true,
      },
    ],
  },
};
