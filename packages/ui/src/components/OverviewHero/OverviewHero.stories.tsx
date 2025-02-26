import type { Meta, StoryObj } from '@storybook/react';

import OverviewHero, { type OverviewHeroProps } from './OverviewHero';

const componentMeta: Meta<OverviewHeroProps> = {
  title: 'Layout/Hero/Overview Hero',
  component: OverviewHero,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<OverviewHeroProps>;

export const Default: Story = {
  args: {
    heading: 'Blog',
    backgroundColor: 'black',
  },
};

export const WithCopy: Story = {
  args: {
    heading: 'Solutions for scaling your business.',
    copy: 'Discover solutions designed for an industry or a technical use case.',
    backgroundColor: 'black',
  },
};

export const WithMarkdownCopy: Story = {
  args: {
    heading: 'Your one-stop shop for distributed infrastructure.',
    copy: 'Explore our suite of products below or [contact us](/contact-us) for customized recommendations.',
    backgroundColor: 'black',
  },
};

const linkIcon = {
  src: '',
  svg: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_4009_6885)">
      <path d="M11 0L11 -1L9 -1L9 0L11 0ZM9 0L9 12L11 12L11 0L9 0Z" fill="currentColor" />
      <path
          d="M10.8944 18.2111C10.5259 18.9482 9.4741 18.9482 9.10557 18.2111L5.72361 11.4472C5.39116 10.7823 5.87465 10 6.61804 10L13.382 10C14.1253 10 14.6088 10.7823 14.2764 11.4472L10.8944 18.2111Z"
          fill="currentColor" />
  </g>
  <defs>
      <clipPath id="clip0_4009_6885">
          <rect width="20" height="20" fill="white" />
      </clipPath>
  </defs>
</svg>`,
  alt: 'go to',
};

export const WithCTA: Story = {
  args: {
    heading: 'Solutions for scaling your business',
    copy: 'Learn how Telnyx products apply to your industry or use case.',
    ctaButtons: [
      {
        type: 'link',
        text: 'See industries',
        href: '#',
        linkKind: 'cta',
        linkIcon,
      },
      {
        type: 'link',
        text: 'See use cases',
        href: '#',
        linkKind: 'cta',
        linkIcon,
      },
    ],
    backgroundColor: 'cream',
  },
};

export const WithTextCentered: Story = {
  args: {
    heading: 'Thank you.',
    copy: `We've received your request. A confirmation of your submission will arrive in your email inbox shortly.`,
    footerCopy: `Didn't receive an email? Email us at [sales@telnyx.com](mailto:sales@telnyx.com).`,
    backgroundColor: 'black',
    centered: true,
  },
};

export const WithTextPattern: Story = {
  args: {
    heading: 'Architect your connectivity',
    copy: `Learn about the problems we solve and the opportunities we create.`,
    centered: true,
    spacingTop: 'contrasting',
    spacingBottom: 'contrasting',
    backgroundColor: 'black',
    hasPattern: true,
  },
};

export const WithForm: Story = {
  args: {
    heading:
      'Telnyx named Leader in the G2 Fall 2022 Report in multiple categories.',
    copy: `Synopsis of content here. Keep it short and sweet with high-level summary of what to expect in the content.
  `,
    footerCopy: 'Learn more by downloading the report.',
    spacingTop: 'contrasting',
    spacingBottom: 'contrasting',
    backgroundColor: 'green',
    form: {
      heading: 'Download report',
      formId: 1989,
    },
    media: {
      src: 'https://via.placeholder.com/448x252.png',
      alt: 'placeholder',
    },
  },
};
