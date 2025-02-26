import { styled } from '../../styles';

export const Root = styled('div', {});
export const Item = styled('div', {});
export const NavigationButton = styled('button', {
  '&[disabled]': {
    cursor: 'not-allowed',
  },
});
