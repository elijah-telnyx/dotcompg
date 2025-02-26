import type { NextApiRequest, NextApiResponse } from 'next';
import { getLegalPagesVersion } from 'lib/Contentful';
import { errorLogger } from 'utils/errorHandler/errorLogger';

export interface LegalVersionResponse {
  success: boolean;
  data?: {
    lastmod: string;
    url: string;
  };
  error?: string;
}

function setAccessHeaders(res: NextApiResponse) {
  // Cross-Origin Resource Sharing error: PreflightMissingAllowOriginHeader
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Accept,Content-Type');
}

const legalVersion = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'GET, OPTIONS');
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.setHeader('Content-Length', 0);
    res.status(200);
    res.end('');
    return;
  }

  if (!req.query.pages?.length) {
    res.status(400).json({
      success: false,
      error: 'No parameter pages provided',
    } as LegalVersionResponse);
    return;
  }

  // normalize query to array
  const queryPageTags = req.query.pages.toString().split(',');

  try {
    const response = await getLegalPagesVersion({ pages: queryPageTags });

    if (!Object.keys(response).length) {
      res.status(400).json({
        success: false,
        error: 'Invalid page provided',
      } as LegalVersionResponse);
      return;
    }

    setAccessHeaders(res);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error: any) {
    errorLogger({ error });

    res.status(error?.status || 500).json({
      error,
    });
  }
};

export default legalVersion;
