import { styled } from 'ui/styles';

export const Wrapper = styled('div', {
  display: 'grid',
  placeItems: 'center',
  width: '100%',
  overflow: 'auto',

  '@lessThanMedium': {
    height: 'calc(100% - $space$medium)',
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      '& > [data-state="active"]': {
        flexBasis: '100%',
      },
    },
  },
});
