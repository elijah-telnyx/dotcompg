import { styled } from '../../styles';
import { Base } from './utils';

export interface Quote {
  /**
   * Defines if it will use quotes at the start of the text
   */
  useQuotes?: boolean;
}

const Quote = styled(Base('q'), {
  typography: '$quote.mobile',
  '@medium': {
    typography: '$quote',
  },
  '&::after': {
    content: '',
  },
  variants: {
    useQuotes: {
      true: {
        '&::before': {
          content: 'open-quote close-quote',
          display: 'block',
          lineHeight: '0.5em',
        },
      },
      false: {
        '&::before': {
          content: '',
        },
      },
    },
    blog: {
      true: {
        display: 'block',
        marginBlockStart: '$medium',
        '@medium': {
          marginBlockStart: '$xl',
          typography: '$quote.mobile',
        },
        'a span': {
          typography: '$quote.mobile',
        },
      },
    },
  },
  defaultVariants: {
    useQuotes: true,
  },
});

export default Quote;
