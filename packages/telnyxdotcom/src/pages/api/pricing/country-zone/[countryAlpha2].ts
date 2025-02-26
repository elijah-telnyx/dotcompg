import { fetchMobileNetworkOperators } from 'lib/Pricing/api';
import type { SupportedCountry } from 'lib/Pricing/@types';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { countryAlpha2 } = req.query as { countryAlpha2: SupportedCountry };
  const data = await fetchMobileNetworkOperators({
    filter: { country_code: countryAlpha2.toUpperCase(), blocked: false },
  });

  res.status(200).json({
    status: 'ok',
    data: { zone: data.entries[0].zone },
  });
};

export default handler;
