import constants from 'constants/env';

const PORTAL_BASE_URL = constants.PORTAL.BASE_URL;
const PORTAL_SIGNIN_PAGE = `${PORTAL_BASE_URL}/login/from-sign-up`;
const PORTAL_OAUTH_PAGE = `${PORTAL_BASE_URL}/login/sign-in-provider`;

export interface PortalLoginUrlParameters {
  provider: string;
  // Authenticated user token
  token: string;
  // Authenticated user email
  user: string;
  // Whether user has just been created
  created: string;
  // Authenticated user token
  portal_redirect_token: string;
  // Whether to remember user session
  remember_me?: boolean;
  // Initial app state on redirect
  deepLinkState?: string;
}

export interface PortalOAuthUrlParameters extends PortalLoginUrlParameters {
  requires_two_factor_verification?: boolean;
  two_factor_auth_type?: string;
  two_factor_exchange_token?: string;
}

/**
 * Redirect user to portal sign in landing page
 * with API credentials - portal will handle auth and headers hereforth
 */
export function redirectToPortalSignIn(params: PortalLoginUrlParameters) {
  if (!params.portal_redirect_token && !(params.user && params.token)) {
    throw new Error('Credentials are required.');
  }

  // Build URL and query string params
  const qs = new URLSearchParams({
    created: params.created,
    redirect_token: params.portal_redirect_token,
  });

  window.location.assign(`${PORTAL_SIGNIN_PAGE}?${qs.toString()}`);
}

export function getPortalLoginUrl({ provider, token, user, created, portal_redirect_token }: PortalLoginUrlParameters) {
  const qs = new URLSearchParams({
    provider,
    token,
    user,
    created,
    redirect_token: portal_redirect_token,
  });
  return `${PORTAL_SIGNIN_PAGE}?${qs.toString()}`;
}

export function getPortalOAuthUrl({
  provider,
  token,
  user,
  created,
  portal_redirect_token,
  requires_two_factor_verification,
  two_factor_auth_type,
  two_factor_exchange_token,
}: PortalOAuthUrlParameters) {
  const qs = new URLSearchParams({
    provider,
    user,
    two_factor_exchange_token: two_factor_exchange_token || token,
  });

  if (created) {
    qs.append('created', 'true');
  }

  if (token) {
    qs.append('token', token);
  }

  if (portal_redirect_token) {
    qs.append('redirect_token', portal_redirect_token);
  }

  if (requires_two_factor_verification) {
    qs.append('requires_two_factor_verification', 'true');
  }

  if (two_factor_auth_type) {
    qs.append('two_factor_auth_type', two_factor_auth_type);
  }

  return `${PORTAL_OAUTH_PAGE}?${qs.toString()}`;
}
