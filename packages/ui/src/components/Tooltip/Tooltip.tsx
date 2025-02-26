import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { forwardRef, type ComponentProps, type ReactNode } from 'react';
import QuestionMarkIcon from '../Icons/QuestionMark';
import * as css from './Tooltip.styled';

export interface TooltipProps extends TooltipPrimitive.TooltipContentProps {
  children: ReactNode;
  visible?: boolean;
  variant?: 'dark' | 'light';
}

const Tooltip = ({
  children,
  content,
  visible,
  side = 'top',
  variant = 'light',
  ...contentProps
}: TooltipProps) => {
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal forceMount={visible ? true : undefined}>
          <TooltipPrimitive.Content
            sideOffset={8}
            side={side}
            {...contentProps}
            asChild
          >
            <css.Content variant={variant}>
              {content}
              <css.Arrow height={6} width={10}></css.Arrow>
            </css.Content>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export const TooltipIcon = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof css.Trigger>
>(function Icon(
  { children, ...props }: ComponentProps<typeof css.Trigger>,
  ref
) {
  if (children) {
    return (
      <css.Trigger type='button' {...props} ref={ref}>
        {children}
      </css.Trigger>
    );
  }

  return (
    <css.Trigger type='button' {...props} ref={ref}>
      <QuestionMarkIcon width={6} height={11} />
    </css.Trigger>
  );
});

export default Tooltip;
