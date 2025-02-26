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
const URL = "/release-notes";

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
      /Telnyx - Global solutions for Communications, IOT, AI, Compute and Networking/
    );
    await expect(
      page.getByRole("heading", {
        name: /Release notes/,
        level: 1,
      })
    ).toBeVisible();
    await expect(
      page.getByRole("link", {
        name: /Subscribe to RSS/,
      })
    ).toBeVisible();
  });

  test.skip("Check for release note urls", async () => {
    const refs = await page.getByRole("link").all();
    const links = await Promise.all(refs.map((i) => i.getAttribute("href")));
    const hasLinks = links.some((i) => i?.includes("/release-notes/"));
    expect(hasLinks).toBe(true);
  });
});
