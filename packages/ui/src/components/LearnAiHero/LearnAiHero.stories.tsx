import type { Meta, StoryObj } from '@storybook/react';
import LearnAiHero, { type LearnAiHeroProps } from './LearnAiHero';

const componentMeta: Meta<LearnAiHeroProps> = {
  title: 'Layout/Learn AI Hero',
  component: LearnAiHero,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<LearnAiHeroProps>;

export const Default: Story = {
  args: {
    breadcrumbLink: {
      href: '/resources',
      text: 'Back to blog',
      type: 'link',
      linkKind: 'cta',
      linkIcon: {
        src: '',
        svg: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_4646_1199)">
            <path d="M21 9L22 9L22 11L21 11L21 9ZM21 11L9.00002 11L9.00002 9L21 9L21 11Z" fill="currentColor" />
            <path
                d="M2.78886 9.10557C2.05181 9.4741 2.05181 10.5259 2.78885 10.8944L9.55279 14.2764C10.2177 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 10.2177 5.39116 9.55279 5.72361L2.78886 9.10557Z"
                fill="currentColor" />
        </g>
        <defs>
            <clipPath id="clip0_4646_1199">
                <rect width="20" height="20" fill="white" />
            </clipPath>
        </defs>
    </svg>`,
        alt: 'back',
      },
      linkDirection: 'rtl',
    },
    tagline: 'Guides and Tutorials • Published 08/26/2022',
    heading: '3 customer engagement tools you need on your platform',
    copy: 'Elevate your customer engagement platform with these three engagement tools.',
    author: {
      id: 'author-odhran-reidy',
      icon: {
        src: 'https://images.ctfassets.net/taysl255dolk/4wtANA4Qy1G8izHcOXSpez/6b054c95efcc3cc90068996ed37114b6/TechCrunch-bw-circle-crop-small.png',
        alt: '',
      },
      copy: 'Odhran Reidy',
    },
    media: {
      src: '//images.ctfassets.net/taysl255dolk/29VSIjeilR0mKriJOfZ6cW/80db24fa08eddc36ae8f6aa6056e49c5/customer_engagement_tools_telnyx.png',
      alt: 'Customer Engagement Tools Telnyx',
    },
  },
};
