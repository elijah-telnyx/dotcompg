import { render, screen } from '@testing-library/react';
import type { CardTheme } from '../../styles/constants/cardThemeOptions';

import OddColorfulBoxes from '.';

const color: CardTheme = 'blue';
const defaultProps = {
  cardTheme: color,
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
};

const withoutCopiesProps = {
  cardTheme: color,
  items: [
    {
      title: 'Pay as you go',
      leadingText: `Pay only for what you use, when you use it.`,
      highlightTitle: 'Volume-based pricing',
      highlightText: 'Do more; pay less.',
      id: 'pay-as-you-go',
    },
  ],
};

describe('<OddColorfulBoxes />', () => {
  it('should render the component', () => {
    const { container } = render(
      <OddColorfulBoxes
        backgroundColor={'green'}
        hasOverflow={false}
        spacingBottom={'continuous'}
        spacingTop={'continuous'}
        {...defaultProps}
      />
    );
    expect(container).toBeInTheDocument();
    expect(
      screen.getByText(
        /Top up your account through your Mission Control Portal./i
      )
    ).toBeInTheDocument();
  });
  it('should not render copies if is not provided', () => {
    const { container } = render(
      <OddColorfulBoxes
        backgroundColor={'green'}
        hasOverflow={false}
        spacingBottom={'continuous'}
        spacingTop={'continuous'}
        {...withoutCopiesProps}
      />
    );
    expect(container).toBeInTheDocument();
    expect(
      screen.queryByText(
        /Top up your account through your Mission Control Portal./i
      )
    ).not.toBeInTheDocument();
  });
});
