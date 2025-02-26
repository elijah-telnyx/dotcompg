import { styled } from 'ui/styles';

export const GroupItemWrapper = styled('ul', {
  padding: 0,
  margin: 0,
  display: 'grid',
  gap: '$xs',
  '@headerDesktop': {
    gap: '$medium',
  },
});

export const GroupItem = styled('li', {
  padding: 0,
  margin: 0,
  listStyle: 'none',
});

export const Grid = styled('div', {
  display: 'grid',
  gap: '$xl',
});

export const TwoColumnGrid = styled(Grid, {
  '@headerDesktop': {
    gridTemplateColumns: '1fr 1fr',
  },
});

export const ThreeColumnGrid = styled(Grid, {
  '@headerDesktop': {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
});

export const Box = styled('div');

export const Flex = styled('div', {
  display: 'flex',
  variants: {
    direction: {
      column: {
        flexDirection: 'column',
      },
    },
  },
});

export const CTABannerWrapper = styled('div', {
  marginTop: 'auto',
  // minimum margin to avoid the cta banner to be too close to the bottom of the container
  '& > *:first-child': {
    marginTop: '$xl',
  },
  '@headerMobileOnly': {
    display: 'none',
  },
});
