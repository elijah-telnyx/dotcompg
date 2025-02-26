import type { NextRequest } from 'next/server';
import {
  appendToResponse,
  rewriteToGsiLogin,
  rewriteToDocuments,
  rewriteToModels,
  blockStagingPagesOnProduction,
  handleCaseInsensitivePaths,
  corsForApiNumberLookup,
} from 'utils/middleware';

export function middleware(req: NextRequest) {
  return appendToResponse(
    handleCaseInsensitivePaths({ req }),
    rewriteToGsiLogin({ req }),
    rewriteToDocuments({ req }),
    rewriteToModels({ req }),
    blockStagingPagesOnProduction({ req }),
    corsForApiNumberLookup({ req })
  );
}

export const config = {
  matcher: [
    '/api/gsi_login',
    '/api/documents',
    '/api/ai-models',
    '/api/flow/execute/bot/:path+',
    '/report-abuse',
    '/staging/:path*',
    '/llm-library',
    '/api/number-lookup',
  ],
};
