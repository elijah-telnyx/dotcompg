import { styled } from '../../styles';
import Grid from '../Grid';

export const HeadingWrapper = styled(Grid.Item, {
  marginBottom: '$large',
  '@medium': {
    marginBottom: '$xxl',
  },
});
