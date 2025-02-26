import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import * as css from './ComboBox.styled';
import { matchSorter } from 'match-sorter';
import type { VariantProps } from '@stitches/react';

export interface Option {
  label: string;
  value: string;
}

export interface ComboBoxProps {
  options: Option[];
  placeholder: string;
  theme: VariantProps<typeof css.Wrapper>['theme'];
  value?: string;
  onSelect?: (value: Option) => void;
  disabled?: boolean;
  modal?: boolean;
}

const ComboBox = ({
  options,
  placeholder,
  theme,
  value: controlledValue,
  onSelect,
  disabled,
  modal = true,
}: ComboBoxProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [uncontrolledValue, setUncontrolledValue] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isContentOpen, setIsContentOpen] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const comboboxRef = useRef<HTMLDivElement>(null);

  useEffect(
    /**
     * needed because this combobox adds a `transform: translate` hack for being out of page when it's calculating its position
     * https://github.com/radix-ui/primitives/blob/89035eb2132b9a98c5543b3bdbd03b11ed7f09e4/packages/react/popper/src/Popper.tsx#L238
     * this causes content to be abruptly moved to be outside of the viewport bounds, causing scroll jumps
     * this timeout gives enough time for this combobox to calculate its position before setting the content visible, skipping `transform: translate` hack
     * */
    function onContentIsOpen() {
      const contentOpenTimeout = setTimeout(() => {
        setIsContentOpen(isOpen);
      }, 50);

      return () => {
        clearTimeout(contentOpenTimeout);
      };
    },
    [isOpen]
  );

  const value = controlledValue || uncontrolledValue;

  const onOptionSelect = (option: Option) => {
    if (onSelect) {
      onSelect(option);
    } else {
      setUncontrolledValue(option.value);
    }
    setIsOpen(false);
  };

  const matches = filterOptions({ options, searchValue });

  const selectedValue = options.find((option) => option.value === value);

  const onOpenChange = (open: boolean) => {
    setSearchValue('');
    setIsOpen(open);
  };

  const handleArrowNavigation = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const options =
        comboboxRef?.current?.querySelectorAll('[role="menuitem"]');
      if (!options || options.length === 0) return;
      // focus the option to enable arrow navigation from within radix so we don't have to handle it
      switch (event.key) {
        case 'ArrowDown':
          return (options[0] as HTMLDivElement).focus();
        case 'ArrowUp':
          return (options[options.length - 1] as HTMLDivElement).focus();
      }
    }
  };

  return (
    <css.Wrapper theme={theme} ref={comboboxRef} contentOpen={isContentOpen}>
      <DropdownMenu.Root
        open={isOpen}
        onOpenChange={onOpenChange}
        modal={modal}
      >
        <css.Trigger disabled={disabled} type='button'>
          {selectedValue ? (
            <css.TriggerContent>{selectedValue.label}</css.TriggerContent>
          ) : (
            <css.TriggerContent data-placeholder='true'>
              {placeholder}
            </css.TriggerContent>
          )}{' '}
          <css.Icon width={8} height={4} />
        </css.Trigger>
        <css.Content
          onKeyDown={(event) => {
            const isArrowKey = event.key in arrowKeys;
            if (!isArrowKey) searchInputRef.current?.focus();
          }}
        >
          <css.SearchInput
            ref={searchInputRef}
            type='search'
            placeholder='Search...'
            onKeyDown={(event) => {
              event.stopPropagation();
              handleArrowNavigation(event);
            }}
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />

          {matches.length === 0 && (
            <css.NoResults>No results found</css.NoResults>
          )}
          <css.OptionsList>
            {matches.map((option) => {
              return (
                <Option
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  onSelect={onOptionSelect}
                  isSelected={value === option.value}
                />
              );
            })}
          </css.OptionsList>
        </css.Content>
      </DropdownMenu.Root>
    </css.Wrapper>
  );
};

interface OptionProps extends Option {
  children?: ReactNode;
  onSelect?: (option: Option) => void;
  isSelected?: boolean;
}

export const Option = React.forwardRef<HTMLDivElement, OptionProps>(
  function OptionWithRef(
    { children, isSelected, label, onSelect, value, ...props }: OptionProps,
    forwardedRef
  ) {
    return (
      <css.Item
        ref={forwardedRef}
        {...props}
        onSelect={() => {
          if (onSelect) onSelect({ label, value });
        }}
        data-state={isSelected ? 'checked' : undefined}
        aria-label={label}
      >
        {children || label}
      </css.Item>
    );
  }
);

const arrowKeys = { ArrowDown: 'ArrowDown', ArrowUp: 'ArrowUp' };

const filterOptions = ({
  options,
  searchValue,
}: {
  options: Option[];
  searchValue: string;
}) => {
  if (!searchValue) return options;
  return matchSorter(options, searchValue, { keys: ['label', 'value'] });
};

export default ComboBox;
