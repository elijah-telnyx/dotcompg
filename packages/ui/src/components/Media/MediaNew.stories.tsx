import type { Meta, StoryObj } from '@storybook/react';
import Media from './MediaNew';

const meta: Meta<typeof Media> = {
  title: 'Components/Media/New',
  component: Media,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Media>;

export const Image: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714',
    alt: 'Example image',
    width: 800,
    height: 600,
  },
};

export const ImageWithCaption: Story = {
  args: {
    ...Image.args,
    caption: 'This is a caption for the image',
  },
};

export const Video: Story = {
  args: {
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    alt: 'Example video',
    controls: true,
    autoPlay: false,
    muted: true,
  },
};

export const VideoWithPlaceholder: Story = {
  args: {
    ...Video.args,
    placeholderMedia: {
      src: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714',
      alt: 'Video placeholder',
    },
  },
};

export const SVG: Story = {
  args: {
    alt: 'Example SVG',
    renderSvg: true,
    svg: '<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"/></svg>',
  },
};

export const ResponsiveImage: Story = {
  args: {
    ...Image.args,
    mobileSrc: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=400',
    useSrcSetGenerator: true,
  },
};

export const CoverImage: Story = {
  args: {
    ...Image.args,
    cover: true,
    fill: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', height: '300px', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
};