import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { styled } from '../../styles';
import CTA from '../Typography/CTA';
import {
  SelectContentStyle,
  SelectTriggerStyle,
} from '../Select/Select.styled';
import { CheckboxWrapper } from '../Input/Input.styled';
import { Input } from '../Input/Input.styled';
export { Icon } from '../Select/Select.styled';

export const OptionName = styled(CTA);

export const CheckboxInput = styled('input', Input);

export const GroupLabel = styled('legend', OptionName, {
  paddingInline: '$small',
  '@medium': {
    paddingInline: '$medium',
  },
  color: '$grayHoverDarkBackground',
});

export const Option = styled(DropdownMenu.CheckboxItem, CheckboxWrapper, {
  paddingInline: '$small',
  '@medium': {
    paddingInline: '$medium',
  },
  '&:not(:disabled)': {
    cursor: 'pointer',
    [`&:hover ${OptionName}`]: {
      cursor: 'pointer',
      color: '$grayHoverDarkBackground',
    },
  },
});

export const OptionGroup = styled('fieldset', {
  all: 'unset',
  display: 'grid',
  gap: '$xxs',
  '&:not(:last-child)': {
    marginBottom: '$small',
    '@medium': {
      marginBottom: '$small',
    },
  },
});

export const SelectContent = styled(DropdownMenu.Content, SelectContentStyle, {
  width: 'var(--radix-dropdown-menu-trigger-width)',
  display: 'grid',
  gap: '$xxs',
  paddingBlock: '$xs $small',
  '@medium': {
    paddingBlock: '$small $large',
  },
});

export const SelectTrigger = styled(DropdownMenu.Trigger, SelectTriggerStyle);

export const SelectContentScrollWrapper = styled('div', {
  maxHeight: 344,
  overflowY: 'auto',
});
