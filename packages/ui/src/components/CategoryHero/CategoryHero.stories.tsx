import type { Meta, StoryObj } from '@storybook/react';
import CategoryHero, { type CategoryHeroProps } from './CategoryHero';

//#region Mock Data
const mock = {
  linkIcon: {
    src: '',
    svg: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <g clip-path="url(#clip0_4009_6885)">\n      <path d="M11 0L11 -1L9 -1L9 0L11 0ZM9 0L9 12L11 12L11 0L9 0Z" fill="currentColor" />\n      <path\n          d="M10.8944 18.2111C10.5259 18.9482 9.4741 18.9482 9.10557 18.2111L5.72361 11.4472C5.39116 10.7823 5.87465 10 6.61804 10L13.382 10C14.1253 10 14.6088 10.7823 14.2764 11.4472L10.8944 18.2111Z"\n          fill="currentColor" />\n  </g>\n  <defs>\n      <clipPath id="clip0_4009_6885">\n          <rect width="20" height="20" fill="white" />\n      </clipPath>\n  </defs>\n</svg>',
    alt: 'go to',
  },
  mediaList: [
    {
      id: '6Eng0fGqOzh9DAs907m5Qs',
      title: '[mini vignette] Use Case Mini Vignette - IoT for Security',
      media: {
        src: '//images.ctfassets.net/2vm221913gep/0WD5iz5Y8yRfHACvyr3jS/2eae76c876dabb045849130ed0ae2bf7/UseCase_MiniVignette_Security-IoT.png',
        alt: 'Use Case Mini Vignette - IoT for Security',
        height: 816,
        width: 1088,
      },
      fm: 'webp',
    },
    {
      id: '4Hz9F5cTVceV2smdoyzoyl',
      title: '[mini vignette] Use Case Mini Vignette - Point of Sale',
      media: {
        src: '//images.ctfassets.net/2vm221913gep/3jGoFFlJqIHhvSFHGMTSQO/32d83fd0af6e015718258a0fdd1cb172/UseCase_MiniVignette_Point-of-Sale.png',
        alt: 'Customer making purchase at cafe on a PoS device',
        height: 816,
        width: 1088,
      },
      alt: 'Customer making purchase at cafe on a PoS device',
      fm: 'webp',
    },
    {
      id: '6p8445hTAXIFPNa1wtneX7',
      title: '[mini vignette] Use Case Mini Vignette - Industrial IoT',
      media: {
        src: '//images.ctfassets.net/2vm221913gep/1Jfb21qbvwsjb86aYnDus4/fcbe545f9774713ff6142b0aed1e1a70/UseCase_MiniVignette_Industrial-IoT.png',
        alt: 'Use Case Mini Vignette - Industrial IoT',
        height: 816,
        width: 1088,
      },
      fm: 'webp',
    },
    {
      id: '15rxsU0UDs4Wh3VsN7GPQn',
      title: '[mini vignette] Use Case Mini Vignette - Order Tracking',
      media: {
        src: '//images.ctfassets.net/2vm221913gep/5Yk7mrTEnvzPY7JaqPcuI6/5ad8d550437c3255cdc95d8663be073e/UseCase_MiniVignette_Order-Tracking.png',
        alt: "Person receiving order they've been tracking",
        height: 816,
        width: 1088,
      },
      alt: "Person receiving order they've been tracking",
      fm: 'webp',
    },
    {
      id: '7e36WE7WGRbcnhRlGgNtb5',
      title: '[mini vignette] Industry Mini Vignette - Healthcare',
      media: {
        src: '//images.ctfassets.net/2vm221913gep/1Qo9syXskeUvohb7tDmec0/4853087659cc3197f4f688c672120b8e/Industry_MiniVignette_Healthcare.png',
        alt: 'Doctor monitoring patients via IoT devices',
        height: 816,
        width: 1088,
      },
      alt: 'Doctor monitoring patients via IoT devices',
      contain: true,
    },
    {
      id: '5SdJxnlRpi3PGOogN2DBFN',
      title: '[mini vignette] Industry Mini Vignette - Retail and E-commerce',
      media: {
        src: '//images.ctfassets.net/2vm221913gep/17Mm7nESmOL1T0wRE7trjg/9019a4413bab16f14c49dc0ac66dbcde/Industry_Mini_Vignette_Retail-and-Ecommerce.png',
        alt: 'Industry Mini Vignette - Retail and E-commerce',
        height: 816,
        width: 1088,
      },
      contain: true,
    },
    {
      id: '01bCSrRbl4hSiCyE5aaYcb',
      title:
        '[mini vignette] Industry Mini Vignette - Logistics and transportation',
      media: {
        src: '//images.ctfassets.net/2vm221913gep/3YgAWe1QVAIyny7cauV8T3/3a2a6cbd2c50a20a117dacc4ae2bbb3a/Industry_MiniVignette_Logistics-and-Transportation.png',
        alt: 'Shipping containers',
        height: 816,
        width: 1088,
      },
      contain: true,
    },
    {
      id: '3lW0YIY8n2KzMDVyS0Guzz',
      title: '[mini vignette] Industry Mini Vignette - Travel and Hospitality',
      media: {
        src: '//images.ctfassets.net/2vm221913gep/79KAeDs6JbY9n00A9lYIgB/c0839b928e9a4dcd00a086a3e3afae0d/Industry_MiniVignette_Travel-and-Hospitality.png',
        alt: 'Travel destination',
        height: 816,
        width: 1088,
      },
      alt: 'Travel destination',
      contain: true,
    },
    {
      id: '3mATRNbAPIG9kig5rvj43Z',
      title: '[mini vignette] Use Case Mini Vignette - Account Notification',
      media: {
        src: '//images.ctfassets.net/2vm221913gep/7ss1zM8wUpcafx4uO1YFf3/3e362685569d9498ed5f7b538954d8c5/UseCase_MiniVignette_Account-Notifications.png',
        alt: 'Person receiving account notification via text message',
        height: 816,
        width: 1088,
      },
      alt: 'Person receiving account notification via text message',
      fm: 'webp',
    },
    {
      id: '52HaKSRVavB8pBfeS4icGf',
      title: '[mini vignette] Use Case Mini Vignette - AI and Voice Analytics',
      media: {
        src: '//images.ctfassets.net/2vm221913gep/XS3o7hZ3hulYv3pF9EnWR/900acff79824786be6e5ab70392d1fe7/UseCase_MiniVignette_AI-and-voice-analytics.png',
        alt: 'Artificial Intelligence (AI) and voice recognition technology being used to analyze, process and identify patterns in real-time communications to identify customer needs and detect customer sentiment and emotion.',
        height: 816,
        width: 1088,
      },
      alt: 'Artificial Intelligence (AI) and voice recognition technology being used to analyze, process and identify patterns in real-time communications to identify customer needs and detect customer sentiment and emotion.',
      fm: 'webp',
    },
    {
      id: 'oMLFhD3si4Q1PoVp0Aazx',
      title: '[mini vignette] Use Case Mini Vignette - Appointment Reminder',
      media: {
        src: '//images.ctfassets.net/2vm221913gep/2I6Q2LGp8BgfxR9fYcQSXF/12db5771c912cdff7bde448219984396/UseCase_MiniVignette_Appointment-Reminders.png',
        alt: 'Doctor appointment reminder',
        height: 816,
        width: 1088,
      },
      alt: 'Doctor appointment reminder',
      fm: 'webp',
    },
    {
      id: '6W2VfRwwS3eeAipVDHlmDK',
      title:
        '[mini vignette] Use Case Mini Vignette - Two-factor Authentication',
      media: {
        src: '//images.ctfassets.net/2vm221913gep/5BR45PBPdnVxiu7bDYTJko/e9c2a1bb87ea5600c7078b391482f291/UseCase_MiniVignette_Two-factor-Authentication.png',
        alt: 'Use Case Mini Vignette - Two-factor Authentication',
        height: 816,
        width: 1088,
      },
      fm: 'webp',
    },
    {
      id: '6b7RLidhOZilylj4mcSjbj',
      title: '[mini vignette] Use Case Mini Vignette - Healthcare IoT',
      media: {
        src: '//images.ctfassets.net/2vm221913gep/4vA1Y7zWUIETRRSUSiaz5d/22294461fa9e494d08b819f8f1d4db36/UseCase_MiniVignette_Healthcare-IoT.png',
        alt: 'Use Case Mini Vignette - Healthcare IoT',
        height: 816,
        width: 1088,
      },
      fm: 'webp',
    },
  ],
};
//#endregion

const componentMeta: Meta<CategoryHeroProps> = {
  title: 'Layout/Hero/Category Overview Hero',
  component: CategoryHero,
  args: {
    children: 'This will be used in all stories, unless overwritten',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type story = StoryObj<CategoryHeroProps>;

export const WithContent: story = {
  args: {
    heading: 'Solutions for scaling your business',
    copy: 'Discover solutions designed for an industry or a technical use case.',
    ctaButtons: [
      {
        type: 'link',
        text: 'See industries',
        href: '#',
        linkKind: 'cta',
        linkIcon: mock.linkIcon,
      },
      {
        type: 'link',
        text: 'See use cases',
        href: '#',
        linkKind: 'cta',
        linkIcon: mock.linkIcon,
      },
    ],
    backgroundColor: 'cream',
    mediaList: mock.mediaList as CategoryHeroProps['mediaList'],
  },
};
