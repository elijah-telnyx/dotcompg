import type { Meta, StoryObj } from '@storybook/react';
import ArticleCarousel, { type ArticleCarouselProps } from './ArticleCarousel';
import 'glider-js/glider.min.css';
import Grid from '../Grid';

const Main: Meta<ArticleCarouselProps> = {
  title: 'Components/ArticleCarousel',
  component: ArticleCarousel,
  args: {
    items: [
      {
        description: 'This is the content',
        media: {
          src: 'https://picsum.photos/1280/720',
          alt: 'This is the alt text',
          width: 1280,
          height: 720,
        },
      },
      {
        description: 'This is the content 2',
        media: {
          src: 'https://picsum.photos/640/360',
          alt: 'This is the alt text',
          width: 640,
          height: 360,
        },
      },
      {
        description: 'This is the content 3',
        media: {
          src: 'https://picsum.photos/320/180',
          alt: 'This is the alt text',
          width: 320,
          height: 180,
        },
      },
    ],
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default Main;

type story = StoryObj<ArticleCarouselProps>;

export const Default: story = {
  render: (args) => (
    <Grid.Container>
      <Grid.FullWidthItem>
        <ArticleCarousel {...args} />
      </Grid.FullWidthItem>
    </Grid.Container>
  ),
};
