import type { Meta, StoryObj } from '@storybook/react';
import { disablePropList } from '../../utils/storybook';
import CustomerLogos, { type CustomerLogosProps } from './CustomerLogos';

const logos = [
  {
    media: {
      src: 'https://images.ctfassets.net/taysl255dolk/6d4txBDiH6KMQ6qMaM4eis/923fe1e2f55e4962f3f039e5b1bdaf23/preview_logo.png',
      alt: 'logo',
    },
  },
  {
    media: {
      src: 'https://a-zperformance.com/pictures/1538395373-68369.png',
      alt: 'logo',
    },
  },
  {
    media: {
      src: 'https://searchvectorlogo.com/wp-content/uploads/2020/05/another-magazine-logo-vector.png',
      alt: 'logo',
    },
  },
  {
    media: {
      src: 'https://cdn.logojoy.com/wp-content/uploads/2018/05/01104710/1267.png',
      alt: 'logo',
    },
  },
  {
    media: {
      src: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-logo-design-template-78655edda18bc1196ab28760f1535baa_screen.jpg?ts=1617645324',
      alt: 'logo',
    },
  },
];

const componentMeta: Meta<CustomerLogosProps> = {
  title: 'Layout/Customer Logos',
  component: CustomerLogos,
  args: {
    logos,
  },
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    ...disablePropList(['id', 'htmlAs', 'banner', 'maxVisibleLogos']),
  },
};

export default componentMeta;

type story = StoryObj<CustomerLogosProps>;

export const Default: story = {
  args: {
    logos: logos.slice(0, 2),
  },
};

export const WithContent: story = {};

export const WithLeftParallaxAnimation: story = {
  args: {
    logos,
    parallaxAnimation: 'Left',
  },
  render: (props) => (
    <>
      <div style={{ height: '60vh' }} />
      <CustomerLogos {...props} />
      <div style={{ height: '60vh' }} />
    </>
  ),
};

export const WithRightParallaxAnimation: story = {
  args: {
    logos,
    parallaxAnimation: 'Right',
  },
  render: (props) => (
    <>
      <div style={{ height: '60vh' }} />
      <CustomerLogos {...props} />
      <div style={{ height: '60vh' }} />
    </>
  ),
};
