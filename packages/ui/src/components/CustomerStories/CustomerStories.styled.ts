import { styled } from '../../styles';

import Grid from '../Grid';

export const Container = styled(Grid.Container, {
  rowGap: '$large',

  '@small': {
    rowGap: '$xl',
  },

  '@medium': {
    rowGap: '$huge',
  },
});

export const CustomerItem = styled(Grid.Item, {
  '@large': {
    gridRow: '1',
  },
});

export const CustomerWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$medium',

  '@large': {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '$small',
  },
});

export const CustomerIcon = styled('div', {
  '&, & svg': {
    borderRadius: '$large',
    height: '64px',
    width: '64px',
  },

  '@medium': {
    '&, & svg': {
      borderRadius: '$xl',
      height: '72px',
      width: '72px',
    },
  },

  variants: {
    hasIcon: {
      false: {
        display: 'none',
      },
    },
  },
});

export const CustomerInfo = styled('div', {});

export const StoryContainer = styled(Grid.Container, {
  gridAutoFlow: 'revert',
  rowGap: '$medium',

  '@medium': {
    rowGap: '$small',
  },
});
