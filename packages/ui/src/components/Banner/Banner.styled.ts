import { styled } from '../../styles';
import { backgroundColorVariants } from '../../styles/constants/backgroundColorOptions';
import { Heading2Category } from '../Typography/Heading/Heading.styled';

export const Wrapper = styled('div', {
  width: '100%',
});

export const Copy = styled(Heading2Category, {
  height: 37,
  backgroundRepeat: 'repeat-x',
  variants: {
    ...backgroundColorVariants,
  },
});
