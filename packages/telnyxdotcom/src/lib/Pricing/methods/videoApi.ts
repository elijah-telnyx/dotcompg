import * as CC from 'lib/Pricing/cost_codes';
import type * as T from 'lib/Pricing/@types';
import { currencyFormatTo, generateBody, getTablesDataByCurrency } from 'lib/Pricing/utils';
import { fetchPrice, fetchExchangeRates } from 'lib/Pricing/api';
import Api from 'lib/Api';
import { PRICING_CURRENCIES } from '../currencies';
import { DEFAULT_CURRENCY_CODE } from 'utils/currencies/constants';

export const fetchVideoApiPricing = async ({ currency = DEFAULT_CURRENCY_CODE }: T.PricePageFetchParams = {}): Promise<
  T.TablesSectionProps['data']
> =>
  Api.all([
    fetchPrice({
      cost_codes: [
        CC.VIDEO_PARTICIPANT_USAGE,
        CC.VIDEO_COMPOSITION,
        CC.VIDEO_PARTICIPANT_RECORDING,
        CC.MEDIA_STORAGE_API,
        CC.CONFERENCE_PARTICIPANT_USAGE,
        CC.CALL_CONTROL_FEATURES_TTS,
        CC.CALL_CONTROL_FEATURES_RT_STT,
        CC.CALL_RECORDING_ORIGINATION_USAGE,
        CC.MEDIA_FORKING_TERMINATION_USAGE,
      ],
      currency,
    }),
    fetchExchangeRates({ currency, targetCurrencies: PRICING_CURRENCIES['video-api'] }),
  ]).then(([videoApiData, exchangeRateData]) => {
    const generate = {
      tables(targetCurrency: T.SupportedCurrency): T.TablesSectionTableProps<2>[] {
        const formatToCurrency = currencyFormatTo(targetCurrency, exchangeRateData.rates[targetCurrency]);

        return [
          {
            columns: 2,
            caption: 'Video API feature pricing',
            body: generateBody([
              {
                label: 'Video bridge',
                value: `${formatToCurrency(
                  videoApiData[CC.VIDEO_PARTICIPANT_USAGE].amount
                )} per participant, per minute`,
              },
              {
                label: 'Video bridge recording composition',
                value: `${formatToCurrency(videoApiData[CC.VIDEO_COMPOSITION].amount)} per composed minute`,
              },
              {
                label: 'Video bridge recording',
                value: `${formatToCurrency(
                  videoApiData[CC.VIDEO_PARTICIPANT_RECORDING].amount
                )} per participant, per minute`,
              },
              {
                label: 'Media storage',
                // use min 10000 from tiers
                value: `${formatToCurrency(videoApiData[CC.MEDIA_STORAGE_API].tiers[1].amount)} per query`,
              },
              {
                label: 'Conferencing',
                value: `${formatToCurrency(videoApiData[CC.CONFERENCE_PARTICIPANT_USAGE].amount)} per minute`,
              },
              {
                label: 'Text-to-speech',
                value: `${formatToCurrency(videoApiData[CC.CALL_CONTROL_FEATURES_TTS].amount)} per minute`,
              },
              {
                label: 'Speech-to-text',
                value: `${formatToCurrency(videoApiData[CC.CALL_CONTROL_FEATURES_RT_STT].amount)} per minute`,
              },
              {
                label: 'Call recording',
                value: `${formatToCurrency(videoApiData[CC.CALL_RECORDING_ORIGINATION_USAGE].amount)} per minute`,
              },
              {
                label: 'Media forking',
                value: `${formatToCurrency(videoApiData[CC.MEDIA_FORKING_TERMINATION_USAGE].amount)} per minute`,
              },
            ]),
          },
        ];
      },
    };

    return getTablesDataByCurrency(PRICING_CURRENCIES['video-api'], generate.tables);
  });
