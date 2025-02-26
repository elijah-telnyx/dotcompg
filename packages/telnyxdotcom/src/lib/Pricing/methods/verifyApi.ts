import * as CC from 'lib/Pricing/cost_codes';
import type * as T from 'lib/Pricing/@types';
import Api from 'lib/Api';

import { routes } from 'utils/routes';
import { getTablesDataByCurrency, currencyFormatTo } from 'lib/Pricing/utils';
import { fetchPrice, fetchExchangeRates } from 'lib/Pricing/api';
import { DEFAULT_CURRENCY_CODE } from 'utils/currencies/constants';
import { PRICING_CURRENCIES } from '../currencies';

export const fetchVerifyApiPricing = async ({ currency = DEFAULT_CURRENCY_CODE }: T.PricePageFetchParams = {}): Promise<
  T.TablesSectionProps['data']
> =>
  Api.all([
    fetchPrice({
      cost_codes: [CC.VERIFY_CONVERSION],
      currency,
    }),
    fetchExchangeRates({ currency, targetCurrencies: PRICING_CURRENCIES['verify-api'] }),
  ]).then(([verifyData, exchangeRateData]) => {
    const conversion = verifyData[CC.VERIFY_CONVERSION];

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
                  value: 'Use Verify API via SMS',
                },
                data: {
                  value: `${formatToCurrency(conversion.amount)} per successful verification + [SMS API pricing](${
                    routes.pricing.messaging
                  })`,
                },
              },
              {
                label: {
                  value: 'Use Verify API via Voice call',
                },
                data: {
                  value: `${formatToCurrency(conversion.amount)} per successful verification + [Voice API pricing](${
                    routes.pricing.callControl
                  })`,
                },
              },
              {
                label: {
                  value: 'Use Verify API via Flash call',
                },
                data: {
                  value: `${formatToCurrency(conversion.amount)} per successful verification + [Flash pricing](${
                    routes.pricing.callControl
                  })`,
                },
              },
            ],
          },
        ];
      },
      footer() {
        [
          {
            value: 'The Telnyx verification cost is only billed for successful verifications.',
          },
        ];
      },
    };

    return getTablesDataByCurrency(PRICING_CURRENCIES['verify-api'], generate.tables);
  });
