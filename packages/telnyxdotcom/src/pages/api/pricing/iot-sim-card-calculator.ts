import { type CostCodes } from 'lib/Pricing/@types';
import * as CC from 'lib/Pricing/cost_codes';
import { fetchPrice } from 'lib/Pricing/api';
import { DEFAULT_CURRENCY_CODE } from 'utils/currencies/constants';
import type { NextApiHandler } from 'next';

interface IoTSIMCardDataUsageTier {
  amount: string;
  max: number | null;
  min: number | null;
}

export interface IoTSIMCardCalculatorApiResponse {
  status: 'ok';
  data: {
    'WIRELESS-IP-MRC': {
      amount: string;
    };
    'WIRELESS-SIM-MRC': {
      amount: string;
    };
    [key: `WIRELESS-ZONE-${number}-USAGE`]: {
      tiers: IoTSIMCardDataUsageTier[];
    };
  };
}

const handler: NextApiHandler<IoTSIMCardCalculatorApiResponse> = async (_, res) => {
  const costCodes: CostCodes[] = [
    CC.WIRELESS_IP_MRC,
    CC.WIRELESS_SIM_MRC,
    CC.WIRELESS_ZONE_1_USAGE,
    CC.WIRELESS_ZONE_2_USAGE,
    CC.WIRELESS_ZONE_3_USAGE,
    CC.WIRELESS_ZONE_4_USAGE,
    CC.WIRELESS_ZONE_5_USAGE,
    CC.WIRELESS_ZONE_6_USAGE,
    CC.WIRELESS_ZONE_7_USAGE,
    CC.WIRELESS_ZONE_8_USAGE,
    CC.WIRELESS_ZONE_9_USAGE,
  ];

  const data = await fetchPrice({
    cost_codes: costCodes,
    currency: DEFAULT_CURRENCY_CODE,
  });

  res.status(200).json({
    status: 'ok',
    data: costCodes.reduce(
      (acc, costCode) => ({ ...acc, [costCode]: data[costCode] }),
      {} as IoTSIMCardCalculatorApiResponse['data']
    ),
  });
};

export default handler;
