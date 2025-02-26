import Api from 'lib/Api';
import * as CC from 'lib/Pricing/cost_codes';
import type * as T from 'lib/Pricing/@types';

import { fetchPrice, fetchExchangeRates } from 'lib/Pricing/api';
import { PRICING_CURRENCIES } from '../currencies';
import { DEFAULT_CURRENCY_CODE } from 'utils/currencies/constants';
import { getTablesDataByCurrency, currencyFormatTo } from 'lib/Pricing/utils';

export const fetchStoragePricing = async ({ currency = DEFAULT_CURRENCY_CODE }: T.PricePageFetchParams = {}): Promise<
  T.TablesSectionProps['data']
> =>
  Api.all([
    fetchPrice({
      cost_codes: [CC.CLOUD_STORAGE, CC.CLOUD_STORAGE_STATE_CHANGE_OPERATIONS, CC.CLOUD_STORAGE_READ_OPERATIONS],
      currency,
    }),
    fetchExchangeRates({ currency, targetCurrencies: PRICING_CURRENCIES.storage }),
  ]).then(([lookupData, exchangeRateData]) => {
    const storage = lookupData[CC.CLOUD_STORAGE];
    const stateChangeOperations = lookupData[CC.CLOUD_STORAGE_STATE_CHANGE_OPERATIONS];
    const stateReadOperations = lookupData[CC.CLOUD_STORAGE_READ_OPERATIONS];

    const generate = {
      tables(targetCurrency: T.SupportedCurrency): T.TablesSectionTableProps<2>[] {
        const formatToCurrency = currencyFormatTo(targetCurrency, exchangeRateData.rates[targetCurrency]);
        return [
          {
            columns: 2,
            caption: 'Services',
            body: [
              {
                label: {
                  value: 'Storage',
                },
                data: {
                  value: `${formatToCurrency(storage.tiers[1].amount)} per GiB (billed monthly)`,
                },
              },
              {
                label: {
                  value: 'Egress fees',
                },
                data: {
                  value: 'None',
                },
              },
              {
                label: {
                  value: 'State-change operations',
                  tooltip: {
                    id: 'state-change-operations-info',
                    label: 'State-change operations info',
                    value: 'Class A operations (PUT, COPY, POST, LIST)',
                  },
                },
                data: {
                  value: `${formatToCurrency(stateChangeOperations.tiers[1].amount)} per million`,
                },
              },
              {
                label: {
                  value: 'State-read operations',
                  tooltip: {
                    id: 'state-read-operations-info',
                    label: 'State-read operations info',
                    value: 'Class B operations (all others including GET, SELECT)',
                  },
                },
                data: {
                  value: `${formatToCurrency(stateReadOperations.tiers[2].amount)} per million`,
                },
              },
            ],
          },
        ];
      },
    };

    return getTablesDataByCurrency(PRICING_CURRENCIES['storage'], generate.tables);
  });
