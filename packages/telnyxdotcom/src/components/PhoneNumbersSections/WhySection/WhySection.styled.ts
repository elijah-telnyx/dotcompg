import { styled } from 'ui/styles';
import Grid from 'ui/components/Grid';

export const Container = styled(Grid.Container, {
  rowGap: '$large',

  '@small': {
    rowGap: '$xl',
  },

  '@medium': {
    rowGap: '$huge',
  },
});

export const ButtonsContainer = styled('div', {
  display: 'flex',
  gap: '$large',
});

export const HeaderItem = styled(Grid.Item, {
  variants: {
    hidden: {
      true: {
        display: 'none !important',
      },
    },
  },
});
