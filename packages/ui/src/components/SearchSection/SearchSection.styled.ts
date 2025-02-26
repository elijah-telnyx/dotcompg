import { styled } from '../../styles';
import Grid from '../Grid';
import Input from '../Input';

export const SearchBoxWrapper = styled(Grid.Item, {
  maxWidth: 304,
  '@medium': {
    width: 274,
    marginLeft: 'auto',
  },
});

export const SearchInput = styled(Input, {
  '@medium': {
    minWidth: 'unset',
    width: '100%',
  },
});
