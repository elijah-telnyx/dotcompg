import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import Chip, { type ChipProps } from './Chip';

const componentMeta: Meta<ChipProps> = {
  title: 'Components/Chip',
  component: Chip,
  args: {
    children: 'Chip',
    checked: false,
  },
};

export default componentMeta;

type story = StoryObj<ChipProps>;

export const Default: story = {
  play: async ({ canvasElement }) => {
    const { getByText } = within(canvasElement);
    expect(getByText(/Chip/i)).toHaveAttribute('data-state', 'unchecked');
  },
};

export const Checked: story = {
  args: {
    checked: true,
  },
  play: async ({ canvasElement }) => {
    const { getByText } = within(canvasElement);
    expect(getByText(/Chip/i)).toHaveAttribute('data-state', 'checked');
  },
};
