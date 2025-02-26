import { addCountryToCostCode, generateBody, getTablesDataByCurrency } from 'lib/Pricing/utils';
import Api from 'lib/Api';

import * as CC from 'lib/Pricing/cost_codes';
import type * as T from 'lib/Pricing/@types';
import { currencyFormatter } from 'utils/number';

import { fetchPrice, fetchExchangeRates, getElasticSipOutboundPrices, type ApiCostCode } from 'lib/Pricing/api';
import { DEFAULT_COUNTRY_ALPHA2, SECONDARY_COUNTRY_ALPHA2 } from 'utils/countries/constants';
import { DEFAULT_CURRENCY_CODE } from 'utils/currencies/constants';
import { PRICING_CURRENCIES } from '../currencies';

/** `local` and `international` are minimum rates */
const isMinimumOrTollFree = (label: string) =>
  label.toLowerCase() === 'local' ||
  label.toLowerCase() === 'international' ||
  label.toLowerCase() === 'toll-free' ||
  label.toLowerCase() === 'toll free';

const getLowestAmountFromCostCode = (a: ApiCostCode, b: ApiCostCode) => {
  if (!a) return b;
  if (!b) return a;

  if (parseFloat(a.amount) < parseFloat(b.amount)) {
    return a;
  }
  return b;
};

export const fetchElasticSipPricing = async (
  params: T.PricePageFetchParams = {}
): Promise<T.TablesSectionProps['data']> => {
  const { currency = DEFAULT_CURRENCY_CODE, countryCode = DEFAULT_COUNTRY_ALPHA2 } = params;
  const isUS = countryCode.toUpperCase() === DEFAULT_COUNTRY_ALPHA2;
  const isCA = countryCode.toUpperCase() === SECONDARY_COUNTRY_ALPHA2;
  const prefix = addCountryToCostCode(countryCode);

  const LOCAL = {
    INBOUND: isUS ? CC.DID_RATE0_USAGE : prefix(CC.LOCAL_RATE0_USAGE_FROM_LANDLINE),
    MOBILE: prefix(CC.LOCAL_RATE0_USAGE_FROM_MOBILE),
  } as const;
  const TOLL_FREE = {
    INBOUND: isUS || isCA ? CC.TF_RATE0_USAGE : prefix(CC.TF_RATE0_USAGE_FROM_LANDLINE),
    MOBILE: prefix(CC.TF_RATE0_USAGE_FROM_MOBILE),
  } as const;

  return Api.all([
    fetchPrice({
      cost_codes: [
        LOCAL.INBOUND,
        TOLL_FREE.INBOUND,
        CC.CHANNEL_MRC,
        CC.CALL_RECORDING_TERMINATION_USAGE,
        CC.CALL_RECORDING_STORAGE,
        ...(!isUS ? [LOCAL.MOBILE, TOLL_FREE.MOBILE] : ([CC.E911_MRC] as const)),
      ],
      currency,
    }),
    getElasticSipOutboundPrices({ countryCode, currency }),
    fetchExchangeRates({ currency, targetCurrencies: PRICING_CURRENCIES['elastic-sip'] }),
  ]).then(([elasticSipData, outboundData, exchangeRateData]) => {
    const local = elasticSipData[LOCAL.INBOUND];
    const localMobile = elasticSipData[LOCAL.MOBILE];

    const receiveInboundLocal = getLowestAmountFromCostCode(local, localMobile);

    const tfMobile = elasticSipData[TOLL_FREE.MOBILE];
    const tf = elasticSipData[TOLL_FREE.INBOUND];
    const receiveInboundTollFree = getLowestAmountFromCostCode(tf, tfMobile);

    const inboundChannelsTiers = elasticSipData[CC.CHANNEL_MRC].tiers;
    const inboundChannelsFirstTier = inboundChannelsTiers[0];
    const inboundChannelsLastTier = inboundChannelsTiers[inboundChannelsTiers.length - 1];

    const callRecording = elasticSipData[CC.CALL_RECORDING_TERMINATION_USAGE];
    const callRecordingStorage = elasticSipData[CC.CALL_RECORDING_STORAGE];
    const emergencyCalling = elasticSipData[CC.E911_MRC];

    const generate = {
      tables(targetCurrency: T.SupportedCurrency): T.TablesSectionTableProps<2>[] {
        const outboundCalls: T.TablesSectionTableProps<2> = outboundData
          ? {
              columns: 2,
              caption: 'Make outbound calls',
              body: generateBody(
                Object.entries(outboundData?.pricesByOriginationType || {})
                  .sort(([label1]) => {
                    // add local to the top of the list
                    if (label1.toLowerCase() === 'local') return -1;
                    if (label1.toLowerCase() === 'international') return -1;
                    if (label1.toLowerCase() === 'local - fixed') return -1;
                    return 0;
                  })
                  .map(([label, price]) => {
                    if (isMinimumOrTollFree(label)) {
                      return {
                        label: `${label} calls`,
                        value:
                          Number(price) === 0
                            ? 'Free'
                            : `Starting at ${currencyFormatter({
                                currency: targetCurrency,
                                amount: price,
                                rate: exchangeRateData.rates[targetCurrency],
                              })} per minute`,
                      };
                    }

                    return {
                      label,
                      value:
                        Number(price) === 0
                          ? 'Free'
                          : `${currencyFormatter({
                              currency: targetCurrency,
                              amount: price,
                              rate: exchangeRateData.rates[targetCurrency],
                            })} per minute`,
                    };
                  })
              ),
              footer: {
                id: 'outbound-calls-footer',
                data: [
                  {
                    value:
                      'For outbound voice services, certain call per second (CPS) thresholds and pricing apply as set forth [here](https://support.telnyx.com/en/articles/7834487-calls-per-second-cps-surcharges)',
                  },
                  {
                    value:
                      'For a full list of our global pricing, download our [global price sheet](#download-pricing)',
                  },
                ],
              },
            }
          : ({} as T.TablesSectionTableProps);
        const inboundCalls: T.TablesSectionTableProps<2> =
          receiveInboundLocal || receiveInboundTollFree
            ? {
                columns: 2,
                caption: 'Receive inbound calls',
                body: generateBody([
                  receiveInboundLocal && {
                    label: 'Local calls',
                    value: `Starting at ${currencyFormatter({
                      currency: targetCurrency,
                      amount: receiveInboundLocal.amount,
                      rate: exchangeRateData.rates[targetCurrency],
                    })} per minute`,
                  },
                  receiveInboundTollFree && {
                    label: 'Toll-free calls',
                    value: `Starting at ${currencyFormatter({
                      currency: targetCurrency,
                      amount: receiveInboundTollFree.amount,
                      rate: exchangeRateData.rates[targetCurrency],
                    })} per minute*`,
                  },
                ]),
                footer: {
                  id: 'services-elastic-sip-footer',
                  data: [
                    { value: '\\*Toll-free has different rates based on the calling number.' },
                    {
                      value: 'Alternatively, get unlimited concurrent inbound calls with channels.',
                      toggleButton: {
                        label: {
                          open: 'Hide pricing',
                          close: 'View pricing',
                        },
                        innerTableId: 'channels-pricing',
                      },
                    },
                  ],
                },
                innerTables: {
                  containerId: 'channels-pricing',
                  tables: [
                    {
                      id: 'inbound-channel-pricing',
                      columns: 2,
                      caption: 'Inbound channel pricing',
                      body: generateBody([
                        {
                          label: `First ${inboundChannelsFirstTier.max} channels`,

                          value: `${currencyFormatter({
                            currency: targetCurrency,
                            amount: inboundChannelsFirstTier.amount,
                            maximumSignificantDigits: undefined,
                            rate: exchangeRateData.rates[targetCurrency],
                          })} per month`,
                        },
                        ...inboundChannelsTiers.slice(1, inboundChannelsTiers.length - 1).map((channel: T.Tiers) => ({
                          label: `Next ${Number(channel.max) - channel.min} channels`,
                          value: `${currencyFormatter({
                            currency: targetCurrency,
                            amount: channel.amount,
                            maximumSignificantDigits: undefined,
                            rate: exchangeRateData.rates[targetCurrency],
                          })} per month`,
                        })),
                        {
                          label: `${inboundChannelsLastTier.min}+ channels`,

                          value: `${currencyFormatter({
                            currency: targetCurrency,
                            amount: inboundChannelsLastTier.amount,
                            maximumSignificantDigits: undefined,
                            rate: exchangeRateData.rates[targetCurrency],
                          })} per month`,
                        },
                      ]),
                    },
                  ],
                },
              }
            : ({} as T.TablesSectionTableProps<2>);

        return [
          outboundCalls,
          inboundCalls,
          {
            columns: 2,
            caption: 'Optional features',
            body: generateBody([
              {
                label: 'Call recording',
                value: `${currencyFormatter({
                  currency: targetCurrency,
                  amount: callRecording.amount,
                  rate: exchangeRateData.rates[targetCurrency],
                })} per minute`,
              },
              {
                label: 'Call recording storage',

                value: `${currencyFormatter({
                  currency: targetCurrency,
                  amount: callRecordingStorage.amount,
                  rate: exchangeRateData.rates[targetCurrency],
                })} per minute`,
              },
              {
                label: {
                  value: 'Call concurrency',
                  tooltip: {
                    id: 'call-concurrency-info',
                    label: 'Call concurrency info',
                    value: 'Support virtually unlimited concurrent inbound calls',
                  },
                },

                value: 'Free',
              },
              {
                label: {
                  value: 'Secure trunking',
                  tooltip: {
                    id: 'secure-trunking-info',
                    label: 'Secure trunking info',
                    value:
                      'Encrypt signaling with TLS and media with SRTP or ZRTP, and route calls over our private network',
                  },
                },

                value: 'Free',
              },
              {
                label: {
                  value: 'T.38 fax support',
                  tooltip: {
                    id: 't-38-fax-support-info',
                    label: 'T.38 fax support info',
                    value: 'Transmit T.38 fax at our standard conversational voice rates',
                  },
                },

                value: 'Free',
              },
              {
                label: {
                  value: 'Emergency calling',
                  tooltip: {
                    id: 'emergency-calling-info',
                    label: 'Emergency calling info',
                    value: 'Enable in-plan calls to emergency numbers',
                  },
                },

                value:
                  isUS || isCA
                    ? `${currencyFormatter({
                        currency: targetCurrency,
                        amount: emergencyCalling.amount,
                        rate: exchangeRateData.rates[targetCurrency],
                      })} per month, per number`
                    : 'Free',
              },
            ]),
          },
        ];
      },
    };

    return getTablesDataByCurrency(PRICING_CURRENCIES['elastic-sip'], generate.tables);
  });
};
