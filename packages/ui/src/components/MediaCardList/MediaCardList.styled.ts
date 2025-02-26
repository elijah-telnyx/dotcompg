import { styled } from '../../styles';
import Grid from '../Grid';
import H from '../Typography/Heading';

export const Heading = styled(H, {
  marginTop: '$large',
  marginBottom: '$xl',

  '@small': {
    marginBottom: '$xxl',
  },
  '@medium': {
    marginTop: '$xxl',
    marginBottom: '$huge',
  },
});

export const ContainerCards = styled(Grid.Container, {
  marginTop: '$medium',
  rowGap: '$medium',

  '@large': {
    marginTop: '$large',
    rowGap: '$large',
  },
  '@xl': {
    marginTop: '$xl',
    rowGap: '$xl',
  },
});
