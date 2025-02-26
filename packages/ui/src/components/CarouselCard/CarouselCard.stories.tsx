import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { useDark } from '../../utils/storybook';
import Grid from '../Grid';
import CarouselCard, { type CarouselCardProps } from './CarouselCard';

const componentMeta: Meta<CarouselCardProps> = {
  title: 'Components/CarouselCard',
  component: CarouselCard,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

export const Default: StoryObj<CarouselCardProps> = {
  name: 'Carousel Card',
  render: function Render(args) {
    useDark({ dark: Boolean(args.isDark) });

    return (
      <Grid.Container>
        <Grid.Item xs={4} small={6} medium={8}>
          <CarouselCard {...args} />
        </Grid.Item>
      </Grid.Container>
    );
  },
  args: {
    isDark: false,
    media: {
      alt: 'petabyte cloud storage icon over world map',
      src: '//images.ctfassets.net/taysl255dolk/7z5Os21ggE6u0zdSk6Mvoj/b279710fb69fed4774b8f007f6846305/petabyte_cloud_storage.png',
    },
    tagline: { name: 'Brand', color: 'black' },
    heading: 'Introducing Global Edge Router',
    author: {
      media: {
        src: 'https://images.ctfassets.net/taysl255dolk/NuyPNQz6waKcnkfhcJAn3/1a35e90957b8b331b72908b84c38e277/photo__1_.jpg',
        alt: 'Emily Wynne picture',
      },
      name: 'Emily Wynne',
    },
    href: '#',
  },
  parameters: {
    layout: 'centered',
  },
  play: async ({ canvasElement }) => {
    const { getByRole } = within(canvasElement);
    await expect(
      getByRole('link', { name: 'Introducing Global Edge Router' })
    ).toBeInTheDocument();
  },
};
