import { styled, theme } from '../../styles';
import { Base } from '../Typography/utils';

export const ContainerImage = styled('div', {
  overflow: 'hidden',
  backgroundColor: '$tan',
  borderRadius: '$medium',
  height: 304,

  '@medium': {
    height: 464,
  },
  '@large': {
    height: 504,
    borderRadius: '$large',
  },
  '@xl': {
    height: 544,
  },

  variants: {
    isFirstImage: {
      true: {
        [`@media (max-width: ${theme.viewports.small.value})`]: {
          ['& img']: {
            height: '100%',
            objectFit: 'cover',
          },
        },
        '@small': {
          height: 351,
        },
        '@medium': {
          height: 531,
        },
        '@large': {
          height: 580,
        },
        '@xl': {
          height: 630,
        },
      },
    },
  },
});

const PaddingFooterCardLarge = 44;

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
  padding: '$small',
  '@medium': {
    display: 'block',
    padding: '$large',
  },
  '@large': {
    borderRadius: '$large',
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
      },
      tan: {
        backgroundColor: '$tan',
      },
    },
  },
});

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
  marginRight: '$small',

  '@medium': {
    marginRight: '$large',
    height: 72,
    width: 72,
  },
  '@large': {
    height: 96,
    width: 96,
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
      width: '40px',
      height: '40px',
    },
  },
  '@large': {
    svg: {
      width: '56px',
      height: '56px',
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
});

export const ContainerHeading = styled('div', {
  position: 'relative',
  flex: 1,
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
