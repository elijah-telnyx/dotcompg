import type { Meta, StoryObj } from '@storybook/react';

import NavigationCards, {
  type NavigationCardsProps,
  type NavigationCardItem,
} from './NavigationCards';
import * as response from './mock.json';

const componentMeta: Meta<NavigationCardsProps> = {
  title: 'Components/Navigation Cards',
  component: NavigationCards,
};

export default componentMeta;

type Story = StoryObj<NavigationCardsProps>;

export const Default: Story = {
  args: {
    items: response.data as NavigationCardItem[],
  },
};
