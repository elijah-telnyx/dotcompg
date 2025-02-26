import { styled } from '../../styles';
import { Base } from './utils';

const HorizontalRule = styled(Base('hr'), {
  borderColor: '$black',
  marginBlock: '$medium',
  typography: '$p.mobile',

  '@medium': {
    typography: '$p',
  },

  variants: {
    blog: {
      true: {
        marginBlock: '$large',

        '@medium': {
          marginBlock: '$xl',
        },
      },
    },

    dark: {
      true: {
        borderColor: '$cream',
      },
    },
  },
});

export default HorizontalRule;
