import { styled } from '../../styles';
import { Base } from '../Typography/utils';

export const Wrapper = styled('div', {
  display: 'flex',
  gap: '$xs',
  alignItems: 'center',
});

export const NameWrapper = styled(Base('p'), {
  typography: '$p.mobile',
  '@small': {
    typography: '$label.mobile',
  },
  '@medium': {
    typography: '$label',
  },
});

export const Name = styled('span');
