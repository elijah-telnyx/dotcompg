import { keyframes, styled } from '../../styles';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import Heading from '../Typography/Heading';
import { Base } from '../Typography/utils';

const ANIMATION_DURATION = '300ms';
const ANIMATION_TRANSITION = 'ease-out';

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
});

export const Wrapper = styled('div', {});

export const NavigationBubbleItemGroupLinksContainer = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$xs',
});

export const NavigationBubbleItemGroupItem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'stretch',
  gap: '$xs',
  flex: '1 1 100%',
  borderRadius: '$medium',
  minHeight: '100%',
  paddingBlockStart: '$small',
  padding: '$small',

  a: {
    border: '0px',
  },
  variants: {
    itemTheme: {
      green: {
        backgroundColor: '$greenHoverLightBackground',
      },
      citron: {
        backgroundColor: '$citronHoverLightBackground',
      },
      blue: {
        backgroundColor: '$blueHoverLightBackground',
      },
      tan: {
        backgroundColor: '$tanHoverLightBackground',
      },
    },
    inline: {
      true: {
        '@lessThanMedium': {
          backgroundColor: 'transparent',
          paddingInline: 0,
        },
      },
    },
  },

  '@medium': {
    flexBasis: 'calc(50% - $space$xs)',
    gap: '$xs',
    marginBottom: 0,
    paddingInline: '$medium',
    paddingBlock: '$large',
  },

  '@xl': {
    flexBasis: 'calc(33.3% - $space$medium)',
  },
});

export const NavigationBubblesContainer = styled(AccordionPrimitive.Root, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$xs',

  '@medium': {
    gap: '$large',
  },
});

export const NavigationBubbleItem = styled(AccordionPrimitive.Item, {
  borderRadius: '$medium',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  paddingInline: '$small',
  paddingBlock: '$large',
  width: '100%',
  overflow: 'hidden',

  '@medium': {
    borderRadius: '$large',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '$large',
  },

  '&[data-state="closed"]': {
    height: '74px', // according to layout, prevent height shift on open
    borderRadius: '$medium',
    paddingBlock: '$large',

    '@medium': {
      borderRadius: '$large',
      height: '142px', // according to layout, prevent height shift on open
      paddingInline: '$large',
      paddingBlock: '$large',
    },

    '&:not(:first-child)': {
      marginTop: '-$large',

      '@medium': {
        marginTop: '-$xxl',
      },
    },

    '&:not(:last-child)': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      paddingBlockEnd: 'calc($space$xl + 34px)', // heading size

      '@medium': {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        paddingBlockEnd: 'calc($space$xxl + 86px)', // heading size
      },
    },
  },

  variants: {
    inline: {
      true: {
        '&[data-state="open"]': {
          '@medium': {
            flexFlow: 'row',
          },
        },
      },
    },
    itemTheme: {
      green: {
        backgroundColor: '$green',
      },
      citron: {
        backgroundColor: '$citron',
      },
      blue: {
        backgroundColor: '$blue',
      },
      tan: {
        backgroundColor: '$tan',
      },
    },
  },
});

export const NavigationBubbleItemTrigger = styled(AccordionPrimitive.Trigger);
export const NavigationBubbleItemContent = styled(AccordionPrimitive.Content, {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  width: '100%',
  gap: '$xs',

  variants: {
    inline: {
      false: {
        '&[data-state="open"]': {
          animation: `${slideDown} ${ANIMATION_DURATION} ${ANIMATION_TRANSITION}`,

          '@medium': {
            marginTop: '$large',
          },
        },
      },
    },
  },
});

export const NavigationBubbleItemHeading = styled(Heading, {
  cursor: 'pointer',
  flex: '0 0 50%',
  '&[data-state="open"]': {
    marginBottom: '$large',
    '@medium': {
      marginBottom: 0,
    },
  },

  variants: {
    inline: {
      false: {
        flex: '0 0 100%',

        '&[data-state="closed"]': {
          alignSelf: 'end',
        },
      },
      true: {
        marginBottom: 0,
      },
    },
  },

  '@medium': {
    typography: '$h1',
  },

  '@large': {
    typography: '$h1',
  },
});

export const NavigationBubbleItemGroupItemHeading = styled(Heading, {
  flex: '0 0 50%',

  variants: {
    fixedHeight: {
      true: {
        maxHeight: '20px',
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
