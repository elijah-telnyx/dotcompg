import type { Meta, StoryObj } from '@storybook/react';
import Author, { type AuthorCardProps } from './AuthorCard';

const componentMeta: Meta<AuthorCardProps> = {
  title: 'Components/Author Card',
  component: Author,
  args: {
    copy: 'Emily Wynne',
  },
};

export default componentMeta;

type story = StoryObj<AuthorCardProps>;

export const Default: story = {};

export const WithPicture: story = {
  args: {
    icon: {
      src: 'https://images.ctfassets.net/taysl255dolk/NuyPNQz6waKcnkfhcJAn3/1a35e90957b8b331b72908b84c38e277/photo__1_.jpg',
      alt: 'Emily Wynne picture',
    },
  },
};
export const WithBrokenPicture: story = {
  args: {
    icon: {
      src: 'https://no-images.ctfassets.net/taysl255dolk/NuyPNQz6waKcnkfhcJAn3/1a35e90957b8b331b72908b84c38e277/photo__1_.jpg',
      alt: 'Emily Wynne picture',
    },
  },
};
export const WithDescriptionAndLinkedIn: story = {
  args: {
    icon: {
      src: 'https://images.ctfassets.net/taysl255dolk/NuyPNQz6waKcnkfhcJAn3/1a35e90957b8b331b72908b84c38e277/photo__1_.jpg',
      alt: 'Emily Wynne picture',
    },
    description: {
      children: `Emily is one of our product marketing managers here at Telnyx. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    },
    linkedin: 'https://www.linkedin.com/in/emily-861193a8/',
  },
};
