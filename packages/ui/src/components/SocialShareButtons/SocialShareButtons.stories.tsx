import type { Meta, StoryObj } from '@storybook/react';

import SocialShareButtons, {
  type SocialShareButtonsProps,
} from './SocialShareButtons';

const componentMeta: Meta<SocialShareButtonsProps> = {
  title: 'Components/SocialShareButtons',
  component: SocialShareButtons,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<SocialShareButtonsProps>;

export const Default: Story = {
  args: {
    url: 'https://www.telnyx.com/resources/article',
    title: 'Telnyx - Telecom APIs for Voice, Messaging and Fax',
    description: `Connecting with your customers shouldn't be complex. Our communications APIs make it easy.`,
    onClickShareButton: (network: string) => {
      console.log(network);
    },
  },
};
