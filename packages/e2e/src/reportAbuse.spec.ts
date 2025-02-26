import {
  test,
  expect,
  Page,
  BrowserContext,
  BrowserType,
  Locator,
} from "@playwright/test";
import blockAdsAndTracking from "../blockAdsAndTracking";

test.describe.configure({ mode: "serial" });

let browserType: BrowserType;
let context: BrowserContext;
let page: Page;
let form: Locator;
let submit: Locator;
const URL = "/report-abuse";
const ABUSIVE_NUMBERS = [
  "+442045204417",
  "+442045200853",
  "+442045203585",
  "+442045206033",
  "+441615203585",
  "+441615203126",
];
const ABUSED_NUMBERS = ["+13125001235"];

test.beforeAll(async ({ browser }) => {
  browserType = browser.browserType();
  context = await browser.newContext();
  page = await browser.newPage();

  await blockAdsAndTracking(context);
  await page.goto(URL);
  await page.getByRole("button", { name: /accept all/i }).click();

  form = await page.locator("form");
  submit = await form.getByRole("button", { name: /Submit/i });
});

test.afterAll(async () => {
  await page.close();
});

test.describe(URL, () => {
  test("Page title and heading", async () => {
    await expect(page).toHaveTitle(/Report Abuse made on the Telnyx platform/i);
    await expect(
      page.getByRole("heading", {
        name: /Report Abuse/i,
        level: 1,
      })
    ).toBeVisible();
  });

  test("form load", async () => {
    const heading = page.getByRole("heading", {
      name: /Abuse report details/i,
      level: 3,
    });

    const shortDescription = form.getByLabel(/What are you reporting/i);

    await expect(form).toBeVisible();
    await expect(heading).toBeVisible();
    await expect(shortDescription).toBeVisible();
    await expect(submit).toBeVisible();
  });

  test("form validation", async () => {
    await form.getByLabel(/Email/i).fill("dotcom");
    await submit.click();

    const shortDescriptionMessageId = await form
      .getByLabel(/What are you reporting/i)
      .getAttribute("aria-errormessage");

    const abusivePhoneNumberMessageId = await form
      .getByLabel(/^Phone number\(s\) causing the abuse/i)
      .getAttribute("aria-errormessage");

    const abusedPhoneNumberMessageId = await form
      .getByLabel(/^Phone number\(s\) receiving the abuse/i)
      .getAttribute("aria-errormessage");

    const dateTimeMessageId = await form
      .getByLabel(/Date and time of the abuse/i)
      .getAttribute("aria-errormessage");

    const emailMessageId = await form
      .getByLabel(/Email/i)
      .getAttribute("aria-errormessage");

    await expect(form.locator(`#${shortDescriptionMessageId}`)).toHaveText(
      /This field is required/i
    );
    await expect(form.locator(`#${abusivePhoneNumberMessageId}`)).toHaveText(
      /This field is required/i
    );
    await expect(form.locator(`#${abusedPhoneNumberMessageId}`)).toHaveText(
      /This field is required/i
    );
    await expect(form.locator(`#${dateTimeMessageId}`)).toHaveText(
      /This field is required/i
    );
    await expect(form.locator(`#${emailMessageId}`)).toHaveText(
      /Please enter a valid email address/i
    );
  });

  test("form submit", async () => {
    await form
      .getByLabel(/What are you reporting/i)
      .fill("This is an E2E test from the dotcom squad. Please ignore.");
    await form.getByLabel(/Country of phone number causing the abuse/i).click();
    await page.getByRole("option", { name: /United Kingdom/i }).click();
    await form
      .getByLabel("Phone number(s) causing the abuse")
      .fill(ABUSIVE_NUMBERS.join(","));
    await form
      .getByLabel(/Country of phone number receiving the abuse/i)
      .click();
    await page.getByRole("option", { name: /United States/i }).click();
    await form
      .getByLabel("Phone number(s) receiving the abuse")
      .fill(ABUSED_NUMBERS.join(","));
    await form
      .getByLabel(/Date and time of the abuse/i)
      .fill("2023-05-08T09:00");
    await form.getByLabel(/Voice/i).click();
    await form.getByLabel(/Messaging/i).click();
    await form.getByLabel(/Full name/i).fill("Dotcom Squad");
    await form.getByLabel(/Email/i).fill("dotcom.squad@telnyx.com");
    await form
      .getByLabel(/Additional details/i)
      .fill("This is an E2E test from the dotcom squad. Please ignore.");

    await submit.click();

    await expect(page.getByText(/Thank You/i)).toBeVisible();
  });
});
