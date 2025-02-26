import type { ReactNode } from 'react';
import Button from '../../Button';
import { theme } from '../../../styles';

export interface HeaderButtonProps {
  href: string;
  children: ReactNode;
  growOnMobile?: boolean;
}

export function HeaderButton({
  href,
  children,
  growOnMobile,
}: HeaderButtonProps) {
  return (
    <Button
      href={href}
      background='dark'
      variant='header'
      htmlAs='a'
      css={
        growOnMobile
          ? {
              '@lessThanMedium': {
                '--spacing': `calc(${theme.space.medium.value} - 2px)`,
                fontSize: '$medium',
                lineHeight: '$xxs',
              },
            }
          : {}
      }
    >
      {children}
    </Button>
  );
}
