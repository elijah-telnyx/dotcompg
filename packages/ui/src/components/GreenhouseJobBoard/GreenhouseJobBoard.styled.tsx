import { styled } from '../../styles';
import Heading from '../Typography/Heading';

export const Container = styled('div', {
  display: 'grid',
  justifyContent: 'space-between',
  margin: '0 auto',
});

export const Title = styled(Heading, {
  marginBottom: '$medium',
  marginTop: '$xl',
});

export const JobWrapper = styled('div', {
  marginBottom: '$medium',
  maxWidth: 'max-content',
});
