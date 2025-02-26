import type { Country } from './countries/types';
export type { Country };
import type { SupportedCountry } from 'lib/Pricing/@types';
import allCountries from './countries/allCountries.json';
import {
  MOST_ACCESSED_COUNTRIES,
  SUPPORTED_COUNTRIES,
  SUPPORTED_COUNTRIES_ALPHANUMERIC_AND_LOCAL_NUMBERS,
  DEFAULT_COUNTRY_ALPHA2,
  EXCLUDED_COUNTRIES_LOCALES,
} from './countries/constants';
import { customCountries, type CustomRegions } from './countries/customCountries';

const normalize = (str?: string) => str?.toLowerCase() || '';

export const CountriesDB: Country[] = allCountries.filter((country) =>
  SUPPORTED_COUNTRIES.map(normalize).includes(normalize(country.alpha2))
);

export const getMostAccessedCountries = () => {
  return CountriesDB.filter(({ alpha2 }) => MOST_ACCESSED_COUNTRIES.map(normalize).includes(normalize(alpha2)));
};

export const getCountryByName = (name: string) =>
  allCountries.find((country) => {
    const countryName = normalize(country.name);
    const googleName = normalize(country.googleName);
    const paramName = normalize(name);
    return countryName === paramName || googleName?.includes(paramName);
  });

export const getCountryByAlpha2 = (alpha2: string) => {
  const isCustomCountry = Object.keys(customCountries).includes(alpha2);
  if (isCustomCountry) return customCountries[alpha2 as CustomRegions];
  return allCountries.find((country) => normalize(country.alpha2) === normalize(alpha2));
};

export const DEFAULT_COUNTRY = CountriesDB.find(
  ({ alpha2 }) => normalize(alpha2) === normalize(DEFAULT_COUNTRY_ALPHA2)
);

export const generateCountryItems = (list: Country[], valuePropsName: keyof Country = 'alpha2') => {
  return list.map((country) => {
    const value = String(country[valuePropsName]);
    return {
      name: country.name,
      value,
    };
  });
};

export const generateCountryListWithLink = (
  url: string,
  options: { countryList?: Country[]; useMostPopular?: boolean }
) => {
  const { countryList = CountriesDB } = options;
  const generateCountryItemsWithHref = (list: Country[]) => {
    return list.map(({ name, alpha2, metatagAlpha2, slug }) => {
      const slugLowerCased = slug?.toLocaleLowerCase();
      const alpha2LowerCased = alpha2.toLocaleLowerCase();
      const locale = slugLowerCased || alpha2LowerCased;
      const href = alpha2LowerCased === DEFAULT_COUNTRY?.alpha2.toLocaleLowerCase() ? url : `${url}/${locale}`;
      return {
        name: name,
        value: alpha2LowerCased,
        href,
        metatagAlpha2,
      };
    });
  };
  const isExcludedCountry = ({ alpha2 }: Country) =>
    !(EXCLUDED_COUNTRIES_LOCALES[url] || []).includes(alpha2.toUpperCase() as SupportedCountry);

  const countries = generateCountryItemsWithHref(countryList.filter(isExcludedCountry));
  const popularCountries = generateCountryItemsWithHref(getMostAccessedCountries().filter(isExcludedCountry));
  const globalCoverageCountries = generateCountryItemsWithHref(
    countryList.filter(
      ({ alpha2, slug }) => customCountries[alpha2 as CustomRegions] || customCountries[slug as CustomRegions]
    )
  );

  const otherCountries = countries
    // remove countries from other list
    .filter(
      ({ name }) =>
        !popularCountries.find((country) => country.name === name) &&
        !globalCoverageCountries.find((country) => country.name === name)
    );

  const list = [];
  if (globalCoverageCountries.length > 0)
    list.push({ name: 'Global Coverage', value: 'global-coverage', items: globalCoverageCountries });

  list.push({ name: 'Most popular', value: 'most popular', items: popularCountries });

  if (otherCountries.length > 1)
    list.push({
      name: 'Other countries',
      value: 'other countries',
      items: otherCountries,
    });

  return list;
};

/**
 * https://telnyx.slack.com/archives/C0224C9EB6K/p1676639085890299?thread_ts=1676575325.783519&cid=C0224C9EB6K
 * Messaging specific countries that with local numbers and alphanumeric
 */
export const countriesWithAlphanumericAndLocalNumbers = SUPPORTED_COUNTRIES_ALPHANUMERIC_AND_LOCAL_NUMBERS.map(
  (country) => CountriesDB.find(({ alpha2 }) => normalize(alpha2) === normalize(country))
);
