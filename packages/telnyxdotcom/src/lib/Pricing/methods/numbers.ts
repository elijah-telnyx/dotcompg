import * as CC from 'lib/Pricing/cost_codes';
import type * as T from 'lib/Pricing/@types';
import Api from 'lib/Api';

import {
  generateBody,
  generateHead,
  getTablesDataByCurrency,
  currencyFormatTo,
  addCountryToCostCode,
} from 'lib/Pricing/utils';
import { fetchPrice, fetchExchangeRates } from 'lib/Pricing/api';

import { DEFAULT_COUNTRY_ALPHA2, SECONDARY_COUNTRY_ALPHA2 } from 'utils/countries/constants';
import { PRICING_CURRENCIES } from '../currencies';
import { DEFAULT_CURRENCY_CODE } from 'utils/currencies/constants';

const getCountryCodes = (countryCode: string): Record<string, T.CostCodes> => {
  const prefix = addCountryToCostCode(countryCode);
  switch (countryCode.toUpperCase()) {
    case DEFAULT_COUNTRY_ALPHA2:
      return { LOCAL: CC.DID_RATE0_MRC, TOLL_FREE: CC.TF_RATE0_MRC, EXISTING_NUMBER: CC.SMS_MRC };
    case 'CA':
      return { LOCAL: prefix(CC.DID_RATE0_MRC), TOLL_FREE: prefix(CC.TF_RATE0_MRC), EXISTING_NUMBER: CC.SMS_MRC };

    default:
      return {
        LOCAL: prefix(CC.LOCAL_RATE0_MRC),
        MOBILE: prefix(CC.MOBILE_RATE0_MRC),
        NATIONAL: prefix(CC.NATIONAL_RATE0_MRC),
        TOLL_FREE: prefix(CC.TF_RATE0_MRC),
      };
  }
};

export const fetchNumbersPricing = async ({
  countryCode = DEFAULT_COUNTRY_ALPHA2,
  currency = DEFAULT_CURRENCY_CODE,
}: T.PricePageFetchParams = {}): Promise<T.TablesSectionProps['data']> => {
  const { LOCAL, TOLL_FREE, EXISTING_NUMBER, MOBILE, NATIONAL } = getCountryCodes(countryCode);
  return Api.all([
    fetchPrice({
      cost_codes: [LOCAL, TOLL_FREE, EXISTING_NUMBER, MOBILE, NATIONAL].filter((cc) => Boolean(cc)) as T.CostCodes[],
      currency,
    }),
    fetchExchangeRates({ currency, targetCurrencies: PRICING_CURRENCIES['numbers'] }),
  ]).then(([numbersData, exchangeRateData]) => {
    const isUSorCA =
      countryCode.toUpperCase() === DEFAULT_COUNTRY_ALPHA2 || countryCode.toUpperCase() === SECONDARY_COUNTRY_ALPHA2;

    const generate = {
      footer() {
        const data = [];
        data.push({
          value: '\\* An additional charge of $0.10 per month applies to add SMS and MMS capabilities to a number.',
        });
        if (isUSorCA) {
          data.push({
            value: `If you purchase more than 50 local or toll-free numbers per month, you’ll automatically receive a discount.`,
            toggleButton: {
              label: {
                close: 'View Pricing',
                open: 'Hide Pricing',
              },
              innerTableId: 'volume-discounted-number-pricing',
            },
          });
        }
        return {
          id: 'number-pricing-footer',
          data,
        };
      },
      tables(targetCurrency: T.SupportedCurrency): T.TablesSectionTableProps<2>[] {
        const bodyData = [];
        const formatToCurrency = currencyFormatTo(targetCurrency, exchangeRateData.rates[targetCurrency]);

        const localNumbers = numbersData[LOCAL];
        const tollFreeNumbers = numbersData[TOLL_FREE];
        const mobileNumbers = numbersData[MOBILE];
        const nationalNumbers = numbersData[NATIONAL];

        if (localNumbers) {
          bodyData.push({
            label: 'Local numbers',
            value: `From ${formatToCurrency(localNumbers.amount)} per month[*](#number-pricing-footer)`,
          });
        }
        if (tollFreeNumbers) {
          bodyData.push({
            label: 'Toll-free numbers',
            value: `From ${formatToCurrency(tollFreeNumbers.amount)} per month[*](#number-pricing-footer)`,
          });
        }
        if (mobileNumbers) {
          bodyData.push({
            label: 'Mobile numbers',
            value: `From ${formatToCurrency(mobileNumbers.amount)} per month[*](#number-pricing-footer)`,
          });
        }
        if (nationalNumbers) {
          bodyData.push({
            label: 'National numbers',
            value: `From ${formatToCurrency(nationalNumbers.amount)} per month[*](#number-pricing-footer)`,
          });
        }
        if (isUSorCA) {
          bodyData.push(
            {
              label: 'Short code numbers',
              value: `${formatToCurrency(1000)} per month`,
            },
            {
              label: 'Vanity short code numbers',
              value: `${formatToCurrency(2000)} per month`,
            },
            {
              label: 'Using an existing number',
              value: `${formatToCurrency(numbersData[EXISTING_NUMBER].amount)} per month`,
            }
          );
        }

        const getTierForLocalAndTF = (tier: 1 | 2 | 3 | 4) =>
          [localNumbers, tollFreeNumbers].map(({ tiers }) => `${formatToCurrency(tiers[tier].amount)} per month`);

        return [
          {
            columns: 2,
            caption: 'Number pricing',
            body: generateBody(bodyData),
            footer: generate.footer(),
            ...(isUSorCA && {
              innerTables: {
                containerId: 'volume-discounted-number-pricing',
                tables: [
                  {
                    id: 'volume-discounted-number-pricing-table',
                    columns: 3,
                    caption: 'Volume discounted number pricing',
                    head: generateHead([
                      { label: 'Quantity per month' },
                      { label: 'Local numbers' },
                      { label: 'Toll-free numbers' },
                    ]),
                    body: generateBody<3>([
                      {
                        label: 'Next 200 numbers',
                        value: getTierForLocalAndTF(1),
                      },
                      {
                        label: 'Next 750 numbers',
                        value: getTierForLocalAndTF(2),
                      },
                      {
                        label: 'Next 4k numbers',
                        value: getTierForLocalAndTF(3),
                      },
                      {
                        label: '5K+ numbers',
                        value: getTierForLocalAndTF(4),
                      },
                    ]),
                  },
                ],
              },
            }),
          },
        ];
      },
    };

    return getTablesDataByCurrency(PRICING_CURRENCIES['numbers'], generate.tables);
  });
};
