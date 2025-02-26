import type { NextApiHandler } from 'next';
import type { NextApiRequest, NextApiResponse } from 'next';
import api from 'lib/Api';
import { errorLogger } from 'utils/errorHandler/errorLogger';
import constants from 'constants/env';

const defaultStatus = 500;
const defaultError = {
  success: false,
  message: 'Unable to create account',
  reasons: {},
};

export interface RegistrationsResponse {
  success: boolean;
  message?: string;
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { referrer, ...body },
    headers,
    cookies,
  } = req;
  // custom headers
  const xCreditReferrer = referrer || document.referrer || (headers['x-credit-referrer'] as string | undefined);
  const xForwardedFor = headers['x-forwarded-for'] as string | undefined;

  let anonymousId;
  if (cookies?.ajs_anonymous_id) {
    anonymousId = cookies?.ajs_anonymous_id;

    // Remove quotes from the anonymous id since segment's
    // library already wraps it in quotes:
    anonymousId = anonymousId.replace(/"/g, '');
  } else if (body.anonymous_id) {
    anonymousId = body.anonymous_id;
  }

  const options: RequestInit = {};
  if (xCreditReferrer) {
    options.headers = {
      'x-credit-referrer': xCreditReferrer,
    };
  }
  if (xForwardedFor) {
    options.headers = {
      ...(options.headers || {}),
      'x-forwarded-for': xForwardedFor,
    };
  }

  // Make registrations request to api.telnyx.com
  const response = await api
    .post<RegistrationsResponse>(
      `${constants.api.BASE_URL}/registrations`,
      { ...body, anonymous_id: anonymousId },
      options
    )
    .catch((error) => {
      errorLogger({ error: new Error('/registrations - ' + error?.response?.data), url: '/registrations' });
      const errorStatus = error?.status || defaultStatus;
      const errorData = error?.response?.data || defaultError;

      res.status(errorStatus).json(errorData);
    });
  if (!response) return;

  res.status(200).json(response);
};

export default handler;
