import { styled } from '../../../styles';
import H from '../../Typography/Heading';
import P from '../../Typography/Paragraph';
import Progress from '../Progress';

export const ProgressBar = styled(Progress.Bar, {
  backgroundColor: '$tan',
  borderRadius: '$large',
  height: 32,
});

export const ProgressIndicator = styled(Progress.Indicator, {
  borderRadius: '$large',
});

export const Label = styled(H);
export const Value = styled(P, {
  textAlign: 'right',
});

export const Wrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  rowGap: '$xs',
  columnGap: '$small',
  alignItems: 'center',
  '@lessThanMedium': {
    [`& ${ProgressBar}`]: {
      gridColumn: 'span 2',
    },
  },
  '@medium': {
    gridTemplateColumns: 'auto 1fr auto',
    [`& ${ProgressBar}`]: {
      gridColumn: '2',
      gridRow: '1',
    },
    [`& ${Value}`]: {
      gridColumn: '3',
      fontOffset: 'paragraph',
    },
  },
});

export const FullWidthWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  rowGap: '$xs',
  columnGap: '$small',
  alignItems: 'center',
  [`& ${ProgressBar}`]: {
    gridColumn: 'span 2',
  },
});
