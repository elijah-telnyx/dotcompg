import { styled } from '../../styles';
import { Base } from './utils';

const CTA = styled(Base('span'), {
  typography: '$cta.mobile',
  '@medium': {
    typography: '$cta',
  },
});

export default CTA;
