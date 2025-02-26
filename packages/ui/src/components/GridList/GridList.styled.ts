import { styled } from '../../styles';
import Link from '../Link';
import Grid from '../Grid';

export const CardDivider = styled('div', {
  backgroundColor: '$tan',
  height: '2px',
  marginTop: '$xxl',
  marginBottom: '$xl',
});

export const CardWrapper = styled('div', {
  [`&:last-of-type ${CardDivider}`]: {
    display: 'none',
  },
});

export const Container = styled(Grid.Container, {
  rowGap: '$large',

  '@small': {
    rowGap: 'xl',
  },

  '@medium': {
    rowGap: '$xxl',
  },
});

export const FilterItem = styled(Grid.Item, {
  minWidth: 232,
  '@small': {
    justifySelf: 'end',
  },

  '@medium': {
    minWidth: 274,
  },
});

export const FilterSelect = styled('div', {
  marginBottom: '$xxl',
});

export const PaginationItem = styled(Grid.FullWidthItem, {
  justifySelf: 'center',
  marginTop: '$xs',

  '@medium': {
    marginTop: 0,
  },
});

export const StyledLink = styled(Link, {
  marginBottom: '$medium',
  display: 'block',
});
