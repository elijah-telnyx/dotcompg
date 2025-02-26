import * as CC from 'lib/Pricing/cost_codes';
import type * as T from 'lib/Pricing/@types';
import Api from 'lib/Api';
import constants from 'constants/env';
Api.create({ baseUrl: constants.api.MEDIA_STREAMING });

import { currencyFormatTo, generateBody, getTablesDataByCurrency } from 'lib/Pricing/utils';
import type { TablesSectionTableProps } from 'lib/Pricing/@types';
import { fetchPrice, fetchExchangeRates, fetchMediaStreaming } from 'lib/Pricing/api';
import { routes } from 'utils/routes';
import { DEFAULT_COUNTRY_ALPHA2 } from 'utils/countries/constants';
import { DEFAULT_CURRENCY_CODE } from 'utils/currencies/constants';
import { PRICING_CURRENCIES } from '../currencies';

const getSipTrunkFeeLink = (type: 'inbound' | 'outbound') =>
  ` per minute + the [SIP Trunking fee](${routes.pricing.elasticSip}#pay-as-you-go) for ${type} calls`;

export const fetchVoicePricing = async ({
  currency = DEFAULT_CURRENCY_CODE,
  countryCode = DEFAULT_COUNTRY_ALPHA2,
}: T.PricePageFetchParams = {}): Promise<T.TablesSectionProps['data']> => {
  return Api.all([
    fetchPrice({
      cost_codes: [
        CC.CALL_CONTROL_FEATURES_NEURAL_TTS,
        CC.CALL_CONTROL_FEATURES_CONVERSATIONAL_AI,
        CC.CALL_CONTROL_RATE0_TERMINATION,
        CC.CALL_CONTROL_RATE0_ORIGINATION,
        CC.CALL_RECORDING_TERMINATION_USAGE,
        CC.CALL_RECORDING_STORAGE,
        CC.CONFERENCE_PARTICIPANT_USAGE,
        CC.CALL_CONTROL_FEATURES_SIP_REFER,
        CC.CALL_CONTROL_FEATURES_STANDARD_AMD,
        CC.CALL_CONTROL_FEATURES_PREMIUM_AMD,
        CC.CALL_CONTROL_FEATURES_RT_STT,
        CC.CALL_CONTROL_FEATURES_TTS,
        CC.MEDIA_STREAMING_WEB_SOCKET_TERMINATION_USAGE,
        CC.CALL_CONTROL_FEATURES_RT_STT_IN_HOUSE,
        CC.CALL_CONTROL_FEATURES_NS,
      ],
      currency,
      countryCode: countryCode,
    }),
    fetchExchangeRates({ currency, targetCurrencies: PRICING_CURRENCIES['call-control'] }),
    fetchMediaStreaming({
      currency,
      item_count: 1,
      direction: 'outbound',
      streaming_type: 'decrypted',
    }),
  ]).then(([voicePricingData, exchangeRateData, mediaStreamingData]) => {
    function generateTables(targetCurrency: T.SupportedCurrency): T.TablesSectionTableProps<2>[] {
      const formatToCurrency = currencyFormatTo(targetCurrency, exchangeRateData.rates[targetCurrency]);
      const servicesPricingTable: TablesSectionTableProps = {
        columns: 2,
        caption: 'Services',
        body: generateBody([
          {
            label: 'Make outbound calls',
            value:
              formatToCurrency(voicePricingData[CC.CALL_CONTROL_RATE0_TERMINATION].amount) +
              getSipTrunkFeeLink('outbound'),
          },
          {
            label: 'Receive inbound calls',
            value: '',
          },
          {
            label: 'Local number',
            typographyType: 'Paragraph',
            value:
              formatToCurrency(voicePricingData[CC.CALL_CONTROL_RATE0_ORIGINATION].amount) +
              getSipTrunkFeeLink('inbound'),
          },
          {
            label: 'Toll-free number',
            typographyType: 'Paragraph',
            value:
              formatToCurrency(voicePricingData[CC.CALL_CONTROL_RATE0_ORIGINATION].amount) +
              getSipTrunkFeeLink('inbound'),
          },
        ]),
        footer: {
          id: 'outbound-calls-pricing-footer',
          data: [
            {
              value: `For a full list of global SIP Trunking prices, download out global SIP Trunking [price sheet](#download-pricing)`,
            },
            {
              value: `If you’re using TeXML, you’ll be charged the same $0.002 fee.`,
            },
          ],
        },
      };

      const optionalFeaturesPricingTable: TablesSectionTableProps = {
        columns: 2,
        caption: 'Optional features',
        body: generateBody([
          {
            label: 'Conversational AI',
            value:
              formatToCurrency(voicePricingData[CC.CALL_CONTROL_FEATURES_CONVERSATIONAL_AI].amount) + ' per minute',
          },
          {
            label: 'Call recording',
            value: formatToCurrency(voicePricingData[CC.CALL_RECORDING_TERMINATION_USAGE].amount) + ' per minute',
          },
          {
            label: 'Call recording storage',
            value: formatToCurrency(voicePricingData[CC.CALL_RECORDING_STORAGE].amount) + ' per minute',
          },
          {
            label: 'Conference calls',
            value:
              formatToCurrency(voicePricingData[CC.CONFERENCE_PARTICIPANT_USAGE].amount) +
              ' per participant, per minute',
          },
          {
            label: {
              value: 'SIP interface',
              tooltip: {
                id: 'sip-interface-info',
                label: 'SIP interface info',
                value: 'Configure your voice app from another provider to route calls on the superior Telnyx Network.',
              },
            },
            value: formatToCurrency(voicePricingData[CC.CALL_CONTROL_RATE0_TERMINATION].amount) + ' per minute',
          },
          {
            label: 'Call transfer',
            value: formatToCurrency(voicePricingData[CC.CALL_CONTROL_FEATURES_SIP_REFER].amount) + ' per invocation',
          },
          {
            label: {
              value: 'Browser/app calling',
              tooltip: {
                id: 'browser-app-info',
                label: 'Browser/app calling info',
                value: 'Make and receive calls from web browsers, native apps and more with our WebRTC SDKs.',
              },
            },
            value: formatToCurrency(voicePricingData[CC.CALL_CONTROL_RATE0_TERMINATION].amount) + ' per minute',
          },
          {
            label: {
              value: 'Secure media',
              tooltip: {
                id: 'secure-media-info',
                label: 'Secure media info',
                value: 'Encrypt signaling and media with TLS and SRTP/ZRTP.',
              },
            },
            value: 'Free',
          },
          {
            label: 'Standard answering machine detection',
            value: formatToCurrency(voicePricingData[CC.CALL_CONTROL_FEATURES_STANDARD_AMD].amount) + ' per call',
          },
          {
            label: 'Premium answering machine detection',
            value: formatToCurrency(voicePricingData[CC.CALL_CONTROL_FEATURES_PREMIUM_AMD].amount) + ' per call',
          },
          {
            label: 'Telnyx speech-to-text transcription',
            value: formatToCurrency(voicePricingData[CC.CALL_CONTROL_FEATURES_RT_STT_IN_HOUSE].amount) + ' per minute',
          },
          {
            label: 'Google speech-to-text transcription',
            value: formatToCurrency(voicePricingData[CC.CALL_CONTROL_FEATURES_RT_STT].amount) + ' per minute',
          },
          {
            label: 'Text-to-Speech - Standard Voices',
            value: formatToCurrency(voicePricingData[CC.CALL_CONTROL_FEATURES_TTS].amount) + ' per character',
          },
          {
            label: 'Text-to-Speech - Neural Voices',
            value: formatToCurrency(voicePricingData[CC.CALL_CONTROL_FEATURES_NEURAL_TTS].amount) + ' per character',
          },
          {
            label: 'Noise Suppression',
            value: formatToCurrency(voicePricingData[CC.CALL_CONTROL_FEATURES_NS].amount) + ' per leg per minute',
          },
          {
            label: 'Media Streaming over WebSockets',
            value:
              formatToCurrency(voicePricingData[CC.MEDIA_STREAMING_WEB_SOCKET_TERMINATION_USAGE].amount) +
              ' per minute',
          },
          {
            label: 'Decrypted Forking',
            value: formatToCurrency(mediaStreamingData.amount) + ' per minute',
          },
        ]),
      };

      return [servicesPricingTable, optionalFeaturesPricingTable];
    }

    return getTablesDataByCurrency(PRICING_CURRENCIES['call-control'], generateTables);
  });
};
