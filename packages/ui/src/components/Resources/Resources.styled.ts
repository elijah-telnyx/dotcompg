import { styled } from '../../styles';
import Grid from '../Grid';

export const Container = styled(Grid.Container, {
  rowGap: '$xl',

  '@small': {
    rowGap: '$xl',
  },

  '@medium': {
    rowGap: '$xxl',
  },
});

export const CodesItem = styled(Grid.Item, {
  height: '240px',

  '@small': {
    height: '368px',
  },

  '@medium': {
    height: '372px',
  },
});

export const CardsItem = styled(Grid.Item, {});
