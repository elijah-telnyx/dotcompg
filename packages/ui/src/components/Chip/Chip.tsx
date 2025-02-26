import type { ReactNode, MouseEvent } from 'react';
import * as css from './Chip.styled';

export interface ChipProps {
  htmlAs?: keyof JSX.IntrinsicElements;
  children: ReactNode;
  checked?: boolean;
  onClick?: (e: MouseEvent) => void;
}

const Chip = ({ children, htmlAs, ...props }: ChipProps) => {
  return (
    <css.Chip
      as={htmlAs}
      onClick={props.onClick}
      data-state={props.checked ? 'checked' : 'unchecked'}
      {...props}
    >
      <css.Content>{children}</css.Content>
    </css.Chip>
  );
};

export default Chip;
