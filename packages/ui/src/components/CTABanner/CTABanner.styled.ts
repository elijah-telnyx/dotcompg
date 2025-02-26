import { styled, theme } from '../../styles';
import { convertPxToNumber } from '../../utils/styleUtils';
import Grid from '../Grid';
import Section from '../Section';
import H from '../Typography/Heading';

export const SectionWrapper = styled(Section, {
  paddingInline: '$large',
});

export const ButtonsWrapper = styled('div', {
  display: 'flex',
  gap: '$large',
  '@small': {
    gap: '$small',
  },
  '@medium': {
    gap: '$large',
  },

  variants: {
    withTopSpacing: {
      true: {
        marginTop: '$large',

        '@medium': {
          marginTop: '$xxl',
        },

        '@large': {
          marginTop: '$large',
        },
      },
      false: {
        marginTop: '$large',
        '@small': {
          marginTop: 0,
        },
      },
    },
  },
  defaultVariants: {
    withTopSpacing: false,
  },
});

/**
 * NEW
 *  */
export const ButtonsContainer = styled('div', {
  display: 'flex',
  gap: '$large',
  marginTop: '$large',
  '@medium': {
    marginTop: '$xl',
  },
});

export const Heading = styled(H, {
  marginBottom: '$xs',
  '@medium': {
    marginBottom: '$medium',
  },
});

export const CtaWrapper = styled(Grid.Item, {
  position: 'relative',
  '&:before': {
    content: '',
    $$gridWidth: theme.gridMaxWidth.base.value,
    $$pad: `calc(($$gridWidth - 100vw)/2)`,
    position: 'absolute',
    display: 'block',
    left: '$$pad',
    right: '$$pad',
    height: '100%',
    zIndex: 0,
    borderTopRightRadius: '$medium',
    '@small': {
      $$gridWidth: theme.gridMaxWidth.small.value,
    },
    '@medium': {
      borderTopRightRadius: '$large',
      $$gridWidth: theme.gridMaxWidth.medium.value,
      right: '0',
    },
    '@large': {
      $$gridWidth: theme.gridMaxWidth.large.value,
    },
    '@xl': {
      $$gridWidth: theme.gridMaxWidth.xl.value,
    },
  },
  variants: {
    backgroundColor: {
      black: {
        '&:before': {
          backgroundColor: '$black',
        },
      },
      blue: {
        '&:before': {
          backgroundColor: '$blue',
        },
      },
      citron: {
        '&:before': {
          backgroundColor: '$citron',
        },
      },
      cream: {
        '&:before': {
          backgroundColor: '$cream',
        },
      },
      green: {
        '&:before': {
          backgroundColor: '$green',
        },
      },
      tan: {
        '&:before': {
          backgroundColor: '$tan',
        },
      },
    },
  },
});

export const CtaSection = styled(Section, {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  maxWidth: theme.gridMaxWidth.base.value,
  position: 'relative',
  zIndex: 1,
  backgroundColor: 'unset !important',
  '@medium': {
    // occupy 6 columns on medium
    maxWidth:
      convertPxToNumber(theme.gridMaxWidth.medium.value) / 2 -
      convertPxToNumber(theme.space.large.value),
  },
});

export const FormWrapper = styled('div', {
  paddingBlock: '$xxl',
  maxWidth: theme.gridMaxWidth.base.value,
  '@medium': {
    paddingBlock: '$huge',
    maxWidth: 'unset',
    marginLeft: '$medium',
    input: {
      maxWidth: 352,
    },
  },
});
