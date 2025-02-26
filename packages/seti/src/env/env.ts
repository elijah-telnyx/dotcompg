import constants from "constants/env";

/** Runtime environment variables */
const DEFAULT_RUNTIME_ENV = "production";
export const RUNTIME_ENV = String(
  process.env.NEXT_PUBLIC_RUNTIME_ENV || DEFAULT_RUNTIME_ENV
) as "dev" | "test" | "staging" | "production";
export const IS_PRODUCTION = RUNTIME_ENV === "production";
export const BASE_URL = `${constants.protocol}://${constants.host}`;
export const PREVIEW_MODE_DEFAULT = process.env.PREVIEW_MODE_DEFAULT === "true";
export const BRANCH_NAME = process.env.NEXT_PUBLIC_BRANCH_NAME || "local";
export const BUILD_NUMBER =
  process.env.NEXT_PUBLIC_BUILD_NUMBER || "0000.00.00.00.00.HEAD";
export const SERVICE_VERSION =
  process.env.NEXT_PUBLIC_SERVICE_VERSION || "local";
