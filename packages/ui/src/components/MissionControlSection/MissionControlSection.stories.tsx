import type { Meta, StoryObj } from '@storybook/react';

import MissionControlSection, {
  type MissionControlSectionProps,
} from './MissionControlSection';

const Main: Meta<MissionControlSectionProps> = {
  title: 'Components/MissionControlSection',
  component: MissionControlSection,
  args: {
    tagline: 'Mission Control',
    heading: 'The future of fleet management is here',
    copy: 'Our mission control platform is the most advanced in the industry. It provides real-time insights and analytics to help you make data-driven decisions.',
  },
};

export default Main;

type Story = StoryObj<MissionControlSectionProps>;

const linkImage = {
  href: '#',
  alt: 'alt',
  label: 'IoT for fleet management',
  src: 'https://images.ctfassets.net/2vm221913gep/2ZlFJdnREyLNJ7LU7mM0nd/ad8b0ecc9ee22c62a587eb6cc57376ca/Healthcare_Square.jpg',
  base64BlurImage:
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAlgCWAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAA4AGQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEC/8QAIhABAQABBAIBBQAAAAAAAAAAAAERAjFBYRIhgVFxkbHw/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwByqY6pjugqEzeD39AGVQCbxvLMAX5MdstSgY7aAAAF+f0zVyl/vwBp2WzPKadmgYnJfZFm4EiNM0GVnpAGwnoAABrKXa/Zny6S2g1p2isZuy4BJcLOTxUEtTK6mQUQBqVaw1uCgAzjswCB7nC5AFyoKM6mQAAAWXAA1mAA/9k=',
};

export const Default: Story = {
  args: {
    tagline: 'Mission Control',
    heading: 'The future of fleet management is here',
    copy: 'Our mission control platform is the most advanced in the industry. It provides real-time insights and analytics to help you make data-driven decisions.',
    images: Array.from(new Array(4)).map((_) => linkImage),
  },
};
