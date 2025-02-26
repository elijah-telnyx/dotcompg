import { useState, type PropsWithChildren } from 'react';
import { ActionButton } from '../../Button';
import ThreeDotsVerticalIcon from '../../Icons/ThreeDotsVerticalIcon';
import CloseIcon from '../../Icons/Close';
import { config, keyframes, styled } from '../../../styles';
import * as Popover from '@radix-ui/react-popover';
import type { ComponentProps } from '@stitches/react';
import useMedia from '../../../utils/hooks/useMedia';

const CardWrapper = styled('div', {
  boxShadow: '0px 10px 30px 0px #0000001A',
  borderRadius: '$medium',
  border: '1px solid $tan',
  zIndex: 1000,
  '@lessThanSmall': {
    padding: '$medium',
    width: config.theme.gridMaxWidth.base,
  },
  '@small': {
    padding: '$large',
    minWidth: 392,
  },
});

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

const Overlay = styled('div', {
  position: 'fixed',
  inset: 0,
  zIndex: 1,
  animation: `${fadeIn} 0.2s ease-in-out forwards`,
  '@lessThanSmall': {
    backdropFilter: 'blur(6px)',
  },
});

export interface InferenceFloatingMenuProps {
  label: string;
  showTooltipOnHover?: boolean;
  isOpen?: boolean;
  onOpenChange?: Popover.PopoverProps['onOpenChange'];
  css?: ComponentProps<typeof CardWrapper>['css'];
  disabled?: boolean;
}

export function InferenceFloatingMenu({
  children,
  label,
  isOpen: controlledIsOpen,
  onOpenChange: controlledOnOpenChange,
  css,
  showTooltipOnHover = true,
  disabled,
}: PropsWithChildren<InferenceFloatingMenuProps>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openState = controlledIsOpen ?? isMenuOpen;
  const updateState = controlledOnOpenChange ?? setIsMenuOpen;
  const isLessThanSmall = useMedia(config.media.lessThanSmall);

  return (
    <>
      {openState && <Overlay />}
      <Popover.Root
        open={openState}
        onOpenChange={updateState}
        modal={isLessThanSmall ? true : false}
      >
        <Popover.Trigger asChild>
          <ActionButton
            css={{ position: 'relative', zIndex: 2 }}
            showTooltipOnHover={!openState && showTooltipOnHover}
            label={label}
            onClick={() => updateState(!isMenuOpen)}
            icon={openState ? CloseIcon : ThreeDotsVerticalIcon}
            kind={openState ? 'primary' : 'secondary'}
            size='large'
            disabled={disabled}
          />
        </Popover.Trigger>
        {!disabled && (
          <Popover.Content
            asChild
            align={isLessThanSmall ? 'end' : 'start'}
            side={isLessThanSmall ? 'bottom' : 'left'}
            sideOffset={12}
            alignOffset={isLessThanSmall ? -12 : undefined}
          >
            <CardWrapper css={css}>{children}</CardWrapper>
          </Popover.Content>
        )}
      </Popover.Root>
    </>
  );
}
