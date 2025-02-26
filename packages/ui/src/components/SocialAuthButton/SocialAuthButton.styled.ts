import { styled } from '../../styles';
import Button from '../Button';

export const Form = styled('form', {
  width: '100%',
});

export const SocialButton = styled(Button, {
  paddingBottom: 'var(--spacing)',
});

export const ButtonContent = styled('span', {
  display: 'flex',
  alignItems: 'center',
  gap: '$xs',
});
