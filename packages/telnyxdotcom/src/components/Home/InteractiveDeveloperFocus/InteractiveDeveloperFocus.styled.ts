import SectionComponent from 'ui/components/Section';

import Grid from 'ui/components/Grid';
import { styled } from 'ui/styles';

const backgroundColorTransition = 'all 100ms linear';

export const Pagination = styled('div', {
  display: 'none',

  '@large': {
    display: 'flex',
    flexDirection: 'column',
    gap: '$medium',
    position: 'fixed',
    top: '50%',
    left: '$xh',
    transform: 'translateY(-50%)',
    zIndex: 1,
  },
});

export const PaginationItem = styled('button', {
  all: 'unset',
  borderRadius: 36,
  cursor: 'pointer',
  padding: 6,
  transition: backgroundColorTransition,

  variants: {
    backgroundColor: {
      black: {
        backgroundColor: '$grayHoverLightBackground',
      },
      tan: {
        backgroundColor: '$grayHoverDarkBackground',
      },
      green: {
        backgroundColor: '$greenAlt',
      },
      blue: {
        backgroundColor: '$black',
      },
      citron: {},
      cream: {},
    },
    active: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      backgroundColor: 'black',
      active: true,
      css: {
        backgroundColor: '$cream',
      },
    },
    {
      backgroundColor: 'tan',
      active: true,
      css: {
        backgroundColor: '$black',
      },
    },
    {
      backgroundColor: 'green',
      active: true,
      css: {
        backgroundColor: '$black',
      },
    },
    {
      backgroundColor: 'blue',
      active: true,
      css: {
        backgroundColor: '$cream',
      },
    },
  ],
});

export const Section = styled(SectionComponent, {
  transition: backgroundColorTransition,
});

export const ScrollSnapSection = styled(SectionComponent, {
  height: '100vh',
  scrollSnapAlign: 'start',
  scrollSnapStop: 'always',
  transition: backgroundColorTransition,

  variants: {
    parallax: {
      true: {
        '@medium': {
          position: 'sticky',
          top: 0,
        },
      },
    },
    pattern: {
      code: {
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right bottom',
        backgroundImage:
          'url(https://images.ctfassets.net/2vm221913gep/2H0pT7GmzB9HoVBFoOzHh1/d9a417aef452899e3db31772fa0d3512/InteractiveHomepage_LogoCrop_XS.svg)',

        '@small': {
          backgroundImage:
            'url(https://images.ctfassets.net/2vm221913gep/6ghEvY5eXUPKw7c88DQ9be/bfbe1fc334793e2c7ddd90993bbad3a4/InteractiveHomepage_LogoCrop_Small.svg)',
        },

        '@medium': {
          backgroundImage:
            'url(https://images.ctfassets.net/2vm221913gep/5t9XTIuOntdlW8qpoLHTKk/052f8de8f38c1bc0e1ed8cd95a969f98/InteractiveHomepage_LogoCrop_Medium.svg)',
        },

        '@large': {
          backgroundImage:
            'url(https://images.ctfassets.net/2vm221913gep/6mAF3qHRQ210CdLCFSUDwv/28624f85c0bcf29cb6fb5a434c261fe2/InteractiveHomepage_LogoCrop_Large.svg)',
        },

        '@xl': {
          backgroundImage:
            'url(https://images.ctfassets.net/2vm221913gep/3VqHYEhdhTXG919IkLRs4v/e03dfee4551d192a1a8cca997e4413b9/InteractiveHomepage_LogoCrop_XL.svg)',
        },
      },
      inference: {},
      'voice-ai': {},
      'our-network': {},
      error: {},
    },

    relative: {
      true: {
        position: 'relative',
      },
    },
  },
  compoundVariants: [
    {
      relative: true,
      parallax: true,
      css: {
        '@medium': {
          position: 'sticky',
          top: 0,
        },
      },
    },
  ],

  '@medium': {
    // this is by design
    paddingTop: '$space$xxl !important',
    paddingBottom: '$space$xxl !important',
  },

  '@large': {
    // this is by design
    paddingTop: '$space$xh !important',
    paddingBottom: '$space$xh !important',
  },
});

export const Container = styled('div', {
  height: '100%',
});

export const TextBlock = styled(Grid.Container, {
  textAlign: 'left',
  flexDirection: 'column',
  gap: '$large',

  '@xl': {
    display: 'flex',
    width: '100%',
    textAlign: 'left',
    flexDirection: 'column',
    gap: '$xl',
    maxWidth: 448,
  },
});

export const CodeBlockWrapper = styled('div', {
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

export const MediaWrapper = styled('div', {
  height: '100%',
  width: '100%',
  display: 'grid',
  '& img': {
    marginBlock: 'auto',
    width: '100%',
  },
});

export const InteractiveContainer = styled(Grid.Container, {
  gridTemplateRows: 'auto 1fr',
  rowGap: '$large',
  height: '100%',

  '@medium': {
    rowGap: '$xl',
  },

  '@xl': {
    display: 'flex',
    alignItems: 'center',
    gap: '$xxl',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '100%',
    paddingInline: 'calc($space$xxh + $space$xxl)',
  },
});

const itemStyles = {
  transition: 'opacity 500ms cubic-bezier(0.2, 0, 0, 1)',

  variants: {
    transparent: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0,
      },
    },
  },
};

export const ContentItem = styled(Grid.Item, {
  '@xl': {
    maxWidth: 448,
  },
});

export const InteractiveItem = styled(Grid.Item, itemStyles, {
  // height on every screen size are from specs
  height: '100%',
  minHeight: 388,
  position: 'relative',
  overflowY: 'scroll',
  scrollbarColor: '$colors$tan',
  scrollbarGutter: 'unset',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
    width: 8,
    height: 8,
  },

  '&::-webkit-scrollbar-corner': {
    display: 'none',
  },

  '&::-webkit-scrollbar-thumb': {
    display: 'none',
  },

  '&::-webkit-scrollbar-track': {
    display: 'none',
  },

  '@small': {
    minHeight: 432,
  },

  '@xl': {
    display: 'flex !important',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },

  variants: {
    center: {
      true: {
        '@xl': {
          paddingRight: '25%',
        },
      },
      false: {},
    },
    data: {
      true: {
        '@medium': {
          filter: 'drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.10))',
        },
      },
    },
    noScroll: {
      true: {
        overflowY: 'hidden',
      },
    },
    noRelative: {
      true: {
        position: 'static',
      },
    },
  },
});

export const Loading = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translateX(-50%) translateY(-50%)',
});

export const Error = styled('p', {
  color: '$redAlt',
  fontSize: '$small',
  marginTop: '$xxs',
  textWrap: 'pretty',
});
