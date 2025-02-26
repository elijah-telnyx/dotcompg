import type { Meta, StoryObj } from '@storybook/react';
import NetworkMapLoading, {
  type NetworkMapLoadingProps,
} from './NetworkMapLoading';

const componentMeta: Meta<NetworkMapLoadingProps> = {
  title: 'Layout/Network Map Loading',
  component: NetworkMapLoading,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type story = StoryObj<NetworkMapLoadingProps>;

export const Default: story = {
  args: {
    media: {
      src: 'https://images.ctfassets.net/2vm221913gep/2BCx0aOhj0syuoCWjbyxNR/7f7d763138f9d89b001d759ef085c1f5/Telnyx_Website_World_Map_loading-fs8.png',
      alt: 'Network map loading image',
    },
  },
};
