import { email } from 'ui/utils/validators';
import type { RegisterOptions, FieldValues } from 'react-hook-form';
import type { SelectItemProps } from 'ui/components/Select';
import { CountriesDB, generateCountryItems } from 'utils/countries.data';
import { isPossiblePhoneNumber, type CountryCode } from 'libphonenumber-js';

export const requiredFields: FormField[] = [
  {
    type: 'text',
    label: 'What are you reporting?',
    name: 'shortDescription',
    required: true,
  },
  {
    label: 'Country of phone number causing the abuse',
    name: 'abusivePhoneNumberCountry',
    type: 'select',
    placeholder: 'Select country',
    items: generateCountryItems(CountriesDB),
    required: true,
  },
  {
    type: 'text',
    label: 'Phone number(s) causing the abuse',
    name: 'abusivePhoneNumber',
    validate: { phoneAbuseNumbers },
    required: true,
  },
  {
    label: 'Country of phone number receiving the abuse',
    name: 'abusedPhoneNumberCountry',
    type: 'select',
    placeholder: 'Select country',
    items: generateCountryItems(CountriesDB),
    required: true,
  },
  {
    type: 'text',
    label: 'Phone number(s) receiving the abuse',
    name: 'abusedPhoneNumber',
    validate: { phoneAbuseNumbers },
    required: true,
  },
  {
    label: 'Date and time of the abuse',
    name: 'dateTime',
    type: 'datetime-local',
    required: true,
  },
  {
    label: 'Services receiving the abuse',
    type: 'checkbox',
    name: 'abusedServices',
    required: true,
    group: [
      {
        label: 'Voice',
        type: 'checkbox',
        value: 'serviceAbusedVoice',
      },
      {
        label: 'Messaging',
        type: 'checkbox',
        value: 'serviceAbusedSms',
      },
    ],
  },
];

export const optionalFields: FieldProps[] = [
  {
    type: 'text',
    label: 'Full name',
    name: 'reporterName',
  },
  {
    type: 'email',
    label: 'Email',
    name: 'reporterEmail',
    validate: { email },
  },
  {
    type: 'textarea',
    label: 'Additional details',
    name: 'longDescription',
  },
];

/**
 * Values used on form fields
 */
export interface FormValues {
  shortDescription: string;
  abusivePhoneNumber: string;
  abusedPhoneNumber: string;
  dateTime: string;
  reporterName?: string;
  reporterEmail?: string;
  longDescription?: string;
  serviceAbusedVoice: boolean;
  serviceAbusedSms: boolean;
  /**
   * Used to set serviceAbusedVoice and serviceAbusedSms
   */
  abusedServices: string[];

  /**
   * Only used as helps to generate other information
   */
  abusivePhoneNumberCountry: CountryCode;
  abusedPhoneNumberCountry: CountryCode;
}

export type FieldType = 'text' | 'select' | 'checkbox' | 'datetime-local' | 'textarea' | 'email' | 'textarea';
export interface FieldProps {
  name: keyof FormValues;
  label: string;
  placeholder?: string;
  type: FieldType;
  validate?: RegisterOptions['validate'];
  required?: boolean;
  group?: Omit<FieldProps, 'name'>[];
  value?: string;
}

export interface SelectFieldProps extends FieldProps {
  type: 'select';
  placeholder: string;
  items: SelectItemProps[];
}

export type FormField = FieldProps | SelectFieldProps;

export function phoneAbuseNumbers(
  value: string,
  { abusedPhoneNumber, abusedPhoneNumberCountry, abusivePhoneNumberCountry }: FieldValues
) {
  const country = abusedPhoneNumber === value ? abusedPhoneNumberCountry : abusivePhoneNumberCountry;

  if (!country) return 'Please enter a valid phone number for the selected country above.';

  if (value) {
    value = value.replace(/\s/g, '');
    const phoneNumbers = value?.split(','),
      invalidPhoneNumbers = phoneNumbers
        ?.map((phoneNumber) => {
          if (!isPossiblePhoneNumber(phoneNumber, country)) return phoneNumber;
        })
        .filter((number) => number);

    if (invalidPhoneNumbers.length)
      return 'Please enter valid phone number(s). Matching above Country. Separate multiple phone numbers with a comma.';
  }

  return undefined;
}
