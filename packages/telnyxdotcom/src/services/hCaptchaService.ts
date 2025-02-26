import { HCAPTCHA_SECRET_KEY } from 'env';

// { success: false, 'error-codes': [ 'missing-input-response' ] }
export interface HCaptchaResponse {
  'error-codes'?: string[];
  success: boolean;
}

export const verifyHCaptchaToken = async (token: string | undefined) => {
  const response: HCaptchaResponse = await fetch('https://api.hcaptcha.com/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      response: token || '',
      secret: HCAPTCHA_SECRET_KEY,
    }),
  }).then((res) => res.json());

  if (!response) {
    throw new Error('Empty response from hCaptcha');
  }

  if (!response.success) {
    throw new Error(response['error-codes']?.toString());
  }

  return response;
};
