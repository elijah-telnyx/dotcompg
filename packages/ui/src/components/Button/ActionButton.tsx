import { forwardRef, type ElementType, type ForwardedRef } from 'react';
import { keyframes, styled } from '../../styles';
import type { ComponentProps } from '@stitches/react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

const animationDuration = '0.2s';
const animationTimingFunction = 'ease-out';
const tooltipDelayDuration = 0;
const tooltipOffsetAnimation = 2;

const Button = styled('button', {
  borderRadius: '$round',
  display: 'grid',
  placeItems: 'center',
  transitionProperty: 'all',
  transitionDuration: animationDuration,
  transitionTimingFunction: animationTimingFunction,
  border: '1px solid',

  variants: {
    kind: {
      primary: {
        borderColor: '$black',
        backgroundColor: '$black',
        color: '$cream',
        '&:hover, &:focus': {
          borderColor: '$grayHoverLightBackground',
          backgroundColor: '$grayHoverLightBackground',
        },
        '&:disabled': {
          backgroundColor: '$grayHoverDarkBackground',
          borderColor: '$grayHoverDarkBackground',
          cursor: 'not-allowed',
        },
      },
      secondary: {
        borderColor: '$tan',
        backgroundColor: '$cream',
        color: '$black',
        '&:hover, &:focus': {
          backgroundColor: '$tan',
        },
      },
    },
    size: {
      medium: {
        height: '36px',
        width: '36px',
      },
      large: {
        height: '48px',
        width: '48px',
      },
    },
  },
});

const slideUpAndFade = keyframes({
  from: {
    opacity: 0,
    transform: `translateY(${tooltipOffsetAnimation}px)`,
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

const slideRightAndFade = keyframes({
  from: {
    opacity: 0,
    transform: `translateX(-${tooltipOffsetAnimation}px)`,
  },
  to: {
    opacity: 1,
    transform: 'translateX(0)',
  },
});

const slideDownAndFade = keyframes({
  from: {
    opacity: 0,
    transform: `translateY(-${tooltipOffsetAnimation}px)`,
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

const slideLeftAndFade = keyframes({
  from: {
    opacity: 0,
    transform: `translateX(${tooltipOffsetAnimation}px)`,
  },
  to: {
    opacity: 1,
    transform: 'translateX(0)',
  },
});

const TooltipContent = styled(TooltipPrimitive.Content, {
  typography: '$p.caption.mobile',
  fontStyle: 'normal',
  userSelect: 'none',
  animationDuration,
  animationTimingFunction,
  willChange: 'transform, opacity',
  '&[data-state="delayed-open"][data-side="top"]': {
    animationName: slideDownAndFade,
  },
  '&[data-state="delayed-open"][data-side="right"]': {
    animationName: slideLeftAndFade,
  },
  '&[data-state="delayed-open"][data-side="bottom"]': {
    animationName: slideUpAndFade,
  },
  '&[data-state="delayed-open"][data-side="left"]': {
    animationName: slideRightAndFade,
  },
});

export interface ActionButtonProps extends ComponentProps<typeof Button> {
  label: string;
  icon: ElementType;
  showTooltipOnHover?: boolean;
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  function ActionButton(
    {
      label,
      icon: Icon,
      size = 'medium',
      kind = 'primary',
      showTooltipOnHover,
      ...props
    },
    ref: ForwardedRef<HTMLButtonElement>
  ) {
    if (showTooltipOnHover) {
      return (
        <TooltipPrimitive.Provider delayDuration={tooltipDelayDuration}>
          <TooltipPrimitive.Root>
            <TooltipPrimitive.Trigger asChild>
              <Button {...props} size={size} kind={kind} aria-label={label}>
                <Icon />
              </Button>
            </TooltipPrimitive.Trigger>
            <TooltipContent align='center' side='left' sideOffset={12}>
              {label}
            </TooltipContent>
          </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
      );
    }
    return (
      <Button {...props} size={size} kind={kind} aria-label={label} ref={ref}>
        <Icon />
      </Button>
    );
  }
);
