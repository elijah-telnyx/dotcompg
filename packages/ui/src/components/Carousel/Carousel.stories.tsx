import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import { useDark } from '../../utils/storybook';
import 'glider-js/glider.min.css';

import Carousel, { type CarouselProps } from './Carousel';

const generateItems = (numberOfItems: number) =>
  Array(numberOfItems)
    .fill(undefined)
    .map((_, index) => {
      return {
        media: {
          src: 'https://images.ctfassets.net/taysl255dolk/XX6KAfZiBmLXq7G7ZWIKw/b178a80c0207d7f0d8c38292d8f97fd3/TelnyxDotCom_Hero_BG_2.jpg',
          alt: 'carousel image',
        },
        copy: 'Colectivo empowers delivery drivers to manage customer billing on the go',
        linkText: 'learn more',
        linkHref: `#${index + 1}`,
        heading: String(index + 1),
      };
    });

const componentMeta: Meta<CarouselProps> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

export const FiveItems: StoryObj<CarouselProps> = {
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
    itemsBackgroundColor: 'cream',
    isDark: false,
    initialActiveItem: 2,
  },
};
