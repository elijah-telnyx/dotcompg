import Api from 'lib/Api';
import * as CC from 'lib/Pricing/cost_codes';
import type * as T from 'lib/Pricing/@types';

import { fetchPrice, fetchExchangeRates } from 'lib/Pricing/api';
import { getTablesDataByCurrency, currencyFormatTo } from 'lib/Pricing/utils';
import { DEFAULT_CURRENCY_CODE } from 'utils/currencies/constants';
import { PRICING_CURRENCIES } from '../currencies';

export const fetchNumberLookupPricing = async ({
  currency = DEFAULT_CURRENCY_CODE,
}: T.PricePageFetchParams = {}): Promise<T.TablesSectionProps['data']> =>
  Api.all([
    fetchPrice({
      cost_codes: [CC.LRN_DIPS, CC.MCC_MNC_DIPS, CC.CNAM_DIPS, CC.CNAM_MRC],
      currency,
    }),
    fetchExchangeRates({ currency, targetCurrencies: PRICING_CURRENCIES['number-lookup'] }),
  ]).then(([lookupData, exchangeRateData]) => {
    const lrn = lookupData[CC.LRN_DIPS];
    const mccmnc = lookupData[CC.MCC_MNC_DIPS];
    const inboundCnam = lookupData[CC.CNAM_MRC];
    const inboundCnamQuery = lookupData[CC.CNAM_DIPS];

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
                  value: 'Local Routing Number (LRN)',
                },
                data: {
                  value: `${formatToCurrency(lrn.amount)} per query`,
                },
              },
              {
                label: {
                  value: 'MCC/MNC',
                  tooltip: {
                    id: 'mcc-mnc-info',
                    label: 'MCC/MNC info',
                    value: 'Retrieves the mobile country codes/ mobile national codes',
                  },
                },
                data: {
                  value: `${formatToCurrency(mccmnc.amount)} per query`,
                },
              },
              {
                label: {
                  value: 'Inbound CNAM query',
                  tooltip: {
                    id: 'inbound-cnam-query-info',
                    label: 'Inbound CNAM query info',
                    value:
                      'Perform a one-time query to the CNAM database to find the caller ID name associated with any phone number',
                  },
                },
                data: {
                  value: `${formatToCurrency(inboundCnamQuery.amount)} per query`,
                },
              },
              {
                label: {
                  value: 'Inbound CNAM',
                  tooltip: {
                    id: 'inbound-cnam-info',
                    label: 'Inbound CNAM info',
                    value:
                      "Enable CNAM on your Telnyx phone number, so calls you receive from others will show the caller's ID",
                  },
                },
                data: {
                  value: `${formatToCurrency(inboundCnam.amount)} per number per month`,
                },
              },
              {
                label: {
                  value: 'Outbound CNAM listing',
                  tooltip: {
                    id: 'outbound-cnam-listing-info',
                    label: 'Outbound CNAM listing info',
                    value:
                      "Display a name associated with your phone number on the phone of whoever you're calling. Only available in the US and Canada",
                  },
                },
                data: {
                  value: 'Free',
                },
              },
            ],
          },
        ] as T.TablesSectionTableProps<2>[];
      },
    };

    return getTablesDataByCurrency(PRICING_CURRENCIES['number-lookup'], generate.tables);
  });
