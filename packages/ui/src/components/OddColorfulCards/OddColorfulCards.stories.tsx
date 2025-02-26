import type { Meta, StoryObj } from '@storybook/react';

import OddColorfulCards, {
  type OddColorfulCardsProps,
} from './OddColorfulCards';

const componentMeta: Meta<OddColorfulCardsProps> = {
  title: 'Layout/Odd Colorful Cards',
  component: OddColorfulCards,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    tagline: 'Pricing Options',
    items: [
      {
        title: 'Pay as you go',
        leadingText: `Pay per GB. You're only charged for what you use—nothing more.`,
        link: {
          href: '#pay-as-you-go',
          text: 'See plan',
          type: 'link',
          linkKind: 'cta',
          linkIcon: {
            src: '',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <g clip-path="url(#clip0_4009_6885)">
                <path d="M11 0L11 -1L9 -1L9 0L11 0ZM9 0L9 12L11 12L11 0L9 0Z" fill="currentColor"/>
                <path d="M10.8944 18.2111C10.5259 18.9482 9.4741 18.9482 9.10557 18.2111L5.72361 11.4472C5.39116 10.7823 5.87465 10 6.61804 10L13.382 10C14.1253 10 14.6088 10.7823 14.2764 11.4472L10.8944 18.2111Z" fill="currentColor"/>
            </g>
            <defs>
                <clipPath id="clip0_4009_6885">
                    <rect width="20" height="20" fill="white"/>
                </clipPath>
            </defs>
        </svg>`,
            alt: 'back',
          },
        },
        highlightTitle: 'Volume-based pricing',
        highlightText:
          'Get set up on a contract, and receive discounted pricing the more you use.',
        highlightLink: {
          href: '#volume-based pricing',
          text: 'See plan',
          type: 'link',
          linkKind: 'cta',
          linkIcon: {
            src: '',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g clip-path="url(#clip0_4009_6885)">
                  <path d="M11 0L11 -1L9 -1L9 0L11 0ZM9 0L9 12L11 12L11 0L9 0Z" fill="currentColor"/>
                  <path d="M10.8944 18.2111C10.5259 18.9482 9.4741 18.9482 9.10557 18.2111L5.72361 11.4472C5.39116 10.7823 5.87465 10 6.61804 10L13.382 10C14.1253 10 14.6088 10.7823 14.2764 11.4472L10.8944 18.2111Z" fill="currentColor"/>
              </g>
              <defs>
                  <clipPath id="clip0_4009_6885">
                      <rect width="20" height="20" fill="white"/>
                  </clipPath>
              </defs>
          </svg>`,
            alt: 'back',
          },
        },
        id: 'pay-as-you-go',
      },
    ],
  },
};

export default componentMeta;

type Story = StoryObj<OddColorfulCardsProps>;

export const WithGreenCardTheme: Story = {
  args: {
    cardTheme: 'green',
  },
};
export const WithCitronCardTheme: Story = {
  args: {
    cardTheme: 'citron',
  },
};
export const WithBlueCardTheme: Story = {
  args: {
    cardTheme: 'blue',
  },
};
export const WithTanCardTheme: Story = {
  args: {
    cardTheme: 'tan',
  },
};

export const WithoutLinks: Story = {
  args: {
    cardTheme: 'tan',
    items: [
      {
        title: 'Pay as you go',
        leadingText: `Pay per GB. You're only charged for what you use—nothing more.`,
        highlightTitle: 'Volume-based pricing',
        highlightText:
          'Get set up on a contract, and receive discounted pricing the more you use.',
        id: 'pay-as-you-go',
      },
    ],
  },
};
