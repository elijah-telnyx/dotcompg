import { styled } from 'ui/styles';
import Grid from 'ui/components/Grid';
import CTA from 'ui/components/Typography/CTA';

import * as headerConstants from 'ui/components/Header/constants';

export const Container = styled(Grid.Container, {
  rowGap: '$large',
  scrollMarginTop: headerConstants.height.xs,
  '@small': { rowGap: 'xl' },
  '@medium': { rowGap: '$xxl' },
});

export const TextWrapper = styled(Grid.Item, {
  display: 'grid !important',
  gap: '$xxs',
});

export const FilterLabel = styled(CTA, {
  display: 'inline-block',
  marginBottom: '$small',
});

export const FilterItemsWrapper = styled('div', {
  display: 'flex',
  gap: '$small',
  flexWrap: 'wrap',
  alignItems: 'center',
});

export const FiltersContainer = styled(Grid.FullWidthItem, {});

export const FiltersWrapper = styled('div', {
  marginBottom: '$xs',
  display: 'grid',
  gap: '$xl',
});

export const LoadingWrapper = styled(Grid.FullWidthItem, {
  display: 'grid !important',
  placeItems: 'center',
});

export const AboveMedium = styled('div', {
  display: 'none',
  '@medium': {
    display: 'block',
  },
});

export const BelowMedium = styled('div', {
  maxWidth: 320,
  '@medium': {
    display: 'none',
  },
});
