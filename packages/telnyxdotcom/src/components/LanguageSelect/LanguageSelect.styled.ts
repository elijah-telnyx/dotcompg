import { styled } from 'ui/styles';
import Grid from 'ui/components/Grid';

export const SelectContainer = styled('div', {
  width: '100%',
  position: 'absolute',
  zIndex: 1,
  top: '16px',
  '@lessThanSmall': {
    position: 'relative',
    marginBottom: '$large',
    top: '-16px',
  },
});

export const Container = styled(Grid.Container, {
  justifyItems: 'end',
  '@lessThanSmall': {
    justifyItems: 'start',
  },
});

export const SelectWrapper = styled('div', {
  width: '200px !important',
});
