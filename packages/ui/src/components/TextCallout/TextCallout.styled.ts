import { keyframes, styled } from '../../styles';
import Section from '../Section';
import Grid from '../Grid';
import Heading from '../Typography/Heading';

export const SectionWrapper = styled(Section);

export const Container = styled(Grid.Container, {
  rowGap: '$large',

  '@medium': {
    rowGap: '$xxl',
  },

  '@xl': {
    rowGap: 0,
  },
});

const fadeIn = keyframes({
  from: {
    boxShadow: '0 0 0 #000',
    top: '16px',
    left: '-16px',
  },
  to: {
    boxShadow: '-16px 16px 0 #000',
    top: '0',
    left: '0',
  },
});

const fadeOut = keyframes({
  from: {
    boxShadow: '-16px 16px 0 #000',
    top: '0',
    left: '0',
  },
  to: {
    boxShadow: '0 0 0 #000',
    top: '16px',
    left: '-16px',
  },
});

export const CopyContainer = styled('div', {
  padding: '$xl',
  borderRadius: '$medium',
  border: '2px solid $black',
  variants: {
    animated: {
      true: {
        top: '16px',
        left: '-16px',
        position: 'relative',
        animation: `${fadeIn} 0.2s ease-out forwards`,
        '&:hover': {
          animation: `${fadeOut} 0.2s ease-out forwards`,
        },
      },
      false: {
        boxShadow: '-16px 16px 0 #000',
      },
    },
  },
});

export const Copy = styled(Heading, {
  fontSize: '$xl',
});
