import type { CountryCode, PhoneNumber } from 'libphonenumber-js';
import parsePhoneNumber from 'libphonenumber-js';
import type { RegionInformation } from 'pages/api/available-numbers';
import { getRawThemeValue, theme } from 'ui/styles';

export const MAX_SEARCH_TIME = 1;
export const CTA_COPY = 'Search Numbers';
export const NUMBER_OF_ROWS = 4;
export const ROW_HEIGHT = 40;
export const ROW_PADDING_BLOCK = theme.space.small.value;
export const ROW_MAX_HEIGHT = NUMBER_OF_ROWS * (ROW_HEIGHT + getRawThemeValue(ROW_PADDING_BLOCK) * 2);

export const getFormattedNumber = (number: string, region: CountryCode) => {
  const parsedPhoneNumber: PhoneNumber | undefined = parsePhoneNumber(number, region);
  if (parsedPhoneNumber) {
    return parsedPhoneNumber.formatInternational();
  }
  return number;
};

export const formatCurrency = (amount: string) => Number(amount).toFixed(2);

// remove underscores and capitalize first letter of each word
export const formatNumType = (type: string) => {
  const tmp = type.replace('_', ' ').split(' ');
  return tmp.map((i) => i.charAt(0).toUpperCase() + i.slice(1)).join(' ');
};

export const getLocationFromRegion = (regionInformation: RegionInformation[]) => {
  const { location, state, country_code } = regionInformation.reduce(
    (regionObject, region) => {
      if (region.region_name) {
        regionObject[region.region_type] = region.region_name;
      }
      return regionObject;
    },
    { location: '', state: '', country_code: '', rate_center: '' }
  );

  return [location, state, country_code].filter((region) => region).join(', ');
};
