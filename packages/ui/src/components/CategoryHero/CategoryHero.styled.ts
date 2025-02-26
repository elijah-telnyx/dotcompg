import { styled } from '../../styles';
import Grid from '../GridExtended';

export const WrapperGrid = styled(Grid.Container);

export const CopyItem = styled(Grid.Item, {
  variants: {
    centered: {
      true: {
        gridColumn: 'span 4 / auto',

        '@small': {
          gridColumn: '2 / span 6',
        },

        '@medium': {
          gridColumn: '1 / span 6',
        },
      },
    },
  },
});

export const ButtonsWrapper = styled('div', {
  display: 'flex',
  gap: '$xs',
  flexDirection: 'column',
  marginTop: '$large',

  '@small': {
    flexDirection: 'row',
    gap: '$large',
    marginTop: '$small',
  },

  '@medium': {
    gap: '$xl',
    marginTop: '$large',
  },

  variants: {
    orientation: {
      horizontal: {},
      vertical: {
        '@small': {
          flexDirection: 'column',
        },
      },
    },
  },
});

export const ButtonWrapper = styled(Grid.Item, {
  '@medium': {
    justifySelf: 'end',
  },
  '@large': {
    // to keep flush with the copy
    marginTop: '-$large',
  },
});
