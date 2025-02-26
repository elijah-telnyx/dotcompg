import { styled } from 'ui/styles';
import CompareProgress from 'ui/components/Progress/CompareProgress';

export const Root = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$medium',
  '@medium': {
    gap: '$large',
  },
});

export const ButtonRow = styled('div', {
  display: 'flex',
  gap: '$medium',
  marginTop: '$medium',
});

export const CompareProgressWrapper = styled('div', {
  display: 'flex',
  gap: '$medium',
  flexDirection: 'column',
});

export const CompareProgressRow = styled(CompareProgress, {
  label: {
    display: 'block',
  },
});
