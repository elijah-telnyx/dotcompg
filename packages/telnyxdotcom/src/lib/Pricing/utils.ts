import bytes from 'bytes';
import type { TableBodyItem } from 'ui/components/TablesSection';
import type * as T from './@types';
import { currencyFormatter } from 'utils/number';
import { DEFAULT_COUNTRY_ALPHA2 } from 'utils/countries/constants';

export const generateHead = (head: { label: string; category?: boolean }[]): T.TablesSectionTableProps['head'] =>
  head.map(({ label, category = true }) => ({
    label: {
      value: label,
      category,
    },
  }));

export const generateBody = <C = T.TablesSectionTableProps['columns']>(
  body: {
    label: string | TableBodyItem['label'];
    typographyType?: TableBodyItem['label']['typographyType'];
    value: TableBodyItem<C>['data']['value'];
  }[]
): TableBodyItem<C>[] =>
  body.filter(Boolean).map(({ label, typographyType, value }) => {
    if (typeof label === 'string') {
      return {
        label: {
          value: label,
          typographyType,
        },
        data: {
          value,
          typographyType,
        },
      };
    }

    return {
      label,
      data: {
        value,
      },
    };
  });

export const currencyFormatTo =
  (currency: T.SupportedCurrency, rate?: string) => (amount: number | string, options?: Intl.NumberFormatOptions) =>
    currencyFormatter({ ...options, amount, currency, rate });

export const getTablesDataByCurrency = (
  currencies: T.SupportedCurrency[],
  generateTablesByCurrency: (targetCurrency: T.SupportedCurrency) => T.TablesSectionProps['data'][number]
): T.GetTablesDataByCurrencyResponse =>
  currencies.reduce(
    (acc, currency) => ({
      ...acc,
      [currency]: generateTablesByCurrency(currency),
    }),
    {} as T.GetTablesDataByCurrencyResponse
  );

export const formatDataRange = (min: number, max: number | null): string => {
  if (max === null) {
    return `${bytes(min)}+`;
  }

  if (min === 0) {
    return `Up to ${bytes(max)}`;
  }

  return `${bytes(min)} - ${bytes(max)}`;
};

const localPrefix = (costCode: T.CostCodes) => `LC-${costCode}` as T.CostCodes;

export const addCountryToCostCode =
  (alpha2: string) =>
  (costCode: T.CostCodes, prefixLocal = false) => {
    const countryCode = alpha2.toUpperCase();
    if (countryCode === DEFAULT_COUNTRY_ALPHA2) return costCode as T.CostCodes;
    const CC = prefixLocal ? localPrefix(costCode) : costCode;
    return `${countryCode}-${CC}` as T.CostCodes;
  };
