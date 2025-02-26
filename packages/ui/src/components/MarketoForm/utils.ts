import {
  MARKETO_EMAIL_ID,
  MARKETO_EMAIL_REGEX,
  MARKETO_EMAIL_DOMAIN_REGEX,
  MARKETO_ERRORS,
  MARKETO_PHONE_BASE_ID,
  MARKETO_PHONE_EXT_ID,
  MARKETO_PHONE_FIELD_VALIDATION,
  MARKETO_POSSIBLE_HIDDEN_FIELDS_ID_LIST,
} from './constants';

import type JQuery from 'jquery';

type Element = JQuery;

/**
 * @link https://developers.marketo.com/javascript-api/forms/api-reference/
 */
export type MarketoNativeForm = {
  vals: (values: object) => void;
  submit: () => void;
  onValidate: (validateFn: (isValid: boolean) => void) => void;
  addHiddenFields: (fields: { [key: string]: string }) => void;
  getFormElem: () => Element;
  getValues: () => { [key: string]: string };
  showErrorMessage(message: string, element: Element): unknown;
  submittable: (isSubmittable: boolean) => void;
  onSubmit: (callback: () => void) => void;
  onSuccess: (callback: () => void) => void;
};

export type MarketoFormOptions = { checkDomain?: boolean };

export const validate = (form: MarketoNativeForm) => {
  const getElementById = (id: string) => form.getFormElem().find(`#${id}`);

  return {
    email(options: MarketoFormOptions) {
      const emailInput = form.getFormElem().find(`#${MARKETO_EMAIL_ID}`);
      if (!emailInput || !emailInput[0]) {
        return true;
      }
      const email = form.getValues()[MARKETO_EMAIL_ID];
      if (!email) return false;

      if (!MARKETO_EMAIL_REGEX.test(email)) {
        form.showErrorMessage(MARKETO_ERRORS.EMAIL.INVALID_FORMAT, emailInput);
        return false;
      }
      if (options?.checkDomain && MARKETO_EMAIL_DOMAIN_REGEX.test(email)) {
        form.showErrorMessage(MARKETO_ERRORS.EMAIL.INVALID_DOMAIN, emailInput);
        return false;
      }
      return true;
    },
    phoneNumber() {
      const phoneExtensionInput = getElementById(MARKETO_PHONE_EXT_ID);
      const phoneBaseInput = getElementById(MARKETO_PHONE_BASE_ID);

      // elements does't exist
      if (!phoneBaseInput[0] && !phoneExtensionInput[0]) {
        return true;
      }

      // Additional phone number validation
      const phoneBaseValue = form.getValues()[MARKETO_PHONE_BASE_ID];
      const phoneExtensionValue = form.getValues()[MARKETO_PHONE_EXT_ID];
      // if both are empty, don't validate because it's not required
      // and if it is required, the native validation will catch it
      if (!phoneBaseValue && !phoneExtensionValue) {
        return true;
      }

      const setPhoneBaseError = (error: string) => {
        form.showErrorMessage(error, phoneBaseInput);
      };
      const setPhoneExtensionError = (error: string) => {
        form.showErrorMessage(error, phoneExtensionInput);
      };

      if (!phoneExtensionValue) {
        setPhoneExtensionError(MARKETO_ERRORS.PHONE.NO_EXT);
        return false;
      }

      if (!phoneBaseValue) {
        form.showErrorMessage(
          MARKETO_ERRORS.PHONE.INVALID_MIN_LENGTH,
          phoneBaseInput
        );
        return false;
      }

      // At least 10 characters
      const phoneNumberNumbersCount = Number(
        phoneBaseValue.match(/\d/g)?.length
      );

      if (phoneNumberNumbersCount < MARKETO_PHONE_FIELD_VALIDATION.minLength) {
        setPhoneBaseError(MARKETO_ERRORS.PHONE.INVALID_MIN_LENGTH);
        return false;
      }
      if (phoneNumberNumbersCount > MARKETO_PHONE_FIELD_VALIDATION.maxLength) {
        setPhoneBaseError(MARKETO_ERRORS.PHONE.INVALID_MAX_LENGTH);
        return false;
      }

      if (
        !validatePhoneForE164(
          formatToE164({
            countryCode: phoneExtensionValue,
            phoneNumber: phoneBaseValue,
          })
        )
      ) {
        setPhoneBaseError(MARKETO_ERRORS.PHONE.NOT_E164_FORMAT);
        return false;
      }
      return true;
    },
  };
};

export const isRelativePath = (path: string) => path.startsWith('/');

export const updateValueBasedOnUrl = (form: MarketoNativeForm) => {
  if (!window) return;

  const searchParams = new URL(window.location.toString()).searchParams;

  searchParams.forEach((value, key) => {
    const element = form?.getFormElem()?.find(`#${key}`);
    if (element?.val) {
      element.val(value);
    }
  });
};

/**
 * @link https://www.twilio.com/docs/glossary/what-e164#regex-matching-for-e164
 */
export const formatToE164 = ({
  countryCode,
  phoneNumber,
}: {
  countryCode: string;
  phoneNumber: string;
}) => {
  let phoneDigits = phoneNumber.replace(/\D/g, '');
  if (phoneDigits.startsWith('0')) {
    phoneDigits = phoneDigits.substring(1);
  }

  return `${countryCode}${phoneDigits}`;
};

export const validatePhoneForE164 = (phoneNumber: string) => {
  const e164Regex = /^\+[1-9]\d{1,14}$/;
  return e164Regex.test(phoneNumber);
};

export const fillHiddenFields = (form: MarketoNativeForm) => {
  const hiddenPhoneFieldId = MARKETO_POSSIBLE_HIDDEN_FIELDS_ID_LIST.phone.find(
    (fieldName) => document.getElementsByName(fieldName)
  );

  const formValues = form.getValues();

  if (hiddenPhoneFieldId) {
    const phoneBaseValue = formValues[MARKETO_PHONE_BASE_ID];
    const phoneExtensionValue = formValues[MARKETO_PHONE_EXT_ID];
    // Apply phone extension + phone base to hidden phone field
    if (phoneBaseValue && phoneExtensionValue) {
      form.addHiddenFields({
        [hiddenPhoneFieldId]: formatToE164({
          countryCode: phoneExtensionValue,
          phoneNumber: phoneBaseValue,
        }),
      });
    }
  }
};
