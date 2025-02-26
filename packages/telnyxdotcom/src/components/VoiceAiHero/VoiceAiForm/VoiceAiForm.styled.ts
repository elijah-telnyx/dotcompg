import { styled } from 'ui/styles';
import Grid from 'ui/components/Grid';
import Input from 'ui/components/Input';
import Heading from 'ui/components/Typography/Heading';
import Link from 'ui/components/Link';
import Button from 'ui/components/Button';
import { ActionButton } from 'ui/components/Button';

export const FormContent = styled('form', {
  display: 'grid',
  gap: '$medium',
});

export const HeadingStyled = styled(Heading, {
  textAlign: 'center',
  fontSize: '@large',
  marginTop: '$small',
  marginBottom: '$large',
});

export const InputWrapper = styled(Grid.FullWidthItem, {
  position: 'relative',
  '> strong': {
    textAlign: 'center',
    color: '$grayHoverDarkBackground',
  },
});

export const InputField = styled(Input, {
  backgroundColor: '$grayDark',
  color: '$cream',
  minWidth: 256,
  borderRadius: '$large',

  '@medium': {
    minWidth: '100%',
  },

  '&[type="textarea"]': {
    maxWidth: '100%',
    whiteSpace: 'normal',
  },

  '&[type="checkbox"]': {
    maxWidth: 16,
  },
});

export const InputButton = styled(ActionButton, {
  position: 'absolute',
  cursor: 'pointer',
  zIndex: 1,
  right: '3px',
  top: '80px',

  '@medium': {
    top: '91px',
  },
});

export const ToolTip = styled('span', {
  position: 'relative',
  bottom: '18px',
  right: '10px',
});

export const CheckboxWrapper = styled('span', {
  color: '$grayHoverDarkBackground',
  typography: '$label.mobile',
});

export const CheckboxLink = styled(Link, {
  span: {
    color: '$grayHoverDarkBackground',
    fontSize: '@small',
    display: 'inline',
  },
});

export const TermsInputWrapper = styled('div', {
  margin: '$medium 0 0',
  maxWidth: 'fit-content',
});

export const CaptchaWrapper = styled('div', {
  width: 'fit-content',
  marginTop: '$medium',
});

export const SubmitButton = styled(Button, {
  alignSelf: 'center',
  display: 'flex',
  width: 'fit-content',
  margin: '$large auto 0',

  '&:disabled, &[aria-disabled="true"]': {
    backgroundColor: '$grayHoverLightBackground',
    borderColor: '$grayHoverLightBackground',
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
});

export const LoadingContainer = styled('div', {
  maxWidth: 380,
  display: 'grid',
  gap: '$xxh',
  textAlign: 'center',
  textWrap: 'balance',
});
