import P from 'ui/components/Typography/Paragraph';
import H from 'ui/components/Typography/Heading';
import Input from 'ui/components/Input';
import button from 'ui/components/Button';
import label from 'ui/components/Typography/Label';

import { styled } from 'ui/styles';

export const InputField = styled(Input, {
  minWidth: '100%',
});
export const Heading = styled(H, {
  marginBottom: '$xl',
});
export const Paragraph = styled(P, {});

export const Form = styled('form', {
  textAlign: 'start',
  display: 'grid',
  gap: '$xl',
  maxWidth: '100%',
});

export const Label = styled(label, {
  display: 'block',
  marginBottom: '$xxs',
});

export const Button = styled(button, {
  maxWidth: 'fit-content',
  marginInline: 'auto',
});
