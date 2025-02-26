import * as TabsPrimitive from '@radix-ui/react-tabs';
import { styled, keyframes } from '../../styles';
import { ChevronDown } from '../Icons';
import Section from '../Section';
import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';
import Grid from '../Grid';
import CTA from '../Typography/CTA';
import Markdown from '../Markdown';

export const SectionWrapper = styled(Section, {});

export const SectionContainer = styled(Grid.Container, {
  boxShadow: '$blackBackgroundFullViewport',
  clipPath: 'inset(0 -100vmax)',
  rowGap: '$large',

  '@medium': {
    minHeight: '684px',

    rowGap: '$xxl',
  },

  '@xl': {
    minHeight: 'initial',
    height: '816px',
  },
});

export const Steps = styled(TabsPrimitive.Root, Grid.Container, {
  display: 'block',

  '@medium': {
    display: 'grid',
  },
});

export const StepsList = styled(TabsPrimitive.TabsList, {
  '@medium': {
    gridItemWidth: 6,
    display: 'flex',
    flexDirection: 'column',
    gap: '$xxl',
  },
});

export const StepHeader = styled('span', {
  display: 'flex',
  '> h2': {
    fontSize: '$large',
    lineHeight: '$xl',
  },
});

export const StepHeadingIcon = ChevronDown;

Heading.toString = () => '.heading';
export const StepHeading = styled(Heading, {
  display: 'flex',
  gap: '$xxs',
  marginBottom: '$xxs',

  '@medium': {
    marginBottom: '$xs',
  },
});

Paragraph.toString = () => '.paragraph';
export const StepCopy = styled(Markdown, {});

export const StepOrder = styled('span', {
  display: 'inline',

  '@medium': {
    display: 'none',
  },
});

const tabsAnimation = {
  [`&[data-state='active']`]: {
    display: 'block',
    maxHeight: '100%',
    transition: 'max-height 1s ease-out',
  },

  [`&[data-state='inactive']`]: {
    maxHeight: '40px',
  },
};

export const Step = styled(TabsPrimitive.TabsTrigger, {
  cursor: 'default',
  display: 'none',
  marginBottom: '$medium',

  ...tabsAnimation,

  [`& ${StepHeadingIcon}`]: {
    display: 'none',
  },

  '@small': {
    marginBottom: '$large',
  },

  '@medium': {
    cursor: 'pointer',
    display: 'block',
    marginBottom: 0,

    '& p': {
      display: 'none',
    },

    [`& ${StepHeadingIcon}`]: {
      color: '$citron',
      display: 'block',
      height: 24,
      width: 24,
      marginRight: '$xxs',
      transition: 'transform ease-out 0.25s',
    },

    [`&[data-state='active'] ${StepHeadingIcon}`]: {
      transform: 'rotate(-90deg)',
    },

    [`&[data-state='active'] p`]: {
      display: 'block',
      paddingInlineStart: '$large',
      marginLeft: '$xxs',
    },
  },
});

const fade = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const StepsContent = styled(TabsPrimitive.TabsContent, {
  position: 'relative',
  // width calcs on different responsive sizes to fit grid gutters
  width: '100%',
  height: 'auto',
  aspectRatio: '1.15 / 1',

  '@small': {
    height: '540px',
  },

  '@medium': {
    width: 'calc(50vw - $space$medium)',
    position: 'absolute',
    right: 0,
    transform: 'translateY(-50%)',
    top: '50%',
    transition: 'opacity 4s ease-out',
    opacity: 0,

    [`&[data-state='active']`]: {
      opacity: 1,
      transition: 'opacity 4s ease-out',
    },
  },

  '@large': {
    width: 'calc(50vw - $space$medium - $space$xxs)',
  },

  '@xl': {
    height: '816px',
    width: 'calc(50vw - $space$large)',
  },
});

export const StepsPagination = styled(CTA, {
  marginTop: '$medium',

  '& [role="tablist"]': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  '& svg': {
    height: 20,
    width: 20,
  },

  '@medium': {
    display: 'none',
  },
});

export const StepsPaginationButton = styled(TabsPrimitive.TabsTrigger, {
  '&[data-disabled]': {
    cursor: 'default',
    color: '$grayHoverLightBackground',
  },
});

export const StepsIndicator = styled('div', {
  marginInline: '$xs',
});

export const CTAWrapper = styled(Grid.Item, {});

export const AnimatedMedia = styled('div', {
  '@medium': {
    animation: `${fade} 0.75s ease-out`,
  },
});

export const PurchaseHeading = styled(Heading, {
  fontSize: '$small',
  textTransform: 'uppercase',
});
