import type { Country } from './types';

const customRegions = {
  'satellite-coverage': 'satellite-coverage',
} as const;

export type CustomRegions = keyof typeof customRegions;

export const customCountries: Record<CustomRegions, Country> = {
  [customRegions['satellite-coverage']]: {
    name: 'Satellite Coverage',
    slug: customRegions['satellite-coverage'],
    alpha2: 'XX', //XX is the value used by the api ,
    googleName: '',
    alpha3: 'XX',
    numeric: null,
    region: customRegions['satellite-coverage'],
    dialCode: null,
  },
} as const;
