import { styled } from '../../styles';
import { Base } from '../Typography/utils';

export const PaginationContainer = styled(Base('nav'), {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  justifyContent: 'center',
  maxWidth: 'min-content',
  gap: '$xs',
});

export const CTA = styled('p', {
  typography: '$cta.mobile',
  '@small': {
    typography: '$cta',
  },
});

export const NavButton = styled('button', {
  '&[aria-disabled="true"], &:disabled': {
    cursor: 'not-allowed',
  },
  svg: {
    height: 20,
    width: 20,
  },
  '@small': {
    svg: {
      height: 24,
      width: 24,
    },
  },
  variants: {
    dark: {
      true: {
        svg: {
          '&:hover': {
            color: '$grayHoverDarkBackground',
          },
        },
        '&[aria-disabled], &:disabled': {
          svg: {
            color: '$grayHoverLightBackground',
          },
        },
      },
      false: {
        svg: {
          '&:hover': {
            color: '$grayHoverLightBackground',
          },
        },
        '&[aria-disabled], &:disabled': {
          svg: {
            color: '$grayHoverDarkBackground',
          },
        },
      },
    },
  },
});
