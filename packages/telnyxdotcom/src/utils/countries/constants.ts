/**
 * We use alpha2 code because it is more reliable than the country name
 */

import type { SupportedCountry } from 'lib/Pricing/@types';

// https://telnyx.slack.com/archives/C039SK2LHNK/p1677267428689729?thread_ts=1677259215.026269&cid=C039SK2LHNK
// https://www.iso.org/obp/ui/#search/code/
export const SUPPORTED_COUNTRIES = [
  'US',
  'AL',
  'DZ',
  'AO',
  'AR',
  'AM',
  'AU',
  'AT',
  'AZ',
  'BH',
  'BD',
  'BB',
  'BE',
  'BJ',
  'BO',
  'BA',
  'BR',
  'BG',
  'BF',
  'KH',
  'CM',
  'CA',
  'KY',
  'CL',
  'CN',
  'CO',
  'CR',
  'CI',
  'HR',
  'CY',
  'CZ',
  'DK',
  'DO',
  'EC',
  'EG',
  'SV',
  'EE',
  'FI',
  'FR',
  'GE',
  'DE',
  'GH',
  'GR',
  'GD',
  'GT',
  'HN',
  'HK',
  'HU',
  'IS',
  'IN',
  'ID',
  'IE',
  'IL',
  'IT',
  'JM',
  'JP',
  'JO',
  'KZ',
  'KE',
  'KR',
  'XK',
  'KW',
  'KG',
  'LV',
  'LT',
  'LU',
  'MK',
  'MY',
  'MT',
  'MX',
  'MD',
  'ME',
  'MA',
  'MM',
  'NL',
  'NZ',
  'NO',
  'PK',
  'PA',
  'PY',
  'PE',
  'PH',
  'PL',
  'PT',
  'PR',
  'QA',
  'RO',
  'RU',
  'RS',
  'SC',
  'SG',
  'SK',
  'ES',
  'LK',
  'SD',
  'SE',
  'CH',
  'TW',
  'TH',
  'TT',
  'TN',
  'TR',
  'UA',
  'GB',
  'UY',
  'UZ',
  'VE',
  'VN',
  'VI',
  'ZA',
  'ZW',
] as const;

/**
 * https://telnyx.slack.com/archives/C0224C9EB6K/p1676639085890299?thread_ts=1676575325.783519&cid=C0224C9EB6K
 * https://telnyx.slack.com/archives/C0224C9EB6K/p1718289570119469
 * Messaging specific countries with local numbers and alphanumeric
 */
export const SUPPORTED_COUNTRIES_ALPHANUMERIC_AND_LOCAL_NUMBERS: SupportedCountry[] = [
  'AU',
  'BE',
  'BR',
  'CA',
  'CZ',
  'DK',
  'FI',
  'NL',
  'PL',
  'PR',
  'RO',
  'SE',
  'TH',
  'GB',
  'US',
  'VI',
];

export const MOST_ACCESSED_COUNTRIES: SupportedCountry[] = ['US', 'CA', 'GB', 'DE', 'FR', 'ES'];

export const DEFAULT_COUNTRY_ALPHA2: SupportedCountry = 'US';
export const SECONDARY_COUNTRY_ALPHA2: SupportedCountry = 'CA';

export const EXCLUDED_COUNTRIES_LOCALES: Record<string, SupportedCountry[]> = {
  // Exclude India from metatags only in /pricing/numbers
  // This is a request from this ticket: https://telnyx.atlassian.net/browse/DOTCOM-2331
  '/pricing/numbers': ['IN'],
  '/pricing/elastic-sip': ['ME'],
  '/pricing/iot-data-plans': ['DE'],
};
