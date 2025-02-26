import { Base } from '../utils';
import { styled } from '../../../styles';
import type { HeadingTag } from './Heading';

const BaseHeading = (tag: HeadingTag) =>
  styled(Base(tag), {
    typography: `$${tag}.mobile`,
    '@medium': {
      typography: `$${tag}`,
    },
  });

export const Heading1 = styled(BaseHeading('h1'), {
  variants: {
    alt: {
      true: {
        typography: '$h1.alt.mobile',
        '@medium': {
          typography: '$h1.alt',
        },
      },
    },
    blog: {
      true: {
        typography: '$h2.mobile',
        '@medium': {
          typography: '$h2',
        },
      },
    },
    inHeader: {
      true: {
        marginBlockStart: '$large',

        '@medium': {
          marginBlockStart: '$xxl',
        },
      },
    },
    dashboard: {
      true: {
        typography: '$h1.dashboard',
        '@medium': {
          typography: '$h1.dashboard',
        },
      },
    },
  },
});

export const Heading2 = styled(BaseHeading('h2'), {
  variants: {
    blog: {
      true: {
        marginBlockStart: '$xl',
        typography: '$h3.mobile',
        '@medium': {
          marginBlockStart: '$xxl',
          typography: '$h3',
        },
      },
    },
    inHeader: {
      true: {
        marginBlockStart: '$large',

        '@medium': {
          marginBlockStart: '$xxl',
        },
      },
    },
    alt: {
      true: {
        typography: '$h2.alt.mobile',
        '@medium': {
          typography: '$h2.alt',
        },
      },
    },
    dashboard: {
      true: {
        typography: '$h2.dashboard',
        '@medium': {
          typography: '$h2.dashboard',
        },
      },
    },
  },
});

export const Heading2Category = styled(Base('strong'), {
  display: 'block',
  typography: '$h2.category.mobile',
  '@medium': {
    typography: '$h2.category',
  },
});

export const Heading3 = styled(BaseHeading('h3'), {
  variants: {
    blog: {
      true: {
        marginBlockStart: '$large',
        typography: '$cta.mobile',
        '@medium': {
          marginBlockStart: '$xl',
          typography: '$cta',
        },
      },
    },
    inHeader: {
      true: {
        marginBlockStart: '$large',

        '@medium': {
          marginBlockStart: '$xxl',
        },
      },
    },
    alt: {
      true: {
        typography: '$h3.alt.mobile',
        '@medium': {
          typography: '$h3.alt',
        },
      },
    },
    dashboard: {
      true: {
        typography: '$h3.dashboard',
        '@medium': {
          typography: '$h3.dashboard',
        },
      },
    },
  },
});
