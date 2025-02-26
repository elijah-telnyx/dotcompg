import * as CC from 'lib/Pricing/cost_codes';
import type * as T from 'lib/Pricing/@types';
import Api from 'lib/Api';

import { getTablesDataByCurrency, currencyFormatTo } from 'lib/Pricing/utils';
import { fetchPrice, fetchExchangeRates } from 'lib/Pricing/api';
import { PRICING_CURRENCIES } from '../currencies';
import { DEFAULT_CURRENCY_CODE } from 'utils/currencies/constants';

import { routes } from 'utils/routes';

export const fetchFaxApiPricing = async ({ currency = DEFAULT_CURRENCY_CODE }: T.PricePageFetchParams = {}): Promise<
  T.TablesSectionProps['data']
> =>
  Api.all([
    fetchPrice({
      cost_codes: [CC.FAX_API_PAGES_TERMINATION, CC.FAX_API_PAGES_ORIGINATION],
      currency,
    }),
    fetchExchangeRates({ currency, targetCurrencies: PRICING_CURRENCIES['fax'] }),
  ]).then(([faxData, exchangeRateData]) => {
    const send = faxData[CC.FAX_API_PAGES_ORIGINATION];
    const receive = faxData[CC.FAX_API_PAGES_TERMINATION];

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
                  value: 'Send a fax via API',
                },
                data: {
                  value: `${formatToCurrency(send.amount)} per page + [SIP Trunking](${
                    routes.pricing.elasticSip
                  }#pay-as-you-go) usage for transmission`,
                },
              },
              {
                label: {
                  value: 'Receive a fax via API',
                },
                data: {
                  value: `${formatToCurrency(receive.amount)} per page + [SIP Trunking](${
                    routes.pricing.elasticSip
                  }#pay-as-you-go) usage for transmission`,
                },
              },
            ],
          },
        ];
      },
    };

    return getTablesDataByCurrency(PRICING_CURRENCIES['fax'], generate.tables);
  });
