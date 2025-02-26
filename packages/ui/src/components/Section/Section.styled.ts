import { styled } from '../../styles';

export const Section = styled('section', {
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
      none: {
        backgroundColor: 'transparent',
      },
    },
    hasOverflow: {
      true: {
        position: 'relative',
      },
    },
    spacingBottom: {
      continuous: {
        paddingBottom: '$large',

        '@medium': {
          paddingBottom: '$xxl',
        },
      },
      contrasting: {
        paddingBottom: '$xxl',

        '@medium': {
          paddingBottom: '$xh',
        },
      },
      none: {},
    },
    spacingTop: {
      continuous: {
        paddingTop: '$large',

        '@medium': {
          paddingTop: '$xxl',
        },
      },
      contrasting: {
        paddingTop: '$xxl',

        '@medium': {
          paddingTop: '$xh',
        },
      },
      none: {},
    },
    scrollSnap: {
      true: {
        // required for scroll snap. See references
        scrollSnapAlign: 'start',
        scrollSnapStop: 'normal',
      },
    },
  },
});
Section.defaultProps = {
  backgroundColor: 'cream',
  hasOverflow: false,
  spacingTop: 'contrasting',
  spacingBottom: 'contrasting',
};

export const SectionHeaderContainer = styled('div', {
  display: 'grid',

  textWrap: 'pretty',
  marginBottom: '$xl',
  gap: '$large',
  '@small': {
    marginBottom: '$xxl',
  },
  '@medium': {
    marginBottom: '$huge',
  },

  variants: {
    variant: {
      large: {
        gap: '$large',
        marginBottom: '$xxl',
        '@small': {
          marginInline: 'auto',
          textAlign: 'center',
        },
        '@medium': {
          gap: '$xl',
          marginBottom: '$huge',
        },
        '@large': {
          gap: '$xxl',
          marginBottom: '$xh',
        },
      },
      center: {
        textAlign: 'center',

        '@small': {
          '> h2': {
            typography: '$h1.mobile',
          },
        },

        '@medium': {
          '> h2': {
            typography: '$h1.alt.mobile',
          },
        },

        '@large': {
          '> h2': {
            typography: '$h2',
          },
        },
      },
    },
    isDark: {
      true: {
        color: '$cream',
      },
      false: {
        color: '$black',
      },
    },
  },
});

export const CtaWrapper = styled('div', {
  display: 'none',

  '@medium': {
    display: 'block',
  },
});
