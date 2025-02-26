import { styled } from 'ui/styles';

export const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  maxWidth: '100vw',
  '& main': {
    flexGrow: 1,
  },
});
