import {
  test,
  expect,
  Page,
  BrowserContext,
  BrowserType,
  Locator,
} from "@playwright/test";
import blockAdsAndTracking from "../../blockAdsAndTracking";

import methods from "../../methods";

const TEST_NUMBER = "14582471776"; // dotcom squad owned number
const SESSION_DELAY_MS = 10000;

test.describe.configure({ mode: "serial" });

let browserType: BrowserType;
let context: BrowserContext;
let page: Page;
let form: Locator;
let submit: Locator;
const URL = "/voice-ai";

test.beforeAll(async ({ browser }) => {
  browserType = browser.browserType();
  context = await browser.newContext();
  page = await browser.newPage();

  await blockAdsAndTracking(context);
  await page.goto(URL);
  await page.getByRole("link", { name: /Build now/i }).click();

  form = await page.locator("form");
  submit = await form.getByRole("button", { name: /Build My Voice Bot/i });
});

test.afterAll(async () => {
  await page.close();
});

test.describe(URL, () => {
  test("Page content", async () => {
    await expect(page).toHaveTitle(/Telnyx Voice AI/);
    await expect(
      page.getByRole("heading", {
        name: "What is your Company name?",
      })
    ).toBeVisible();

    // Check for the contact buttons
    const contactButtons = page.getByRole("link", {
      name: "Contact sales",
      exact: true,
    });
    const countContact = await contactButtons.count();

    for (let i = 0; i < countContact; ++i) {
      await expect(contactButtons.nth(i)).toHaveAttribute(
        "href",
        /\/contact-us/i
      );
    }

    // Check for the sign up buttons
    const signUpButton = page.getByRole("link", {
      name: "Sign up",
      exact: true,
    });
    const countSignUp = await signUpButton.count();

    for (let i = 0; i < countSignUp; ++i) {
      await expect(signUpButton.nth(i)).toHaveAttribute("href", /\/sign-up/i);
    }
  });
});

// due to reCAPTCHA
test.describe(URL, async () => {
  // submit form and check for success message

  test("Fill Out Form", async () => {
    // Wait for the business_name input field
    await page.waitForSelector('input[name="business_name"]');
    await page.fill('input[name="business_name"]', "Telnyx");
    await page.click('button[aria-label="Next"]');

    // Wait for the domain input field
    await page.waitForSelector('input[name="domain"]');
    await page.fill('input[name="domain"]', "telnyx.com");
    await page.click('button[aria-label="Next"]');

    // Wait for the phone_number input field
    await page.waitForSelector('input[name="phone_number"]');
    await page.fill('input[name="phone_number"]', TEST_NUMBER);
    await page.click('button[aria-label="Next"]');

    // Wait for the email input field
    await page.waitForSelector('input[name="email"]');
    await page.fill('input[name="email"]', "dotcom.squad@telnyx.com");
    // Click terms and conditions checkbox
    await form
      .getByLabel("I agree to Telnyx’s Terms & Conditions and Privacy Policy.")
      .check();
  });

  test.skip("Try Captcha", async () => {
    // Try hCaptcha
    const captcha = await page
      .frameLocator(
        'iframe[title="Widget containing checkbox for hCaptcha security challenge"]'
      )
      .locator("body");
    await captcha.waitFor({ state: "visible" });
    await captcha.click();

    const checkboxHandle = await captcha.elementHandle();

    // Wait for the checkbox to be visible, to confirm that the captcha passes
    await page.waitForFunction((element) => {
      const shown = element && getComputedStyle(element).display !== "none";
      console.log("shown", shown);
      return shown;
    }, checkboxHandle);
  });

  test.skip("Submit Form", async () => {
    await submit.click();
  });

  test.skip("Expect Success", async () => {
    await expect(page.getByText(/Your AI agent is ready/i)).toBeVisible();
  });

  test.skip("Confirm Call Session", async () => {
    // check portal for successful call session
    const callSession = await methods.GetVoiceSessions({
      "page[number]": 1,
      "page[size]": 1,
    });

    console.log(callSession);

    const callSessionEvents = await methods.GetSessionEvents(
      callSession.data[0].id
    );

    const didCallInit = await callSessionEvents.data.some(
      (i: any) => i.name === "dial"
    );
    setTimeout(() => expect(didCallInit).toBeTruthy(), SESSION_DELAY_MS);
  });
});
