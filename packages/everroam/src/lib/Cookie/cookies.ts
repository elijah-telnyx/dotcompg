export const COOKIE_POLICY = {
  NAME: 'cookiePolicyURL',
  VALUE: 'https://telnyx.com/cookie-policy',
  OPTIONS: {
    expires: 365,
  },
  COOKIE_SESSION_KEY: 'cookieConsent',
  COOKIE_STATUS: {
    accepted: 'accepted',
    revoked: 'revoked',
    pending: 'pending',
    unknown: 'unknown',
  },
} as const;

export const COOKIE_BOT_VERIFIER = 'isCookieBot';
export const ONE_TRUST_CLOSED = 'OptanonAlertBoxClosed';
export const ONE_TRUST_CONSENT = 'OptanonConsent';
export const ONE_TRUST_ACTIVE_GROUPS = 'OptanonActiveGroups';
export const ONE_TRUST_CATEGORIES_STATUS = {
  C0001: 'C0001', // strictly necessary
  C0002: 'C0002', // functional
  C0003: 'C0003', // performance
  C0004: 'C0004', // targeting
} as const;
