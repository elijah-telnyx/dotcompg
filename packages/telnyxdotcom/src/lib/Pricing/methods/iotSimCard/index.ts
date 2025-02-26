import { fetchMobileNetworkOperators } from '../../api';
import Api from 'lib/Api';
import * as CC from 'lib/Pricing/cost_codes';
import type * as T from 'lib/Pricing/@types';

import { currencyFormatTo, generateBody, generateHead, getTablesDataByCurrency } from 'lib/Pricing/utils';

import { fetchPrice, fetchExchangeRates } from 'lib/Pricing/api';
import { DEFAULT_COUNTRY_ALPHA2 } from 'utils/countries/constants';
import { DEFAULT_CURRENCY_CODE } from 'utils/currencies/constants';
import { PRICING_CURRENCIES } from '../../currencies';
import generateDataUsageTable from './generateDataUsageTable';
import { getCountryByAlpha2, type Country } from 'utils/countries.data';
import { generateNetworkAccessTable } from './generateNetworkAccessTable';
import { customCountries } from 'utils/countries/customCountries';

type PricePageFetchParams = T.PricePageFetchParams;

const MAX_PAGE_SIZE = 250; // magic number typically used by Telnyx APIs paginated endpoints

export const fetchIOTSIMCardPricing = async ({
  currency = DEFAULT_CURRENCY_CODE,
  countryCode = DEFAULT_COUNTRY_ALPHA2,
  countryName = 'United States',
}: PricePageFetchParams = {}): Promise<T.TablesSectionProps['data']> => {
  return Api.all([
    fetchPrice({
      cost_codes: [
        CC.WIRELESS_SIM_PURCHASE,
        CC.WIRELESS_ESIM_PURCHASE,
        CC.WIRELESS_SIM_MRC,
        CC.WIRELESS_SIM_FREE_SHIPMENT,
        CC.WIRELESS_SIM_SHIPMENT,
        CC.WIRELESS_ZONE_1_USAGE,
        CC.WIRELESS_ZONE_2_USAGE,
        CC.WIRELESS_ZONE_3_USAGE,
        CC.WIRELESS_ZONE_4_USAGE,
        CC.WIRELESS_ZONE_5_USAGE,
        CC.WIRELESS_ZONE_6_USAGE,
        CC.WIRELESS_ZONE_7_USAGE,
        CC.WIRELESS_ZONE_8_USAGE,
        CC.WIRELESS_ZONE_9_USAGE,
      ],
      currency,
    }),
    fetchExchangeRates({ currency, targetCurrencies: PRICING_CURRENCIES['fax'] }),
    fetchMobileNetworkOperators({
      filter: { country_code: countryCode.toLocaleUpperCase(), blocked: false },
      page_size: MAX_PAGE_SIZE,
    }),
  ]).then(([pricingData, exchangeRateData, { entries: networkOperators }]) => {
    const countryZone = String(networkOperators[0].zone);

    const generate = {
      tables(targetCurrency: T.SupportedCurrency): T.TablesSectionTableProps<2>[] {
        const formatToCurrency = currencyFormatTo(targetCurrency, exchangeRateData.rates[targetCurrency]);

        const servicesTable: T.TablesSectionTableProps<2> = {
          columns: 2,
          caption: 'Services',
          body: [
            {
              label: {
                value: 'SIM card',
              },
              data: {
                value: `${formatToCurrency(pricingData[CC.WIRELESS_SIM_PURCHASE].amount)} per SIM card`,
              },
            },
            {
              label: {
                value: 'eSIM',
              },
              data: {
                value: `${formatToCurrency(pricingData[CC.WIRELESS_ESIM_PURCHASE].amount, {
                  maximumSignificantDigits: undefined,
                })} per eSIM`,
              },
            },
            {
              label: {
                value: 'Monthly Recurring Charge',
              },
              data: {
                value: `${formatToCurrency(
                  pricingData[CC.WIRELESS_SIM_MRC].amount
                )} per month + [data usage](#data-usage)`,
              },
            },
            {
              label: {
                value: 'Shipping',
              },
              data: {
                value: `Free within the U.S. mainland, ${formatToCurrency(
                  pricingData[CC.WIRELESS_SIM_SHIPMENT].amount
                )} everywhere else`,
              },
            },
          ],
        };

        const tables: T.TablesSectionTableProps[] = [servicesTable];

        if (countryZone) {
          const dataUsageTable = generateDataUsageTable({ formatToCurrency, pricingData, countryZone, countryName });
          tables.push(dataUsageTable);
        }

        const optionalFeaturesTable: T.TablesSectionTableProps<3> = {
          columns: 3,
          caption: 'Optional feature - Private Wireless Gateway',
          head: generateHead([
            { label: 'Number of SIMs attached to the Private Wireless Gateway' },
            { label: 'Monthly Recurring Charge per Gateway' },
            { label: 'Monthly Recurring Charge per attached SIM' },
          ]),
          body: generateBody<3>(
            Object.entries({
              '0 - 100': [100, 0],
              '101 - 1000': [100, 0.6],
              '1001 - 3000': [100, 0.54],
              '3001 - 5000': [100, 0.48],
              '5001 - 10,000': [50, 0.36],
              '>10,001': [50, 0.3],
            }).map(([label, value]) => ({
              label: `${label} SIMs`,
              value: value.map((amount) => formatToCurrency(amount)),
            }))
          ),
        };
        tables.push(optionalFeaturesTable);

        if (networkOperators?.length > 0) {
          tables.push(generateNetworkAccessTable({ countryName, networkOperators }));
        }

        return tables;
      },
    };

    return getTablesDataByCurrency(PRICING_CURRENCIES['iot-data-plans'], generate.tables);
  });
};

/**
 * DOTCOM-3508: this method was only used in `/pricing/[slug]/[locale] so far and disabled cause fetching this for all countries is unstable for this endpoint
 * passing `abortOnTimeout: true` needed if this gets used again
 */
export const fetchIoTSupportedCountries = async (): Promise<Country[]> => {
  return fetchMobileNetworkOperators({ page_size: 1, filter: { blocked: false } }).then(({ total_entries }) => {
    return fetchMobileNetworkOperators({ page_size: total_entries, filter: { blocked: false } }).then(({ entries }) => {
      const entriesToCountries = (entriesData: typeof entries): Country[] => {
        return entriesData.reduce((countries, current) => {
          const countryCode = current.country_code;
          if (!countries.some((country) => country?.alpha2.toLowerCase() === countryCode.toLowerCase())) {
            const newCountry = getCountryByAlpha2(countryCode);
            if (newCountry) return countries.concat(newCountry);
          }
          return countries;
        }, [] as Country[]);
      };

      const countryList = entriesToCountries(entries).sort((a, b) => (a.name > b.name ? 1 : -1));
      return [customCountries['satellite-coverage'], ...countryList];
    });
  });
};
