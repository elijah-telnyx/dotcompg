import type { Meta, StoryObj } from '@storybook/react';
import FullWidthMediaSection, {
  type FullWidthMediaSectionProps,
} from './FullWidthMediaSection';

const Main: Meta<FullWidthMediaSectionProps> = {
  title: 'Components/FullWidthMediaSection',
  component: FullWidthMediaSection,
  args: {
    heading: 'Video title here with short description',
    media: {
      src: 'https://videos.ctfassets.net/2vm221913gep/43z89lmO4ImrCehXaucEAg/5f0b7f4ad60126bbed6a89774944d597/flow-video.mp4',
      poster:
        'https://images.ctfassets.net/2vm221913gep/50uNuT2z7YGUQCexpo4nGA/b0b3cbf4d799eeb801d7cf1a6a2e1779/Screenshot_Capture_-_2024-12-09_-_16-23-11.png',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default Main;

type story = StoryObj<FullWidthMediaSectionProps>;

export const Default: story = {};
export const HeavyVideo: story = {
  args: {
    media: {
      src: 'https://www.sample-videos.com/video321/mp4/720/big_buck_bunny_720p_20mb.mp4',
      muted: false,
    },
  },
};
