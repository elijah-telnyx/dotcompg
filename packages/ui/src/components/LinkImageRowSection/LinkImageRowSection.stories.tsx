import type { Meta, StoryObj } from '@storybook/react';
import LinkImageRowSection, {
  LinkImage,
  type LinkImageProps,
  type LinkImageRowSectionProps,
} from './LinkImageRowSection';

const componentMeta: Meta<LinkImageRowSectionProps> = {
  title: 'Layout/Link Image Row Section',
  component: LinkImageRowSection,
  args: {
    tagline: 'Use cases',
    heading: 'Get inspired',
    copy: 'Learn what you can create with Telnyx.',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<LinkImageRowSectionProps>;

const linkImage = {
  href: '#',
  alt: 'alt',
  label: 'IoT for fleet management',
  src: 'https://images.ctfassets.net/2vm221913gep/2ZlFJdnREyLNJ7LU7mM0nd/ad8b0ecc9ee22c62a587eb6cc57376ca/Healthcare_Square.jpg',
  base64BlurImage:
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAlgCWAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAA4AGQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEC/8QAIhABAQABBAIBBQAAAAAAAAAAAAERAjFBYRIhgVFxkbHw/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwByqY6pjugqEzeD39AGVQCbxvLMAX5MdstSgY7aAAAF+f0zVyl/vwBp2WzPKadmgYnJfZFm4EiNM0GVnpAGwnoAABrKXa/Zny6S2g1p2isZuy4BJcLOTxUEtTK6mQUQBqVaw1uCgAzjswCB7nC5AFyoKM6mQAAAWXAA1mAA/9k=',
};

export const WithContent: Story = {
  args: {
    images: Array.from(new Array(12)).map((_) => linkImage),
  },
};

export const LinkImageStory: StoryObj<LinkImageProps> = {
  name: 'LinkImage',
  args: linkImage,
  render: (args) => (
    <div style={{ maxWidth: 480, maxHeight: 270 }}>
      <LinkImage {...args} />
    </div>
  ),
};
