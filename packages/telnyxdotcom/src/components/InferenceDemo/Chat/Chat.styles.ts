import TypographyCode from 'ui/components/Typography/Code';
import { css, styled } from 'ui/styles';

const gradientStart = 'rgba(254, 253, 245, 0.75) 70%';
const gradientEnd = 'transparent 100%';

export const GradientWrapper = styled('div', {
  position: 'relative',
  '&:after': {
    content: '',
    position: 'absolute',
    width: '100%',
    top: 0,
    height: 0,
    transition: 'height 0.3s ease-out',
  },
  variants: {
    showGradient: {
      true: {
        '&:after': {
          height: 48,
          background: `linear-gradient(to bottom, ${gradientStart}, ${gradientEnd})`,
        },
      },
    },
  },
});

export const ChatWrapper = styled('div', {
  $$height: '100vh',
  overflow: 'auto',
  position: 'relative',
  '@supports (height: 100dvh)': {
    $$height: '100dvh',
  },
  // close button height + padding + extra padding for chat and cookie buttons
  maxHeight: 'calc($$height - 44px - ($large * 2))',
  '@medium': {
    maxHeight: 499,
  },

  variants: {
    embed: {
      true: {
        // match figma
        maxHeight: 352,

        '@medium': {
          maxHeight: 352,
        },
      },
    },
  },
});

export const MessageWrapper = styled('div', {
  display: 'grid',
  alignItems: 'center',
  marginBottom: '$md',
  borderBottom: '1px solid $tan',
  paddingBlock: '$medium',
  gridTemplateColumns: '1fr auto',
  gap: '$small',
});

export const Role = styled('div', {
  fontSize: '$xs',
  lineHeight: '$small',
  fontWeight: '$regular',
  fontStyle: 'italic',
  textTransform: 'capitalize',
  gridColumn: 'span 2',
  position: 'sticky',
  top: -3,
  zIndex: 1,
  backgroundColor: '$cream',

  variants: {
    backgroundColor: {
      white: {
        '@medium': {
          backgroundColor: 'white',
        },
      },
    },
  },
});

const ChatText = css({
  fontFamily: '$inter',
  fontWeight: 'regular',
  fontSize: '$xs',
  lineHeight: '$xs',
  paddingLeft: '$xs',
});

export const MarkdownWrapper = styled('div', ChatText, {
  width: '100%',
  overflow: 'auto',
  whiteSpace: 'pre-wrap',
  ul: {
    paddingLeft: '$small',
  },
  blockquote: {
    marginInline: '$small',
    fontStyle: 'italic',
  },
  a: {
    color: '$blue',
    textDecoration: 'underline',
    '&:hover': {
      color: '$blueAlt',
    },
  },
});

export const FieldHeight = 38;
export const Field = styled('textarea', ChatText, {
  padding: '$xs',
  border: '1px solid $grayHoverDarkBackground',
  resize: 'none',
  minHeight: FieldHeight,
  height: FieldHeight,
  overflow: 'hidden',
  '&::placeholder': {
    color: '$grayHoverDarkBackground',
  },
  '&:focus': {
    outline: 0,
    borderColor: '$blue',
    '&::placeholder': {
      opacity: 0,
    },
  },
});

export const AddMessageButton = styled('button', ChatText, {
  display: 'block',
  position: 'absolute',
  right: 0,
  left: 0,
  marginTop: '$xs',
  padding: '$xs',
  marginInline: 'auto',
  color: '$blue',
  width: 'fit-content',
  fontWeight: '$extrabold',
  '&:hover, &:active': {
    color: '$blueAlt',
  },
});

export const ExcludeMessageButton = styled('button', {
  padding: '$xs',
  color: '$black',
  ['&:disabled']: {
    opacity: 0.4,
    pointerEvents: 'none',
    cursor: 'not-allowed',
  },
  '&:hover, &:active': {
    color: '$grayHoverLightBackground',
  },
});

export const MessageBlock = styled('div', {
  typography: '$p.caption.mobile',
  backgroundColor: '$citronLight',
  borderRadius: '$small',
  padding: '$xs',
  maxWidth: 'max-content',
});

export const CodeBlockContent = styled('div', {
  backgroundColor: '$black',
  color: '$cream',
  borderRadius: '$medium',
  boxShadow: '$black',
  padding: '$small',
});

export const CodeWrapper = styled('div', {
  overflowY: 'scroll',
  code: {
    textWrap: 'nowrap',
  },
});

export const CopyButtonWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'end',
  marginBottom: '$xxs',
});

export const Code = styled(TypographyCode, {
  fontSize: 'inherit',
});
