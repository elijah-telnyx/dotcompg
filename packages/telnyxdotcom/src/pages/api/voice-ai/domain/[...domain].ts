import { voiceAIService, type VoiceAIDomainNumberResponse as SuccessResponse } from 'components/VoiceAI/service';
import featureFlippers from 'constants/featureFlippers';
import type { NextApiRequest, NextApiResponse } from 'next';

import jwt from 'jsonwebtoken';
import { HCAPTCHA_SECRET_KEY } from 'env';
import { getDomainFromUrl } from 'utils/url';

type ErrorResponse = {
  status: 'error';
  message: string;
};

type VoiceAIDomainNumberResponse = SuccessResponse | ErrorResponse;

export default async function handler(req: NextApiRequest, res: NextApiResponse<VoiceAIDomainNumberResponse>) {
  if (!featureFlippers.DOTCOM_3903_VOICE_AI_DOMAIN_REQUEST) {
    return res.status(404).redirect('/404');
  }

  // Set cache control headers to prevent caching
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');

  const { domain, domaintoken } = req.query;
  if (!domain) {
    return res.status(400).json({ status: 'error', message: 'Domain must exist' });
  }

  if (!domaintoken || Array.isArray(domaintoken)) {
    return res.status(400).json({ status: 'error', message: 'JWT domaintoken must be a string' });
  }

  // Check if JWT domaintoken is valid
  try {
    await new Promise((resolve, reject) => {
      jwt.verify(domaintoken, HCAPTCHA_SECRET_KEY, (err: any, decoded: any) => {
        if (err) {
          // Safely handle JWT error
          const errorMessage = err?.message || String(err) || 'Unknown JWT error';
          reject(new Error(errorMessage));
        } else {
          resolve(decoded);
        }
      });
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: `There was an error with your request, ${error}` });
    return;
  }

  try {
    const domainString = typeof domain === 'string' ? domain : domain.join('/').replace(/\/$/, '');

    const response = await voiceAIService._getVoiceAIDomainNumber({ domain: getDomainFromUrl(domainString) });
    if (
      response.data.status !== 'success' &&
      response.data.status !== 'processing' &&
      response.data.status !== 'queued'
    ) {
      throw Error('Failed to get voice ai domain number');
    }
    res.status(200).json(response.data);
  } catch (error) {
    if (error instanceof Error && 'errors' in error) {
      res.status(500).json({
        status: 'error',
        message: (error.errors as { detail: string }[])[0].detail || 'There was an error with your request',
      });
      return;
    } else {
      res.status(500).json({ status: 'error', message: 'There was an error with your request' });
      return;
    }
  }
}
