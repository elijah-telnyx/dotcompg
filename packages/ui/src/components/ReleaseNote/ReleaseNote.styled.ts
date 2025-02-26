import { styled } from '../../styles';
import Grid from '../Grid';

export const Container = styled(Grid.Container, {
  rowGap: '$medium',

  '@medium': {
    rowGap: '$large',
  },
});

export const BreadcrumbItem = styled(Grid.Item, {
  marginBottom: '$xl',

  '@medium': {
    marginBottom: '$xxl',
  },
});

export const TagItem = styled(Grid.Item, {
  marginBottom: '$xs',
});
