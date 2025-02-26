import {
  test,
  expect,
  Page,
  BrowserContext,
  BrowserType,
} from "@playwright/test";
import blockAdsAndTracking from "../../blockAdsAndTracking";

test.describe.configure({ mode: "serial" });

let browserType: BrowserType;
let context: BrowserContext;
let page: Page;
const URL = "/products/llm-library";

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
  test("Page content", async () => {
    await expect(page).toHaveTitle(/LLM Library/);
    await expect(
      page.getByRole("heading", {
        name: /LLM Library/,
        level: 1,
      })
    ).toBeVisible();

    // Check for the contact buttons
    const contactButtons = page.getByRole("link", {
      name: "Contact sales",
      exact: true,
    });
    const countContact = await contactButtons.count();

    for (let i = 0; i < countContact; ++i) {
      expect(contactButtons.nth(i)).toHaveAttribute("href", /\/contact-us/i);
    }

    // Check for the sign up buttons
    const signUpButton = page.getByRole("link", {
      name: "Sign up",
      exact: true,
    });
    const countSignUp = await signUpButton.count();

    for (let i = 0; i < countSignUp; ++i) {
      expect(signUpButton.nth(i)).toHaveAttribute("href", /\/sign-up/i);
    }

    // check for LLM table static copy
    const tableStaticCopy = page.getByRole("heading", {
      name: /Explore Our LLM Library/i,
      level: 2,
    });
    await expect(tableStaticCopy).toBeVisible();

    // check for airtable LLM table rows
    const table = await page.locator("table");
    const tableItems = await table.locator("tbody tr").count();

    await expect(tableItems).toBeGreaterThan(0);

    // check if LLM table is displaying error message
    const tableErrorText =
      "No data available at this time, please try again later.";
    await expect(page.getByText(tableErrorText)).not.toBeAttached();
  });
});
