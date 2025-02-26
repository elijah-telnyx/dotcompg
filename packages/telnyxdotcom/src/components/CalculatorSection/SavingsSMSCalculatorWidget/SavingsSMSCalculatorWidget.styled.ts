import { styled } from 'ui/styles';
import Arrow from 'ui/components/Icons/Internal';
import Link from 'ui/components/Link';
import Progress from 'ui/components/Progress';
import H from 'ui/components/Typography/Heading';

export const CardHeading = styled(H, {
  marginBottom: '$xl',
  '@medium': {
    marginBottom: '$xxl',
  },
});

export const NavButtonIcon = styled(Arrow);

export const NavButton = styled(Link, {
  variants: {
    back: {
      true: {
        [`& ${NavButtonIcon}`]: {
          rotate: '180deg',
        },
      },
    },
  },
});

export const StepperBlockWrapper = styled('div', {
  marginTop: '$xl',
  '@medium': {
    marginTop: '$xxl',
  },
});

export const StepperDataWrapper = styled('div', {
  marginBottom: '$xs',
  display: 'grid',
  gridTemplateColumns: 'auto auto',
  justifyContent: 'space-between',
  gap: '$xxs',
  [`${Progress.Bar}`]: {
    gridColumn: 'span 2',
  },

  width: '100%',
  '@small': {
    marginBottom: '$small',
  },
  '@medium': {
    marginBottom: '$medium',
    gap: '$medium',
  },
});

export const BackButtonWrapper = styled('div', {
  height: 24,
});

export const ComparisonBlock = styled('div', {
  display: 'grid',
  gap: '$large',
  marginBottom: '$xl',
  '@medium': {
    marginBottom: '$xxl',
    gap: '$medium',
  },
});

export const SavingsBlock = styled('div', {
  display: 'grid',
  gap: '$small',
  marginBottom: '$xl',
  '@medium': {
    gap: '$medium',
    marginBottom: '$xxl',
  },
});

export const RadioGroup = styled('div', {
  display: 'grid',
  gap: '$medium',
  marginBottom: '$large',
  '@medium': {
    marginBottom: '$xl',
  },
});
