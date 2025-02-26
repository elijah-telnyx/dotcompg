import type { NextApiRequest, NextApiResponse } from 'next';
import Api from 'lib/Api';
import constants from 'constants/env';
import parsePhoneNumber from 'libphonenumber-js';
import { verifyHCaptchaToken } from 'services/hCaptchaService';

import { errorLogger } from 'utils/errorHandler/errorLogger';

import type { NextApiHandler } from 'next';
import type { CountryCode } from 'libphonenumber-js';

const api = Api.create({ baseUrl: constants.api.BASE_URL });

// Lookup phone number data Schema https://api.telnyx.com/v2/number_lookup/:phone_number
export interface NumberLookup {
  data: {
    record_type: string;
    country_code: string;
    national_format: boolean;
    phone_number: boolean;
    fraud: boolean;
    carrier: {
      mobile_country_code: string;
      mobile_network_code: string;
      name: string;
      type: string;
      error_code: string;
      nomralized_carrier: string;
    } | null;
    caller_name: {
      caller_name: string;
      error_code: string;
    } | null;
    portability: {
      lrn: string;
      ported_status: string;
      ported_date: string;
      ocn: string;
      line_type: string;
      spid: string;
      spid_carrier_name: string;
      spid_carrier_type: string;
      altspid: string;
      altspid_carrier_name: string;
      altspid_carrier_type: string;
      city: string;
      state: string;
    } | null;
  };
}

const redactData = (data: NumberLookup): NumberLookup => {
  return {
    data: {
      ...data.data,
      carrier: data.data.carrier
        ? {
            ...data.data.carrier,
            mobile_country_code: '**********',
            mobile_network_code: '**********',
          }
        : null,
      caller_name: data.data.caller_name
        ? {
            ...data.data.caller_name,
            caller_name: '**********',
          }
        : null,
      portability: data.data.portability
        ? {
            ...data.data.portability,
            lrn: '******XXXX',
            line_type: '**********',
            spid_carrier_name: '**********',
            city: '**********',
            state: '**********',
          }
        : null,
    },
  };
};

export const getNumbers = (
  searched_number: string | string[] | undefined,
  dialing_code: string | string[] | undefined,
  country_code: CountryCode
) => {
  const phone_number = parsePhoneNumber(searched_number as string, country_code);
  if (phone_number && phone_number.isValid()) {
    const endpoint = `/v2/number_lookup/${dialing_code}${searched_number}`;

    return api
      .get<NumberLookup>(endpoint, {
        includeV2AuthHeader: true,
        queryParams: {
          type: country_code === 'US' ? 'caller-name' : 'carrier',
        },
      })
      .catch((error) => {
        errorLogger({
          error: new Error(`Failed to fetch phone number info for "${searched_number}": ${JSON.stringify(error)}`),
        });
        return error;
      });
  }

  return;
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<NumberLookup | undefined>) => {
  const { searched_number, dialing_code, token, country_code } = req.query as {
    searched_number: string;
    dialing_code: string;
    token: string;
    country_code: CountryCode;
  };
  let captchaSuccess = false;
  try {
    const captchaResponse = token ? await verifyHCaptchaToken(token) : null;
    if (captchaResponse && captchaResponse.success) {
      captchaSuccess = true;
    }
  } catch (error) {
    errorLogger({
      error: new Error(`Error verifying hCaptcha token', ${error}`),
    });
  }

  const returnData = captchaSuccess ? await getNumbers(searched_number, dialing_code, country_code) : null;

  if (!returnData || Object.keys(returnData)[0] == 'errors' || returnData instanceof Error) {
    errorLogger({
      error: new Error(`Error fetching phone number info', ${returnData}`),
    });
    res.status(500).json(undefined);
    return;
  }

  res.status(200).json(redactData(returnData));
};

export default handler;
