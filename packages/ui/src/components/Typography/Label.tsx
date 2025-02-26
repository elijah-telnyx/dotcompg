import * as ReactLabel from '@radix-ui/react-label';
import { styled } from '../../styles';

const Label = styled(ReactLabel.Root, {
  display: 'inline-block',
  typography: '$label.mobile',
  '@medium': {
    typography: '$label',
  },
});

export default Label;
