import { styled } from '../../styles';
import Grid from '../GridExtended';

export const WrapperGrid = styled(Grid.Container, {
  gridTemplateRows: 'repeat(2, 1fr)',
  gap: '16px',
});
