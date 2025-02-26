import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextApiHandler } from 'next';
import type { ProductFamily } from 'ui/components/NetworkMapSection/utils';
import type { NetworkMapFilterItemProps } from 'ui/components/NetworkMapSection/NetworkMapSection';
import type { NetworkMapSpriteProps } from 'ui/components/NetworkMapSection/NetworkMapSprite';
import type { CTAButtonProps } from 'ui/components/CtaButton';

import { errorLogger } from 'utils/errorHandler/errorLogger';
import { getOurNetworkCoveragePageData } from 'lib/Contentful';
import { fetchIotCoverageData } from 'lib/Pricing/api';

export type OurNetworResponse = {
  heading: string;
  copy: string;
  filters: {
    services: {
      [key in ProductFamily]: {
        select: NetworkMapFilterItemProps;
        enabledMap: {
          [key: string]: NetworkMapSpriteProps['enabledMap'];
        };
      };
    };
    cta: {
      [key in ProductFamily]?: CTAButtonProps;
    };
  };
  regionSelect?: Pick<NetworkMapFilterItemProps, 'portal'>;
  transparent?: boolean;
  isDark?: boolean;
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<OurNetworResponse | { message: string }>
) => {
  try {
    const [iot] = await Promise.all([fetchIotCoverageData()]);
    const data = await getOurNetworkCoveragePageData({}, { iot });

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    errorLogger({
      error: new Error('Error fetching our network data'),
    });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default handler;
