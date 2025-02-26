import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextApiHandler } from 'next';
import { pricingPageSectionOverridesBySlug, pricingPageOverrideSlugList } from 'lib/Static/data';
import fetchPricingPages, { type PricingPagesProps } from 'lib/Pricing/pages';
import { errorLogger } from 'utils/errorHandler/errorLogger';
import type { PricingPage } from 'lib/Pricing/@types';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { countryCode, slug } = req.query as {
    countryCode: string;
    slug: PricingPage;
  };

  const params = {
    params: {
      locale: countryCode === 'xx' ? 'satellite-coverage' : countryCode,
      slug,
    },
  };

  try {
    const data = await fetchPricingPages[slug](params).then((page) =>
      pricingPageOverrideSlugList.includes(slug)
        ? pricingPageSectionOverridesBySlug[slug as keyof typeof pricingPageSectionOverridesBySlug](
            page as PricingPagesProps
          )
        : page
    );
    if (!data) throw new Error('No data found');
    res.status(200).json(data);
  } catch (error) {
    errorLogger({
      error: new Error(`Failed to fetch pricing page data for ${slug} and ${countryCode}: ${error}`),
    });
    res.status(500).json(null);
  }
};

export default handler;
