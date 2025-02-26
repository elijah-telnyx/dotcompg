import { styled } from '../../styles';
import { Base } from './utils';

interface Statistics {
  /**
   * defines the size of the font
   */
  major?: boolean;
}

const Statistics = styled(Base('p'), {
  variants: {
    major: {
      true: {
        typography: '$p.statistic.major.mobile',
        '@medium': {
          typography: '$p.statistic.major',
        },
      },
      false: {
        typography: '$p.statistic.mobile',
        '@medium': {
          typography: '$p.statistic',
        },
      },
    },
  },
  defaultVariants: {
    major: false,
  },
});

export default Statistics;
