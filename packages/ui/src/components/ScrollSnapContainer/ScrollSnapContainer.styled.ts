import { styled } from '../../styles';

export const Container = styled('div', {
  height: '100vh',
  position: 'relative',
  overflowX: 'hidden',
  overflowY: 'scroll',
  scrollSnapType: 'y mandatory',

  variants: {
    behavior: {
      smooth: {
        scrollBehavior: 'smooth',
      },
      auto: {},
    },
    hideScrollbar: {
      true: {
        '&::-webkit-scrollbar': {
          display: 'none',
        },

        '-ms-overflow-style': 'none' /* IE and Edge */,
        scrollbarWidth: 'none' /* Firefox */,
      },
    },
    stopSnap: {
      true: {
        scrollSnapType: 'none',
      },
      false: {},
    },
  },
});
