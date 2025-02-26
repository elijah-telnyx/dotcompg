import { styled } from '../../../styles';
import P from '../../Typography/Paragraph';
import input from '../../Input';
import button from '../../Button';
import { Checkmark } from '../../Icons';

export const Paragraph = styled(P, {
  marginBottom: '$medium',
});

export const Form = styled('form', { marginBottom: '$xl' });

export const Input = styled(input, {
  minWidth: 'unset',
});

export const Button = styled(button, { marginTop: '$medium' });

export const SuccessIcon = styled(Checkmark, {
  color: '$green',
  padding: '$xxs',
  height: 32,
  width: 32,
});
