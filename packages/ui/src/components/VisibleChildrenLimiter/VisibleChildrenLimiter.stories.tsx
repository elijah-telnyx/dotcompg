import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import VisibleChildren, {
  type VisibleChildrenLimiterProps,
} from './VisibleChildrenLimiter';
import type { ReactNode } from 'react';

const generateItems = (numberOfItems: number): ReactNode[] =>
  Array(numberOfItems)
    .fill(undefined)
    .map((_, index) => {
      return (
        <div style={{ padding: 8, display: 'inline-block' }} key={index}>
          {index + 1}
        </div>
      );
    });

const componentMeta: Meta<VisibleChildrenLimiterProps> = {
  title: 'Components/VisibleChildrenLimiter',
  component: VisibleChildren.Limiter,
  args: {
    children: generateItems(20),
    showItemsButtonText: 'Show more',
    maxVisibleItems: 9,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type story = StoryObj<VisibleChildrenLimiterProps>;

export const FiveItems: story = {
  args: {
    children: generateItems(5),
  },
  play: async ({ canvasElement }) => {
    const { queryByRole } = within(canvasElement);
    await expect(
      queryByRole('button', { name: 'Show more' })
    ).not.toBeInTheDocument();
  },
};

export const TwentyItems: story = {
  args: {
    children: generateItems(20),
  },
  play: async ({ canvasElement }) => {
    const { getByRole, getByText } = within(canvasElement);
    await expect(
      getByRole('button', { name: 'Show more' })
    ).toBeInTheDocument();

    await userEvent.click(getByRole('button', { name: 'Show more' }));
    await expect(getByText('20')).toBeInTheDocument();
  },
};
