import type { Meta, StoryObj } from '@storybook/react';

import NavigationBubblesSection, {
  type NavigationBubblesSectionProps,
} from './NavigationBubblesSection';

const componentMeta: Meta<NavigationBubblesSectionProps> = {
  title: 'Layout/Navigation Bubbles Section',
  component: NavigationBubblesSection,
};

export default componentMeta;

type Story = StoryObj<NavigationBubblesSectionProps>;

export const Default: Story = {
  args: {
    backgroundColor: 'cream',
    defaultExpandedItems: ['storage'],
    items: [
      {
        heading: 'Storage',
        id: 'storage',
        itemTheme: 'tan',
        navItems: [
          {
            label: '',
            items: [
              {
                text: 'Storage',
                href: '#storage',
                type: 'button',
                buttonKind: 'list',
              },
            ],
          },
        ],
      },
    ],
  },
};
