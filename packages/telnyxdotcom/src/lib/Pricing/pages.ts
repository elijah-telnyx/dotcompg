import { fetchIoTSupportedCountries } from './methods/iotSimCard/index';
import { NotFoundError } from 'utils/pageGeneration/CustomError';

import { getPricingPage } from 'lib/Contentful';
import type { AwaitedReturn } from 'ui/utils/types';
import type * as T from './@types';
import { generateCountryListWithLink, getCountryByAlpha2, type Country } from 'utils/countries.data';
import { generateCurrencyListFromCodes } from 'utils/currencies.data';
import type { Params } from 'utils/pageGeneration/defaultGetStaticProps';
import {
  fetchMessagingPricing,
  fetchElasticSipPricing,
  fetchNumbersPricing,
  fetchVoicePricing,
  fetchIOTSIMCardPricing,
  fetchFaxApiPricing,
  fetchNetworkingPricing,
  fetchNumberLookupPricing,
  fetchStoragePricing,
  fetchVerifyApiPricing,
  fetchVideoApiPricing,
  fetchGlobalEdgeRouter,
  fetchInferenceApiPricing,
} from './methods';
import { DEFAULT_COUNTRY_ALPHA2 } from 'utils/countries/constants';
import { DEFAULT_CURRENCY_TABLES_DATA, DEFAULT_CURRENCY_CODE } from 'utils/currencies/constants';
import { generateSchema } from 'utils/schemas';
import { BASE_URL } from 'env';

type getDataParams = Parameters<Params['getData']>[0];

export type PricingPagesProps = Awaited<ReturnType<typeof getPricingPage>> & {
  tablesData: AwaitedReturn<typeof fetchMessagingPricing>;
  countryList?: ReturnType<typeof generateCountryListWithLink>;
  countryAlpha2?: string;
  currencyList?: ReturnType<typeof generateCurrencyListFromCodes>;
  currencyCode: typeof DEFAULT_CURRENCY_CODE;
  currentLocale: ReturnType<typeof getCountryByAlpha2>;
};

/**
 * Fetches the data for the pricing page.
 */
export const pricingPages: Record<
  string,
  {
    fetchData: (args: any) => Promise<T.TablesSectionProps['data']>;
    hasIntl: boolean;
    fetchCountryList?: () => Promise<Country[]>;
  }
> = {
  'call-control': { fetchData: fetchVoicePricing, hasIntl: true },
  'elastic-sip': { fetchData: fetchElasticSipPricing, hasIntl: true },
  messaging: { fetchData: fetchMessagingPricing, hasIntl: true },
  numbers: { fetchData: fetchNumbersPricing, hasIntl: true },
  'iot-data-plans': { fetchData: fetchIOTSIMCardPricing, hasIntl: true, fetchCountryList: fetchIoTSupportedCountries },
  fax: { fetchData: fetchFaxApiPricing, hasIntl: false },
  networking: { fetchData: fetchNetworkingPricing, hasIntl: false },
  'number-lookup': { fetchData: fetchNumberLookupPricing, hasIntl: false },
  storage: { fetchData: fetchStoragePricing, hasIntl: false },
  'verify-api': { fetchData: fetchVerifyApiPricing, hasIntl: false },
  'video-api': { fetchData: fetchVideoApiPricing, hasIntl: false },
  'global-edge-router': {
    fetchData: fetchGlobalEdgeRouter,
    hasIntl: false,
  },
  'inference-api': { fetchData: fetchInferenceApiPricing, hasIntl: false },
};

const pages = Object.keys(pricingPages) as (keyof typeof pricingPages)[];

const fetchPricingPages = pages.reduce((final, slug) => {
  const fetchMethod = pricingPages[slug];
  final[slug] = ({ preview, params }: getDataParams) => {
    if (params?.locale && !fetchMethod.hasIntl) {
      const locale = params?.locale ? `/${params?.locale}` : '';
      throw new NotFoundError(`Page pricing/${slug}${locale} doesn't support localization`);
    }

    const currentLocale = getCountryByAlpha2(params?.locale || DEFAULT_COUNTRY_ALPHA2);
    if (!currentLocale) {
      const locale = params?.locale ? `/${params?.locale}` : '';
      throw new NotFoundError(`Page pricing/${slug}${locale} doesn't support localization`);
    }

    return Promise.all([
      getPricingPage({ slug }, { preview }),
      fetchMethod
        .fetchData({
          countryCode: currentLocale?.alpha2,
          countryName: currentLocale?.name,
          currency: DEFAULT_CURRENCY_CODE,
        })
        .catch((error) => {
          console.log(`Fetch /pricing/${slug} Data Failed`);
          console.error(error);

          return DEFAULT_CURRENCY_TABLES_DATA;
        }),
      fetchMethod?.fetchCountryList?.(),
    ]).then(([cmsData, tablesData, countryList]) => {
      return {
        ...cmsData,
        seo: {
          ...cmsData.seo,
          schema: generateSchema({
            type: 'pricing',
            payload: {
              name: cmsData.seo.title,
              description: cmsData.seo.description,
              datePublished: new Date(cmsData.datePublished).toISOString().split('T')[0],
              dateModified: new Date(cmsData.dateModified).toISOString().split('T')[0],
              url: `${BASE_URL}/pricing/${slug}`,
              mainEntityOfPage: {
                '@id': `${BASE_URL}/pricing/${slug}`,
              },
            },
          }),
        },
        tablesData,
        countryList: fetchMethod.hasIntl ? generateCountryListWithLink(`/pricing/${slug}`, { countryList }) : undefined,
        countryAlpha2: currentLocale.alpha2,
        currencyList: generateCurrencyListFromCodes(Object.keys(tablesData) as T.SupportedCurrency[]),
        currencyCode: DEFAULT_CURRENCY_CODE,
        currentLocale,
      };
    });
  };
  return final;
}, {} as Record<string, (props: getDataParams) => Promise<PricingPagesProps>>);

export default fetchPricingPages;
