import validatorIsEmail from 'validator/lib/isEmail';
import validatorIsMobilePhone from 'validator/lib/isMobilePhone';
import validatorIsLength from 'validator/lib/isLength';

const MIN_LENGTH_SIZE = 12;

export const defaultErrorMessages = {
  required: {
    defaultMessage: 'This field is required.',
  },
  email: {
    defaultMessage: 'Please enter a valid email address.',
  },
  freemail: {
    defaultMessage:
      'You cannot register using an email address from free email service like Gmail, Yahoo, Hotmail, etc. Please register with a work email or a non-freemail account.',
  },
  domain: {
    defaultMessage: 'Please enter a valid Domain name.',
  },
  url: {
    defaultMessage: 'Please enter a valid URL.',
  },
  phoneNumber: {
    defaultMessage: 'Please enter a valid phone number.',
  },
  usCaPhoneNumber: {
    defaultMessage: 'Please enter a valid US/CA phone number.',
  },
  passwordMinLength: {
    defaultMessage: 'Password must be at least 12 characters.',
  },
  passwordOneNumber: {
    defaultMessage: 'Password must contain at least one number.',
  },
  passwordOneSymbol: {
    defaultMessage: 'Password must contain at least one symbol.',
  },
  passwordUpperCase: {
    defaultMessage: 'Password must contain at least one upper-case letter.',
  },
  passwordLowerCase: {
    defaultMessage: 'Password must contain at least one lower-case letter.',
  },
  acceptTermsAndConditions: {
    defaultMessage: 'Please accept the terms and conditions',
  },
} as const;

export function domain(value?: string) {
  if (
    !value ||
    // snippet from https://regex101.com/r/dNccai/1, consider https? prefix
    !/^(https?:\/\/)?([a-z0-9-]{1,61})\.([a-z0-9]{2,7})(\.([a-z0-9]{2,7}))?([a-z0-9-/]{1,100})?$/.test(
      value
    )
  )
    return defaultErrorMessages.domain.defaultMessage;
}
export function email(value?: string) {
  if (value && !isEmail(value))
    return defaultErrorMessages.email.defaultMessage;
}

export function phoneNumber(value?: string) {
  if (value && !validatorIsMobilePhone(value))
    return defaultErrorMessages.phoneNumber.defaultMessage;
}

export function usCaPhoneNumber(value?: string) {
  if (value && !/^[+]?1\d{1,14}$/.test(value))
    return defaultErrorMessages.usCaPhoneNumber.defaultMessage;
}

export function passwordOneNumber(value: string) {
  if (!value || !/\d/.test(value))
    return defaultErrorMessages.passwordOneNumber.defaultMessage;
}
export function passwordOneSymbol(value: string) {
  if (!value || !/[!@#$%^&*(){}[\]<>?/|.:;_-]/.test(value))
    return defaultErrorMessages.passwordOneSymbol.defaultMessage;
}
export function passwordUpperCase(value: string) {
  if (!value || !/[A-Z]/.test(value))
    return defaultErrorMessages.passwordUpperCase.defaultMessage;
}
export function passwordLowerCase(value: string) {
  if (!value || !/[a-z]/.test(value))
    return defaultErrorMessages.passwordLowerCase.defaultMessage;
}

export function passwordMinLength(value: string) {
  if (!value || !validatorIsLength(value.trim(), { min: MIN_LENGTH_SIZE }))
    return defaultErrorMessages.passwordMinLength.defaultMessage;
}

function isEmail(value: string) {
  return validatorIsEmail(value);
}
