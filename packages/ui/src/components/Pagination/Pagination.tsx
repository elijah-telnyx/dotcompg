import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import * as css from './Pagination.styled';

import type { AnchorHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

import ArrowLeft from '../Icons/ArrowLeft';
import ChevronRight from '../Icons/ChevronRight';
import Head from 'next/head';
import type Link from 'next/link';

export const Root = ({ children, dark }: PaginationRootProps) => (
  <css.PaginationContainer aria-label='pagination' dark={Boolean(dark)}>
    {children}
  </css.PaginationContainer>
);
Root.displayName = 'Pagination.Root';

export const PageCounter = ({
  currentPage,
  totalPages,
}: PaginationPageCounterProps) => (
  <css.CTA>
    <span aria-label={`Current Page, Page ${currentPage}`}>{currentPage}</span>/
    <span aria-label={`Total pages, ${totalPages}`}>{totalPages}</span>
  </css.CTA>
);
PageCounter.displayName = 'Pagination.PageCounter';

const NavButton = ({
  disabled,
  onClick,
  htmlAs,
  dark,
  ...props
}: PaginationButtonProps) => {
  if (!props.href) {
    return (
      <css.NavButton
        {...props}
        dark={Boolean(dark)}
        as='button'
        {...(disabled && { 'aria-disabled': disabled })}
        disabled={disabled}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          if (disabled) {
            event.preventDefault();
            return;
          }
          if (onClick) {
            onClick(event);
          }
        }}
      />
    );
  }

  return (
    <css.NavButton
      {...props}
      dark={Boolean(dark)}
      as={htmlAs}
      {...(disabled && { 'aria-disabled': disabled })}
      disabled={disabled}
      onClick={(
        event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
      ) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        if (onClick) {
          onClick(event);
        }
      }}
    />
  );
};

export const PreviousButton = (props: PaginationButtonProps) => {
  return (
    <NavButton {...props}>
      {props.href && (
        <Head>
          <link rel='prev' href={props.href} />
        </Head>
      )}
      <AccessibleIcon.Root label='Go to previous page'>
        <ArrowLeft title='Go to previous page' />
      </AccessibleIcon.Root>
    </NavButton>
  );
};

PreviousButton.displayName = 'Pagination.PreviousButton';

export const NextButton = (props: PaginationButtonProps) => (
  <NavButton {...props}>
    {props.href && (
      <Head>
        <link rel='next' href={props.href} />
      </Head>
    )}
    <AccessibleIcon.Root label='Go to next page'>
      <ChevronRight title={'Go to next page'} />
    </AccessibleIcon.Root>
  </NavButton>
);

NextButton.displayName = 'Pagination.NextButton';

export default {
  Root,
  NextButton,
  PreviousButton,
  PageCounter,
};

export interface PaginationRootProps {
  children: ReactNode;
  dark?: boolean;
}

export interface PaginationPageCounterProps {
  currentPage: number;
  totalPages: number;
}

export interface PaginationButtonProps {
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  href?: AnchorHTMLAttributes<HTMLAnchorElement>['href'];
  htmlAs?: keyof JSX.IntrinsicElements | typeof Link;
  dark?: boolean;
  /**
   * next/link prop
   */
  scroll?: boolean;
}
