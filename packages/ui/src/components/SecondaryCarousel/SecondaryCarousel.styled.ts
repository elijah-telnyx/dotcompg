import { styled } from '../../styles';

export const CardSizes = {
  xs: { width: 304 },
  small: { width: 304 },
  medium: { width: 304 },
  large: { width: 328 },
  xl: { width: 352 },
};

export const CardWrapper = styled('div', {
  width: CardSizes.xs.width,
  height: '100%',
  '@large': { width: CardSizes.large.width },
  '@xl': { width: CardSizes.xl.width },
});
