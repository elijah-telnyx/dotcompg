import { styled } from '../../styles';
import { Base } from './utils';

const List = styled(Base('ul'), {
  marginBlock: '$medium 0',
  paddingInlineStart: '$medium',
  typography: '$p.mobile',

  '@medium': {
    typography: '$p',
    paddingInlineStart: '$large',
  },

  variants: {
    blog: {
      true: {
        marginBlock: '$medium',
      },
    },
  },
});

export default List;
