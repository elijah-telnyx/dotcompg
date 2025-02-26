import type { Meta, StoryObj } from '@storybook/react';
import 'glider-js/glider.min.css';

import SecondaryCarouselSection, {
  type SecondaryCarouselSectionProps,
} from './SecondaryCarouselSection';

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

const componentMeta: Meta<SecondaryCarouselSectionProps> = {
  title: 'Layout/Secondary Carousel Section',
  component: SecondaryCarouselSection,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    heading: 'Heading',
    items: generateItems(5),
    backgroundColor: 'black',
    spacingBottom: 'continuous',
    spacingTop: 'continuous',
  },
};

export default componentMeta;

type StoryProps = StoryObj<SecondaryCarouselSectionProps>;

export const FiveItems: StoryProps = {};

export const NoHeading: StoryProps = {
  args: {
    heading: undefined,
  },
};
