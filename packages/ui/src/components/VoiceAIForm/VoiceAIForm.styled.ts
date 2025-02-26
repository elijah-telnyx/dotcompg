import { styled } from '../../styles';
import HeadingTypography from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';
import LabelTypography from '../Typography/Label';
import Button from '../Button';
import CtaButton from '../CtaButton';
import Input from '../Input';
import IconCall from '../Icons/Call';

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
  gap: '$xl',
  marginTop: '$xl',

  '@medium': {
    marginTop: '$xxl',
  },

  variants: {
    embed: {
      true: {
        minHeight: 324, // match figma
        gap: '$medium',
        marginTop: '$medium',

        '@medium': {
          marginTop: '$large',
        },

        '@xl': {
          gap: '$xl',
          // minHeight: 630, // match figma
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
  minWidth: 256,

  '@medium': {
    minWidth: '100%',
  },
});

export const CallIcon = styled(IconCall, {
  marginLeft: '$xs',
  marginBottom: '-$xxxs', // account for font offset
});
