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
const URL = "/products/voice-api";

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
    await expect(page).toHaveTitle(/Programmable Voice for Developers/i);
    await expect(
      page.getByRole("heading", {
        name: /Voice API/i,
        level: 1,
      })
    ).toBeVisible();

    // Check for the contact buttons
    const contactButtons = page.getByRole("link", {
      name: "Talk to an Expert",
      exact: true,
    });
    const countContact = await contactButtons.count();

    for (let i = 0; i < countContact; ++i) {
      expect(contactButtons.nth(i)).toHaveAttribute("href", "/contact-us");
    }

    // Check for the sign up buttons
    const signUpButton = page.getByRole("link", {
      name: "Sign up",
      exact: true,
    });
    const countSignUp = await signUpButton.count();

    for (let i = 0; i < countSignUp; ++i) {
      expect(signUpButton.nth(i)).toHaveAttribute("href", /\/sign-up$/);
    }

    // Check for a link to pricing page
    await expect(
      page.getByRole("link", {
        name: "See pricing",
        exact: true,
      })
    ).toHaveAttribute("href", "https://telnyx.com/pricing/call-control");
  });
});
