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
const URL = "/resources/call-recording-what-is-isnt-legal";

test.beforeEach(async ({ browser }) => {
  browserType = browser.browserType();
  context = await browser.newContext();
  page = await browser.newPage();

  await blockAdsAndTracking(context);
  await page.goto(URL);
  await page.getByRole("button", { name: /accept all/i }).click();
});

test.afterEach(async () => {
  await page.close();
});

test.describe(URL, () => {
  test("Page title and headings", async () => {
    await expect(
      page.getByRole("heading", {
        name: /Call Recording: What Is and Isn\’t Legal/i,
        level: 1,
      })
    ).toBeVisible();

    const formHeading = page.getByRole("heading", {
      name: /Sign up for emails of our latest articles and news/,
      level: 2,
    });

    // form is lazy loaded. Scroll into it before checking form
    await formHeading.scrollIntoViewIfNeeded();
    await expect(formHeading).toBeVisible();

    const button = await page.getByRole("button", { name: /Subscribe/i });

    await expect(button).toBeVisible();
    await expect(page.getByText(/Related articles/i)).toBeVisible();
  });
});
