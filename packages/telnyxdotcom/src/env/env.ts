import constants from 'constants/env';

/** Build-time environment variables */
export const CONTENTFUL_ACCESS_TOKEN = String(process.env.CONTENTFUL_ACCESS_TOKEN);
export const CONTENTFUL_ACCESS_TOKEN_BLOG = String(process.env.CONTENTFUL_ACCESS_TOKEN_BLOG);
export const CONTENTFUL_ACCESS_TOKEN_PREVIEW = String(process.env.CONTENTFUL_ACCESS_TOKEN_PREVIEW);
export const CONTENTFUL_ACCESS_TOKEN_BLOG_PREVIEW = String(process.env.CONTENTFUL_ACCESS_TOKEN_BLOG_PREVIEW);
export const STRAPI_ACCESS_TOKEN = String(process.env.STRAPI_ACCESS_TOKEN);
export const STRAPI_GITHUB_REPO_TOKEN = String(process.env.STRAPI_GITHUB_REPO_TOKEN);

/** server side (api) recaptcha keys */
export const RECAPTCHA_V3_SECRET = String(process.env.RECAPTCHA_V3_SECRET);
export const NEUTRINO_SECRET_KEY = String(process.env.NEUTRINO_SECRET_KEY);
export const NEUTRINO_SECRET_USER_ID = String(process.env.NEUTRINO_SECRET_USER_ID);
export const PREVIEW_MODE_DEFAULT = process.env.PREVIEW_MODE_DEFAULT === 'true';
export const NEXT_PUBLIC_OUTPUT_STATIC = process.env.NEXT_PUBLIC_OUTPUT_STATIC === 'true';
export const SENDGRID_API_KEY = String(process.env.SENDGRID_API_KEY);
export const SENDGRID_CONTACTS_API_KEY = String(process.env.SENDGRID_CONTACTS_API_KEY);
export const CLOUDFLARE_API_KEY = String(process.env.CLOUDFLARE_API_KEY);
export const PORTAL_API_V2_KEY = String(process.env.PORTAL_API_V2_KEY);
export const GOOGLE_SERVICE_ACCOUNT_EMAIL = String(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
export const GOOGLE_PRIVATE_KEY = String(process.env.GOOGLE_PRIVATE_KEY);
export const PORTAL_CHATBOT_API_V2_KEY = String(process.env.PORTAL_CHATBOT_API_V2_KEY);
export const PORTAL_VOICE_AI_API_V2_KEY = String(process.env.PORTAL_VOICE_AI_API_V2_KEY);
export const DOMO_CLIENT_ID = String(process.env.DOMO_CLIENT_ID);
export const DOMO_SECRET = String(process.env.DOMO_SECRET);
export const AIRTABLE_TOKEN = String(process.env.AIRTABLE_TOKEN);
export const CLOUDFLARE_ZONE_ID = String(process.env.CLOUDFLARE_ZONE_ID);
export const INTERCOM_SECRET_KEY = String(process.env.INTERCOM_SECRET_KEY);
export const HCAPTCHA_SECRET_KEY = String(process.env.HCAPTCHA_SECRET_KEY);
export const IMAGES_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Runtime environment variables */
const DEFAULT_RUNTIME_ENV = 'production';
export const RUNTIME_ENV = String(process.env.NEXT_PUBLIC_RUNTIME_ENV || DEFAULT_RUNTIME_ENV) as
  | 'dev'
  | 'test'
  | 'staging'
  | 'production';
export const IS_PRODUCTION = RUNTIME_ENV === 'production';
export const BASE_URL = `${constants.protocol}://${constants.host}`;
