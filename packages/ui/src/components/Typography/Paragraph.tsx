import { styled } from '../../styles';
import { Base } from './utils';

export interface Paragraph {
  /**
   * increases font and line-height
   */
  lead?: boolean;
}

const Paragraph = styled(Base('p'), {
  variants: {
    lead: {
      true: {
        typography: '$p.lead.mobile',
        '@medium': {
          typography: '$p.lead',
        },
      },
      false: {
        typography: '$p.mobile',
        '@medium': {
          typography: '$p',
        },
      },
    },

    blog: {
      true: {
        marginBlockStart: '$medium',
      },
    },

    inHeader: {
      true: {
        marginBlockStart: '$xs',

        '@medium': {
          marginBlockStart: '$small',
        },

        '@large': {
          marginBlockStart: '$large',
        },
      },
    },

    dashboard: {
      true: {
        true: {},
      },
    },
  },
  compoundVariants: [
    {
      lead: false,
      dashboard: true,
      css: {
        typography: '$p.dashboard',
        '@medium': {
          typography: '$p.dashboard',
        },
      },
    },
  ],
  defaultVariants: {
    lead: false,
  },
});

export default Paragraph;
