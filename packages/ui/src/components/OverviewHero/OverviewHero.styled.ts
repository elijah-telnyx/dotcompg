import { styled } from '../../styles';
import Grid from '../Grid';
import H from '../Typography/Heading';

import Section from '../Section';

const telnyxStackedLogoLeft =
  'https://images.ctfassets.net/2vm221913gep/2QDlP3IXLjQ3Gxby7K59n2/451153b90c787a619461096536c6a5e3/telnyx-stacked-logos.svg';
const telnyxStackedLogoRight =
  'https://images.ctfassets.net/2vm221913gep/7CCzC7Fugc2ErNORnWrkJU/c1209fcba33739068c3fd6338f327193/telnyx-stacked-logos2.svg';
const telnyxStackedLogoVertical =
  'https://images.ctfassets.net/2vm221913gep/4kEYiAELu6zTB7ZxovV6qI/0495907bd159d63989be6bebcf6439c1/Mask_group__3_.svg';

export const SectionWrapper = styled(Section, {
  variants: {
    centered: {
      true: {
        textAlign: 'center',
      },
    },
    hasPattern: {
      true: {
        textAlign: 'center',
        height: '80vh',
        backgroundColor: '$black',

        backgroundImage: `url(${telnyxStackedLogoVertical})`,
        backgroundPosition: '50% bottom',
        backgroundSize: '80vh',
        backgroundRepeat: 'repeat-x',
        alignItems: 'baseline',

        '@medium': {
          backgroundImage: `url(${telnyxStackedLogoRight}), url(${telnyxStackedLogoLeft})`,
          backgroundPosition: '-47vw 95vh, 81vw 95vh',
          backgroundSize: '66vw',
          backgroundRepeat: 'repeat-y',
          display: 'flex',
          alignItems: 'center',
        },
        '@large': {
          backgroundImage: `url(${telnyxStackedLogoRight}), url(${telnyxStackedLogoLeft})`,
          backgroundPosition: '-36vw 128vh, 70vw 128vh',
        },
      },
    },
    hasForm: {
      true: {
        '@lessThanSmall': {
          paddingBottom: 0,
        },
      },
    },
  },
});

export const ButtonsWrapper = styled('div', {
  display: 'flex',
  gap: '$xs',
  flexDirection: 'column',
  marginTop: '$large',

  '@small': {
    flexDirection: 'row',
    gap: '$large',
    marginTop: '$small',
  },

  '@medium': {
    gap: '$xl',
    marginTop: '$large',
  },

  variants: {
    orientation: {
      horizontal: {},
      vertical: {
        '@small': {
          flexDirection: 'column',
        },
      },
    },
  },
});

export const CopyItem = styled(Grid.Item, {
  variants: {
    centered: {
      true: {
        gridColumn: 'span 4 / auto',

        '@small': {
          gridColumn: '2 / span 6',
        },

        '@medium': {
          gridColumn: '3 / span 8',
        },
      },
    },
  },
});

export const MediaWrapper = styled('div', {
  marginTop: '$medium',
  maxWidth: 448,
  '& > *': {
    aspectRatio: '16 / 9',
  },
  '@medium': {
    marginTop: '$xl',
  },
});

export const GridContainer = styled(Grid.Container, {
  '@lessThanMedium': {
    textAlign: 'center',
    [`& ${MediaWrapper}`]: {
      marginInline: 'auto',
    },
  },
  variants: {
    alignLeft: {
      true: {
        textAlign: 'left',
      },
    },
  },
});

export const Heading = styled(H, {
  marginBottom: '$xs',
  '@medium': {
    marginBottom: '$large',
  },
});

export const Footer = styled('div', {
  marginTop: '$xs',
  '@medium': {
    marginTop: '$large',
  },
});

export const FormWrapper = styled(Grid.Item, {
  textAlign: 'center',
  '@lessThanMedium': {
    marginTop: '$xxl',
  },
});

export const GridItemContainer = styled(Grid.Item, {
  variants: {
    hasForm: {
      true: {
        '@medium': {
          display: 'flex!important',
          flexDirection: 'column',
          justifyContent: 'center',
        },
      },
    },
  },
});
