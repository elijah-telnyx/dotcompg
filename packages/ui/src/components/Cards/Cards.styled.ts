import { styled } from '../../styles';
import Grid from '../Grid';
import GridExtended from '../GridExtended';
import Checkmark from '../Icons/Checkmark';
import { Base } from '../Typography/utils';
import { XL_LARGE } from '../GridExtended/GridExtended.styled';

Grid.Item.toString = () => '.grid-item';

export const MediaWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 304,
  height: 170,
  borderRadius: '$medium',
  overflow: 'hidden',
  position: 'relative',

  '@large': {
    width: 328,
    height: 184,
  },

  '@xl': {
    width: 352,
    height: 198,
  },

  variants: {
    extendedLayout: {
      true: {
        '@large': {
          width: 288,
          height: 162,
        },
        [XL_LARGE]: {
          width: 328,
          height: 184,
        },
      },
    },
  },
});

export const CardOrder = styled(Base('strong'), {
  typography: '$h2.mobile',

  '&:after': {
    content: '',
    backgroundColor: '$black',
    borderRightColor: '$black',
    borderRightStyle: 'solid',
    borderRightWidth: '$medium',
    display: 'block',
    height: '$borderWidths$medium',
    marginBlock: '$xs',
    width: '100%',
  },

  '@medium': {
    typography: '$h2',

    '&:after': {
      marginBlock: '$medium',
    },
  },
});

export const CardIconWrapper = styled(Base('div'), {
  '& svg': {
    height: '24px',
    width: '24px',

    '@medium': {
      height: '32px',
      width: '32px',
    },
  },

  '@medium': {
    marginBottom: '$xxs',
  },

  variants: {
    withIconBorder: {
      true: {
        backgroundColor: '$green',
        borderRadius: '$large',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '64px',
        width: '64px',

        '@medium': {
          borderRadius: '$xl',
          height: '72px',
          width: '72px',
        },

        '& svg': {
          height: '40px',
          width: '40px',
        },
      },
    },
  },
});

export const TagWrapper = styled('div', {
  marginTop: '$xs',
  marginBottom: '$xxs',

  '@medium': {
    marginTop: '$medium',
    marginBottom: '$xs',
  },
});

export const CardCheckmarkIcon = styled(Checkmark, {
  color: '$green',
  height: '24px',
  width: '24px',

  '@medium': {
    height: '32px',
    width: '32px',
  },
});

export const CtaWrapper = styled('div', {
  marginTop: '$xs',

  '@medium': {
    marginTop: '$medium',
  },
});

export const CardWrapper = styled(Base('div'), {
  display: 'flex',
  flexDirection: 'column',
  gap: '$xs',
});

export const CardItem = styled(Grid.Item, {
  position: 'relative',

  variants: {
    clickable: {
      true: {
        '& a::before': {
          content: ' ',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        },
      },
    },
  },
});

export const Container = styled(Grid.Container, {
  listStyleType: 'none',
  paddingInlineStart: 0,
  rowGap: '$xl',

  '@medium': {
    rowGap: '$xxl',
  },

  '@large': {
    columnGap: 0,
  },
});

export const ContainerExtended = styled(GridExtended.Container, {
  listStyleType: 'none',
  paddingInlineStart: 0,
  rowGap: '$xl',

  '@medium': {
    rowGap: '$xxl',
  },

  '@large': {
    columnGap: 0,
  },
});

export const HeadingWrapper = styled('div', {
  '&:empty': {
    '@medium': {
      height: '$lineHeights$large',
    },
  },
});
