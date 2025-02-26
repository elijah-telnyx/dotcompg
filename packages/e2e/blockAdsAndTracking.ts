import { BrowserContext } from "@playwright/test";

const BLOCKED_SCRIPTS = [
  "(googletagmanager\\.com)",
  "(google-analytics\\.com)",
  "(intercomcdn\\.com)",
  "(segment\\.com)",
  "(marketo\\.com)",
  "(marketo\\.net)",
  "(bugsnag\\.com)",
  "(sift\\.com)",
];

// https://playwright.dev/docs/network#network-mocking
const blockAdsAndTracking = async (context: BrowserContext) => {
  const blocked = new RegExp(BLOCKED_SCRIPTS.join("|"));

  await context.route(blocked, (route) => route.abort());
};

export default blockAdsAndTracking;
