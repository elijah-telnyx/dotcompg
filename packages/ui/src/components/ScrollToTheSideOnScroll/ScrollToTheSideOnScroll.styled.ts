import { styled } from '../../styles';

const gradientWhite = 'rgba(254, 253, 245, 0.5) 0%';
const gradientBlack = 'rgba(0,0,0,0) 10%';

export const StyledGradientBackground = styled('div', {
  position: 'relative',
  '&:after': {
    content: '',
    position: 'absolute',
    width: '100%',
    top: 0,
    bottom: 0,
    background: `linear-gradient(to right, ${gradientWhite}, ${gradientBlack}),linear-gradient(to left, ${gradientWhite}, ${gradientBlack})`,
  },
});

export const StyledContainer = styled('div', {
  overflow: 'hidden',
  maxWidth: '100vw',
  position: 'relative',
  marginTop: '$xl',
  '@small': {
    marginTop: '$xxl',
  },
  '@medium': {
    marginTop: '$xh',
  },
});

// to left align with grid
export const leftOffsetCalc = (breakpoint: string) => {
  return `calc((100vw - $gridMaxWidth$${breakpoint}) / 2)`;
};

export const StyledItemsWrapper = styled('div', {
  display: 'flex',
  gap: '$medium',

  marginLeft: leftOffsetCalc('base'),
  '@small': {
    marginLeft: leftOffsetCalc('small'),
  },
  '@medium': {
    marginLeft: leftOffsetCalc('medium'),
  },
  '@large': {
    marginLeft: leftOffsetCalc('large'),
    gap: '$large',
  },
  '@xl': {
    gap: '$xl',
  },
});
