import { styled } from '../../styles';
import Media from '../Media/Media';
import { size } from './constants';

export const Picture = styled(Media, {
  borderRadius: '$round',
  background: '$green',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:before': {
    content: 'attr(data-author-initials)',
    color: '$black',
    display: 'grid',
    placeItems: 'center',
    minHeight: '100%',
    typography: '$h2.category.mobile',
    transform: 'translateY(2px)', // move font down because of font bottom spacing
  },

  variants: {
    pictureSize: {
      medium: {
        width: size.medium.xs,
        height: size.medium.xs,
        maxWidth: size.medium.xs,
        maxHeight: size.medium.xs,
      },
      big: {
        width: size.big.xs,
        height: size.big.xs,
        maxWidth: size.big.xs,
        maxHeight: size.big.xs,

        '@medium': {
          width: size.big.medium,
          height: size.big.medium,
          maxWidth: size.big.medium,
          maxHeight: size.big.medium,
        },

        '&:before': {
          typography: '$h2.category',
        },
      },
    },
  },
});

export const Initials = styled('div', Picture);
