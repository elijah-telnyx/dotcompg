import { styled, theme } from '../../styles';
import { Base } from '../Typography/utils';
import { XL_LARGE } from '../GridExtended/GridExtended.styled';

export const ContainerImage = styled('div', {
  overflow: 'hidden',
  backgroundColor: '$tan',
  borderRadius: '$medium',
  height: 228,

  '@small': {
    height: 228,
  },

  '@medium': {
    height: 164,
  },
  '@large': {
    height: 213,
  },
  [XL_LARGE]: {
    height: 246,
  },

  variants: {
    isFirstImage: {
      true: {
        ['& img']: {
          height: '100%',
          objectFit: 'cover',
        },

        [`@media (max-width: ${theme.viewports.small.value})`]: {
          ['& img']: {
            height: '100%',
            objectFit: 'cover',
          },
        },
        '@small': {
          height: 346,
        },
        '@medium': {
          height: 350,
        },
        '@large': {
          height: 450,
        },
        [XL_LARGE]: {
          height: 526,
        },
      },
    },
  },
});

const PaddingFooterCardLarge = 44;

export const ContainerCircle = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const Circle = styled('div', {
  height: 64,
  width: 64,
  borderRadius: '50%',
  background: '$green',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '@medium': {
    height: 40,
    width: 40,
  },
  '@large': {
    height: 64,
    width: 64,
  },
  variants: {
    backgroundColor: {
      black: {
        backgroundColor: '$black',
      },
      blue: {
        backgroundColor: '$blue',
      },
      citron: {
        backgroundColor: '$citron',
      },
      cream: {
        backgroundColor: '$cream',
      },
      green: {
        backgroundColor: '$green',
      },
      tan: {
        backgroundColor: '$tan',
      },
    },
  },
});

export const ArrowIconWrapper = styled(Base('div'), {
  marginLeft: '$small',
  top: 2,
  position: 'relative',
  display: 'inline-block',
  transition: 'transform 0.5s ease-out',
  transform: `translate(-4px, 0px)`,
});

export const Link = styled(Base('a'), {
  [`&:hover ${ArrowIconWrapper}`]: {
    transform: `translate(0px, 0px)`,
  },
});

export const MediaIconWrapper = styled(Base('div'), {
  svg: {
    width: '36px',
    height: '36px',
    display: 'inline-block',
  },
  '@medium': {
    svg: {
      width: '20px',
      height: '20px',
    },
  },
  '@large': {
    svg: {
      width: '36px',
      height: '36px',
    },
  },
});

export const HiddenAboveMedium = styled(Base('div'), {
  '@medium': {
    display: 'none',
  },
});

export const HiddenBellowMedium = styled(Base('div'), {
  opacity: 0,
  position: 'absolute',

  '& span': {
    fontSize: '$xxs',
    fontWeight: '$normal',

    '&:before': {
      // per spec
      bottom: 4,
    },
  },
});

export const ContainerHeading = styled('div', {
  position: 'relative',
  flex: `1 0 0%`,
  paddingLeft: '$small',
});

export const CardHeading = styled('p', {
  typography: '$h3.mobile',
});

export const FooterCard = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '$citron',
  borderRadius: '$medium',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '$medium',
  '@medium': {
    display: 'block',
    padding: '$medium',
  },
  '@large': {
    borderRadius: '$medium',
  },
  variants: {
    hasNotIcon: {
      false: {
        paddingTop: '$large',
        paddingBottom: '$large',

        '@medium': {
          paddingTop: '$xl',
          paddingBottom: '$xl',
        },
        '@large': {
          paddingTop: PaddingFooterCardLarge,
          paddingBottom: PaddingFooterCardLarge,
        },
      },
    },
    backgroundColor: {
      black: {
        backgroundColor: '$black',
      },
      blue: {
        backgroundColor: '$blue',
      },
      citron: {
        backgroundColor: '$citron',
      },
      cream: {
        backgroundColor: '$cream',
      },
      green: {
        backgroundColor: '$green',
        [`& ${HiddenBellowMedium} span:before`]: {
          backgroundColor: '$citron',
        },
      },
      tan: {
        backgroundColor: '$tan',
      },
    },
  },
});

export const Wrapper = styled('div', {
  position: 'relative',
  cursor: 'pointer',
  '@medium': {
    ['img']: {
      transform: 'scale(1)',
      transition: 'all 0.5s ease-out',
    },
    [`${ContainerHeading}`]: {
      transform: `translate(0px, 0px)`,
      transition: 'all 0.5s ease-out',
    },
    [`${HiddenBellowMedium}`]: {
      opacity: 0,
      transition: 'all 0.5s ease-out',
    },
    [`&:hover ${HiddenBellowMedium}`]: {
      opacity: 1,
      transition: 'all 0.5s ease-out',
    },
    [`&:hover ${FooterCard}`]: {
      paddingTop: '1.5em',
      transition: 'padding 0.5s ease-out',
    },
    [`&:hover ${ContainerHeading}`]: {
      transform: `translate(0px, -16px)`,
      transition: 'all 0.5s ease-out',
    },
    [`&:hover img`]: {
      transform: 'scale(1.1)',
      transition: 'all 0.5s ease-out',
    },
  },
});
