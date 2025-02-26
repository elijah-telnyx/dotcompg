import { styled } from '../../styles';
import { Base } from './utils';

const Caption = styled(Base('p'), {
  typography: '$p.caption.mobile',
  '@medium': {
    typography: '$p.caption',
  },
});

export const CaptionDashboard = styled('p', {
  color: '$grayHoverDarkBackground',
  typography: '$p.caption.dashboard',
  '@medium': {
    typography: '$p.caption.dashboard',
  },
});

export default Caption;
