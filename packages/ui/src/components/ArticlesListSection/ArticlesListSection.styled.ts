import { styled } from '../../styles';
import Grid from '../Grid';

export const Container = styled(Grid.Container, {
  rowGap: '$large',
  '@small': { rowGap: 'xl' },
  '@medium': { rowGap: '$xxl' },
});

export const PaginationItem = styled(Grid.FullWidthItem, {
  justifySelf: 'center',
  marginTop: '$xs',
  '@medium': { marginTop: 0 },
});

export const CardsContainer = styled(Grid.Container, {
  listStyleType: 'none',
  paddingInlineStart: 0,
  rowGap: '$xl',

  '@medium': { rowGap: '$huge', columnGap: '$medium' },
  '@large': { columnGap: '$large' },
});

export const CardWrapper = styled(Grid.Item, {
  paddingBottom: '$small',
  borderBottom: `1px solid $tan`,
  '& > a': { height: '100%' },
});
