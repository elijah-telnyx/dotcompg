import { styled } from '../../styles';

export const Wrapper = styled('div', {
  '& video, & img': {
    width: '100%',
    aspectRatio: '16/9',
    '@medium': {
      height: '100vh',
    },
  },
});
