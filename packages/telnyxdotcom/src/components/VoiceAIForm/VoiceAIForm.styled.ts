import { keyframes, styled } from 'ui/styles';
import HeadingTypography from 'ui/components/Typography/Heading';
import Paragraph from 'ui/components/Typography/Paragraph';
import LabelTypography from 'ui/components/Typography/Label';
import Button from 'ui/components/Button';
import CtaButton from 'ui/components/CtaButton';
import Input from 'ui/components/Input';
import Link from 'ui/components/Link';

export const Wrapper = styled('div', {
  width: '100%',
  '@small': {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
  },
});

export const Heading = styled(HeadingTypography, {});

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
  minHeight: 356, // match figma
  textAlign: 'start',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '$medium',
  marginTop: '$medium',

  '@medium': {
    gap: '$large',
    marginTop: '$large',
  },

  variants: {
    embed: {
      true: {
        minHeight: 324, // match figma
        gap: '$medium',
        marginTop: '$medium',

        '@medium': {
          gap: '$large',
          marginTop: '$large',
        },
      },
    },
  },
});

export const SuccessHeading = styled(HeadingTypography, {
  marginBlockStart: 'auto',
});

export const SuccessContent = styled('div', {
  minHeight: 462, // match figma
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$medium',

  variants: {
    embed: {
      true: {
        minHeight: 324, // match figma
        maxWidth: 464, // prevent content overflow
      },
    },
  },
});

export const SuccessReturnLink = styled(CtaButton, {
  alignSelf: 'center',
  marginTop: 'auto',

  '@medium': {
    alignSelf: 'flex-start',
  },
});

export const SubmitButton = styled(Button, {
  alignSelf: 'center',
  display: 'flex',

  '&:disabled, &[aria-disabled="true"]': {
    backgroundColor: '$grayHoverLightBackground',
    borderColor: '$grayHoverLightBackground',
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
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
  minWidth: 256,

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

export const CheckboxLink = styled(Link, {
  span: {
    display: 'inline',
  },
});

const Container = styled('div', {
  maxWidth: 380,
  display: 'grid',
  gap: '$xxh',
  textAlign: 'center',
  textWrap: 'balance',
  paddingBlock: '$medium',
});

export const LoadingContainer = styled(Container);
export const SuccessContainer = styled(Container);

export const ErrorMessageContainer = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const fillBar = keyframes({
  '0%': { width: '0%' },
  '100%': { width: '100%' },
});

export const LoadingBar = styled('div', {
  marginTop: '$small',
  height: 8,
  width: '100%',
  backgroundColor: '$tan',
  borderRadius: '$medium',
  position: 'relative',
  '&:after': {
    borderRadius: 'inherit',
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    animation: `${fillBar} 5000ms ease-in-out infinite`,
    backgroundColor: '$green',
  },
});

export const ErrorContainerHeadingWrapper = styled('div', {
  display: 'grid',
  gap: '$small',
});
