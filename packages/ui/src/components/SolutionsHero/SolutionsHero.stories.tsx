import type { Meta, StoryObj } from '@storybook/react';

import CTABanner from '../CTABanner';
import SolutionsHero, { type SolutionsHeroProps } from './SolutionsHero';

const componentMeta: Meta<typeof SolutionsHero> = {
  title: 'Layout/Hero/Solutions Hero',
  component: SolutionsHero,
  args: {
    backgroundColor: 'black',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<SolutionsHeroProps>;

export const Default: Story = {
  args: {
    tagline: 'Use case',
    heading: 'AI and voice analytics',
    media: {
      src: 'https://via.placeholder.com/1032x430.webpg',
      alt: 'AI and voice analytics',
    },
  },
};

export const WithSectionBelow: Story = {
  render: (args) => (
    <>
      <SolutionsHero {...args} />
      <CTABanner
        backgroundColor='cream'
        tag='pricing'
        heading='Only pay for what you use'
        copy='Say goodbye to minimum order quantities and monthly data usage lock-ins. Pay as you go, for what you need and nothing more.'
        pricingCopy='Starting at'
        pricingValue='$0.01/ MB'
        ctaButtons={[
          {
            type: 'button',
            text: 'See pricing',
            href: '#',
            backgroundColor: 'cream',
          },
        ]}
        hasOverflow={false}
        spacingBottom='contrasting'
        spacingTop='contrasting'
      />
    </>
  ),
  args: {
    backgroundColor: 'citron',
    tagline: 'Industry',
    heading: 'Healthcare',
    icon: {
      src: '',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewbox="0 0 56 56" fill="none" xmlns:v="https://vecta.io/nano"><g clip-path="url(#A)" fill="#000"><path d="M37.894 55.561a1.5 1.5 0 0 0 .439-1.061v-7.565l-3-2.106V52a1 1 0 0 1-1 1H21.667a1 1 0 0 1-1-1V38.333h-1.5a1.5 1.5 0 0 1-1.5-1.5v-1.5H4a1 1 0 0 1-1-1V21.667a1 1 0 0 1 1-1h13.667v-3H1.5a1.5 1.5 0 0 0-1.5 1.5v17.667a1.5 1.5 0 0 0 1.5 1.5h16.167V54.5a1.5 1.5 0 0 0 1.5 1.5h17.667a1.5 1.5 0 0 0 1.061-.439z"/><path d="M19.009 20.667v-3h1.658V4a1 1 0 0 1 1-1h12.667a1 1 0 0 1 1 1v13.667h1.5a1.5 1.5 0 0 1 1.5 1.5v1.5H52a1 1 0 0 1 1 1v12.667a1 1 0 0 1-1 1H38.333v6.482-.013-3.469H54.5a1.5 1.5 0 0 0 1.5-1.5V19.167a1.5 1.5 0 0 0-1.5-1.5H38.333V1.5a1.5 1.5 0 0 0-1.5-1.5H19.167a1.5 1.5 0 0 0-1.5 1.5v16.167h.159v3h-.159v14.667h1.5a1.5 1.5 0 0 1 1.5 1.5v1.5h9.042l2.227 1.67.001-.002 3.397 2.384v-3.584l-4.225-3.169a1.5 1.5 0 0 0-.9-.3h-9.542V20.667h-1.658z"/><path d="M19.009 17.667v3h1.658v-3h-1.658z"/><path d="M35.333 36.833a1.5 1.5 0 0 1 1.5-1.5h1.5V20.667h-1.5a1.5 1.5 0 0 1-1.5-1.5v-1.5H20.667v3h14.667v16.167z"/><path d="M38.333 19.167a1.5 1.5 0 0 0-1.5-1.5h-1.5v1.5a1.5 1.5 0 0 0 1.5 1.5h1.5v-1.5zm-3 17.666v1.969 3.584l1.283.901a1.5 1.5 0 0 0 1.717-1.471v-6.482h-1.5a1.5 1.5 0 0 0-1.5 1.5z"/><path fill-rule="evenodd" d="M38.333 41.815v2.676l-1.717-1.205a1.5 1.5 0 0 0 1.717-1.471zm-19.167-3.482h1.5v-1.5a1.5 1.5 0 0 0-1.5-1.5h-1.5v1.5a1.5 1.5 0 0 0 1.5 1.5zm-1.5-17.667h.159v-3h-.159v3z"/></g><defs><clipPath id="A"><path fill="#fff" d="M0 0h56v56H0z"/></clipPath></defs></svg>`,
      alt: 'Healthcare icon',
    },
    media: {
      src: 'https://images.ctfassets.net/2vm221913gep/4qTdCgdV5j5iNdWdx1ugiW/2654a5057c347b76e6a8c94471d6c52d/Industry_Healthcare_Hero_Rectangle.png',
      alt: 'Industry Healthcare',
    },
  },
};

export const WithoutMedia: Story = {
  args: {
    tagline: 'customer story',
    heading: 'Ooma',
  },
};

export const WithCtaButton: Story = {
  args: {
    heading: 'The top Twilio alternative',
    ctaButtons: [
      { text: 'Talk to an expert', href: '#contact-us', type: 'button' },
    ],
    media: {
      src: 'https://images.ctfassets.net/2vm221913gep/4qTdCgdV5j5iNdWdx1ugiW/2654a5057c347b76e6a8c94471d6c52d/Industry_Healthcare_Hero_Rectangle.png',
      alt: 'Industry Healthcare',
    },
  },
};
