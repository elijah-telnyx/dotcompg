import { Video, type VideoProps } from './Video';
import type { Meta, StoryObj } from '@storybook/react';

const componentMeta: Meta<VideoProps> = {
  title: 'Components/Media/Video',
  component: Video,
  render(args) {
    return <Video {...args} key={JSON.stringify(args)} />;
  },
  args: {
    src: 'https://videos.ctfassets.net/2vm221913gep/43z89lmO4ImrCehXaucEAg/5f0b7f4ad60126bbed6a89774944d597/flow-video.mp4',
    height: 512,
    playsInline: true,
    poster:
      'https://images.ctfassets.net/2vm221913gep/6R2eKnoNUxr7xxHyS715mI/e554b051db735a21568f00a6c8c36d2b/flow-poster.jpg',
  },
  argTypes: {
    src: {
      control: 'text',
    },
    height: {
      control: 'number',
    },
    autoPlay: {
      control: 'boolean',
    },
    controls: {
      control: 'boolean',
    },
    loop: {
      control: 'boolean',
    },
    muted: {
      control: 'boolean',
    },
    playsInline: {
      control: 'boolean',
    },
  },
};

export default componentMeta;

export const Default: StoryObj<VideoProps> = {};

export const WithAutoPlay: StoryObj<VideoProps> = {
  args: {
    autoPlay: true,
  },
};

export const WithPlaysOnHover: StoryObj<VideoProps> = {
  args: {
    playsOnHover: true,
  },
};
export const WithControls: StoryObj<VideoProps> = {
  render(args) {
    return (
      <div style={{ position: 'relative', width: 'fit-content' }}>
        <Video {...args} />
      </div>
    );
  },
  args: {
    controls: true,
  },
};
