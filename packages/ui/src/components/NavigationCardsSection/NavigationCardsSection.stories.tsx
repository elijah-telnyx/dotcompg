import type { Meta, StoryObj } from '@storybook/react';

import NavigationCardsSection, {
  type NavigationCardsSectionProps,
} from './NavigationCardsSection';
import * as response from '../NavigationCards/mock.json';
import type { NavigationCardItem } from '../NavigationCards/NavigationCards';

const componentMeta: Meta<NavigationCardsSectionProps> = {
  title: 'Layout/Navigation Section',
  component: NavigationCardsSection,
};

export default componentMeta;

type Story = StoryObj<NavigationCardsSectionProps>;

export const Default: Story = {
  args: {
    backgroundColor: 'cream',
    items: response.data as NavigationCardItem[],
  },
};
