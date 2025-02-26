import { styled } from 'ui/styles';
import Arrow from 'ui/components/Icons/Internal';

export const NavButtonIcon = styled(Arrow);

export const RadioGroup = styled('div', {
  display: 'grid',
  gap: '$medium',
  marginBottom: '$large',
  '@medium': {
    marginBottom: '$xl',
  },
});

export const LoadingWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '$xl 0',
});
