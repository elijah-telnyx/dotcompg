import { styled } from '../../styles';

export const Wrapper = styled('div', {
  '@lessThanMedium': {
    '[data-type="curl"] &': {
      '&:after': {
        content: '',
        display: 'block',
        width: 4,
        height: 100,
        marginInline: 'auto',
        backgroundColor: '$tan',
        marginTop: '$large',
      },
    },
  },
});

export const ItemsContainer = styled('div', {
  display: 'grid',
  '@medium': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});

export const Column = styled('div', {
  '@medium': {
    '&:first-child': {
      position: 'relative',
      '[data-type="curl"] &:before': {
        content: '',
        display: 'block',
        backgroundColor: '$tan',
        width: 4,
        position: 'absolute',
        height: '100%',
        left: '25vw',
      },
    },
  },
});

export const LeftColumn = styled(Column, {});
export const RightColumn = styled(Column);

export const RightColumnContent = styled('div', {
  width: '100%',
  height: '100%',
});

export const LeftColumnContent = styled('div', {
  width: '100%',
});

export const Row = styled('div', {
  display: 'grid',
  height: '100vh',
  position: 'relative',
  '@lessThanMedium': {
    marginTop: '$large',
    gridTemplateRows: 'auto 1fr',
    '[data-type="curl"] &': {
      gridTemplateRows: '1fr auto 50vh',
      '&:before': {
        content: '',
        display: 'block',
        backgroundColor: '$tan',
        width: 4,
        height: '100%',
        marginInline: 'auto',
      },
    },
  },
  '@small': {
    marginBottom: '$xxl',
    placeItems: 'center',
  },
  '@medium': {
    marginBottom: '$large',
    '& video, & img': {
      borderRadius: '$medium 0 0 $medium',
      height: 'auto',
      marginBlock: 'auto',
    },
  },
  '@large': {
    '& video, & img': {
      borderRadius: '$large 0 0 $large',
    },
  },
});
