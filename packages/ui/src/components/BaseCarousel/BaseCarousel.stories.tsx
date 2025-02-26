import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import { useDark } from '../../utils/storybook';
import 'glider-js/glider.min.css';
import BaseCarousel, { type BaseCarouselProps } from './BaseCarousel';

const generateItems = (numberOfItems: number) =>
  Array(numberOfItems)
    .fill(undefined)
    .map((_, index) => {
      return {
        id: String(index),
        props: {
          heading: String(index + 1),
        },
      };
    });

const SampleCard = ({ heading }: { heading: string }) => {
  return <h2>{heading}</h2>;
};

const componentMeta: Meta<BaseCarouselProps<typeof SampleCard>> = {
  title: 'Components/BaseCarousel',
  component: BaseCarousel,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

export const FiveItems: StoryObj<BaseCarouselProps<typeof SampleCard>> = {
  decorators: [
    (Story) => {
      const [{ isDark, ...args }] = useArgs();

      useDark({ dark: isDark });
      return Story({
        args: {
          isDark,
          ...args,
        },
      });
    },
  ],
  args: {
    items: generateItems(5),
    isDark: false,
    cardComponent: SampleCard,
    cardSizes: {
      xs: { width: 304 },
      small: { width: 304 },
      medium: { width: 416 },
      large: { width: 416 },
      xl: { width: 432 },
    },
  },
};
