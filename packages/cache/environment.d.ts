declare namespace NodeJS {
  interface ProcessEnv {
    BUILD_NUMBER: string;
    NODE_ENV: string;
    RUNTIME_ENV: string;
    CLOUDFLARE_API_KEY: string;
    CLOUDFLARE_ZONE_ID: string;
    PORTAL_API_V2_KEY: string;
    SLACK_OAUTH_TOKEN: string;
  }
}
