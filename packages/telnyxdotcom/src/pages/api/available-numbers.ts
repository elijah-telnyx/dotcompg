import type { NextApiRequest, NextApiResponse } from 'next';
import Api from 'lib/Api';
import constants from 'constants/env';
import { verifyHCaptchaToken } from 'services/hCaptchaService';

import { errorLogger } from 'utils/errorHandler/errorLogger';

import type { NextApiHandler } from 'next';
import type { CountryCode } from 'libphonenumber-js';

const api = Api.create({ baseUrl: constants.api.BASE_URL });
const MAX_NUMBER_RETURN = 5;

export type Feature = 'emergency' | 'fax' | 'hd_voice' | 'mms' | 'sms' | 'voice';

export type RegionInformation = {
  region_type: 'location' | 'country_code' | 'state' | 'rate_center';
  region_name: CountryCode;
};

export const AVAILABLE_NUMBERS_ERROR_CODES = {
  NO_COVERAGE: '10015',
};

// Lookup phone number data Schema https://developers.telnyx.com/api/numbers/list-available-phone-numbers
export interface AvailableNumbers {
  data: {
    record_type: string;
    phone_number: string;
    phone_number_type: string;
    vanity_format: string;
    best_effort: boolean;
    quickship: boolean;
    reservable: boolean;
    region_information: RegionInformation[];
    cost_information: {
      upfront_cost: string;
      monthly_cost: string;
      currency: string;
    };
    features: {
      name: Feature;
    }[];
  }[];
}

export interface AvailableNumbersError {
  error: string;
  code?: (typeof AVAILABLE_NUMBERS_ERROR_CODES)[keyof typeof AVAILABLE_NUMBERS_ERROR_CODES];
}

export const getAvailableNumbers = ({
  country_code,
  state_code,
  phone_number,
}: {
  country_code: CountryCode;
  state_code?: string;
  phone_number?: string;
}) => {
  const endpoint = `/v2/available_phone_numbers`;

  return api
    .get<AvailableNumbers>(endpoint, {
      includeV2AuthHeader: true,
      queryParams: {
        'filter[administrative_area]': state_code,
        'filter[country_code]': country_code,
        'filter[limit]': MAX_NUMBER_RETURN,
        'filter[phone_number][contains]': phone_number,
      },
    })
    .catch((error) => {
      console.log({ error });
      errorLogger({
        error: new Error(
          `Failed to fetch phone numbers info for "${state_code}" "${country_code}": ${JSON.stringify(error)}`
        ),
      });
      return error;
    });
};

export type AvailableNumbersResponse = AvailableNumbers | AvailableNumbersError;

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<AvailableNumbersResponse>) => {
  const state_code = req.query.state_code as string | undefined;
  const country_code = req.query.country_code as CountryCode;
  const phone_number = (req.query.phone_number as string) || '';
  const token = req.query.token as string | undefined;

  try {
    const captchaResponse = token ? await verifyHCaptchaToken(token) : null;
    if (!captchaResponse?.success) {
      res.status(400).json({ error: 'Captcha verification failed' });
      return;
    }
  } catch (error) {
    errorLogger({
      error: new Error(`Error verifying hCaptcha token', ${error}`),
    });
  }

  const returnData = await getAvailableNumbers({ state_code, country_code, phone_number });
  if (returnData.errors) {
    const error = returnData.errors[0];
    errorLogger({ error });
    res.status(500).json({ error: error.detail || 'Error fetching phone number', code: error.code });
    return;
  }

  if (!returnData || returnData instanceof Error) {
    errorLogger({
      error: new Error(`Error fetching phone number info', ${returnData}`),
    });
    res.status(500).json({ error: 'Error fetching phone number info' });
    return;
  }

  res.status(200).json(returnData);
};

export default handler;
