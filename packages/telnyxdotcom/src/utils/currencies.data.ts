import allCurrencies from './currencies/allCurrencies.json';
import { SUPPORTED_CURRENCIES, DEFAULT_CURRENCY_CODE } from './currencies/constants';

const normalize = (str?: string) => str?.toLowerCase();

export const CurrenciesDB = allCurrencies.filter((currency) =>
  SUPPORTED_CURRENCIES.map(normalize).includes(normalize(currency.code))
);

export const getCurrencyByCode = (code: string) =>
  CurrenciesDB.find((currency) => normalize(currency.code) === normalize(code));

export const DEFAULT_CURRENCY = allCurrencies.find(({ code }) => normalize(code) === normalize(DEFAULT_CURRENCY_CODE));

export const generateCurrencyListFromCodes = (currencyList: (typeof SUPPORTED_CURRENCIES)[number][]) =>
  currencyList.map((code) => ({
    name: code,
    value: code,
  }));
