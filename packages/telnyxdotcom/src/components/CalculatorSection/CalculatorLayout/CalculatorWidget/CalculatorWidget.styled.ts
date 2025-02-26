import { styled } from 'ui/styles';
import Arrow from 'ui/components/Icons/Internal';
import Link from 'ui/components/Link';
import Stepper from 'ui/components/Stepper/Stepper';

export const CardHeader = styled('header', {
  marginBottom: '$large',
  variants: {
    hasTooltip: {
      true: {
        display: 'flex',
        alignItems: 'center',
        columnGap: '$xxs',
      },
    },
  },
});

export const StepperNavButtonsWrapper = styled('div', {
  marginTop: '$xxl',
  display: 'flex',
  justifyContent: 'space-between',
});

export const StepperNext = styled(Stepper.Next, {
  marginLeft: 'auto',
});

export const NavButtonIcon = styled(Arrow);

export const NavButton = styled(Link, {
  '[disabled] &': {
    opacity: 0.4,
  },
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

export const StepperDataWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '$xxs',
  marginBottom: '$xs',

  '@small': {
    marginBottom: '$small',
  },
  '@medium': {
    marginBottom: '$medium',
    gap: '$medium',
  },
});
