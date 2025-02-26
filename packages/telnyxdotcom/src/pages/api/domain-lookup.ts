import { NEUTRINO_SECRET_KEY, NEUTRINO_SECRET_USER_ID } from 'env';
import api from 'lib/Api';
import type { NextApiRequest, NextApiResponse } from 'next';
import { errorLogger } from 'utils/errorHandler/errorLogger';

// https://www.neutrinoapi.com/api/domain-lookup/
interface NeutrinoResponse {
  registrarId: number;
  isSubdomain: boolean;
  registeredDate: string;
  fqdn: string;
  isMalicious: boolean;
  registrarName: boolean;
  blocklists: string[];
  isPending: boolean;
  tld: string;
  mailProvider: string;
  valid: boolean;
  isOpennic: boolean;
  sensors: object[];
  domain: string;
  rank: number;
  tldCc: string;
  isGov: boolean;
  dnsProvider: string;
  age: number; // in days
  isAdult: boolean;
}

export interface DomainLookupResponse {
  success: boolean;
  data?: Pick<NeutrinoResponse, 'age' | 'domain'>;
  error?: string;
}

/**
 * @param host A domain name, hostname, FQDN, URL, HTML link or email address to lookup
 */
const neutrinoDomainLookup = (host: string) => {
  const url = `https://neutrinoapi.net/domain-lookup`;

  const body = {
    'output-case': 'camel',
    host,
  };

  return api.post<NeutrinoResponse>(url, body, {
    headers: {
      'user-id': NEUTRINO_SECRET_USER_ID,
      'api-key': NEUTRINO_SECRET_KEY,
    },
  });
};

const domainLookup = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return neutrinoDomainLookup(req.body.host).then((response) => {
      const { age, valid, domain } = response;
      if (!valid) {
        res.status(400).json({
          success: false,
          error: 'Your email domain is not valid. Please try again, or contact us directly at sales@telnyx.com',
        } as DomainLookupResponse);
      } else {
        res.status(200).json({
          success: true,
          data: { age, domain },
        } as DomainLookupResponse);
      }
    });
  } catch (error: any) {
    errorLogger({ error });

    res.status(error?.status || 500).json({
      error,
    });
  }
};

export default domainLookup;
