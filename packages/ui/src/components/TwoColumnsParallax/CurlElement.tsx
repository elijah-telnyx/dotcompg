import { styled } from '../../styles';

const bottomElement = {
  height: 81,
  width: 120,
};

const topElement = {
  height: 56,
  width: 124,
};

const strokeWidth = 4;

const BottomElement = () => (
  <svg
    className='bottom'
    {...bottomElement}
    viewBox='0 0 120 81'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M2 81V74C2 34.2355 34.2355 2 74 2H120'
      stroke='currentColor'
      strokeWidth={strokeWidth}
    />
  </svg>
);

const TopElement = () => (
  <svg
    className='top'
    {...topElement}
    viewBox='0 0 124 56'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M122 0V0C122 29.8234 97.8234 54 68 54H0'
      stroke='currentColor'
      strokeWidth={strokeWidth}
    />
  </svg>
);

const MiddleLine = styled('div', {
  height: strokeWidth,
  backgroundColor: 'CurrentColor',
  bottom: bottomElement.height - strokeWidth,
  // hide around 728px of screen size
  right: 8,
  left: bottomElement.width,
  '@medium': {
    // to fill ultra-wide
    right: -4,
  },
});

const Wrapper = styled('div', {
  display: 'none',
  '@medium': {
    display: 'block',
  },
  color: '$tan',
  position: 'relative',
  height: topElement.height + bottomElement.height,
  width: '20vw',
  left: '25vw',
  '& > *': {
    position: 'absolute',
  },

  [`& .top`]: {
    top: 4,
    right: 0,
    // to center line with above section
    left: `calc(25vw - ${topElement.width}px)`,
  },
  [`& .bottom`]: {
    bottom: 0,
  },
  variants: {
    reverse: {
      true: {
        transform: 'scaleX(-1)',
        left: '30vw',
        top: -8,
      },
    },
  },
});

interface CurlElementProps {
  reverse?: boolean;
}

const CurlElement = (props: CurlElementProps) => (
  <Wrapper {...props}>
    <TopElement />
    <MiddleLine />
    <BottomElement />
  </Wrapper>
);

export default CurlElement;
