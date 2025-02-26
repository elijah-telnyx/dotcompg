import { styled } from 'ui/styles';

export const SectionHeader = styled('div', {
  maxWidth: 736,
  marginInline: 'auto',
});

export const ProductCardsWrapper = styled('div', {
  display: 'grid',
  maxWidth: '1728px',
  marginInline: 'auto',
  gap: '$large',
  paddingInline: '$large',
  '@small': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@large': {
    gap: '$xl',
    paddingInline: '$xl',
  },
});
