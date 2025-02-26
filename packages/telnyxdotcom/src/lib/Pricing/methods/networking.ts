import * as CC from 'lib/Pricing/cost_codes';
import type * as T from 'lib/Pricing/@types';
import Api from 'lib/Api';

import { currencyFormatTo, getTablesDataByCurrency, generateBody, generateHead } from 'lib/Pricing/utils';
import { fetchPrice, fetchExchangeRates } from 'lib/Pricing/api';
import { DEFAULT_CURRENCY_CODE } from 'utils/currencies/constants';
import { PRICING_CURRENCIES } from '../currencies';

export const fetchNetworkingPricing = async ({
  currency = DEFAULT_CURRENCY_CODE,
}: T.PricePageFetchParams = {}): Promise<T.TablesSectionProps['data']> =>
  Api.all([
    fetchPrice({
      cost_codes: [
        CC.TENA_VXC_EQUINIX_AWS_50_MRC,
        CC.TENA_VXC_EQUINIX_AZURE_50_MRC,
        CC.TENA_VXC_EQUINIX_GC_50_MRC,
        CC.TENA_VXC_EQUINIX_AWS_100_MRC,
        CC.TENA_VXC_EQUINIX_AZURE_100_MRC,
        CC.TENA_VXC_EQUINIX_GC_100_MRC,
        CC.TENA_VXC_EQUINIX_AWS_200_MRC,
        CC.TENA_VXC_EQUINIX_AZURE_200_MRC,
        CC.TENA_VXC_EQUINIX_GC_200_MRC,
        CC.TENA_VXC_EQUINIX_AWS_300_MRC,
        CC.TENA_VXC_EQUINIX_AZURE_300_MRC,
        CC.TENA_VXC_EQUINIX_GC_300_MRC,
        CC.TENA_VXC_EQUINIX_AWS_400_MRC,
        CC.TENA_VXC_EQUINIX_AZURE_400_MRC,
        CC.TENA_VXC_EQUINIX_GC_400_MRC,
        CC.TENA_VXC_EQUINIX_AWS_500_MRC,
        CC.TENA_VXC_EQUINIX_AZURE_500_MRC,
        CC.TENA_VXC_EQUINIX_GC_500_MRC,
        CC.TENA_VXC_EQUINIX_AZURE_1000_MRC,
        CC.TENA_VXC_EQUINIX_GC_1000_MRC,
      ],
      currency,
    }),
    fetchExchangeRates({ currency, targetCurrencies: PRICING_CURRENCIES['networking'] }),
  ]).then(([networkingData, exchangeRateData]) => {
    const generate = {
      tables(targetCurrency: T.SupportedCurrency): T.TablesSectionTableProps<4>[] {
        const formatToCurrency = currencyFormatTo(targetCurrency, exchangeRateData.rates[targetCurrency]);

        return [
          {
            id: 'virtual-cross-connects-pricing-table',
            columns: 4,
            caption: 'Virtual cross connects',
            head: generateHead([
              { label: 'Bandwidth Connection Speed', category: true },
              { label: 'AWS Per Month', category: true },
              { label: 'Microsoft Azure Per Month', category: true },
              { label: 'Google Cloud Per Month', category: true },
            ]),
            body: generateBody<4>([
              {
                label: '50 MB per second',
                value: [
                  formatToCurrency(networkingData[CC.TENA_VXC_EQUINIX_AWS_50_MRC].amount),
                  formatToCurrency(networkingData[CC.TENA_VXC_EQUINIX_AZURE_50_MRC].amount),
                  formatToCurrency(networkingData[CC.TENA_VXC_EQUINIX_GC_50_MRC].amount),
                ],
              },
              {
                label: '100 MB per second',
                value: [
                  formatToCurrency(networkingData[CC.TENA_VXC_EQUINIX_AWS_100_MRC].amount),
                  formatToCurrency(networkingData[CC.TENA_VXC_EQUINIX_AZURE_100_MRC].amount),
                  formatToCurrency(networkingData[CC.TENA_VXC_EQUINIX_GC_100_MRC].amount),
                ],
              },
              {
                label: '200 MB per second',
                value: [
                  formatToCurrency(networkingData[CC.TENA_VXC_EQUINIX_AWS_200_MRC].amount),
                  formatToCurrency(networkingData[CC.TENA_VXC_EQUINIX_AZURE_200_MRC].amount),
                  formatToCurrency(networkingData[CC.TENA_VXC_EQUINIX_GC_200_MRC].amount),
                ],
              },
              {
                label: '300 MB per second',
                value: [
                  formatToCurrency(networkingData[CC.TENA_VXC_EQUINIX_AWS_300_MRC].amount),
                  formatToCurrency(networkingData[CC.TENA_VXC_EQUINIX_AZURE_300_MRC].amount),
                  formatToCurrency(networkingData[CC.TENA_VXC_EQUINIX_GC_300_MRC].amount),
                ],
              },
              {
                label: '400 MB per second',
                value: [
                  formatToCurrency(networkingData[CC.TENA_VXC_EQUINIX_AWS_400_MRC].amount),
                  formatToCurrency(networkingData[CC.TENA_VXC_EQUINIX_AZURE_400_MRC].amount),
                  formatToCurrency(networkingData[CC.TENA_VXC_EQUINIX_GC_400_MRC].amount),
                ],
              },
              {
                label: '500 MB per second',
                value: [
                  formatToCurrency(networkingData[CC.TENA_VXC_EQUINIX_AWS_500_MRC].amount),
                  formatToCurrency(networkingData[CC.TENA_VXC_EQUINIX_AZURE_500_MRC].amount),
                  formatToCurrency(networkingData[CC.TENA_VXC_EQUINIX_GC_500_MRC].amount),
                ],
              },
              {
                label: '1 GB per second',
                value: [
                  'Not available',
                  formatToCurrency(networkingData[CC.TENA_VXC_EQUINIX_AZURE_1000_MRC].amount),
                  formatToCurrency(networkingData[CC.TENA_VXC_EQUINIX_GC_1000_MRC].amount),
                ],
              },
            ]),
          },
        ];
      },
    };

    return getTablesDataByCurrency(PRICING_CURRENCIES['networking'], generate.tables);
  });
