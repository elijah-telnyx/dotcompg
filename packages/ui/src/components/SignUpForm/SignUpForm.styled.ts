import { css, styled } from '../../styles';
import SocialAuthButton from '../SocialAuthButton';
import Button from '../Button';
import Input, { InputPassword } from '../Input';
import Link from '../Link';

export const FormContent = styled('form', {
  marginTop: '$large',
  marginBottom: '$medium',
  textAlign: 'start',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '$large',
});

export const CheckboxFieldWrapper = styled('div', {
  marginBottom: '$medium',
});

export const SocialForm = styled(SocialAuthButton, {
  textAlign: 'center',
});

export const SignUpButton = styled(Button, {
  alignSelf: 'center',

  '&:disabled': {
    zIndex: 2,
    pointerEvents: 'none',
  },
});

export const ErrorMessagesContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingLeft: '$large',
});

export const MessagesWrapper = styled('div', {
  marginTop: '$xxs',

  variants: {
    showMessageOnActive: {
      true: {
        display: 'none',
      },
    },
  },
});

const minWidthStyle = css({
  '@medium': {
    minWidth: '100%',
  },
});

export const InputField = styled(Input, {
  ...minWidthStyle,
});

export const InputPasswordField = styled(InputPassword, {
  ...minWidthStyle,
});

export const CheckboxLink = styled(Link, {
  span: {
    display: 'inline',
  },
});
