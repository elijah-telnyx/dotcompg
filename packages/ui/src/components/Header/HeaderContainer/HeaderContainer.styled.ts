import { styled } from '../../../styles';
import { height, transition } from '../constants';

import { ScrollDirection } from './useScrollDirection';

export const Container = styled('header', {
  zIndex: '$headerMenu',
  transition: 'top 0.5s',
  position: 'sticky',
  variants: {
    direction: {
      [ScrollDirection.UP]: {
        ...transition.up,
        top: 0,
      },
      [ScrollDirection.DOWN]: {
        ...transition.down,
        top: -height.xs,

        '&:focus-within, &:hover': {
          top: 0,
        },

        '@large': {
          top: -height.large,
        },
      },
    },
    scrollSnap: {
      true: {
        position: 'absolute',
        width: '100%',

        '& + *': {
          transform: `translateY(${height.xs}px)`,
          overflowX: 'hidden',

          '@large': {
            transform: `translateY(${height.large}px)`,
          },
        },
      },
      false: {},
    },
  },

  compoundVariants: [
    {
      direction: ScrollDirection.DOWN,
      scrollSnap: true,
      // make sure to respect scrollSnap `absolute` positioning with `top` when `blockHeaderBehavior` is modified
      css: {
        top: 0,

        '@large': {
          top: 0,
        },
      },
    },
  ],

  defaultVariants: {
    direction: ScrollDirection.UP,
  },
});
