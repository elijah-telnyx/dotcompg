import { styled } from '../../styles';

export const StyledMediaItem = styled('div', {
  aspectRatio: '4 / 3',
  width: 304,
  height: 228,
  '@medium': {
    width: 384,
    height: 288,
  },
  '@large': {
    width: 416,
    height: 312,
  },
  '@xl': {
    width: 544,
    height: 408,
  },
});
