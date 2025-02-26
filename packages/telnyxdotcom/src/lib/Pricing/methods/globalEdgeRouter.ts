import * as CC from 'lib/Pricing/cost_codes';

import * as T from '../@types';
import { fetchPrice } from '../api';
import { generateHead } from '../utils';
import { generateBody } from '../utils';
import { currencyFormatTo } from '../utils';
import { DEFAULT_CURRENCY_CODE } from 'utils/currencies/constants';

export const fetchGlobalEdgeRouter = async ({ currency = DEFAULT_CURRENCY_CODE }: T.PricePageFetchParams = {}): Promise<
  T.TablesSectionProps['data']
> => {
  return fetchPrice({
    services: ['ip-addresses'],
    cost_codes: [
      CC.GLOBAL_IP_10MBPS_MRC,
      CC.GLOBAL_IP_50MBPS_MRC,
      CC.GLOBAL_IP_100MBPS_MRC,
      CC.GLOBAL_IP_200MBPS_MRC,
      CC.GLOBAL_IP_500MBPS_MRC,
      CC.GLOBAL_IP_1GBPS_MRC,
    ],
    currency,
  }).then((bandwidth) => {
    const formatToCurrency = currencyFormatTo(currency);

    return {
      [currency]: [
        {
          columns: 2,
          caption: 'Global IP',
          head: generateHead([{ label: 'Bandwidth Connection Speed' }, { label: 'Cost per month' }]),
          body: generateBody(
            [
              { size: '10 Mbps', ...bandwidth[CC.GLOBAL_IP_10MBPS_MRC] },
              { size: '50 Mbps', ...bandwidth[CC.GLOBAL_IP_50MBPS_MRC] },
              { size: '100 Mbps', ...bandwidth[CC.GLOBAL_IP_100MBPS_MRC] },
              { size: '200 Mbps', ...bandwidth[CC.GLOBAL_IP_200MBPS_MRC] },
              { size: '500 Mbps', ...bandwidth[CC.GLOBAL_IP_500MBPS_MRC] },
              { size: '1 Gbps', ...bandwidth[CC.GLOBAL_IP_1GBPS_MRC] },
            ].map((bandwidth) => ({
              label: bandwidth.size,
              value: formatToCurrency(bandwidth.amount),
            }))
          ),
        },
      ],
    };
  });
};
