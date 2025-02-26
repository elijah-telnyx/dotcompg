import React, { type ComponentProps } from 'react';
import * as SelectPrimitives from '@radix-ui/react-select';
import * as css from './BasicSelect.styled';
import ChevronDownOutlineIcon from '../../Icons/ChevronDownOutline';

export interface SelectProps
  extends ComponentProps<typeof SelectPrimitives.Root> {
  /**
   * use as the aria-label for the trigger button
   */
  triggerLabel?: string;
  placeholder: string;
  optionsContainerPosition?: React.ComponentProps<
    typeof css.SelectContent
  >['position'];
  theme?: ComponentProps<typeof css.SelectWrapper>['theme'];
}

/**
 * @link https://www.radix-ui.com/primitives/docs/components/select
 */
export const Select = ({
  children,
  placeholder,
  triggerLabel,
  optionsContainerPosition = 'popper',
  theme,
  ...props
}: SelectProps) => (
  <css.SelectWrapper theme={theme}>
    <SelectPrimitives.Root {...props}>
      <css.SelectTrigger aria-label={triggerLabel}>
        <SelectPrimitives.Value placeholder={placeholder} />
        <css.SelectIcon asChild>
          <ChevronDownOutlineIcon width={8} height={4} />
        </css.SelectIcon>
      </css.SelectTrigger>

      <css.SelectContent position={optionsContainerPosition}>
        <SelectPrimitives.ScrollUpButton />
        <css.SelectViewport>{children}</css.SelectViewport>
        <SelectPrimitives.ScrollDownButton />
      </css.SelectContent>
    </SelectPrimitives.Root>
  </css.SelectWrapper>
);

export type OptionProps = React.ComponentProps<typeof css.SelectItem>;

export const Option = React.forwardRef<HTMLDivElement, OptionProps>(
  function SelectItemWithRef(
    { children, ...props }: OptionProps,
    forwardedRef
  ) {
    return (
      <css.SelectItem {...props} ref={forwardedRef}>
        <SelectPrimitives.ItemText>{children}</SelectPrimitives.ItemText>
      </css.SelectItem>
    );
  }
);
