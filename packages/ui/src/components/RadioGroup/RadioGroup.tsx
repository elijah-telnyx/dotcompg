import { useId } from 'react';
import * as ReactRadioGroup from '@radix-ui/react-radio-group';
import { slugify } from '../../utils/slugify';

import * as css from './RadioGroup.styled';

export interface RadioGroupItemProps
  extends ReactRadioGroup.RadioGroupItemProps {
  name: string;
  value: string;
}

export interface RadioGroupProps extends ReactRadioGroup.RadioGroupProps {
  items: RadioGroupItemProps[];
  onValueChange?(item?: RadioGroupItemProps['value']): void;
  labelSize?: 'small' | 'big';
}

const RadioGroup = ({ items, labelSize, ...props }: RadioGroupProps) => {
  const radioGroupId = useId();

  return (
    <css.RadioGroup {...props}>
      {items.map(({ name, value, ...item }) => {
        const id = slugify(`${radioGroupId}-${name}`);
        return (
          <css.ItemWrapper key={name}>
            <css.Item value={value} id={id} {...item}>
              <css.Indicator />
            </css.Item>
            <css.Label htmlFor={id} size={labelSize} disabled={item.disabled}>
              {name}
            </css.Label>
          </css.ItemWrapper>
        );
      })}
    </css.RadioGroup>
  );
};

export default RadioGroup;
