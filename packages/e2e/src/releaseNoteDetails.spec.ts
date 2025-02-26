import {
  test,
  expect,
  Page,
  BrowserContext,
  BrowserType,
} from "@playwright/test";
import blockAdsAndTracking from "../blockAdsAndTracking";

test.describe.configure({ mode: "serial" });

let browserType: BrowserType;
let context: BrowserContext;
let page: Page;
const URL = "/release-notes/telnyx-launches-regional-public-ip-packet-gateways";

test.beforeAll(async ({ browser }) => {
  browserType = browser.browserType();
  context = await browser.newContext();
  page = await browser.newPage();

  await blockAdsAndTracking(context);
  await page.goto(URL);
  await page.getByRole("button", { name: /accept all/i }).click();
});

test.afterAll(async () => {
  await page.close();
});

test.describe(URL, () => {
  test("Page title and heading", async () => {
    await expect(page).toHaveTitle(
      /Telnyx launches regional public IP packet gateways/
    );
    await expect(
      page.getByRole("heading", {
        name: /Telnyx launches regional public IP packet gateways/,
        level: 1,
      })
    ).toBeVisible();
  });
});
