import { keyframes } from '@stitches/react';
import { styled, theme } from '../../styles';
import type { ThemedCSS } from '../../styles/config/stitches.config';
import Grid from '../Grid';

export const MAX_VISIBLE_LOGOS = 4;

Grid.Item.toString = () => '.grid-item';

const fade = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

const fadeAnimation: ThemedCSS = {
  opacity: 0,
  animation: `${fade} 0.5s ease-in-out forwards`,
};

export const Container = styled(Grid.Container, {
  gridAutoRows: '1fr',
  placeItems: 'center',
  gap: '$medium',

  variants: {
    centered: {
      true: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        // match grid size
        $$gridWidth: theme.gridMaxWidth.small.value,
        $$gridGap: theme.space.small.value,
        $$logoSize: `calc(($$gridWidth/${MAX_VISIBLE_LOGOS}) - $$gridGap)`,
        gap: '$$gridGap',

        '& > *': {
          width: '$$logoSize',
          height: '$$logoSize',
        },

        '@small': {
          $$gridGap: theme.space.small.value,
          $$gridWidth: theme.gridMaxWidth.small.value,
        },

        '@medium': {
          $$gridGap: theme.space.medium.value,
          $$gridWidth: theme.gridMaxWidth.medium.value,
        },

        '@large': {
          $$gridGap: theme.space.large.value,
          $$gridWidth: theme.gridMaxWidth.large.value,
        },

        '@xl': {
          $$gridGap: theme.space.xl.value,
          $$gridWidth: theme.gridMaxWidth.xl.value,
        },
      },
    },
  },
});

export const MainImageItem = styled(Grid.Item, {
  height: '100%',
});

export const MainImageContainer = styled('div', {
  height: '100%',
  display: 'grid',
  alignItems: 'center',
  ...fadeAnimation,
});

export const CopyContainer = styled(Grid.Item, {
  maxWidth: '500px',
  textAlign: 'center',
});

export const SolutionsCss = {
  container: styled('div', {
    marginInline: 'auto',
    display: 'grid',
    placeItems: 'center',
    maxWidth: theme.gridMaxWidth.base.value,
    '--columnsGap': 0,
    gap: 'var(--columnsGap)',

    '@lessThanSmall': {
      gridAutoRows: 228,
    },
    '@small': {
      '--columnsGap': theme.space.medium.value,
      alignItems: 'center',
      maxWidth: 'calc(100vw - var(--columnsGap))',
      gridTemplateColumns: 'repeat(4, calc(25vw - var(--columnsGap)))',
    },
    '@medium': {
      '--columnsGap': theme.space.large.value,
    },
    '@xl': {
      '--columnsGap': theme.space.xl.value,
      gridTemplateColumns: 'repeat(auto-fit, calc(25vw - var(--columnsGap)))',
    },
  }),
  mediaWrapper: styled('div', {
    width: '100%',
    display: 'grid',
    placeItems: 'center',
    '& img': {
      aspectRatio: '4/3',
    },
    ...fadeAnimation,
  }),
};
