import { styled } from 'ui/styles';
import Grid from 'ui/components/Grid';
import SectionComponent from 'ui/components/Section';
import TypographyCta from 'ui/components/Typography/CTA';

export const BACKGROUND_SIZE = 196; // figma

export const Section = styled(SectionComponent, {
  paddingInline: '$large',
});

export const SectionHeader = styled('div', {
  marginInline: 'auto',
});

export const HeaderItem = styled(Grid.Item, {
  gridColumn: 'span 4',

  '@small': {
    gridColumn: 'span 8',
  },

  '@medium': {
    gridColumn: '2 / span 10',
  },
});

export const BackgroundGraphic = styled('div', {
  color: '$black',
  display: 'none',
  position: 'absolute',

  '@large': {
    display: 'flex',
    flexDirection: 'column',
    gap: '$small',
    alignItems: 'center',
  },

  variants: {
    dark: {
      true: {
        color: '$cream',
      },
    },
    start: {
      true: {
        top: '25%',
        transform: 'translateY(-25%)', // this is to fix the offset created when moving in the Y direction with %
        left: `calc((${BACKGROUND_SIZE}px + $space$small) * -1)`, // figma
      },
    },

    end: {
      true: {
        top: '50%',
        right: `calc((${BACKGROUND_SIZE}px + $space$small) * -1)`, // figma
      },
    },
  },
});

export const BackgroundCta = styled(TypographyCta, {
  textAlign: 'center',
  width: BACKGROUND_SIZE,
});

export const BackgroundDashed = styled('div', {
  variants: {
    start: {
      true: {
        alignSelf: 'flex-end',
      },
    },
    end: {
      true: {
        alignSelf: 'flex-start',
      },
    },
  },
});

export const CaptionWrapper = styled(Grid.Container, {
  alignItems: 'center',
});

export const CaptionItem = styled(Grid.FullWidthItem, {
  display: 'flex !important',
  alignItems: 'center',
  gap: '$xxs',
  '@medium': {
    gap: '$xs',
  },
});

export const FormWrapper = styled(Grid.Container, {
  marginTop: '$medium',
  position: 'relative',
});

export const CtaWrapper = styled('div', {
  marginTop: '$xl',
  textAlign: 'center',

  '@small': {
    marginTop: '$huge',
  },
});

export const InferenceDemoWrapper = styled(Grid.FullWidthItem, {});

export const FormItem = styled(Grid.Item, {
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

  '@medium': {
    filter: 'drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.10))',
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
