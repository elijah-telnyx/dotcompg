import type { Meta, StoryObj } from '@storybook/react';

import ReleaseNote, { type ReleaseNoteProps } from './ReleaseNote';

const componentMeta: Meta<ReleaseNoteProps> = {
  title: 'Layout/Release Note Article',
  component: ReleaseNote,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<ReleaseNoteProps>;

export const Default: Story = {
  args: {
    breadcrumbLink: {
      href: '/release-notes',
      text: 'Release notes',
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
    heading: 'Advanced Opt-in / Opt-out for Messaging',
    copy: 'We’ve recently released Advanced Opt-in / Opt-out, which allows users to configure custom keyword, auto response & block rule operations for their respective messaging profiles.\n\nAdvanced Opt In / Out allows users to configure and personalise their own auto response behaviour, negating the need to implement their own mechanisms in order to align with industry standards.\n\nYou can now optionally personalise configurations to trigger based on inbound messages from specific countries, allowing for localised language support for your brand.\n\nDeveloper Docs Guide can be found [here](https://developers.telnyx.com/docs/v2/messaging/features/advanced-opt-in-out).\n\nAPI Reference can be found [here](https://developers.telnyx.com/docs/api/v2/messaging/Messaging-Profiles#create_autoresp_config_api_v2_autoresp_configs__profile_id__post).',
    backgroundColor: 'cream',
    publishDate: '2021-07-01T00:00:00.000Z',
    hasOverflow: false,
    spacingTop: 'contrasting',
    spacingBottom: 'contrasting',
  },
};
