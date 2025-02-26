import dotenv from "dotenv";
import { PlaywrightTestConfig, devices } from "@playwright/test";

dotenv.config();
const OUTPUT_HTML_DIR = `results/${process.env.RUNTIME_ENV}/public`;
const OUTPUT_JSON_FILE = `results/${process.env.RUNTIME_ENV}/reports/index.json`;
const SEGMENT_ANONYMOUS_ID = process.env.E2E_AJS_ANONYMOUS_ID;
const SEGMENT_USER_ID = process.env.E2E_AJS_USER_ID;
const RUNTIME_ENV = process.env.RUNTIME_ENV;

// https://telnyx.slack.com/archives/C5WNXK932/p1638890910253000?thread_ts=1638807520.244900&cid=C5WNXK932
// uncomment the following line to run against a local server
const BASE_URL =
  RUNTIME_ENV === "local" || RUNTIME_ENV === "dev"
    ? "http://localhost:3000"
    : RUNTIME_ENV === "production"
    ? "https://telnyx.com"
    : "https://wwwdev.telnyx.com";

// DOTCOM-1404
const COOKIES_DEFINITION = {
  domain: ".telnyx.com",
  path: "/",
  sameSite: "Lax" as "Lax" | "Strict" | "None",
  expires: -1,
  httpOnly: false,
  secure: false,
};

const STORAGE_STATE = {
  cookies: [
    {
      ...COOKIES_DEFINITION,
      name: "ajs_anonymous_id",
      value: SEGMENT_ANONYMOUS_ID,
    },
    {
      ...COOKIES_DEFINITION,
      name: "ajs_user_id",
      value: SEGMENT_USER_ID,
    },
  ],
  origins: [
    {
      origin: BASE_URL,
      localStorage: [
        {
          name: "ajs_anonymous_id",
          value: SEGMENT_ANONYMOUS_ID,
        },
        {
          name: "ajs_user_id",
          value: SEGMENT_USER_ID,
        },
      ],
    },
  ],
};

const config: PlaywrightTestConfig = {
  // Look for test files in the "tests" directory, relative to this configuration file
  testDir: "src",
  forbidOnly: !!process.env.BUILD_NUMBER,
  timeout: Number(process.env.E2E_TEST_TIMEOUT),
  retries: Number(process.env.E2E_PLAYWRIGHT_RETRIES) || 0,
  workers: Number(process.env.E2E_PLAYWRIGHT_WORKERS) || 1,
  reporter: [
    ["list"],
    ["json", { outputFile: OUTPUT_JSON_FILE }],
    ["html", { open: "never", outputFolder: OUTPUT_HTML_DIR }],
  ],
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: BASE_URL,
        storageState: STORAGE_STATE,
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        baseURL: BASE_URL,
        storageState: STORAGE_STATE,
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        baseURL: BASE_URL,
      },
    },
  ],
};
export default config;
