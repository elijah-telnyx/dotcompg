import { NextRequest, NextResponse } from 'next/server';
import constants from 'constants/env';
import { RUNTIME_ENV } from 'env';

type GenericFunction = (response: NextResponse) => NextResponse;

export const appendToResponse = (...args: GenericFunction[]) => {
  return args.reduce((currentResponse, func) => func(currentResponse), NextResponse.next());
};

/**
 * Rewrites request to Telnyx API `gsi_login` if it's `/api/_gsi_login`.
 * Browsers may set `Origin` to `null`. See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin#description
 */
export const rewriteToGsiLogin =
  ({ req }: { req: NextRequest }) =>
  (response: NextResponse): NextResponse => {
    if (req.nextUrl.pathname === '/api/gsi_login') {
      // Clone the request headers and override
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('origin', `https://${constants.api.NODE_FETCH_HOST_URL}`);

      return NextResponse.rewrite(new URL(`${constants.api.BASE_URL}/v2/gsi_login`, req.url), {
        request: {
          // New request headers
          headers: requestHeaders,
        },
      });
    }

    return response;
  };

/**
 * FormData - for simplicity, just rewrite appending the authorization header
 */
export const rewriteToDocuments =
  ({ req }: { req: NextRequest }) =>
  (response: NextResponse): NextResponse => {
    if (req.nextUrl.pathname === '/api/documents') {
      // Clone the request headers and override
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('authorization', `Bearer ${process.env.DOCUMENTS_API_KEY as string}`);

      return NextResponse.rewrite(new URL(`${constants.api.BASE_URL}/v2/documents`, req.url), {
        request: {
          // New request headers
          headers: requestHeaders,
        },
      });
    }

    return response;
  };

export const rewriteToModels =
  ({ req }: { req: NextRequest }) =>
  (response: NextResponse): NextResponse => {
    if (req.nextUrl.pathname === '/api/ai-models') {
      // Clone the request headers and override
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set(
        'authorization',
        `Bearer ${RUNTIME_ENV === 'production' ? process.env.PORTAL_API_V2_KEY_PROD : process.env.PORTAL_API_V2_KEY}`
      );

      return NextResponse.rewrite(new URL(`${constants.api.BASE_URL}/v2/ai/models`, req.url), {
        request: {
          // New request headers
          headers: requestHeaders,
        },
      });
    }

    return response;
  };

export const blockStagingPagesOnProduction =
  ({ req }: { req: NextRequest }) =>
  (response: NextResponse): NextResponse => {
    const isStagingPage = req.nextUrl.pathname.startsWith('/staging');
    if (!isStagingPage) return response;

    if (
      process.env.NEXT_PUBLIC_RUNTIME_ENV === 'dev' ||
      process.env.NEXT_PUBLIC_RUNTIME_ENV === 'staging' ||
      process.env.NEXT_PUBLIC_RUNTIME_ENV === 'test'
    ) {
      return response;
    }

    return NextResponse.rewrite(new URL('/404', req.url));
  };

export const handleCaseInsensitivePaths =
  ({ req }: { req: NextRequest }) =>
  (response: NextResponse): NextResponse => {
    if (req.nextUrl.pathname === req.nextUrl.pathname.toLowerCase()) {
      return response;
    }

    return NextResponse.redirect(new URL(req.url.toLowerCase()));
  };

export const corsForApiNumberLookup =
  ({ req }: { req: NextRequest }) =>
  (response: NextResponse): NextResponse => {
    if (req.nextUrl.pathname === '/api/number-lookup') {
      if (constants.host != req.headers.get('host'))
        return NextResponse.json({ error: 'Wrong Requesting Host' }, { status: 401 });

      const allowedOrigins = ['wwwdev.telnyx.com', 'telnyx.com'];

      if (allowedOrigins.includes(req.headers.get('origin') || ''))
        response.headers.set('Access-Control-Allow-Host', constants.host);
    }

    return response;
  };
