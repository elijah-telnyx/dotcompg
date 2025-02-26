import { styled } from '../../styles';
import { Base } from './utils';

const ListItem = styled(Base('li'), {
  typography: '$p.mobile',

  '@medium': {
    typography: '$p',
  },

  variants: {
    blog: {
      true: {
        marginBlockEnd: '$xxs',

        '@medium': {
          marginBlockEnd: '$xs',
        },
      },
    },
  },
});

export default ListItem;
