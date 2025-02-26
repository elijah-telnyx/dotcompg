import ColorfulCards, { type ColorfulCardsProps } from './ColorfulCards';
import type { Meta, StoryObj } from '@storybook/react';
import { disablePropList } from '../../utils/storybook';

const items = [
  {
    title: 'Wherever you need to go',
    leadingText: 'Scale your systems efficiently.',
    highlightTitle: '180+',
    highlightText: 'countries with multiple carrier options',
    id: String(Math.random()),
  },
  {
    title: "We've got you covered",
    leadingText: 'Localize your connectivity.',
    highlightTitle: '400+',
    highlightText: 'LTE, 3G, 2G & LTM-E networks',
    id: String(Math.random()),
  },
  {
    title: 'With a single SIM',
    leadingText: 'No SIM swapping, no data roaming.',
    highlightTitle: '1',
    highlightText: 'eUICC SIM card',
    id: String(Math.random()),
  },
];

const componentMeta: Meta<ColorfulCardsProps> = {
  title: 'Layout/Colorful Cards',
  component: ColorfulCards,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    tagline: 'Benefits',
    overlap: true,
    items,
  },
  argTypes: {
    ...disablePropList([
      'spacingTop',
      'spacingBottom',
      'htmlAs',
      'id',
      'hasOverflow',
    ]),
  },
};

export default componentMeta;
export const WithGreenCardTheme: StoryObj<ColorfulCardsProps> = {
  args: {
    cardTheme: 'green',
  },
};
export const WithCitronCardTheme: StoryObj<ColorfulCardsProps> = {
  args: {
    cardTheme: 'citron',
  },
};
export const WithBlueCardTheme: StoryObj<ColorfulCardsProps> = {
  args: {
    cardTheme: 'blue',
  },
};
export const WithTanCardTheme: StoryObj<ColorfulCardsProps> = {
  args: {
    cardTheme: 'tan',
  },
};

export const WithoutOverlapping: StoryObj<ColorfulCardsProps> = {
  args: {
    tagline: '',
    cardTheme: 'green',
    overlap: false,
    items: [
      {
        highlightTitle: '180+',
        highlightText: 'countries with multiple carrier options',
        id: String(Math.random()),
      },
      {
        highlightTitle: '400+',
        highlightText: 'LTE, 3G, 2G & LTM-E networks',
        id: String(Math.random()),
      },
      {
        highlightTitle: '1',
        highlightText: 'eUICC SIM card',
        id: String(Math.random()),
      },
    ],
  },
};

export const WithoutOverlappingWith4Items: StoryObj<ColorfulCardsProps> = {
  args: {
    cardTheme: 'green',
    overlap: false,
    items: items.concat(items[0]),
  },
};
