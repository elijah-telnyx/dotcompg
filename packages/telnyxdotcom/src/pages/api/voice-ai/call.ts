import type { NextApiHandler } from 'next';

import parsePhoneNumber, { formatNumber } from 'libphonenumber-js';
import constants from 'constants/env';
import featureFlippers from 'constants/featureFlippers';
import { getTexmlCallResponse, type TexmlCallParams, type TexmlCallResponse } from 'services/telnyxApiService';
import { verifyHCaptchaToken } from 'services/hCaptchaService';
import { DEFAULT_COUNTRY_ALPHA2 } from 'utils/countries/constants';
import { errorLogger } from 'utils/errorHandler/errorLogger';

export type VoiceAiDemoAPIParams = {
  To: TexmlCallParams['To'];
  token?: string;
  skipCaptcha?: boolean;
};

export type VoiceAiDemoAPIResponse = {
  success: boolean;
  message?: string;
  errors?: { [key: string]: string };
  data?: TexmlCallResponse['data'];
};

const handler: NextApiHandler<VoiceAiDemoAPIResponse> = async (req, res) => {
  try {
    const { token, skipCaptcha, ...params }: VoiceAiDemoAPIParams = req.body || {};
    const To = parsePhoneNumber(params.To, DEFAULT_COUNTRY_ALPHA2)?.number;

    if (!To) {
      errorLogger({ error: new Error('Invalid Phone Number'), data: { To: params.To } });
      res.status(400).json({ success: false, message: 'Invalid Phone Number' });
      return;
    }

    if (!skipCaptcha && featureFlippers.DOTCOM_3328_VOICE_AI_HACAPTCHA) {
      console.log('Validating Voice AI Captcha');
      const captchaResponse = await verifyHCaptchaToken(token);
      console.log(captchaResponse);
    }

    const body = {
      ...constants.voiceAi.params,
      ...params,
      To: formatNumber(To, 'E.164'),
    };

    console.log('Voice AI Call Request');
    console.log(body);
    const response = await getTexmlCallResponse(body);
    console.log(response);

    res.status(200).json({ success: true, ...response });
  } catch (error) {
    errorLogger({ error: error as Error });
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
export default handler;
