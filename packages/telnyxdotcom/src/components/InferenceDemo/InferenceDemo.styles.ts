import Grid from 'ui/components/Grid';
import Paragraph from 'ui/components/Typography/Paragraph';
import { styled } from 'ui/styles';

export const FormWrapper = styled('form', Grid.Container, {
  display: 'grid',

  borderRadius: '$large',
  overflow: 'hidden',
  boxShadow: '0px 10px 30px 0px #0000001A',
  '@lessThanSmall': {
    maxWidth: '100%',
  },

  variants: {
    embed: {
      true: {
        boxShadow: 'none',
        borderRadius: '$medium',

        '@small': {
          borderRadius: '$large',
        },
        '@medium': {
          backgroundColor: '$cream',
        },
        '@xl': {
          height: 630,
        },
      },
    },
    hero: {
      true: {
        boxShadow: '0px 10px 30px 0px #0000001A',
        display: 'flex',
        width: '100%',
        height: '100%',

        '@medium': {
          backgroundColor: 'initial',
        },

        '& > div': {
          flex: 1,
        },
      },
    },
    backgroundColor: {
      white: {
        '@medium': {
          backgroundColor: 'white',
        },
      },
    },
  },
});

const FieldWrapper = styled('div', {
  display: 'grid',
  gap: '$xs',
});

export const ModelInputWrapper = styled(FieldWrapper);
export const TemperatureInputWrapper = styled(FieldWrapper);
export const PromptInputWrapper = styled(FieldWrapper);

const FormContainer = styled(Grid.Item, {
  paddingBlock: '$xl',
  paddingInline: '$large',
  '@small': {
    paddingInline: '$xxl',
  },
  '@medium': {
    padding: '$xl',
  },
  '@large': {
    padding: '$xxl',
  },
});

export const AiSettingsContainer = styled(FormContainer, {
  display: 'grid !important',
  rowGap: '$xl',
  backgroundColor: '$cream',
  '@medium': {
    backgroundColor: '$black',
    color: '$cream',
  },

  variants: {
    embed: {
      true: {
        backgroundColor: '$black',
        color: '$cream',
      },
    },
  },
});

export const ChatContainer = styled(FormContainer, {
  backgroundColor: '$cream',
  '@lessThanMedium': {
    paddingTop: 0,
  },
  variants: {
    backgroundColor: {
      white: {
        backgroundColor: 'white',
      },
    },
  },
});

export const SelectWrapper = styled('div', {
  overflow: 'hidden',
});
export const Label = styled('label', {
  display: 'flex',
  alignItems: 'center',
  gap: '$xxs',
  fontFamily: '$inter',
  fontWeight: '$semibold',
  fontSize: '$xs',
  '@medium': {
    fontSize: '$small',
    lineHeight: '$small',
  },
});

const Button = styled('button', {
  display: 'block',
  backgroundColor: '$black',
  color: '$cream',
  padding: '$xs $large',
  borderRadius: 18,
  fontFamily: '$inter',
  fontSize: '$xs',
  lineHeight: '$small',
  fontWeight: '$semibold',
  textAlign: 'center',
  '&:hover, &:active': {
    backgroundColor: '$grayHoverLightBackground',
  },
  ['&:disabled']: {
    opacity: 0.4,
    pointerEvents: 'none',
    cursor: 'not-allowed',
  },

  variants: {
    embed: {
      true: {
        backgroundColor: '$cream',
        color: '$black',
      },
    },
  },
});

export const SubmitButton = styled(Button, {
  marginTop: '$xxl',
  width: 82,
  height: 38,
});

export const Error = styled('p', {
  color: '$redAlt',
  fontSize: '$small',
  marginTop: '$xxs',
  textWrap: 'pretty',
});

export const Text = styled(Paragraph, {
  marginTop: '$large',
});

export const DialogTriggerButton = styled(Button, {
  width: 142,
  height: 36,
  '@medium': {
    display: 'none',
  },
});

export const BlockedMessageLink = styled('span', {
  typography: '$p.caption.mobile',
  textDecoration: 'underline',
  color: '$blue',
});
