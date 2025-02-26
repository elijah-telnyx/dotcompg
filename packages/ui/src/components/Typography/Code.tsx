import { styled } from '../../styles';
import { Base } from './utils';

const Code = styled(Base('code'), {
  typography: '$code.mobile',
  '@small': {
    typography: '$code',
  },
});

export default Code;
