import { test, expect, Page, BrowserContext } from "@playwright/test";
import blockAdsAndTracking from "../../blockAdsAndTracking";

test.describe.configure({ mode: "parallel" });

let context: BrowserContext;
let page: Page;
const URL = "/pricing/messaging";

const FORM_ID = "2553";

const onSuccessRedirectsRegex = new RegExp(
  `\.\*content-follow-up\\?formId=${FORM_ID}&email=\.\*telnyx.com`
);

const getForm = async () => {
  const form = await page.locator(`#mktoForm_${FORM_ID}`);
  const firstName = await form.getByLabel("*First Name");
  const lastName = await form.getByLabel("*Last Name");
  const businessEmail = await form.getByLabel("*Business email");
  const receiveEmailsCheckbox = await form.getByLabel(
    "I want to receive emails from Telnyx"
  );

  const submit = await form.getByRole("button", { name: "Submit" });

  return {
    form,
    fields: { firstName, lastName, businessEmail, receiveEmailsCheckbox },
    submit,
  };
};

test.beforeEach(async ({ browser }) => {
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
  test("Page title and heading", async () => {
    await expect(page).toHaveTitle(/SMS and MMS Pricing - Telnyx Messaging/);
    await expect(
      page.getByRole("heading", { name: /Messaging API pricing/, level: 1 })
    ).toBeVisible();
  });

  test("Marketo form Successful", async () => {
    const formHeading = page.getByRole("heading", {
      name: /Download pricing/,
      level: 2,
    });

    // form is lazy loaded. Scroll into it before checking form
    await formHeading.scrollIntoViewIfNeeded();
    await expect(formHeading).toBeVisible();

    const { form, fields, submit } = await getForm();

    await submit.click({
      clickCount: 2 /* first click to bring focus second to click button */,
    });

    await expect(fields.firstName).toHaveAttribute("aria-invalid", "true");
    await expect(await form.getByText("This field is required.")).toBeVisible();

    await fields.firstName.fill("e2e");
    await fields.firstName.press("Tab");
    await expect(fields.firstName).not.toHaveAttribute("aria-invalid", "true");

    await submit.click();

    await expect(fields.lastName).toHaveAttribute("aria-invalid", "true");
    await expect(await form.getByText("This field is required.")).toBeVisible();

    await fields.lastName.fill("e2e");
    await fields.lastName.press("Tab");
    await expect(fields.lastName).not.toHaveAttribute("aria-invalid", "true");

    await submit.click();

    await expect(fields.businessEmail).toHaveAttribute("aria-invalid", "true");
    await expect(await form.getByText(/Must be valid email./i)).toBeVisible();

    await fields.businessEmail.fill("e2e-email");
    await fields.businessEmail.press("Tab");
    await expect(fields.businessEmail).toHaveAttribute("aria-invalid", "true");
    await submit.click();

    await expect(await form.getByText(/Must be valid email./i)).toBeVisible();

    await fields.businessEmail.focus();
    await fields.businessEmail.fill("dotcom.squad@telnyx.com");
    await fields.businessEmail.press("Tab");
    await expect(fields.businessEmail).not.toHaveAttribute(
      "aria-invalid",
      "true"
    );

    await fields.receiveEmailsCheckbox.check();

    await submit.click();
    await expect(await form.getByRole("button")).toHaveText(/Please wait/i);

    await page.waitForURL(onSuccessRedirectsRegex);
    await expect(page.url()).toMatch(onSuccessRedirectsRegex);
  });

  test("Marketo form Fail to load", async () => {
    // block marketo request
    await page.route("**/*", (route) => {
      return route.request().url().includes("marketo")
        ? route.abort()
        : route.continue();
    });

    const formHeading = page.getByRole("heading", {
      name: /Download pricing/,
      level: 2,
    });

    // form is lazy loaded. Scroll into it before checking form
    await formHeading.scrollIntoViewIfNeeded();
    await expect(formHeading).toBeVisible();

    await page.locator(`#mktoForm_${FORM_ID}`).isVisible();
    const ERROR_MSG =
      "There was an error loading the form. Please refresh the page or try again.";
    await page.getByText(ERROR_MSG).isVisible();
  });

  test("Page locale > Select navigation", async () => {
    const countries = [
      {
        name: "France",
        alpha2: "fr",
      },
      {
        name: "Canada",
        alpha2: "ca",
      },
    ];

    await page.locator("#country-filter").click();

    const option0 = await page.getByRole("option", {
      name: countries[0].name,
    });
    await expect(option0).toBeVisible();

    await option0.click();

    await expect(
      page.getByRole("heading", {
        name: `Messaging API pricing for ${countries[0].name}`,
        level: 1,
      })
    ).toBeVisible();

    await page.locator("#country-filter").click();

    const option1 = await page.getByRole("option", {
      name: countries[1].name,
    });
    await expect(option1).toBeVisible();

    await option1.click();

    await expect(
      page.getByRole("heading", {
        name: `Messaging API pricing for ${countries[1].name}`,
        level: 1,
      })
    ).toBeVisible();
  });
});
