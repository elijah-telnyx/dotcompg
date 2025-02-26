import { styled, keyframes } from '../../styles';
import Loading from '../Icons/Loading';
const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const Spinner = styled(Loading, {
  textAlign: 'center',
  borderRadius: '50%',
  aspectRatio: 1,
  animation: `${rotate} 1s linear infinite`,
  variants: {
    size: {
      xs: {
        width: 16,
        height: 16,
      },
      small: {
        width: 20,
        height: 20,
      },
      medium: {
        width: 30,
        height: 30,
      },
      big: {
        width: 50,
        height: 50,
      },
    },
    background: {
      light: {
        color: '$cream',
      },
      dark: {
        color: '$black',
      },
    },
  },
});
