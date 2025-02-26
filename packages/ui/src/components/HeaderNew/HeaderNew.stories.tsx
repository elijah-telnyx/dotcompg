import type { Meta, StoryObj } from '@storybook/react';
import * as Header from '.';
import { basicColors } from '../../styles/utils';

const Main: Meta<Header.HeaderRootProps> = {
  title: 'Components/HeaderNew',
  component: Header.Root,
  parameters: {
    layout: 'fullscreen',
  },
};

export default Main;

type story = StoryObj<typeof Header>;

export const Default: story = {
  render: () => (
    <Header.Root
      bannerLinks={[
        {
          href: 'https://shop.telnyx.com',
          target: '_blank',
          rel: 'noopener noreferrer',
          copy: 'Shop',
        },
        {
          href: '/contact-us',
          copy: 'Contact us',
        },
        {
          href: 'https://portal.telnyx.com/',
          target: '_blank',
          rel: 'noopener noreferrer',
          copy: 'Log in',
        },
      ]}
    >
      Header
      <Header.Button href='/sign-up'>Sign up</Header.Button>
    </Header.Root>
  ),
};

export const HeaderCtaBanner: StoryObj<Header.HeaderNavigationMenuCTABannerProps> =
  {
    render: (args) => {
      return (
        <div style={{ maxWidth: 750 }}>
          <Header.NavigationMenuCTABanner
            {...args}
            ctaButtons={[
              {
                href: '/sign-up',
                text: 'Sign up',
                type: 'button',
              },
            ]}
            media={{
              src: 'https://images.ctfassets.net/2vm221913gep/3FB9QUOx1fmKjaxc7W1sNN/09ebf58c9701f7fff2615042c4a6f6f2/Under-the-hood-diagram__1_.png',
              alt: 'placeholder',
            }}
          />
        </div>
      );
    },
    argTypes: {
      backgroundColor: {
        options: Object.values(basicColors),
        control: { type: 'select' },
      },
    },
    args: {
      heading: 'Ready to get started in Mission Control?',
      backgroundColor: 'green',
    },
  };
