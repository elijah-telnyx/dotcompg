import type { Meta, StoryObj } from '@storybook/react';
import Author, { type AuthorProps } from './Author';

const componentMeta: Meta<AuthorProps> = {
  title: 'Components/Author',
  component: Author,
  args: {
    name: 'Emily Wynne',
  },
};

export default componentMeta;

type story = StoryObj<AuthorProps>;

export const Default: story = {};

export const WithPicture: story = {
  args: {
    media: {
      src: 'https://images.ctfassets.net/taysl255dolk/NuyPNQz6waKcnkfhcJAn3/1a35e90957b8b331b72908b84c38e277/photo__1_.jpg',
      alt: 'Emily Wynne picture',
    },
  },
};
export const WithBrokenPicture: story = {
  args: {
    media: {
      src: 'https://no-images.ctfassets.net/taysl255dolk/NuyPNQz6waKcnkfhcJAn3/1a35e90957b8b331b72908b84c38e277/photo__1_.jpg',
      alt: 'Emily Wynne picture',
    },
  },
};
