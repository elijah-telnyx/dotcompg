declare namespace NodeJS {
  interface ProcessEnv {
    BUILD_NUMBER: string;
    NODE_ENV: string;
    RUNTIME_ENV: string;
    E2E_TEST_TIMEOUT: string;
    E2E_PLAYWRIGHT_WORKERS: string;
    E2E_PLAYWRIGHT_RETRIES: string;
    E2E_AJS_ANONYMOUS_ID: string;
    E2E_AJS_USER_ID: string;
    E2E_GOOGLE_USER_EMAIL: string;
    E2E_GOOGLE_USER_PASSWORD: string;
    E2E_PORTAL_V2_API_KEY_PROD: string;
  }
}
