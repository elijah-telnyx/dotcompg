import {
  test,
  expect,
  Page,
  BrowserContext,
  BrowserType,
} from "@playwright/test";
import blockAdsAndTracking from "../../blockAdsAndTracking";
import {
  supportInputList,
  salesInputList,
  URL,
  FORM_ID,
  fillForm,
} from "./utils";

test.describe.configure({ mode: "parallel" });

let browserType: BrowserType;
let context: BrowserContext;
let page: Page;

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
  test("form support submit", async () => {
    const form = page.locator(`#${FORM_ID}`);
    await expect(form).toBeVisible();

    await fillForm(page);

    await page.getByRole("button", { name: "Submit" }).click();

    await page
      .getByRole("heading", {
        name: /Thank you/gi,
        level: 1,
      })
      .waitFor();

    // This set on marketo
    await expect(page).toHaveURL(/thank-you-support/);
  });
});
