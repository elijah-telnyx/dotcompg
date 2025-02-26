import { NEUTRINO_SECRET_KEY, NEUTRINO_SECRET_USER_ID } from 'env';
import api from 'lib/Api';
import type { NextApiRequest, NextApiResponse } from 'next';
import { errorLogger } from 'utils/errorHandler/errorLogger';
import constants from 'constants/env';
interface NeutrinoResponse {
  domain: string;
  domainError: boolean;
  email: string;
  isDisposable: boolean;
  isFreemail: boolean;
  isPersonal: boolean;
  provider: string;
  syntaxError: boolean;
  typosFixed: boolean;
  valid: boolean;
}

export interface ValidateEmailResponse {
  success: boolean;
  data?: Pick<NeutrinoResponse, 'isFreemail' | 'email'>;
  error?: string;
}

const neutrinoEmailValidate = (email: string) => {
  const url = `https://neutrinoapi.net/email-validate`;

  const body = {
    'output-case': 'camel',
    email,
  };

  return api.post<NeutrinoResponse>(url, body, {
    headers: {
      'user-id': NEUTRINO_SECRET_USER_ID,
      'api-key': NEUTRINO_SECRET_KEY,
    },
  });
};

const validateEmail = (req: NextApiRequest, res: NextApiResponse) => {
  return neutrinoEmailValidate(req.body.email)
    .then((response) => {
      const { isDisposable, valid, isFreemail, email } = response;
      if (isDisposable || !valid) {
        res.status(400).json({
          success: false,
          error: 'Please enter a valid email address.',
        } as ValidateEmailResponse);
      } else {
        res.status(200).json({
          success: true,
          data: { isFreemail, email },
        } as ValidateEmailResponse);
      }
    })
    .catch((error: any) => {
      errorLogger({ error: new Error(`Failed to fetch Neutrino validate-email`, { cause: error }) });

      if (error?.apiError === constants.neutrino.errorCodes.FREE_PLAN_LIMIT_EXCEEDED) {
        res.status(200).json({ success: true } as ValidateEmailResponse);
        return;
      }

      res.status(error?.status || 500).json({ error });
    });
};

export default validateEmail;
