import constants from "constants/env";

/** Build-time environment variables */
export const CONTENTFUL_ACCESS_TOKEN = String(
  process.env.CONTENTFUL_ACCESS_TOKEN
);
export const CONTENTFUL_ACCESS_TOKEN_PREVIEW = String(
  process.env.CONTENTFUL_ACCESS_TOKEN_PREVIEW
);
export const GOOGLE_SERVICE_ACCOUNT_EMAIL = String(
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
);
export const GOOGLE_PRIVATE_KEY = String(process.env.GOOGLE_PRIVATE_KEY);
export const IMAGES_BASE_PATH = "";

/** Runtime environment variables */
const DEFAULT_RUNTIME_ENV = "production";
export const RUNTIME_ENV = String(
  process.env.NEXT_PUBLIC_RUNTIME_ENV || DEFAULT_RUNTIME_ENV
) as "dev" | "test" | "staging" | "production";
export const IS_PRODUCTION = RUNTIME_ENV === "production";
export const BASE_URL = `${constants.protocol}://${constants.host}`;
export const PREVIEW_MODE_DEFAULT = process.env.PREVIEW_MODE_DEFAULT === "true";
