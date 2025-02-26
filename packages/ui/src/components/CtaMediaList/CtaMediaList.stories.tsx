import type { Meta, StoryObj } from '@storybook/react';
import CtaMediaList, { type CtaMediaListProps } from './CtaMediaList';

const baseMediaUrl = 'https://www.telnyx.com';

const items: CtaMediaListProps['items'] = [
  {
    id: '1',
    heading: 'Simplifying your workflows',
    copy: 'Explore our most popular products and discover how easy they are to implement.',
    cta: {
      text: 'SEE PRODUCTS',
      href: '#',
      type: 'button',
    },
    media: {
      src: baseMediaUrl + '/images/home/parallax/1-products-promo.mp4',
      alt: 'Telnyx Private LTE with Private Wireless Gateways',
      autoPlay: true,
      loop: true,
      placeholderMedia: {
        src: baseMediaUrl + '/images/home/parallax/1-products-promo.png',
        alt: '',
      },
    },
  },
  {
    id: '2',
    heading: 'Delivering transparency',
    copy: 'Configure communications, wireless, networking, and storage in a single space—Telnyx Mission Control.',
    cta: {
      text: 'CREATE A FREE ACCOUNT',
      href: '#',
      type: 'button',
    },
    media: {
      src: baseMediaUrl + '/images/home/parallax/2-portal-promo.mp4',
      alt: 'Telnyx Private LTE with Private Wireless Gateways',
      autoPlay: true,
      loop: true,
      placeholderMedia: {
        src: baseMediaUrl + '/images/home/parallax/2-portal-promo.png',
        alt: '',
      },
    },
  },
  {
    id: '3',
    heading: 'Helping you reach customers with ease',
    copy: 'Learn about innovations in edge computing and how it impacts connectivity for your business.',
    cta: {
      text: 'LEARN ABOUT THE EDGE',
      href: '#',
      type: 'button',
    },
    media: {
      src: baseMediaUrl + '/images/home/parallax/3-edge-promo.mp4',
      alt: 'Telnyx Private LTE with Private Wireless Gateways',
      autoPlay: true,
      loop: true,
      placeholderMedia: {
        src: baseMediaUrl + '/images/home/parallax/3-edge-promo.png',
        alt: '',
      },
    },
  },
];

const componentMeta: Meta<CtaMediaListProps> = {
  title: 'Components/CtaMediaList',
  component: CtaMediaList,
  args: {
    spacingTop: 'none',
    spacingBottom: 'none',
    items,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type story = StoryObj<CtaMediaListProps>;

export const Default: story = {};
