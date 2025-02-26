import type { Meta, StoryObj } from '@storybook/react';
import FullScreenMediaSection, {
  type FullScreenMediaSectionProps,
} from './FullScreenMediaSection';

const componentMeta: Meta<FullScreenMediaSectionProps> = {
  title: 'Layout/FullScreen Media Section',
  component: FullScreenMediaSection,
  args: {
    media: {
      src: 'https://videos.ctfassets.net/2vm221913gep/79ohJXrSPbS073kjwGJpOs/fea1b96e23df915a398790d817a43360/Home-LogoPattern-WIP-2x-Compressed2.mp4',
      alt: 'placeholder',
      autoPlay: true,
      loop: true,
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type story = StoryObj<FullScreenMediaSectionProps>;

export const Default: story = {};
export const Image: story = {
  args: {
    media: {
      src: 'https://via.placeholder.com/1280x720.png',
      alt: 'placeholder',
    },
  },
};
