import fs from 'fs/promises';
import constants from 'constants/env';
import Api from 'lib/Api';
import type * as T from './@types';
import { DEFAULT_COUNTRY_ALPHA2 } from 'utils/countries/constants';
import { DEFAULT_CURRENCY_CODE } from 'utils/currencies/constants';
import featureFlippers from 'constants/featureFlippers';
import { errorLogger } from 'utils/errorHandler/errorLogger';
import type { GetNetworkMapDataResponse } from 'lib/Coverage/types';

const api = Api.create({ baseUrl: 'https://api.telnyx.com' });
const billingApi = Api.create({ baseUrl: constants.api.BILLING_BASE_URL });
const exchangeRateApi = Api.create({ baseUrl: constants.api.EXCHANGE_RATE_BASE_URL });
const exchangeRateApiDefaultValues: FetchExchangeRateResponse['data'] = {
  base: 'USD',
  rates: {
    USD: '1',
    EUR: '1',
  },
};

const mediaStreamingApi = Api.create({ baseUrl: constants.api.MEDIA_STREAMING });

/**
 * WIRELESS MANAGER API
 * @link http://internaldocs.internal.telnyx.com/?urls.primaryName=wireless_admin_private%20DEV#/Mobile%20Network%20Operators/get_private_api_v1_mobile_network_operators
 */
const wirelessAdminApi = Api.create({ baseUrl: constants.api.WIRELESS_ADMIN_BASE_URL });

const MAX_PAGE_SIZE = 250; // magic number typically used by Telnyx APIs paginated endpoints
export const WIRELESS_MAX_PAGE_SIZE = 1000; // magic number typically used by Telnyx APIs paginated endpoints

// inline memory cache to avoid hitting Billing API over and over again for repeated data
// fine as long as this cache remains small and fetch price is __only__ called at build time or revalidation step
let costCodesResponseCache: Record<T.CostCodes, ApiCostCode> | undefined;

export interface ApiCostCode {
  amount: string;
  currency: T.SupportedCurrency;
  meta_data: {
    group: string;
    service: string;
    group_on: string;
    cost_type: string;
    trans_type: string;
    inventory_on: string;
  };
  cost_type: 'usage';
  source: 'default';
  tiers: T.Tiers[];
  description: string;
  cost_code_id: number;
  cost_code: T.CostCodes;
  item_count: number;
}

export interface FetchPriceParams {
  currency?: T.SupportedCurrency;
  services?: string[];
  cost_codes?: T.CostCodes[];
  countryCode?: T.SupportedCountry;
  pageNumber?: number;
  pageSize?: number;
}

export interface FetchExchangeRateParams {
  currency: T.SupportedCurrency;
  targetCurrencies: T.SupportedCurrency[];
}

export interface FetchExchangeRateResponse {
  data: {
    base: T.SupportedCurrency;
    date?: string;
    rates: Record<T.SupportedCurrency, string>;
  };
}

const hasAllCostCodes = (costCodes: T.CostCodes[], costCodesResponse: Record<T.CostCodes, ApiCostCode>) =>
  costCodes.every((costCode) => costCodesResponse[costCode]);

const fetchPriceFromCache = async ({ cost_codes }: FetchPriceParams = {}): Promise<
  Record<T.CostCodes, ApiCostCode> | undefined
> => {
  if (!cost_codes) return;

  if (costCodesResponseCache && hasAllCostCodes(cost_codes, costCodesResponseCache)) {
    return costCodesResponseCache;
  }

  try {
    const file = await fs.readFile('src/constants/generatedAtBuild/cost_codes.json', { encoding: 'utf-8' });
    const costCodesResponse = JSON.parse(file) as Record<T.CostCodes, ApiCostCode>;

    // safe check - only resolve if cost codes are fulfilled
    if (hasAllCostCodes(cost_codes, costCodesResponse)) {
      // update local cache
      costCodesResponseCache = costCodesResponse;

      return costCodesResponseCache;
    }
  } catch (e) {
    console.error('Error reading Cost Codes Cache');
  }
};

export const fetchPrice = async ({
  currency = DEFAULT_CURRENCY_CODE,
  countryCode = DEFAULT_COUNTRY_ALPHA2,
  ...otherParams
}: FetchPriceParams = {}): Promise<Record<T.CostCodes, ApiCostCode>> => {
  const queryParams = {
    'filter[country_code]': countryCode,
    currency,
    ...otherParams, // do not pass specific query cost_codes to fetch all cost_codes at once and cache
  };

  const costCodesResponse = await fetchPriceFromCache(otherParams);

  if (costCodesResponse) {
    return costCodesResponse;
  }

  console.log(`\nFetching Billing API for Cost Codes\n`);

  return billingApi.get<Record<T.CostCodes, ApiCostCode>>('', {
    queryParams,
    queryFormat: {
      indices: false,
    },
  });
};

export const fetchTariffs = ({
  currency = DEFAULT_CURRENCY_CODE,
  countryCode = DEFAULT_COUNTRY_ALPHA2,
  ...otherParams
}: {
  countryCode?: string;
  currency?: T.SupportedCurrency;
  minimumOnly?: boolean;
} = {}): Promise<
  {
    destination: string;
    rate: string;
  }[]
> => {
  return api.get(`/tariffs/external/price/destination/${countryCode}`, { queryParams: { currency, ...otherParams } });
};

/**
 * Request the carrier fees for a given country.
 * The service will return status 422 if we don't support the provided country
 */
export interface CarrierFee {
  carrier_name: string;
  currency: T.SupportedCurrency;
  carrier_fee: string;
  is_carrier_group: boolean;
  is_unregistered: boolean;
}

export interface MessagingCarrierTable {
  product: 'long_code' | 'short_code' | 'toll_free' | 'short_code_fteu';
  type: 'sms' | 'mms';
  direction: 'origination' | 'termination';
  carrier_fees: CarrierFee[];
}

export const fetchMessagingCarriers = async ({
  countryCode,
  currency,
}: Pick<FetchPriceParams, 'countryCode' | 'currency'> = {}) => {
  const data = await api.get<{ carrier_fee_tables: MessagingCarrierTable[]; carrier_groups: unknown[] }>(
    `/v2/pricing/messaging/default/${countryCode}/carrier_fee_tables`,
    { queryParams: { currency } }
  );

  /**
   * returns an object with the structure
   * [product][direction][carrier_name][type]
   * @example long_code.origination[carrier_name].sms
   */
  const formattedData = data.carrier_fee_tables.reduce(
    (tables, table) => {
      const { product, direction, type, carrier_fees } = table;
      carrier_fees
        .filter((carrier) => !carrier.is_unregistered)
        .forEach((carrier) => {
          const { carrier_name } = carrier;
          if (!tables[product][direction][carrier_name]) {
            tables[product][direction][carrier_name] = {} as any;
          }
          tables[product][direction][carrier_name][type] = carrier;
        });

      return tables;
    },
    {
      long_code: { origination: {}, termination: {} },
      short_code: { origination: {}, termination: {} },
      toll_free: { origination: {}, termination: {} },
      short_code_fteu: { origination: {}, termination: {} },
    } as Record<
      MessagingCarrierTable['product'],
      Record<MessagingCarrierTable['direction'], Record<string, Record<MessagingCarrierTable['type'], CarrierFee>>>
    >
  );

  return formattedData;
};

interface AlphanumericApiValue {
  amount: number;
  currency: string;
  mcc: string;
  mnc: string;
  cc: string;
  country: string;
  imsi: string;
}

export const fetchMessagingAlphanumericPrices = ({
  countryCode,
  currency,
}: Pick<FetchPriceParams, 'countryCode' | 'currency'>) => {
  return api.get<AlphanumericApiValue[]>(`/pricing/messaging/rates/${countryCode}?currency=${currency}`);
};

export const fetchExchangeRates = ({ currency, targetCurrencies }: FetchExchangeRateParams) => {
  return exchangeRateApi
    .get<FetchExchangeRateResponse>('', {
      queryParams: { base_currency: currency, target_currencies: targetCurrencies },
      queryFormat: {
        arrayFormat: 'repeat',
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(`GET ${constants.api.EXCHANGE_RATE_BASE_URL} Failed`);
      console.log(JSON.stringify(error, undefined, 2));
      // do not break flow if this fails
      return exchangeRateApiDefaultValues;
    });
};

interface MediaStreamingValue {
  data: {
    currency: string;
    amount: string;
    product: string;
    cost_code: T.CostCodes;
  };
}

const MediaStreamingDefaultValue: MediaStreamingValue['data'] = {
  currency: 'USD',
  amount: '1',
  product: 'media_streaming',
  cost_code: 'MEDIA-STREAMING-DECRYPTED-TERMINATION-USAGE',
};

export interface FetchMediaStreamingParams {
  currency: T.SupportedCurrency;
  item_count?: number;
  direction?: 'inbound' | 'outbound';
  streaming_type?: 'decrypted' | 'encrypted';
  cost_code?: string;
}

export const fetchMediaStreaming = ({
  currency = DEFAULT_CURRENCY_CODE,
  item_count = 1,
  direction = 'outbound',
  streaming_type = 'decrypted',
  ...otherParams
}: FetchMediaStreamingParams) => {
  const queryParams = {
    currency,
    item_count,
    direction,
    streaming_type,
    ...otherParams,
  };
  return mediaStreamingApi
    .get<MediaStreamingValue>('', {
      queryParams,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(`GET ${constants.api.MEDIA_STREAMING} Failed`);
      console.log(JSON.stringify(error, undefined, 2));
      // do not break flow if this fails
      return MediaStreamingDefaultValue;
    });
};

enum OutboundOriginationType {
  Local = 'Local',
  International = 'International',
  TollFree = 'Toll Free',
  LocalFixed = 'Local - Fixed',
  LocalMobile = 'Local - Mobile',
}

type PricesByOriginationType = Record<OutboundOriginationType, string | number>;

export const getElasticSipOutboundPrices = ({
  countryCode,
  currency,
}: {
  countryCode: string;
  currency: T.SupportedCurrency;
}) => {
  return fetchTariffs({ currency, countryCode, minimumOnly: false }).then((data) => {
    if (data?.length > 0) {
      const allPricesByOriginationType = data.reduce((acc, { destination, rate }) => {
        // DOTCOM-3544 Match Twillio
        if (destination.endsWith('Fixed - Local')) {
          return {
            ...acc,
            [OutboundOriginationType.LocalFixed]: rate,
          };
        }

        // DOTCOM-3544 Match Twillio
        if (destination.endsWith('Mobile - Local')) {
          return {
            ...acc,
            [OutboundOriginationType.LocalMobile]: rate,
          };
        }

        if (destination.endsWith('Toll Free')) {
          return {
            ...acc,
            [OutboundOriginationType.TollFree]: rate,
          };
        }

        if (featureFlippers.DOTCOM_3601_SIP_TRUNKING_PRICING_LABEL) {
          return {
            ...acc,
            // International is the minimum rate
            [OutboundOriginationType.International]: acc.International
              ? Number(rate) < Number(acc.International)
                ? rate
                : acc.International
              : rate,
          };
        }

        return {
          ...acc,
          // DOTCOM-3544 Local is the minimum rate
          [OutboundOriginationType.Local]: acc.Local ? (Number(rate) < Number(acc.Local) ? rate : acc.Local) : rate,
        };
      }, {} as PricesByOriginationType);

      const { Local, International, ...pricesByOriginationType } = allPricesByOriginationType;

      if (pricesByOriginationType['Local - Fixed'] && pricesByOriginationType['Local - Mobile']) {
        return { pricesByOriginationType };
      }

      if (featureFlippers.DOTCOM_3601_SIP_TRUNKING_PRICING_LABEL) {
        return { pricesByOriginationType: { International, ...pricesByOriginationType } };
      }

      return { pricesByOriginationType: { Local, ...pricesByOriginationType } };
    }
  });
};

/**
 * WIRELESS MANAGER API
 * @link http://internaldocs.telnyx.com/?urls.primaryName=wireless_manager_private%20DEV#/Mobile%20Network%20Operators/get_private_v1_mobile_network_operators
 */
const wirelessManagerApi = Api.create({ baseUrl: constants.api.WIRELESS_MANAGER_BASE_URL });

interface MobileNetworkOperators {
  blocked: boolean;
  country_code: string;
  created_at: string;
  custom_cost_code: null;
  customer_data_cost: { amount: string; currency: string; unit: string };
  hydeco_id: null | string;
  id: string;
  mcc: string;
  mnc: string;
  name: string;
  record_type: string;
  tadig: string;
  updated_at: string;
  zone: string;
  zone_id: string;
}

export const getCountryZone = ({ data }: { data: MobileNetworkOperators[] }) => {
  const zones = Array.from(new Set(data.map(({ zone }) => zone)));
  const numberedZone = zones.filter((zone) => !isNaN(Number(zone)));

  /**
   * Only numbered Zones should be visible to customers
   * @link https://support.telnyx.com/en/articles/3296669-programmable-wireless-pricing
   */
  if (numberedZone.length > 0) {
    return numberedZone[0];
  }

  /**
   * JIO is the Zone we use internally for billing. For the customer facing version it should be mapped to Zone 1
   */
  const internalIndiaZone = 'JIO';
  if (zones.includes(internalIndiaZone)) {
    return '1';
  }
};

/**
 * Request the Wireless Network Coverage Pricing for a given country/currency.
 */
export const fetchWirelessNetworkCoveragePrices = async ({
  currency = DEFAULT_CURRENCY_CODE,
  countryCode = DEFAULT_COUNTRY_ALPHA2,
  pageNumber = 1,
  pageSize = MAX_PAGE_SIZE,
  ...otherParams
}) => {
  return wirelessManagerApi
    .get<{ data: MobileNetworkOperators[] }>('/private/v1/mobile_network_operators', {
      queryParams: {
        'filter[country_code]': countryCode,
        'filter[cost.currency]': currency,
        'filter[blocked]': false,
        'page[number]': pageNumber,
        'page[size]': pageSize,
        ...otherParams,
      },
    })
    .then((data) => {
      if ((data as any)?.errors?.detail) throw new Error((data as any).errors.detail);

      const countryZone = getCountryZone(data);
      return { data: data.data, countryZone };
    })
    .catch((error) => {
      errorLogger({
        error: new Error('Failed to fetch from /private/v1/mobile_network_operators'),
        data: JSON.stringify(error),
      });
    });
};

export interface MobileNetworkOperator {
  country_code: string;
  id: string;
  inserted_at: string;
  mcc: string;
  mnc: string;
  name: string;
  rank: number;
  services: {
    service_3g: boolean;
    service_4g_lte: boolean;
    service_5g: boolean;
    service_lte_m: boolean;
    service_nb_iot: boolean;
    service_volte: boolean;
  };
  tadig: string;
  updated_at: string;
  version: string;
  zone: number;
}

interface MobileNetworkOperatorsData {
  entries: MobileNetworkOperator[];
  page_number: number;
  page_size: number;
  total_entries: number;
  total_pages: number;
}

interface Filter {
  /**
   * needs to be uppercase
   */
  country_code?: string;
  version?: string;
  zone?: number;
  blocked?: boolean;
}

/**
 * @link http://internaldocs.internal.telnyx.com/?urls.primaryName=wireless_admin_private%20DEV#/
 */
export const fetchMobileNetworkOperators = (
  params: { page_size?: number; filter?: Filter; page_number?: number } = {},
  options: { abortOnTimeout?: boolean } = {}
) => {
  return wirelessAdminApi.get<MobileNetworkOperatorsData>('/private/api/v1/mobile_operator_networks', {
    queryParams: params,
    ...options,
  });
};

export interface NetworkMapData {
  iot: {
    [id: string]: GetNetworkMapDataResponse[number]['services']['iot'];
  };
}

/**
 * @link https://internaldocs.internal.telnyx.com/?urls.primaryName=wireless_admin_private%20DEV#/Mobile%20Network%20Operators/get_private_api_v2_mobile_network_operators
 */
export const fetchIotCoverageData = async (
  options: { abortOnTimeout?: boolean } = {}
): Promise<NetworkMapData['iot']> => {
  return wirelessAdminApi
    .get<MobileNetworkOperatorsData>('/private/api/v1/mobile_operator_networks', {
      queryParams: {
        'filter[version]': constants.wirelessAdmin.version,
        page_number: 1,
        page_size: WIRELESS_MAX_PAGE_SIZE, // we want all coverage data
      },
      ...options,
    })
    .then((response) => {
      if ((response as any)?.errors?.detail) {
        throw new Error((response as any).errors.detail);
      }

      return response.entries.reduce((acc, { country_code, name, zone, services }) => {
        const coverage = {
          '5G': services.service_5g,
          '4G (LTE)': services.service_4g_lte,
          '3G': services.service_3g,
          'LTE-M': services.service_lte_m,
          'NB-IoT': services.service_nb_iot,
          'Pricing Zone': String(zone),
        };

        // api returns country_code as `BL/GF/GP/MF/MQ` for some entries
        if (country_code.includes('/')) {
          return {
            ...acc,
            ...country_code.split('/').reduce(
              (splitAcc, code) => ({
                ...splitAcc,
                [code]: {
                  ...acc[code],
                  [name]: coverage,
                },
              }),
              {} as NetworkMapData['iot']
            ),
          };
        }

        return {
          ...acc,
          [country_code]: {
            ...acc[country_code],
            [name]: coverage,
          },
        };
      }, {} as NetworkMapData['iot']);
    })
    .catch((err) => {
      const error = new Error('Failed to fetch from wireless admin /private/api/v1/mobile_operator_networks', {
        cause: err,
      });

      throw error;
    });
};

export default api;
