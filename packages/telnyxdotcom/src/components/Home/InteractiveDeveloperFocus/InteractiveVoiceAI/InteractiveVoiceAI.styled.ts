import { styled } from 'ui/styles';
import Card from 'ui/components/Card';

export const Wrapper = styled('div', {
  margin: 0,
  textAlign: 'center',
  width: 304,

  '@small': {
    width: 436,
    borderRadius: '$large',
  },
  '@medium': {
    margin: '0 auto',
  },
  '@large': {
    margin: 0,
  },
  '@xl': {
    height: 630,
    width: 544,
  },
});

export const FormCard = styled(Card, {
  '@lessThanSmall': {
    width: '100%',
  },
  borderRadius: '$large',
  paddingBlock: '$xxl',

  variants: {
    embed: {
      true: {
        borderRadius: '$medium',
        filter: 'none',
        height: '100%',
        paddingInline: '$large',
        paddingBlock: '$large',

        '@small': {
          borderRadius: '$large',
          paddingInline: '$xxl',
        },

        '@xl': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingInline: '$xh',
        },
      },
    },
  },
});
