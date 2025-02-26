import { styled } from '../../styles';
import Grid from '../Grid';

export const Container = styled(Grid.Container, {
  rowGap: '$large',
  '@small': { rowGap: 'xl' },
  '@medium': { rowGap: '$xxl' },
});
