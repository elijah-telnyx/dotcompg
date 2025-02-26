export const MARKETO_SCRIPT_ID = 'marketoLib';
export const MARKETO_SCRIPT_BASE = 'https://app-ab20.marketo.com';
export const MARKETO_SCRIPT_PATH = 'js/forms2/js/forms2.min.js';
export const MARKETO_MUNCHKIN_ID = '028-JJW-728';

export const MARKETO_EMAIL_REGEX = new RegExp( // use regex as this needs to be in html
  '[a-zA-Z0-9.! #$%&*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:. [a-zA-Z0-9-]+)*'
);
export const MARKETO_EMAIL_DOMAIN_REGEX = new RegExp( // checks if domain is gmail or yahoo, and checks TLD
  /^[A-Za-z0-9._%+-]+@\b(?:gmail|yahoo)\b\.[A-Za-z.]{2,6}$/
);
export const MARKETO_REASON_FOR_CONTACT_ID = 'Reason_for_Contact__c';
export const MARKETO_EMAIL_ID = 'Email';
export const MARKETO_PHONE_EXT_ID = 'Phone_Number_Extension__c';
export const MARKETO_PHONE_BASE_ID = 'Phone_Number_Base__c';
export const MARKETO_POSSIBLE_HIDDEN_FIELDS_ID_LIST = {
  phone: ['Form_Phone__c', 'formMarketingPhone__c'],
};

export const MARKETO_DEFAULT_REDIRECT_ON_SUCCESS = '/thank-you';

// from ITU E.164
export const MARKETO_PHONE_FIELD_VALIDATION = {
  minLength: 6,
  maxLength: 15,
};

export const MARKETO_ERRORS = {
  FAIL_TO_LOAD:
    'There was an error loading the form. Please refresh the page or try again.',
  PHONE: {
    INVALID_CHARACTERS:
      'Phone number should be a string of numbers unbroken by spaces or any non-number characters.',
    INVALID_MIN_LENGTH: `Phone numbers must be minimum ${MARKETO_PHONE_FIELD_VALIDATION.minLength} digits.`,
    INVALID_MAX_LENGTH: `Phone numbers can have a maximum of ${MARKETO_PHONE_FIELD_VALIDATION.maxLength} digits.`,
    NO_EXT: 'Phone number must have an extension',
    NOT_E164_FORMAT: 'Please enter a valid phone number',
  },
  EMAIL: {
    INVALID_FORMAT: 'Must be valid email. example@yourdomain.com',
    INVALID_DOMAIN: 'Please use a business email address',
  },
};
