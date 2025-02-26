import { type ReactNode } from 'react';
import * as css from './HeaderContainer.styled';
import useScrollDirection, { ScrollDirection } from './useScrollDirection';
import { signal } from '@preact/signals-react';

export type HeaderContainerProps = {
  children: ReactNode;
  scrollSnap?: boolean;
};
export const blockHeaderBehavior = signal(false);

const HeaderContainer = ({ children, scrollSnap }: HeaderContainerProps) => {
  const direction = useScrollDirection();

  const computedDirection = blockHeaderBehavior.value
    ? ScrollDirection.DOWN
    : direction;

  return (
    <css.Container
      direction={computedDirection}
      data-header-direction={computedDirection}
      scrollSnap={scrollSnap}
    >
      {children}
    </css.Container>
  );
};

export default HeaderContainer;
