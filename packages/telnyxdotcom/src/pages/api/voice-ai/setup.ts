import type { NextApiHandler } from 'next';

import parsePhoneNumber, { formatNumber } from 'libphonenumber-js';
import { verifyHCaptchaToken } from 'services/hCaptchaService';
import { DEFAULT_COUNTRY_ALPHA2 } from 'utils/countries/constants';
import { getDomainFromUrl } from 'utils/url';
import { errorLogger } from 'utils/errorHandler/errorLogger';
import { getVoiceAiSetupResponse } from 'services/telnyxApiService';

import jwt from 'jsonwebtoken';
import { HCAPTCHA_SECRET_KEY } from 'env';

export type VoiceAiSetupAPIParams = {
  business_name: string;
  phone_number: string;
  email: string;
  domain: string;
  token: string;
  greeting: string;
  terms_and_conditions: boolean;
};

export type VoiceAiSetupAPIResponse = {
  success: boolean;
  domaintoken?: string;
  message?: string;
  errors?: {
    title: string;
    detail: string;
    meta: object;
  }[];
};

const handler: NextApiHandler<VoiceAiSetupAPIResponse> = async (req, res) => {
  try {
    const { token, ...params }: VoiceAiSetupAPIParams = req.body || {};
    const phone_number = parsePhoneNumber(params.phone_number, DEFAULT_COUNTRY_ALPHA2)?.number;

    if (!phone_number) {
      errorLogger({ error: new Error('Invalid Phone Number'), data: { phone_number: params.phone_number } });
      res.status(400).json({ success: false, message: 'Invalid Phone Number' });
      return;
    }

    console.log('Validating Voice AI Setup Captcha');
    const captchaResponse = await verifyHCaptchaToken(token);
    const domaintoken = jwt.sign({ data: captchaResponse }, HCAPTCHA_SECRET_KEY, { expiresIn: '5m' });

    const body = {
      ...params,
      domain: getDomainFromUrl(params.domain),
      phone_number: formatNumber(phone_number, 'E.164'),
    };

    console.log('Voice AI Setup Request');
    const response = await getVoiceAiSetupResponse(body);
    console.log(response);

    res.status(200).json({ success: true, domaintoken });
  } catch (error) {
    errorLogger({ error: error as Error });
    const message = (error as VoiceAiSetupAPIResponse)?.errors?.at(0)?.detail;

    if (message) {
      res.status(400).json({ success: false, message });
      return;
    }

    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
export default handler;
