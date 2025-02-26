import * as AccordionPrimitive from '@radix-ui/react-accordion';
import Plus from '../Icons/Plus';

import Grid from '../Grid';
import H from '../Typography/Heading';
import Markdown from '../Markdown';
import { styled } from '../../styles';
import Media from '../Media';

const ANIMATION_DURATION = '300ms';
const ICON_SIZE = 20;

export const ContentWrapper = styled(Grid.Item, {
  marginBottom: '$xl',
  '@medium': {
    marginBottom: '$xxl',
  },
});

export const Tagline = styled(H, {
  marginBottom: '$large',
  '@medium': {
    marginBottom: '$xxl',
  },
});
export const Heading = styled(H, {
  marginBottom: '$xs',
  '@medium': {
    marginBottom: '$large',
  },
});

export const Copy = styled(Markdown, {});

export const InternalGrid = styled('div', {
  display: 'grid',
  '@lessThanMedium': {
    gap: '$xl',
  },
  '@medium': {
    $$columnSize: '252px',
    maxWidth: '100%',
    gridTemplateColumns: 'repeat(3, $$columnSize)',
    justifyContent: 'space-between',
  },
  '@large': {
    $$columnSize: '276px',
  },
  '@xl': {
    $$columnSize: '300px',
  },
});

export const DesktopMedia = styled(Media, {
  height: 32,
  width: 'auto',
});

export const ComparisonWrapper = styled(InternalGrid, {
  position: 'relative',
});

const MOBILE_ICON_SIZE = 24;
const COMPARISON_HEADING_HEIGHT = 32;

export const Label = styled(H, {
  '@medium': {
    height: COMPARISON_HEADING_HEIGHT,
    [`[data-state="open"] &`]: {
      maxWidth: 328,
    },
  },
});

export const ComparisonContent = {
  Wrapper: styled('div', {
    '@lessThanMedium': {
      display: 'grid',
      gridTemplateColumns: `${MOBILE_ICON_SIZE}px 1fr`,
      columnGap: '$xs',
      '&:first-child': {
        marginBottom: '$xl',
      },
    },
    variants: {
      hasHeading: {
        true: {
          alignItems: 'center',
          '@medium': {
            marginTop: '$xs',
          },
        },
        false: {
          '@medium': {
            marginTop: '$xxs',
          },
        },
      },
    },
  }),
  Icon: styled(Media, {
    fontOffset: 'paragraph',
    width: MOBILE_ICON_SIZE,
    height: MOBILE_ICON_SIZE,
    marginBottom: '$xxs',
    '@medium': {
      display: 'none',
    },
  }),
  Heading: styled(H, {
    marginBottom: '$xxs',
  }),
  Copy: styled(Markdown, {}),
};

export const HiddenOn = styled('div', {
  variants: {
    lessThanMedium: {
      true: {
        '@lessThanMedium': {
          display: 'none !important',
        },
      },
    },
    medium: {
      true: {
        '@medium': {
          display: 'none !important',
        },
      },
    },
  },
});

export const Accordion = styled(AccordionPrimitive.Root, {});

export const LogosWrapper = styled(InternalGrid, {
  marginBottom: '$large',
  paddingInline: '$medium',
  '@medium': {
    paddingInline: '$large',
  },
});

export const Card = styled('div', {
  backgroundColor: '$cream',
  borderRadius: '$medium',
  border: '1px solid $black',
  padding: '$medium',
  '@medium': {
    padding: '$large',
  },
});

export const AccordionItem = styled(AccordionPrimitive.Item, {
  overflow: 'hidden',
  '&:not(:last-child)': {
    marginBottom: '$xs',
    '@medium:': {
      marginBottom: '$medium',
    },
  },
});

export const AccordionTrigger = styled(AccordionPrimitive.Trigger, {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
  width: '100%',
  '&:hover': {
    color: '$grayHoverLightBackground',
  },
  '@medium': {
    position: 'absolute',
  },
});

export const FillGapTrigger = styled(HiddenOn, {
  height: 24,
  '@medium': {
    height: 32,
  },
});

const CONTENT_TO_ICON_SPACE = 8;
export const AccordionContent = styled(AccordionPrimitive.Content, {
  '@medium': {
    marginRight: ICON_SIZE + CONTENT_TO_ICON_SPACE,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, $$columnSize)',
    gridColumn: 'span 2',
    justifyContent: 'space-between',
  },
});

export const PlusIcon = styled(Plus, {
  width: ICON_SIZE,
  height: ICON_SIZE,
  transition: `ease-out ${ANIMATION_DURATION} rotate`,
  [`[data-state="open"] &`]: {
    rotate: '45deg',
  },
});
