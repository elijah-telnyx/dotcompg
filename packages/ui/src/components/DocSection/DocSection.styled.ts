import * as TabsPrimitive from '@radix-ui/react-tabs';
import { styled, theme } from '../../styles';
import Markdown from '../Markdown';
import CTA from '../Typography/CTA';
import Glider from 'react-glider';
import Grid from '../Grid';

export const DocSectionWrapper = styled(Grid.Container, {
  '@xs': {
    gridTemplateColumns: '1fr',
    'grid-item:last-child': {
      justifySelf: 'center',
    },
  },

  '@medium': {
    gridTemplateColumns: 'repeat(12, 64px)',

    p: {
      fontSize: '18px',
      lineHeight: '24px',
    },
  },
  '@large': {
    maxWidth: 1232,
    margin: '0 auto',

    '> div > div': {
      marginBottom: '$xxl',
    },
  },

  '@xl': {
    maxWidth: 1632,
  },
});

export const ButtonsContainer = styled('div', {
  margin: '0 auto',
  width: 'max-content',

  variants: {
    mobile: {
      true: {
        display: 'block',

        '@medium': {
          display: 'none',
        },
      },
    },
    desktop: {
      true: {
        display: 'none',
        '@medium': {
          display: 'block',
        },
      },
    },
  },
});

export const Codes = styled(TabsPrimitive.Root, {
  $$backgroundColor: '$colors$black',
  height: '100%',
  width: '100%',
  overflow: 'auto',

  [`& pre, & div[role='tablist']`]: {
    scrollbarColor: '$colors$grayHoverLightBackground',
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
      backgroundColor: '$grayHoverLightBackground',
      borderRadius: '$medium',
      display: 'none',
    },
  },
  '[role="tablist"]': {
    backgroundColor: 'none',
  },

  '@small': {
    $$tabListBackgroundColor: '$$backgroundColor',

    [`& pre, & div[role='tablist']`]: {
      scrollbarWidth: 'thin',

      '&::-webkit-scrollbar': {
        backgroundColor: '$$backgroundColor',
        display: 'initial',
      },

      '&::-webkit-scrollbar-thumb': {
        display: 'initial',
      },
    },

    [`& div[role='tablist']`]: {
      scrollbarGutter: 'unset',
      scrollbarWidth: 'none',

      '&::-webkit-scrollbar-thumb': {
        display: 'none',

        '&:hover': {
          display: 'initial',
        },
      },

      '&::-webkit-scrollbar-track': {
        marginInline: '$large',
      },
    },
  },

  '@medium': {
    [`& pre`]: {
      scrollbarWidth: 'auto',
    },
  },

  '@large': {
    [`& pre`]: {
      scrollbarWidth: 'none',
    },
  },
  '@xl': {
    [`& div[role='tablist']`]: {
      '&::-webkit-scrollbar-track': {
        marginInline: '$xl',
      },
    },
  },
});

export const CodeLanguage = styled(CTA, {
  textTransform: 'uppercase',
});

export const TabsContainer = styled('div', {
  position: 'relative',
  marginTop: '$large',
  marginBottom: '$large',
});

export const ArrowContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  gap: '$medium',
  marginBottom: '$large',
  '@small': {
    display: 'none',
  },
});

export const BaseButton = styled('button', {
  backgroundColor: '$cream',
  zIndex: 1,
  padding: '$xs',
  svg: {
    width: 24,
    height: 24,
  },
});

export const LeftCycleTrigger = styled(BaseButton, {
  display: 'none',
  '@small': {
    display: 'block',
  },
  position: 'absolute',
  left: 0,
});

export const RightCycleTrigger = styled(BaseButton, {
  display: 'none',
  '@small': {
    display: 'block',
  },
  position: 'absolute',
  top: 0,
  right: 0,
});

export const CodesList = styled(TabsPrimitive.TabsList, {
  paddingInline: '$xxl',
  transform: 'translateX(0)',
  transition: 'transform 0.5s ease',

  '@xs': {
    padding: '$xxs 0',
  },

  '@small': {
    paddingTop: 0,
    paddingInline: '$xxl',
  },

  '@large': {
    gap: '$xl',
  },
  '@xl': {},

  variants: {
    dark: {
      true: {
        backgroundColor: '$black',
        borderTopLeftRadius: '$medium',
        borderTopRightRadius: '$medium',
        boxShadow: '$black',
      },
    },
    embed: {
      true: {
        '@small': {
          borderTopLeftRadius: '$large',
          borderTopRightRadius: '$large',
          boxSHadow: 'none',
        },
      },
    },
    slide: {
      slideLeft: {
        transform: `translateX(20%)`,
      },
      slideRight: {
        transform: `translateX(-20%)`,
      },
    },
  },
});

export const Label = styled('p', {
  color: '$cream',
  typography: '$label',
});

export const CodeTab = styled(TabsPrimitive.TabsTrigger, {
  borderRadius: '$large',
  paddingBlockStart: '$xs',
  paddingBlockEnd: '$xxs',
  paddingInline: '$xs',
  typography: '$cta.mobile',
  textAlign: 'center',

  [`&[data-state='active']`]: {
    border: `1px solid ${theme.colors.black}`,

    [`& ${CodeLanguage}`]: {
      color: '$black',
    },
  },
});

export const CodesContent = styled(TabsPrimitive.TabsContent, {
  backgroundColor: '$$backgroundColor',
  borderRadius: '$medium',
  boxShadow: '$black',
  height: '384px',
  padding: '$small',

  '& pre': {
    $$copyBtnHeight: '24px',
    height: 'calc(100% - $$copyBtnHeight - $space$xxs)',
    overflow: 'auto',
  },

  '@xs': {
    height: '256px',
  },

  '@small': {
    padding: '0 $large $large',
    paddingTop: '$xs',
    height: '384px',
  },
  '@xl': {
    padding: '0 $xl $xl',
    paddingTop: '$xs',
  },

  variants: {
    embed: {
      true: {
        '@small': {
          borderRadius: '0 0 $large $large',
        },

        '@xl': {
          height: 530,
        },
      },
    },
  },

  '> pre code': {
    fontSize: '$xs',
    lineHeight: '$xxs',
  },
});

export const CopyButtonWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: '$xs',
  marginBottom: '$xs',
  borderBottom: `1px solid ${theme.colors.codeGray}`,

  '> button svg': {
    width: '18px',
  },
});

Markdown.toString = () => '.markdown-code';
export const CodeMarkdown = styled(Markdown, {
  fontSize: '14px',
});

export const GliderWrapper = styled(Glider, {
  '.glider-track': {
    alignItems: 'stretch',
    marginInline: 'auto',
  },
});
