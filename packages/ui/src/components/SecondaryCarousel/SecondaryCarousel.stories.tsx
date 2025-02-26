import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import { useDark } from '../../utils/storybook';
import 'glider-js/glider.min.css';

import SecondaryCarousel, {
  type SecondaryCarouselProps,
} from './SecondaryCarousel';

const generateItems = (numberOfItems: number) =>
  Array(numberOfItems)
    .fill(undefined)
    .map((index) => {
      return {
        id: index,
        media: {
          alt: 'petabyte cloud storage icon over world map',
          src: '//images.ctfassets.net/taysl255dolk/7z5Os21ggE6u0zdSk6Mvoj/b279710fb69fed4774b8f007f6846305/petabyte_cloud_storage.png',
        },
        tagline: 'Brand',
        heading: 'Introducing Global Edge Router',
        author: {
          media: {
            src: 'https://images.ctfassets.net/taysl255dolk/NuyPNQz6waKcnkfhcJAn3/1a35e90957b8b331b72908b84c38e277/photo__1_.jpg',
            alt: 'Emily Wynne picture',
          },
          name: 'Emily Wynne',
        },
        href: '#',
      };
    });

const componentMeta: Meta<SecondaryCarouselProps> = {
  title: 'Components/SecondaryCarousel',
  component: SecondaryCarousel,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

export const FiveItems: StoryObj<SecondaryCarouselProps> = {
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
  },
};
