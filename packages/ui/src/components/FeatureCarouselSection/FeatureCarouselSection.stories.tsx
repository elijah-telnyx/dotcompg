import type { Meta, StoryObj } from '@storybook/react';
import FeatureCarouselSection, { type FeatureCarouselSectionProps } from '.';

const author = {
  media: {
    src: 'https://images.ctfassets.net/taysl255dolk/NuyPNQz6waKcnkfhcJAn3/1a35e90957b8b331b72908b84c38e277/photo__1_.jpg',
    alt: 'Emily Wynne picture',
  },
  name: 'Emily Wynne',
};

const componentMeta: Meta<FeatureCarouselSectionProps> = {
  title: 'Layout/Feature Carousel Section',
  component: FeatureCarouselSection,
  args: {
    items: [
      {
        id: '0',
        media: {
          alt: 'petabyte cloud storage icon over world map',
          src: '//images.ctfassets.net/taysl255dolk/7z5Os21ggE6u0zdSk6Mvoj/b279710fb69fed4774b8f007f6846305/petabyte_cloud_storage.png',
        },
        tagline: { name: 'Brand', color: 'black' },
        heading: 'Introducing Global Edge Router',
        author,
        href: '#0',
      },
      {
        id: '1',
        media: {
          alt: 'petabyte cloud storage icon over world map',
          src: '//images.ctfassets.net/taysl255dolk/2DC719aXO20wHfsJ6J8tCv/53a235119cc041724a53a470b8475f35/Conversational-AI_HD-Voice_Codecs_Hero.png',
        },
        tagline: { name: 'wireless', color: 'citron' },
        heading: 'Crafting conversational AI: HD voice codecs',
        author,
        href: '#1',
      },
      {
        id: '2',
        media: {
          alt: 'petabyte cloud storage icon over world map',
          src: 'http://images.ctfassets.net/taysl255dolk/7Ee1oBeeznJw3ZXwWnsVcr/e679141c310537c30bbcb3e63118e6a1/SMS_vs_RCS_feature_image.png',
        },
        tagline: { name: 'messaging', color: 'green' },
        heading: 'SMS vs. RCS: Why SMS is (still) winning the texting war',
        author,
        href: '#2',
      },
    ],
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type story = StoryObj<FeatureCarouselSectionProps>;

export const Default: story = {};
