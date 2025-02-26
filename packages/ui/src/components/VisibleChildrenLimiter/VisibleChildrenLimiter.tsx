import { useState, type ReactNode } from 'react';
import Plus from '../Icons/Plus';
import Link from '../Link';
import * as css from './VisibleChildrenLimiter.styled';

export interface VisibleChildrenLimiterProps {
  children: ReactNode[];
  maxVisibleItems?: number;
  showItemsButtonText?: string;
  showChildren?: boolean;
}

export const VisibleChildrenLimiter = ({
  maxVisibleItems = 9,
  children,
  showItemsButtonText,
  showChildren,
}: VisibleChildrenLimiterProps) => {
  const [areItemsHidden, setAreItemsHidden] = useState(
    maxVisibleItems < children.length
  );

  if (showChildren) return <>{children}</>;

  const visibleItems = areItemsHidden
    ? children.slice(0, maxVisibleItems)
    : children;

  const showItems = () => setAreItemsHidden(false);

  const ShowItemsButton = () => (
    <css.LinkWrapper>
      <Link
        htmlAs='button'
        kind='cta'
        noIconEffect
        onClick={showItems}
        Icon={<Plus height={16} width={16} />}
      >
        {showItemsButtonText}
      </Link>
    </css.LinkWrapper>
  );

  return (
    <>
      {visibleItems}
      {areItemsHidden && <ShowItemsButton />}
    </>
  );
};

export default {
  Limiter: VisibleChildrenLimiter,
  Animate: css.AnimateVisibleItemWrapper,
};
