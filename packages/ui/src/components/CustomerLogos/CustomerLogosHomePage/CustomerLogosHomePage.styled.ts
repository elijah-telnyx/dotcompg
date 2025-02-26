import { keyframes, styled } from '../../../styles';

export const LogoWrapper = styled('div', {
  '& img': {
    height: 32,
    width: 'auto',
    objectFit: 'contain',
  },
});

export const BannerWidthLimit = styled('div', {
  maxWidth: '100vw',
  overflow: 'hidden',
});

const autoScrollAnimation = keyframes({
  '0%': { transform: 'translateX(0%)' },
  '100%': { transform: `translateX(calc(-50% - $$gap / 2))` },
});

export const BannerWrapper = styled('div', {
  alignItems: 'center',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
  animationName: `${autoScrollAnimation}`,
  display: 'flex',
  $$gap: '72px',
  gap: '$$gap',
  width: 'max-content',
  '@small': {
    $$gap: '96px',
  },
});
