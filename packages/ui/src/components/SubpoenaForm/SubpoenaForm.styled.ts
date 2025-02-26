import { styled } from '../../styles';
import HeadingTypography from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';
import LabelTypography from '../Typography/Label';
import SocialAuthButton from '../SocialAuthButton';
import Button from '../Button';
import Input from '../Input';

export const Wrapper = styled('div', {
  width: '100%',
  '@small': {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
  },
});

export const Heading = styled(HeadingTypography, {
  marginBlockEnd: '$xs',
});

export const Copy = styled(Paragraph);

export const Content = styled('div', {
  '@small': {
    gridColumn: '2 / 12',
  },
  '@medium': {
    gridColumn: '4 / 10',
  },
});

// new css below

export const FormContent = styled('form', {
  marginTop: '$large',
  marginBottom: '$medium',
  textAlign: 'start',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '$xl',
});

export const CheckboxFieldWrapper = styled('div', {
  marginBottom: '$medium',
});

export const SocialForm = styled(SocialAuthButton, {
  textAlign: 'center',
});

export const SubmitButton = styled(Button, {
  alignSelf: 'center',
  variants: {
    disabled: {
      true: {
        zIndex: 2,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
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
});

export const Label = styled(LabelTypography, {
  '&:hover': {
    color: '$grayHoverLightBackground',
  },
});

export const InputContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$xxs',
});

export const InputField = styled(Input, {
  '@medium': {
    minWidth: '100%',
  },
});
