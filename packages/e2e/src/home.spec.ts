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
const URL = "/";

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
        name: /Experience AI-powered connectivity/,
        level: 1,
      })
    ).toBeVisible();
  });

  test("Secondary headings", async () => {
    await expect(
      page.getByRole("heading", {
        name: /Leverage a complete AI stack, from GPU to API, on one platform./,
        level: 2,
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: /Improve CX with AI-powered voice./,
        level: 2,
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: /A true global provider that’s already there/,
        level: 2,
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: /Cost-effective, global data connectivity on one SIM/,
        level: 2,
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: /Simplify communication, connectivity, and AI with best-in-class tooling/,
        level: 2,
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: /Empower innovation with our API-first platform/,
        level: 2,
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: /What will you build with Telnyx?/,
        level: 2,
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: /Need more information\? We're here to help./,
        level: 2,
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: /Connect with us/,
        level: 2,
      })
    ).toBeVisible();
  });
});
