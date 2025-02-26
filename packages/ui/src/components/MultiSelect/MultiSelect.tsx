import { useId, useState } from 'react';
import * as css from './MultiSelect.styled';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export interface OptionRaw {
  name: string;
  value: string;
}
export interface Option extends OptionRaw {
  checked: boolean;
  onChange: (checked: boolean) => void;
}
export interface GroupedOption {
  name: string;
  items: OptionRaw[];
}
export interface MultiSelectProps {
  placeholder: string;
  items: (OptionRaw | GroupedOption)[];
  triggerProps?: React.ComponentProps<typeof css.SelectTrigger>;
  value?: string[];
  onChange: (value: string[]) => void;
}

const Option = ({ name, value, checked, onChange }: Option) => {
  const id = useId();
  return (
    <css.Option
      checked={checked}
      onCheckedChange={onChange}
      textValue={name}
      onSelect={(event) => event.preventDefault()}
    >
      <css.CheckboxInput
        type='checkbox'
        checked={checked}
        variant='gray'
        aria-describedby={id}
        name={value.replace(/\s/g, '-')}
      />
      <css.OptionName id={id}>{name}</css.OptionName>
    </css.Option>
  );
};

const isPlural = (count: number) => (count > 1 ? 's' : '');

const isGroupedOption = (
  option: OptionRaw | GroupedOption
): option is GroupedOption =>
  typeof (option as GroupedOption)?.items !== 'undefined';

const MultiSelect = ({
  items,
  placeholder,
  value: controlledValue,
  onChange,
  triggerProps = {},
}: MultiSelectProps) => {
  const isControlled = controlledValue !== undefined && onChange !== undefined;
  const [optionsChecked, setOptionsChecked] = useState<string[]>([]);

  const value = isControlled ? controlledValue : optionsChecked;
  const handleChange = isControlled ? onChange : setOptionsChecked;

  const handleCheckboxClick = (isChecked: boolean, optionValue: string) => {
    if (isChecked) {
      const newState = [...value, optionValue];
      handleChange(newState);
      return newState;
    }
    const newState = value.filter((option) => option !== optionValue);
    handleChange(newState);
    return newState;
  };
  return (
    <DropdownMenu.Root modal={false}>
      <css.SelectTrigger {...triggerProps}>
        <css.OptionName>
          {value.length > 0
            ? `${value.length} filter${isPlural(value.length)} selected`
            : placeholder}
        </css.OptionName>
        <css.Icon />
      </css.SelectTrigger>

      <css.SelectContent avoidCollisions={false}>
        <css.SelectContentScrollWrapper>
          {items.map((option) => {
            if (isGroupedOption(option)) {
              return (
                <>
                  <DropdownMenu.Label asChild>
                    <css.GroupLabel>{option.name}</css.GroupLabel>
                  </DropdownMenu.Label>
                  <DropdownMenu.Group key={option.name} asChild>
                    <css.OptionGroup>
                      {option.items.map((optionItem) => (
                        <Option
                          {...optionItem}
                          key={optionItem.value}
                          checked={value?.includes(optionItem.value)}
                          onChange={(checked) =>
                            handleCheckboxClick(checked, optionItem.value)
                          }
                        />
                      ))}
                    </css.OptionGroup>
                  </DropdownMenu.Group>
                </>
              );
            }
            return (
              <Option
                {...option}
                key={option.value}
                checked={value.includes(option.value)}
                onChange={(isChecked) => {
                  handleCheckboxClick(isChecked, option.value);
                }}
              />
            );
          })}
        </css.SelectContentScrollWrapper>
      </css.SelectContent>
    </DropdownMenu.Root>
  );
};

export default MultiSelect;
