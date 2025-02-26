import { styled } from '../../styles';
import Grid from '../Grid';

export const Wrapper = styled('div', {});

export const CategorySelectContainer = styled(Grid.Container, {
  visibility: 'visible',
  marginBottom: 32,

  '@medium': {
    marginBottom: 0,
    visibility: 'hidden',
  },
});
