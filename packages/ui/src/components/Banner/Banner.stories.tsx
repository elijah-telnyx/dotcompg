import type { Meta, StoryObj } from '@storybook/react';
import Banner, { type BannerProps } from './Banner';
import { useArgs } from '@storybook/client-api';
import { styled } from '@stitches/react';
import Paragraph from '../Typography/Paragraph';
import { disablePropList } from '../../utils/storybook';

const Wrapper = styled('div', {
  backgroundColor: '$citron',
  width: '100vw',
  height: '250vh',
  paddingTop: '30vh',
});

const Content = styled('div', {
  display: 'grid',
  placeContent: 'center',
  height: 200,
  backgroundColor: '$black',
  color: '$cream',
});

const componentMeta: Meta<BannerProps> = {
  title: 'Components/Banner',
  component: Banner,
  args: {
    children: (
      <Content>
        <Paragraph lead>Content Here</Paragraph>
      </Content>
    ),
    backgroundImage: '/images/banner.svg',
  },
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    parallaxControllers: {
      speed: 0.1,
    },
    ...disablePropList([
      'parallaxControllers',
      'children',
      'copy',
      'backgroundColor',
    ]),
  },
};

export default componentMeta;

type story<T = BannerProps> = StoryObj<T & BannerProps>;

export const WithBackgroundImage: story = {};

export const WithParallax: story<{ parallax_speed: number }> = {
  decorators: [
    (Story) => {
      const [args] = useArgs();
      return Story({
        args: {
          children: [
            <Wrapper key='wrapper'>
              <Banner
                {...(args as BannerProps)}
                parallaxControllers={{ speed: args.parallax_speed }}
              />
            </Wrapper>,
          ],
        },
      });
    },
  ],
  args: {
    parallax_speed: 0.5,
  },
};
