import type { SupportedCountry } from 'lib/Pricing/@types';
import constants from 'constants/env';
import { EXCLUDED_COUNTRIES_LOCALES } from './countries/constants';

const BASE_URL = `${constants.protocol}://${constants.host}`;

export const excludeFromMetatags = (alpha2: string, url: string) => {
  const path = url.replace(new RegExp(`^${BASE_URL}`, 'gi'), '');

  if (
    EXCLUDED_COUNTRIES_LOCALES[path] &&
    EXCLUDED_COUNTRIES_LOCALES[path].includes(alpha2.toUpperCase() as SupportedCountry)
  ) {
    return true;
  }
};
