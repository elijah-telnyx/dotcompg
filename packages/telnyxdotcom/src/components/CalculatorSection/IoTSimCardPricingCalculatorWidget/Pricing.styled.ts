import { styled } from 'ui/styles';

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
