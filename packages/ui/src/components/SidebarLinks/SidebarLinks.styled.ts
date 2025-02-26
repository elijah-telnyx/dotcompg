import { styled } from '../../styles';

export const LinksWrapper = styled('div', {
  display: 'none',

  '@medium': {
    display: 'flex',
    gap: '$large',
    flexDirection: 'column',
  },
});
