import * as TabsPrimitive from '@radix-ui/react-tabs';

import CTA from '../Typography/CTA';
import Markdown from '../Markdown';
import { styled } from '../../styles';

export const CodeLanguage = styled(CTA, {
  textTransform: 'uppercase',
});

Markdown.toString = () => '.markdown-code';
export const CodeMarkdown = styled(Markdown);

export const CodeTab = styled(TabsPrimitive.TabsTrigger, {
  borderRadius: '$xs',
  paddingBlockStart: '$xxs',
  paddingBlockEnd: '$xxxs',
  paddingInline: '$xxs',

  '@small': {
    paddingBlockStart: '$xs',
    paddingBlockEnd: '$xxs',
    paddingInline: '$small',
  },

  [`&[data-state='active']`]: {
    backgroundColor: '$green',

    [`& ${CodeLanguage}`]: {
      color: '$black',
    },
  },
});

export const CodesList = styled(TabsPrimitive.TabsList, {
  display: 'flex',
  gap: '$small',
  overflowX: 'scroll',
  paddingBottom: '$xs',

  '@small': {
    gap: '$large',
    padding: '$large',
    paddingBottom: `$xs`,
  },

  '@large': {
    gap: '$xl',
  },
  '@xl': {
    padding: '$xl',
    paddingBottom: `$xs`,
  },

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
  },
});

export const CopyButtonWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'end',
  marginBottom: '$xxs',
});

export const CodesContent = styled(TabsPrimitive.TabsContent, {
  backgroundColor: '$$backgroundColor',
  borderRadius: '$medium',
  boxShadow: '$black',
  height: '204px',
  padding: '$small',

  '& pre': {
    $$copyBtnHeight: '24px',
    height: 'calc(100% - $$copyBtnHeight - $space$xxs)',
    overflow: 'auto',
  },

  '@small': {
    borderRadius: '0 0 $medium $medium',
    height: '256px',
    padding: '0 $large $large',
    paddingTop: '$xs',
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
    backgroundColor: '$$tabListBackgroundColor',
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

  variants: {
    alt: {
      true: {
        position: 'relative',
        color: '$cream',
        $$backgroundColor: '$colors$grayDark',
        $$tabListBackgroundColor: '$$backgroundColor',
        $$space: '$space$small',
        '@small': {
          $$space: '$space$large',
        },
        [`& ${CodesContent}`]: {
          borderRadius: '0 0 $medium $medium',
          padding: '$$space',
          '& pre': {
            height: '100%',
          },
          '@small': {
            paddingBottom: '$xxs',
          },
        },
        [`& ${CodesList}`]: {
          padding: '$$space',
          paddingBottom: 0,
          borderTopLeftRadius: '$medium',
          borderTopRightRadius: '$medium',
        },
        [`& ${CopyButtonWrapper}`]: {
          transition: 'opacity 0.3s ease-in-out',
          position: 'absolute',
          right: '$$space',
        },

        '&:not(&:hover)': {
          [`& ${CopyButtonWrapper}`]: {
            opacity: 0,
          },
        },
      },
    },
    embed: {
      true: {
        [`& ${CodesContent}`]: {
          '@small': {
            borderRadius: '0 0 $large $large',
          },
        },

        [`& ${CodesList}`]: {
          '@small': {
            borderTopLeftRadius: '$large',
            borderTopRightRadius: '$large',
          },
        },

        '@xl': {
          boxShadow: '0px 4px 40px 0px rgba(0, 0, 0, 0.40)',
        },
      },
    },
  },
});
