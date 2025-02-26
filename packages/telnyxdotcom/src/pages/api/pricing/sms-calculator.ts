import Api from 'lib/Api';
import { entries, getClient } from 'lib/Contentful';
import { fetchPrice } from 'lib/Pricing/api';
import * as CC from 'lib/Pricing/cost_codes';

import type * as T from 'lib/Pricing/@types';
import type { NextApiHandler } from 'next';

export const SMS_Cost_Codes = {
  local: {
    origination: CC.SMS_RATE0_ORIGINATION,
    termination: CC.SMS_RATE0_TERMINATION,
  },
  tollFree: {
    origination: CC.TF_SMS_RATE0_ORIGINATION,
    termination: CC.TF_SMS_RATE0_TERMINATION,
  },
} as const;

export const getSMSData = (currency: T.PricePageFetchParams['currency']) => {
  return fetchPrice({
    cost_codes: [
      SMS_Cost_Codes.local.origination,
      SMS_Cost_Codes.local.termination,
      SMS_Cost_Codes.tollFree.origination,
      SMS_Cost_Codes.tollFree.termination,
    ],
    currency,
  });
};

export const getTwilioData = (): Promise<TwilioData> => {
  return getClient()
    .getAsset(entries.assets.twilioPricingData)
    .then(({ fields }) => Api.get('https://' + fields.file.url));
};

const handler: NextApiHandler<SMSCalculatorApiResponse> = async (_req, res) => {
  const [telnyxData, twilioData] = await Api.all([getSMSData('USD'), getTwilioData()]);

  res.status(200).json({
    status: 'ok',
    data: {
      telnyx: {
        receive: {
          local: telnyxData[SMS_Cost_Codes.local.termination].tiers,
          tollFree: telnyxData[SMS_Cost_Codes.tollFree.termination].tiers,
        },
        send: {
          local: telnyxData[SMS_Cost_Codes.local.origination].tiers,
          tollFree: telnyxData[SMS_Cost_Codes.tollFree.origination].tiers,
        },
      },
      twilio: {
        receive: { local: twilioData.receiveLongCodeSMS.tiers, tollFree: twilioData.receiveLongCodeSMS.tiers },
        send: { local: twilioData.sendLongCodeSMS.tiers, tollFree: twilioData.sendLongCodeSMS.tiers },
      },
    },
  });
};

export default handler;

interface Data {
  receive: {
    local: T.Tiers[];
    tollFree: T.Tiers[];
  };
  send: {
    local: T.Tiers[];
    tollFree: T.Tiers[];
  };
}
interface TwilioData {
  receiveLongCodeSMS: {
    tiers: T.Tiers[];
  };
  sendLongCodeSMS: {
    tiers: T.Tiers[];
  };
  receiveTollFreeCodeSMS: {
    tiers: T.Tiers[];
  };
  sendTollFreeSMS: {
    tiers: T.Tiers[];
  };
}

export interface SMSCalculatorApiResponse {
  status: 'ok';
  data: {
    telnyx: Data;
    twilio: Data;
  };
}
