import type { Meta, StoryObj } from '@storybook/react';

import type { MediaProps } from '../Media';
import HowItWorks, { type HowItWorksProps } from './HowItWorks';

const componentMeta: Meta<HowItWorksProps> = {
  title: 'Layout/How It Works',
  component: HowItWorks,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    tagline: 'How It Works',
    items: [
      {
        heading: 'Order your IoT SIM Cards',
        copy: 'Get SIM cards delivered to your doorstep, with global shipping and no minimum order quantity.',
        onClick: () => null,
        media: {
          src: 'https://images.ctfassets.net/2vm221913gep/5Ig6k7ICLq6sPTHKZ2kOEZ/0a095368f1e0ecee5a9341c570b2aec5/Telnyx_Product_IoTSIM_HIW_1.svg',
          alt: 'office',
        },
      },
      {
        heading: 'Activate your IoT SIM Cards',
        copy: 'Activate your IoT SIM Cards. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.',
        onClick: () => null,
        media: {
          src: 'https://images.ctfassets.net/2vm221913gep/3HmfWT5uVObQ1hb1xaJpXZ/fd1706bd2577ac13dd42933d29226225/pietro-de-grandi-T7K4aEPoGGk-unsplash.jpg.png',
          alt: 'office',
        },
      },
      {
        heading: 'Set up reporting & management',
        copy: 'Set up reporting & management. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.',
        onClick: () => null,
        media: {
          src: 'https://images.ctfassets.net/2vm221913gep/2eb2NkRpSCdnZIhndwwDET/42dbef9c7516b64eafa64582d827e7c3/DeveloperDocs_Hero_Wireless__1__1__5___1_.svg',
          alt: 'office',
        },
      },
      {
        heading: 'Launch your IoT application',
        copy: 'Launch your IoT application. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.',
        onClick: () => null,
        media: {
          src: 'https://images.ctfassets.net/2vm221913gep/7iMOnCIbTpiqHLYjU1hzHW/b2e40998b7de42d53ad45a231d9a04b6/bench-accounting-MGaFENpDCsw-unsplash.png',
          alt: 'office',
        },
      },
    ],
    ctaButtons: [
      {
        text: 'Sign Up',
        href: '#',
        type: 'button',
        backgroundColor: 'black',
      },
    ],
    backgroundColor: 'black',
  },
};

export default componentMeta;

type Story = StoryObj<HowItWorksProps>;

export const Default: Story = {};
export const WithMarkdown: Story = {
  args: {
    items: [
      {
        heading: 'Order your IoT SIM Cards',
        copy: 'Get SIM cards delivered to your doorstep, with [global shipping](https://telnyx.com) and no minimum order quantity.',
        media: {
          src: 'https://images.ctfassets.net/2vm221913gep/5Ig6k7ICLq6sPTHKZ2kOEZ/0a095368f1e0ecee5a9341c570b2aec5/Telnyx_Product_IoTSIM_HIW_1.svg',
          alt: 'office',
        },
        onClick: () => {
          /* */
        },
      },
    ],
  },
};

export const WithVideo: Story = {
  args: {
    items: [
      {
        heading: 'Order your IoT SIM Cards',
        copy: 'Get SIM cards delivered to your doorstep, with [global shipping](https://telnyx.com) and no minimum order quantity.',
        media: {
          src: 'https://videos.ctfassets.net/2vm221913gep/1IbQA8aJ0h8Jfhip3bc4Rq/dd49a49be767a544f24bc05aeb1e58df/Home_Parallax-2_PortalPromo_Compressed.mp4',
          alt: 'portal',
          autoPlay: true,
          loop: true,
        } as MediaProps<'media'>,
        onClick: () => {
          /* */
        },
      },
    ],
  },
};
