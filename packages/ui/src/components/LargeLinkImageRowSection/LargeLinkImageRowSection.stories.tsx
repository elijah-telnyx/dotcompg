import type { Meta, StoryObj } from '@storybook/react';

import LargeLinkImageRowSection, {
  type LargeLinkImageRowSectionProps,
} from './LargeLinkImageRowSection';

const Main: Meta<LargeLinkImageRowSectionProps> = {
  title: 'Components/LargeLinkImageRowSection',
  component: LargeLinkImageRowSection,
  args: {
    images: [
      {
        href: '/resources',
        alt: 'alt description for image',
        label: 'Resources Blog Page',
        src: 'https://images.ctfassets.net/2vm221913gep/2ZlFJdnREyLNJ7LU7mM0nd/ad8b0ecc9ee22c62a587eb6cc57376ca/Healthcare_Square.jpg',
        base64BlurImage:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAlgCWAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAA4AGQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEC/8QAIhABAQABBAIBBQAAAAAAAAAAAAERAjFBYRIhgVFxkbHw/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwByqY6pjugqEzeD39AGVQCbxvLMAX5MdstSgY7aAAAF+f0zVyl/vwBp2WzPKadmgYnJfZFm4EiNM0GVnpAGwnoAABrKXa/Zny6S2g1p2isZuy4BJcLOTxUEtTK6mQUQBqVaw1uCgAzjswCB7nC5AFyoKM6mQAAAWXAA1mAA/9k=',
        mobileSrc:
          'https://images.ctfassets.net/2vm221913gep/6ZbW2BEXHiYQAYDvqb8qkU/e6e00e9c21b28618445ca52419666cb2/HP_Use-Cases-Block_Marketing-messaging-MOBILE.jpg',
      },
      {
        href: 'https://google.com',
        alt: 'Google External Link',
        label: 'External Link To Google',
        src: 'https://images.ctfassets.net/2vm221913gep/2ZlFJdnREyLNJ7LU7mM0nd/ad8b0ecc9ee22c62a587eb6cc57376ca/Healthcare_Square.jpg',
        base64BlurImage:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAlgCWAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAA4AGQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEC/8QAIhABAQABBAIBBQAAAAAAAAAAAAERAjFBYRIhgVFxkbHw/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwByqY6pjugqEzeD39AGVQCbxvLMAX5MdstSgY7aAAAF+f0zVyl/vwBp2WzPKadmgYnJfZFm4EiNM0GVnpAGwnoAABrKXa/Zny6S2g1p2isZuy4BJcLOTxUEtTK6mQUQBqVaw1uCgAzjswCB7nC5AFyoKM6mQAAAWXAA1mAA/9k=',
        mobileSrc:
          'https://images.ctfassets.net/2vm221913gep/6ZbW2BEXHiYQAYDvqb8qkU/e6e00e9c21b28618445ca52419666cb2/HP_Use-Cases-Block_Marketing-messaging-MOBILE.jpg',
      },
    ],
  },
};

export default Main;

type Story = StoryObj<LargeLinkImageRowSectionProps>;

export const Default: Story = {};
