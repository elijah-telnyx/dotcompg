import { CountriesDB } from 'utils/countries.data';

export const publicIPOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

export const countryOptions = CountriesDB.map((it) => ({
  name: it.name,
  value: it.alpha2,
}));
