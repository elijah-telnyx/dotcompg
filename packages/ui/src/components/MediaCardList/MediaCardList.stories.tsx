import type { Meta, StoryObj } from '@storybook/react';

import MediaCardList, { type MediaCardListProps } from './MediaCardList';

const componentMeta: Meta<MediaCardListProps> = {
  title: 'Components/MediaCardList',
  component: MediaCardList,
};

export default componentMeta;

type Story = StoryObj<MediaCardListProps>;

export const Default: Story = {
  args: {
    id: 'industries',
    tagline: 'INDUSTRIES',
    heading: 'Explore industry-focused solutions.',
    items: [
      {
        media: {
          alt: 'carousel image',
          src: 'https://images.ctfassets.net/taysl255dolk/XX6KAfZiBmLXq7G7ZWIKw/b178a80c0207d7f0d8c38292d8f97fd3/TelnyxDotCom_Hero_BG_2.jpg',
        },
        title: 'Healthcare',
        icon: {
          src: '',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">\n    <g clip-path="url(#clip0_702_3511)">\n        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#000" stroke-width="8"/>\n    </g>\n    <defs>\n        <clipPath id="clip0_702_3511">\n            <rect width="32" height="32" fill="currentColor"/>\n        </clipPath>\n    </defs>\n</svg>',
          alt: 'check',
        },
        link: {
          href: '#learn-more-link',
          text: 'Learn more',
          type: 'link',
          linkKind: 'cta',
          linkIcon: {
            src: '',
            svg: `<svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        {title && <title>{title}</title>}

        <g clipPath='url(#clip0_2039_717)'>
          <path
            d='M1 9L-4.37114e-08 9L4.37114e-08 11L1 11L1 9ZM1 11L13 11L13 9L1 9L1 11Z'
            fill='currentColor'
          />
          <path
            d='M19.2111 9.10557C19.9482 9.4741 19.9482 10.5259 19.2111 10.8944L12.4472 14.2764C11.7823 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 11.7823 5.39116 12.4472 5.72361L19.2111 9.10557Z'
            fill='currentColor'
          />
        </g>
        <defs>
          <clipPath id='clip0_2039_717'>
            <rect width='20' height='20' fill='white' />
          </clipPath>
        </defs>
      </svg>`,
            alt: 'back',
          },
        },
      },
      {
        footerTheme: 'green',
        circleTheme: 'tan',
        media: {
          alt: 'carousel image',
          src: 'https://images.ctfassets.net/taysl255dolk/XX6KAfZiBmLXq7G7ZWIKw/b178a80c0207d7f0d8c38292d8f97fd3/TelnyxDotCom_Hero_BG_2.jpg',
        },
        title: 'Retail and ecommerce',
        link: {
          href: '#learn-more-link',
          text: 'Learn more',
          type: 'link',
          linkKind: 'cta',
          linkIcon: {
            src: '',
            svg: `<svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        {title && <title>{title}</title>}

        <g clipPath='url(#clip0_2039_717)'>
          <path
            d='M1 9L-4.37114e-08 9L4.37114e-08 11L1 11L1 9ZM1 11L13 11L13 9L1 9L1 11Z'
            fill='currentColor'
          />
          <path
            d='M19.2111 9.10557C19.9482 9.4741 19.9482 10.5259 19.2111 10.8944L12.4472 14.2764C11.7823 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 11.7823 5.39116 12.4472 5.72361L19.2111 9.10557Z'
            fill='currentColor'
          />
        </g>
        <defs>
          <clipPath id='clip0_2039_717'>
            <rect width='20' height='20' fill='white' />
          </clipPath>
        </defs>
      </svg>`,
            alt: 'back',
          },
        },
      },
      {
        footerTheme: 'blue',
        circleTheme: 'tan',
        media: {
          alt: 'carousel image',
          src: 'https://images.ctfassets.net/taysl255dolk/XX6KAfZiBmLXq7G7ZWIKw/b178a80c0207d7f0d8c38292d8f97fd3/TelnyxDotCom_Hero_BG_2.jpg',
        },
        title: 'Logistics and transportation',
        icon: {
          src: '',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">\n    <g clip-path="url(#clip0_702_3511)">\n        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#000" stroke-width="8"/>\n    </g>\n    <defs>\n        <clipPath id="clip0_702_3511">\n            <rect width="32" height="32" fill="currentColor"/>\n        </clipPath>\n    </defs>\n</svg>',
          alt: 'check',
        },
        link: {
          href: '#learn-more-link',
          text: 'Learn more',
          type: 'link',
          linkKind: 'cta',
          linkIcon: {
            src: '',
            svg: `<svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        {title && <title>{title}</title>}

        <g clipPath='url(#clip0_2039_717)'>
          <path
            d='M1 9L-4.37114e-08 9L4.37114e-08 11L1 11L1 9ZM1 11L13 11L13 9L1 9L1 11Z'
            fill='currentColor'
          />
          <path
            d='M19.2111 9.10557C19.9482 9.4741 19.9482 10.5259 19.2111 10.8944L12.4472 14.2764C11.7823 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 11.7823 5.39116 12.4472 5.72361L19.2111 9.10557Z'
            fill='currentColor'
          />
        </g>
        <defs>
          <clipPath id='clip0_2039_717'>
            <rect width='20' height='20' fill='white' />
          </clipPath>
        </defs>
      </svg>`,
            alt: 'back',
          },
        },
      },
      {
        footerTheme: 'green',
        circleTheme: 'citron',
        media: {
          alt: 'carousel image',
          src: 'https://images.ctfassets.net/taysl255dolk/XX6KAfZiBmLXq7G7ZWIKw/b178a80c0207d7f0d8c38292d8f97fd3/TelnyxDotCom_Hero_BG_2.jpg',
        },
        title: 'Financial services',
        icon: {
          src: '',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">\n    <g clip-path="url(#clip0_702_3511)">\n        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#000" stroke-width="8"/>\n    </g>\n    <defs>\n        <clipPath id="clip0_702_3511">\n            <rect width="32" height="32" fill="currentColor"/>\n        </clipPath>\n    </defs>\n</svg>',
          alt: 'check',
        },
        link: {
          href: '#learn-more-link',
          text: 'Learn more',
          type: 'link',
          linkKind: 'cta',
          linkIcon: {
            src: '',
            svg: `<svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        {title && <title>{title}</title>}

        <g clipPath='url(#clip0_2039_717)'>
          <path
            d='M1 9L-4.37114e-08 9L4.37114e-08 11L1 11L1 9ZM1 11L13 11L13 9L1 9L1 11Z'
            fill='currentColor'
          />
          <path
            d='M19.2111 9.10557C19.9482 9.4741 19.9482 10.5259 19.2111 10.8944L12.4472 14.2764C11.7823 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 11.7823 5.39116 12.4472 5.72361L19.2111 9.10557Z'
            fill='currentColor'
          />
        </g>
        <defs>
          <clipPath id='clip0_2039_717'>
            <rect width='20' height='20' fill='white' />
          </clipPath>
        </defs>
      </svg>`,
            alt: 'back',
          },
        },
      },
      {
        footerTheme: 'tan',
        media: {
          alt: 'carousel image',
          src: 'https://images.ctfassets.net/taysl255dolk/XX6KAfZiBmLXq7G7ZWIKw/b178a80c0207d7f0d8c38292d8f97fd3/TelnyxDotCom_Hero_BG_2.jpg',
        },
        title: 'Travel and hospitality',
        icon: {
          src: '',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">\n    <g clip-path="url(#clip0_702_3511)">\n        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#000" stroke-width="8"/>\n    </g>\n    <defs>\n        <clipPath id="clip0_702_3511">\n            <rect width="32" height="32" fill="currentColor"/>\n        </clipPath>\n    </defs>\n</svg>',
          alt: 'check',
        },
        link: {
          href: '#learn-more-link',
          text: 'Learn more',
          type: 'link',
          linkKind: 'cta',
          linkIcon: {
            src: '',
            svg: `<svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        {title && <title>{title}</title>}

        <g clipPath='url(#clip0_2039_717)'>
          <path
            d='M1 9L-4.37114e-08 9L4.37114e-08 11L1 11L1 9ZM1 11L13 11L13 9L1 9L1 11Z'
            fill='currentColor'
          />
          <path
            d='M19.2111 9.10557C19.9482 9.4741 19.9482 10.5259 19.2111 10.8944L12.4472 14.2764C11.7823 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 11.7823 5.39116 12.4472 5.72361L19.2111 9.10557Z'
            fill='currentColor'
          />
        </g>
        <defs>
          <clipPath id='clip0_2039_717'>
            <rect width='20' height='20' fill='white' />
          </clipPath>
        </defs>
      </svg>`,
            alt: 'back',
          },
        },
      },
      {
        media: {
          alt: 'carousel image',
          src: 'https://images.ctfassets.net/taysl255dolk/XX6KAfZiBmLXq7G7ZWIKw/b178a80c0207d7f0d8c38292d8f97fd3/TelnyxDotCom_Hero_BG_2.jpg',
        },
        title: 'Healthcare',
        icon: {
          src: '',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">\n    <g clip-path="url(#clip0_702_3511)">\n        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#000" stroke-width="8"/>\n    </g>\n    <defs>\n        <clipPath id="clip0_702_3511">\n            <rect width="32" height="32" fill="currentColor"/>\n        </clipPath>\n    </defs>\n</svg>',
          alt: 'check',
        },
        link: {
          href: '#learn-more-link',
          text: 'Learn more',
          type: 'link',
          linkKind: 'cta',
          linkIcon: {
            src: '',
            svg: `<svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        {title && <title>{title}</title>}

        <g clipPath='url(#clip0_2039_717)'>
          <path
            d='M1 9L-4.37114e-08 9L4.37114e-08 11L1 11L1 9ZM1 11L13 11L13 9L1 9L1 11Z'
            fill='currentColor'
          />
          <path
            d='M19.2111 9.10557C19.9482 9.4741 19.9482 10.5259 19.2111 10.8944L12.4472 14.2764C11.7823 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 11.7823 5.39116 12.4472 5.72361L19.2111 9.10557Z'
            fill='currentColor'
          />
        </g>
        <defs>
          <clipPath id='clip0_2039_717'>
            <rect width='20' height='20' fill='white' />
          </clipPath>
        </defs>
      </svg>`,
            alt: 'back',
          },
        },
      },
      {
        media: {
          alt: 'carousel image',
          src: 'https://images.ctfassets.net/taysl255dolk/XX6KAfZiBmLXq7G7ZWIKw/b178a80c0207d7f0d8c38292d8f97fd3/TelnyxDotCom_Hero_BG_2.jpg',
        },
        title: 'Healthcare',
        icon: {
          src: '',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">\n    <g clip-path="url(#clip0_702_3511)">\n        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#000" stroke-width="8"/>\n    </g>\n    <defs>\n        <clipPath id="clip0_702_3511">\n            <rect width="32" height="32" fill="currentColor"/>\n        </clipPath>\n    </defs>\n</svg>',
          alt: 'check',
        },
        link: {
          href: '#learn-more-link',
          text: 'Learn more',
          type: 'link',
          linkKind: 'cta',
          linkIcon: {
            src: '',
            svg: `<svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        {title && <title>{title}</title>}

        <g clipPath='url(#clip0_2039_717)'>
          <path
            d='M1 9L-4.37114e-08 9L4.37114e-08 11L1 11L1 9ZM1 11L13 11L13 9L1 9L1 11Z'
            fill='currentColor'
          />
          <path
            d='M19.2111 9.10557C19.9482 9.4741 19.9482 10.5259 19.2111 10.8944L12.4472 14.2764C11.7823 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 11.7823 5.39116 12.4472 5.72361L19.2111 9.10557Z'
            fill='currentColor'
          />
        </g>
        <defs>
          <clipPath id='clip0_2039_717'>
            <rect width='20' height='20' fill='white' />
          </clipPath>
        </defs>
      </svg>`,
            alt: 'back',
          },
        },
      },
    ],
  },
};

export const WithOneItem: Story = {
  args: {
    tagline: 'INDUSTRIES',
    heading: 'Explore industry-focused solutions.',
    items: [
      {
        media: {
          alt: 'carousel image',
          src: 'https://images.ctfassets.net/taysl255dolk/XX6KAfZiBmLXq7G7ZWIKw/b178a80c0207d7f0d8c38292d8f97fd3/TelnyxDotCom_Hero_BG_2.jpg',
        },
        title: 'Healthcare',
        icon: {
          src: '',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">\n    <g clip-path="url(#clip0_702_3511)">\n        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#000" stroke-width="8"/>\n    </g>\n    <defs>\n        <clipPath id="clip0_702_3511">\n            <rect width="32" height="32" fill="currentColor"/>\n        </clipPath>\n    </defs>\n</svg>',
          alt: 'check',
        },
        link: {
          href: '#learn-more-link',
          text: 'Learn more',
          type: 'link',
          linkKind: 'cta',
          linkIcon: {
            src: '',
            svg: `<svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        {title && <title>{title}</title>}

        <g clipPath='url(#clip0_2039_717)'>
          <path
            d='M1 9L-4.37114e-08 9L4.37114e-08 11L1 11L1 9ZM1 11L13 11L13 9L1 9L1 11Z'
            fill='currentColor'
          />
          <path
            d='M19.2111 9.10557C19.9482 9.4741 19.9482 10.5259 19.2111 10.8944L12.4472 14.2764C11.7823 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 11.7823 5.39116 12.4472 5.72361L19.2111 9.10557Z'
            fill='currentColor'
          />
        </g>
        <defs>
          <clipPath id='clip0_2039_717'>
            <rect width='20' height='20' fill='white' />
          </clipPath>
        </defs>
      </svg>`,
            alt: 'back',
          },
        },
      },
    ],
  },
};

export const WithTwoItems: Story = {
  args: {
    tagline: 'INDUSTRIES',
    heading: 'Explore industry-focused solutions.',
    items: [
      {
        media: {
          alt: 'carousel image',
          src: 'https://images.ctfassets.net/taysl255dolk/XX6KAfZiBmLXq7G7ZWIKw/b178a80c0207d7f0d8c38292d8f97fd3/TelnyxDotCom_Hero_BG_2.jpg',
        },
        title: 'Healthcare',
        icon: {
          src: '',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">\n    <g clip-path="url(#clip0_702_3511)">\n        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#000" stroke-width="8"/>\n    </g>\n    <defs>\n        <clipPath id="clip0_702_3511">\n            <rect width="32" height="32" fill="currentColor"/>\n        </clipPath>\n    </defs>\n</svg>',
          alt: 'check',
        },
        link: {
          href: '#learn-more-link',
          text: 'Learn more',
          type: 'link',
          linkKind: 'cta',
          linkIcon: {
            src: '',
            svg: `<svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        {title && <title>{title}</title>}

        <g clipPath='url(#clip0_2039_717)'>
          <path
            d='M1 9L-4.37114e-08 9L4.37114e-08 11L1 11L1 9ZM1 11L13 11L13 9L1 9L1 11Z'
            fill='currentColor'
          />
          <path
            d='M19.2111 9.10557C19.9482 9.4741 19.9482 10.5259 19.2111 10.8944L12.4472 14.2764C11.7823 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 11.7823 5.39116 12.4472 5.72361L19.2111 9.10557Z'
            fill='currentColor'
          />
        </g>
        <defs>
          <clipPath id='clip0_2039_717'>
            <rect width='20' height='20' fill='white' />
          </clipPath>
        </defs>
      </svg>`,
            alt: 'back',
          },
        },
      },
      {
        footerTheme: 'green',
        circleTheme: 'tan',
        media: {
          alt: 'carousel image',
          src: 'https://images.ctfassets.net/taysl255dolk/XX6KAfZiBmLXq7G7ZWIKw/b178a80c0207d7f0d8c38292d8f97fd3/TelnyxDotCom_Hero_BG_2.jpg',
        },
        title: 'Retail and ecommerce',
        link: {
          href: '#learn-more-link',
          text: 'Learn more',
          type: 'link',
          linkKind: 'cta',
          linkIcon: {
            src: '',
            svg: `<svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        {title && <title>{title}</title>}

        <g clipPath='url(#clip0_2039_717)'>
          <path
            d='M1 9L-4.37114e-08 9L4.37114e-08 11L1 11L1 9ZM1 11L13 11L13 9L1 9L1 11Z'
            fill='currentColor'
          />
          <path
            d='M19.2111 9.10557C19.9482 9.4741 19.9482 10.5259 19.2111 10.8944L12.4472 14.2764C11.7823 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 11.7823 5.39116 12.4472 5.72361L19.2111 9.10557Z'
            fill='currentColor'
          />
        </g>
        <defs>
          <clipPath id='clip0_2039_717'>
            <rect width='20' height='20' fill='white' />
          </clipPath>
        </defs>
      </svg>`,
            alt: 'back',
          },
        },
      },
    ],
  },
};

export const WithThreeItems: Story = {
  args: {
    tagline: 'INDUSTRIES',
    heading: 'Explore industry-focused solutions.',
    items: [
      {
        media: {
          alt: 'carousel image',
          src: 'https://images.ctfassets.net/taysl255dolk/XX6KAfZiBmLXq7G7ZWIKw/b178a80c0207d7f0d8c38292d8f97fd3/TelnyxDotCom_Hero_BG_2.jpg',
        },
        title: 'Healthcare',
        icon: {
          src: '',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">\n    <g clip-path="url(#clip0_702_3511)">\n        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#000" stroke-width="8"/>\n    </g>\n    <defs>\n        <clipPath id="clip0_702_3511">\n            <rect width="32" height="32" fill="currentColor"/>\n        </clipPath>\n    </defs>\n</svg>',
          alt: 'check',
        },
        link: {
          href: '#learn-more-link',
          text: 'Learn more',
          type: 'link',
          linkKind: 'cta',
          linkIcon: {
            src: '',
            svg: `<svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        {title && <title>{title}</title>}

        <g clipPath='url(#clip0_2039_717)'>
          <path
            d='M1 9L-4.37114e-08 9L4.37114e-08 11L1 11L1 9ZM1 11L13 11L13 9L1 9L1 11Z'
            fill='currentColor'
          />
          <path
            d='M19.2111 9.10557C19.9482 9.4741 19.9482 10.5259 19.2111 10.8944L12.4472 14.2764C11.7823 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 11.7823 5.39116 12.4472 5.72361L19.2111 9.10557Z'
            fill='currentColor'
          />
        </g>
        <defs>
          <clipPath id='clip0_2039_717'>
            <rect width='20' height='20' fill='white' />
          </clipPath>
        </defs>
      </svg>`,
            alt: 'back',
          },
        },
      },
      {
        footerTheme: 'green',
        circleTheme: 'tan',
        media: {
          alt: 'carousel image',
          src: 'https://images.ctfassets.net/taysl255dolk/XX6KAfZiBmLXq7G7ZWIKw/b178a80c0207d7f0d8c38292d8f97fd3/TelnyxDotCom_Hero_BG_2.jpg',
        },
        title: 'Retail and ecommerce',
        link: {
          href: '#learn-more-link',
          text: 'Learn more',
          type: 'link',
          linkKind: 'cta',
          linkIcon: {
            src: '',
            svg: `<svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        {title && <title>{title}</title>}

        <g clipPath='url(#clip0_2039_717)'>
          <path
            d='M1 9L-4.37114e-08 9L4.37114e-08 11L1 11L1 9ZM1 11L13 11L13 9L1 9L1 11Z'
            fill='currentColor'
          />
          <path
            d='M19.2111 9.10557C19.9482 9.4741 19.9482 10.5259 19.2111 10.8944L12.4472 14.2764C11.7823 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 11.7823 5.39116 12.4472 5.72361L19.2111 9.10557Z'
            fill='currentColor'
          />
        </g>
        <defs>
          <clipPath id='clip0_2039_717'>
            <rect width='20' height='20' fill='white' />
          </clipPath>
        </defs>
      </svg>`,
            alt: 'back',
          },
        },
      },
      {
        footerTheme: 'green',
        circleTheme: 'citron',
        media: {
          alt: 'carousel image',
          src: 'https://images.ctfassets.net/taysl255dolk/XX6KAfZiBmLXq7G7ZWIKw/b178a80c0207d7f0d8c38292d8f97fd3/TelnyxDotCom_Hero_BG_2.jpg',
        },
        title: 'Financial services',
        icon: {
          src: '',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">\n    <g clip-path="url(#clip0_702_3511)">\n        <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#000" stroke-width="8"/>\n    </g>\n    <defs>\n        <clipPath id="clip0_702_3511">\n            <rect width="32" height="32" fill="currentColor"/>\n        </clipPath>\n    </defs>\n</svg>',
          alt: 'check',
        },
        link: {
          href: '#learn-more-link',
          text: 'Learn more',
          type: 'link',
          linkKind: 'cta',
          linkIcon: {
            src: '',
            svg: `<svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        {title && <title>{title}</title>}

        <g clipPath='url(#clip0_2039_717)'>
          <path
            d='M1 9L-4.37114e-08 9L4.37114e-08 11L1 11L1 9ZM1 11L13 11L13 9L1 9L1 11Z'
            fill='currentColor'
          />
          <path
            d='M19.2111 9.10557C19.9482 9.4741 19.9482 10.5259 19.2111 10.8944L12.4472 14.2764C11.7823 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 11.7823 5.39116 12.4472 5.72361L19.2111 9.10557Z'
            fill='currentColor'
          />
        </g>
        <defs>
          <clipPath id='clip0_2039_717'>
            <rect width='20' height='20' fill='white' />
          </clipPath>
        </defs>
      </svg>`,
            alt: 'back',
          },
        },
      },
    ],
  },
};
