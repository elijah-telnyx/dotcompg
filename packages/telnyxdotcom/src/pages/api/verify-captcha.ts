import Axios from 'axios';
import { RECAPTCHA_V3_SECRET } from 'env';
import errors from 'utils/httpsErrors';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { ReCAPTCHA } from 'components/Recaptcha/types';
import { errorLogger } from 'utils/errorHandler/errorLogger';

export interface GoogleVerifyResponse {
  challenge_ts: string;
  hostname: string;
  score: number;
  success: boolean;
  'error-codes'?: string;
}

const v3SecretKey = RECAPTCHA_V3_SECRET;

const googleRecaptchaVerify = async ({ token }: ReCAPTCHA) => {
  const secretKey = v3SecretKey;

  return await Axios.post<GoogleVerifyResponse>(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
    {},
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
    }
  );
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token, version } = req.body;
  if (!token) {
    return res.status(400).json({
      errors: [errors['bad-request']],
    });
  }

  return await googleRecaptchaVerify({ token, version })
    .then((response) => {
      res.status(201).json(response.data);
    })
    .catch((error) => {
      errorLogger({ error: new Error(error) });
      res.status(500).json({
        success: false,
        error,
      });
    });
};

export default handler;
