import { keyframes, styled } from '../../styles';

export const LinkWrapper = styled('span', {
  padding: '$xxs',
  transform: 'translateY(4px)',
});

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: '100%' },
});

export const AnimateVisibleItemWrapper = styled('div', {
  variants: {
    animateOnVisible: {
      true: {
        animationName: fadeIn.name,
        animationDuration: '0.5s',
        animationTimingFunction: 'ease-in-out',
      },
    },
  },
});
