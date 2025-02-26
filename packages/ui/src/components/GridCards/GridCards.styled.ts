import { styled } from '../../styles';

import Grid from '../Grid';
import GridExtended from '../GridExtended';
import { XL_LARGE } from '../GridExtended/GridExtended.styled';
import Input from '../Input';

const FILTER_SEARCH_WIDTH = 274;

const STICKYTOPPOSITION = {
  BASE: 65,
  HEADERDESKTOP: 96,
  LARGE: 96,
};

export const Container = styled(Grid.Container, {
  rowGap: '$large',

  '@small': {
    rowGap: 'xl',
  },

  '@medium': {
    rowGap: '$xxl',
  },
});

export const ContainerExtended = styled(GridExtended.Container, {
  rowGap: '$large',

  '@small': {
    rowGap: 'xl',
  },

  '@medium': {
    rowGap: '$xxl',
  },
});

export const HeaderContainer = styled(Grid.Container, {
  rowGap: '$large',
  marginBottom: '$xs',

  '@small': {
    rowGap: 0,
    marginBottom: 0,
  },

  '@medium': {
    marginBottom: '$large',
  },
});

export const HeaderContainerExtended = styled(GridExtended.Container, {
  rowGap: '$large',
  marginBottom: '$xs',

  '@small': {
    rowGap: 0,
    marginBottom: 0,
  },

  '@medium': {
    marginBottom: '$large',
  },
});

export const PaginationItem = styled(Grid.FullWidthItem, {
  justifySelf: 'center',
  marginTop: '$xs',

  '@medium': {
    marginTop: 0,
  },
});

export const HeadingItem = styled(Grid.Item, {
  '@small': {
    gridRow: 'span 2',
  },
});

export const FilterItem = styled(Grid.Item, {
  minWidth: 'initial',

  '@small': {
    justifySelf: 'normal',
  },

  '@medium': {
    minWidth: 'initial',
  },
  '@large': {
    width: FILTER_SEARCH_WIDTH,
    display: 'none',
    order: 1,
    gridRow: '1 / 2',
  },

  '@xl': {
    width: FILTER_SEARCH_WIDTH,
    gridColumn: '2 / 3',
  },
});

export const SearchBoxWrapper = styled(Grid.Item, {
  '@large': {
    order: 2,
    justifySelf: 'end',
    width: FILTER_SEARCH_WIDTH,
    gridRow: '1 / 2',
  },
});

export const SearchInput = styled(Input, {
  '@medium': {
    minWidth: 'unset',
    width: '100%',
  },
});

export const FilterError = styled('p', {
  typography: '$h3',
  color: '$redAlt',
  lineHeight: '$xxl',
});

export const Loading = styled('div', {
  backgroundColor: 'rgba(255, 255, 255, .8)',
  padding: '$xl',
  borderRadius: '$round',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translateX(-50%) translateY(-50%)',
  textAlign: 'center',
});

export const SelectSection = styled('div', {
  transition: 'top 0.5s',
  transitionTimingFunction: 'ease-in-out',
  gridColumn: 'span 6',

  '@small': {
    gridColumn: 'span 4',
  },

  '@large': {
    gridColumn: '7 / 13',
  },

  variants: {
    sticky: {
      true: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9,
        backgroundColor: '$cream',
        boxShadow: '$black',
        padding: '$medium 0',
      },
    },
    up: {
      true: {
        top: STICKYTOPPOSITION.BASE,
        '@headerDesktop': {
          top: STICKYTOPPOSITION.HEADERDESKTOP,
        },
        '@large': {
          top: STICKYTOPPOSITION.LARGE,
        },
      },
    },
    down: {
      true: {
        transitionTimingFunction: 'ease-out',
      },
    },
  },
});

export const SelectWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, auto)',
  gap: '$small',

  variants: {
    sticky: {
      true: {
        margin: '0 auto',
        maxWidth: '$extended_gridMaxWidth$base',

        '@xs': {
          gridTemplateColumns: 'auto',
          maxWidth: '$extended_gridMaxWidth$xs',

          [`& ${SearchBoxWrapper}`]: {
            gridColumn: 'span 4',
            order: 1,
            justifySelf: 'normal',
          },

          [`& ${FilterItem}`]: {
            gridColumn: 'span 4',
            order: 2,
          },
        },
        '@small': {
          maxWidth: '$extended_gridMaxWidth$small',

          [`& ${SearchBoxWrapper}`]: {
            gridColumn: '4 / 5',
            order: 2,
            justifySelf: 'end',
          },

          [`& ${FilterItem}`]: {
            gridColumn: '1 / 4',
            order: 1,
          },
        },
        '@medium': {
          maxWidth: '$extended_gridMaxWidth$medium',

          [`& ${SearchBoxWrapper}`]: {
            gridColumn: '10 / 12',
          },

          [`& ${FilterItem}`]: {
            gridColumn: '6 / 10',
          },
        },
        '@large': {
          gridTemplateColumns: 'repeat(12, 80px)',
          gap: '$large',
          maxWidth: '$extended_gridMaxWidth$large',
          margin: '0 auto',

          [`& ${SearchBoxWrapper}`]: {
            gridColumn: '8 / 13',
            gridRow: '1 / 2',
          },

          [`& ${FilterItem}`]: {
            gridColumn: '7 / 10',
            gridRow: '1 / 2',
          },
        },
        [XL_LARGE]: {
          gridTemplateColumns: 'repeat(12, 88px)',
          gap: '32px',
          maxWidth: '$extended_gridMaxWidth$xl',
        },
      },
    },
  },
});
