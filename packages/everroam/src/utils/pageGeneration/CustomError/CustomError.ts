import type { Redirect } from 'next';

export class NotFoundError extends Error {
  message: string;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
    this.message = message;
  }
}
export class RedirectError extends Error {
  redirect: Redirect;
  constructor(message: string, redirect: Redirect) {
    super(message);
    Object.setPrototypeOf(this, RedirectError.prototype);
    this.redirect = redirect;
  }
}

export const CustomErrorHandler = (error: Error) => {
  if (error instanceof NotFoundError) {
    return { notFound: true };
  }
  if (error instanceof RedirectError) {
    return { redirect: error.redirect };
  }
};
