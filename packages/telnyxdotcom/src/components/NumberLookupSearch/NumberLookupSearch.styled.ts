import { styled } from 'ui/styles';
import Button from 'ui/components/Button';
import CtaButton from 'ui/components/CtaButton';
import LabelTypography from 'ui/components/Typography/Label';

export const Label = styled(LabelTypography, {
  '&:hover': {
    color: '$grayHoverLightBackground',
  },
});

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$large',
  background: '$cream',
  borderRadius: '$medium',
  padding: '$xl',
  '@xs': {
    marginBottom: '$large',
  },
  '@small': {
    height: '400px',
    width: '100%',
  },
  '@medium': {
    height: '420px',
  },
});

export const ButtonSubmit = styled(Button, {
  width: 'fit-content',
});

export const ButtonSignUp = styled(CtaButton, {
  width: 'fit-content',
});
