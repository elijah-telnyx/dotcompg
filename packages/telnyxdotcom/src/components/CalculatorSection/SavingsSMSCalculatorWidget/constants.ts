export const numberQuantityOptions = ['0 - 250,000', '250,001 - 500,000', '500,001 - 750,000', '750,001 - 1,000,000'];

export const numberTypesOptions = [
  { value: 'local', label: 'Local numbers' },
  { value: 'tollFree', label: 'Toll-free numbers' },
];

export type QuantityType = (typeof numberQuantityOptions)[number];
export type NumberType = (typeof numberTypesOptions)[number]['value'];

export const twilioBrand = {
  color: '#F22F46',
  label: 'Twilio',
};
