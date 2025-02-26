import { forwardRef, type ReactNode } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import CloseIcon from '../Icons/Close';
import type { DialogContentProps as DialogPrimitiveContentProps } from '@radix-ui/react-dialog';
export type {
  DialogProps,
  DialogTriggerProps,
  DialogOverlayProps,
  DialogCloseProps,
  DialogTitleProps,
  DialogDescriptionProps,
} from '@radix-ui/react-dialog';

import * as css from './Dialog.styled';

const CloseButton = () => (
  <css.CloseButton aria-label='Close'>
    <CloseIcon />
  </css.CloseButton>
);
CloseButton.displayName = 'Dialog.CloseButton';

export interface DialogContentProps extends DialogPrimitiveContentProps {
  children?: ReactNode;
  Portal?: React.ComponentType;
  variant?: 'darkSeti';
  overlay?: boolean;
}

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogBodyWithRef(
    { children, Portal, variant, overlay, ...props }: DialogContentProps,
    forwardedRef
  ) {
    const DialogPortal = Portal || DialogPrimitive.Portal;

    return (
      <DialogPortal>
        {/* Blocks page scroll */}
        <css.Overlay overlay={overlay} />
        <css.Content variant={variant} {...props} ref={forwardedRef}>
          <CloseButton />
          <css.ContentChildWrapper>{children}</css.ContentChildWrapper>
        </css.Content>
      </DialogPortal>
    );
  }
);

export default {
  Root: DialogPrimitive.Root,
  Trigger: DialogPrimitive.Trigger,
  Content: DialogContent,
  Overlay: DialogPrimitive.Overlay,
  CloseButton,
  Title: DialogPrimitive.Title,
  Description: DialogPrimitive.Description,
};
