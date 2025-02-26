import type { Meta, StoryObj } from '@storybook/react';

import OddColorfulBoxes, {
  type OddColorfulBoxesProps,
} from './OddColorfulBoxes';

const componentMeta: Meta<OddColorfulBoxesProps> = {
  title: 'Layout/Odd Colorful Boxes',
  component: OddColorfulBoxes,
};

export default componentMeta;

type Story = StoryObj<OddColorfulBoxesProps>;

export const Default: Story = {
  args: {
    backgroundColor: 'black',
    items: [
      {
        title: 'Pay as you go',
        leadingText: `Pay only for what you use, when you use it.`,
        highlightTitle: 'Volume-based pricing',
        highlightText: 'Do more; pay less.',
        id: 'pay-as-you-go',
        copies: [
          'Top up your account through your Mission Control Portal.',
          'Receive automatic discounts as you scale your calling and messaging volumes.',
          'Access free in-house support 24/7 via chat or call.',
        ],
        highlightCopies: [
          'Work with a dedicated sales representative to set discounted pricing based on your monthly usage.',
          'Receive specialized support from a personally allotted customer success manager.',
          'Receive prioritized ticketing privileges and NOC support.',
        ],
      },
    ],
  },
};

export const WithoutCopies: Story = {
  args: {
    backgroundColor: 'black',
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
