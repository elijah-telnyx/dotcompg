import { styled } from 'ui/styles';
import P from 'ui/components/Typography/Paragraph';
import input from 'ui/components/Input';
import { Checkmark } from 'ui/components/Icons';

export const Paragraph = styled(P, {
  marginBottom: '$medium',
});

export const Form = styled('form', {
  maxWidth: '100%',
  '@small': {
    textAlign: 'start',
    display: 'flex',
    gap: '$xl',
    alignItems: 'flex-start',
  },
});

export const Input = styled(input, {
  '@lessThanSmall': { marginBottom: '$medium' },
});

export const SuccessIcon = styled(Checkmark, {
  color: '$green',
  padding: '$xxs',
  height: 32,
  width: 32,
});
