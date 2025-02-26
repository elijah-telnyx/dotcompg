import type { ReactNode } from 'react';
import InfoIcon from '../Icons/Info';
import * as css from './InfoTooltip.styled';
import { Root, type PopoverContentProps } from '@radix-ui/react-popover';
import type { BackgroundColor } from '../../styles/constants/backgroundColorOptions';
import { Portal } from '@radix-ui/react-popover';

export interface InfoTooltipProps {
  children: ReactNode;
  id: string;
  triggerLabel: string;
  triggerColor?: BackgroundColor;
  informationWrapperProps?: PopoverContentProps;
}

const DEFAULT_CONTENT_CONFIG: PopoverContentProps = {
  sideOffset: 8,
  align: 'start',
  alignOffset: -40,
  side: 'top',
};

const InfoTooltip = ({
  children,
  id,
  triggerLabel,
  triggerColor = 'cream',
  informationWrapperProps = {},
}: InfoTooltipProps) => {
  return (
    <Root>
      <css.Trigger aria-label={triggerLabel} color={triggerColor}>
        <InfoIcon />
      </css.Trigger>
      <Portal>
        <css.Content
          id={id}
          {...DEFAULT_CONTENT_CONFIG}
          {...informationWrapperProps}
        >
          {children}
          <css.Arrow width={38} height={24} />
        </css.Content>
      </Portal>
    </Root>
  );
};

export default InfoTooltip;
