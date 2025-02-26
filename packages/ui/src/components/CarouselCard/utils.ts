import type { MouseEventHandler } from 'react';

export const getElement = <
  T extends { href?: string; onClick?: MouseEventHandler<unknown> }
>(
  { href, onClick }: T,
  defaultElement: keyof JSX.IntrinsicElements = 'div'
): keyof JSX.IntrinsicElements => {
  if (href) {
    return 'a';
  }
  if (onClick) {
    return 'button';
  }
  return defaultElement;
};

export const interactiveElements = ['a', 'button'];
