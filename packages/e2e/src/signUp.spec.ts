import {
  test,
  expect,
  Page,
  BrowserContext,
  Locator,
  ConsoleMessage,
} from "@playwright/test";
import blockAdsAndTracking from "../blockAdsAndTracking";

test.describe.configure({ mode: "serial" });

let context: BrowserContext;
let page: Page;
let credentials: {
  form: Locator;
  submitButton: Locator;
  email: Locator;
  firstName: Locator;
  lastName: Locator;
  password: Locator;
  termsAndConditions: Locator;
};
let isLowRecaptchaScore: boolean;

const URL = "/sign-up";
const MIN_SCORE_TO_VALIDATE = 0.8;
const WAIT_FOR_CONSOLE_TIMEOUT = 10000;

async function hasLowRecaptchaScoreConsoleMessage() {
  const message = await page
    .waitForEvent("console", {
      predicate: (message) => message.text().includes("Recaptcha V3 score:"),
      timeout: WAIT_FOR_CONSOLE_TIMEOUT,
    })
    .catch(
      // console message can be empty, do not block flow
      () =>
        ({
          text: () => "Recaptcha V3 score: 0.0",
          type: () => "log",
        } as ConsoleMessage)
    );
  const recaptchaText = message.text().split(" ");
  const recaptchaScore = Number(recaptchaText.at(recaptchaText.length - 1));

  return (
    recaptchaScore <= MIN_SCORE_TO_VALIDATE &&
    // recaptcha checks are only enabled in production
    String(process.env.RUNTIME_ENV) === "production"
  );
}

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await browser.newPage();
  let form = page.getByRole("form", {
    name: "signup-form",
    exact: true,
  });

  credentials = {
    form,
    submitButton: form.getByRole("button", {
      name: /Sign up/i,
    }),
    email: form.getByLabel(/Company email/i),
    firstName: form.getByLabel(/First name/i),
    lastName: form.getByLabel(/Last name/i),
    password: form.getByLabel("Password", {
      exact: true,
    }),
    termsAndConditions: form.getByLabel(
      "I agree to Telnyx’s Terms & Conditions and Privacy Policy."
    ),
  };

  await blockAdsAndTracking(context);
  await page.goto(URL);
  await page.getByRole("button", { name: /accept all/i }).click();

  // recaptcha script is set to `execute` on page load
  isLowRecaptchaScore = await hasLowRecaptchaScoreConsoleMessage();
});

test.afterAll(async () => {
  await page.close();
});

test.describe(URL, () => {
  test("Page title and heading", async () => {
    await expect(page).toHaveTitle(/Sign up | Get started with Telnyx/);
    await expect(
      page.getByRole("heading", { name: /Create a Telnyx account/, level: 1 })
    ).toBeVisible();
  });

  test("Credentials form load", async () => {
    await expect(credentials.form).toBeVisible();

    await expect(credentials.email).toBeVisible();
    await expect(credentials.firstName).toBeVisible();
    await expect(credentials.lastName).toBeVisible();
    await expect(credentials.password).toBeVisible();
    await expect(credentials.termsAndConditions).toBeVisible();
    await expect(credentials.submitButton).toBeEnabled();
  });

  test("Credentials form validation", async () => {
    await credentials.submitButton.click();

    const emailMessageId = await credentials.email.getAttribute(
      "aria-errormessage"
    );

    const firstNameId = await credentials.firstName.getAttribute(
      "aria-errormessage"
    );

    const lastNameId = await credentials.lastName.getAttribute(
      "aria-errormessage"
    );

    const passwordId = await credentials.password.getAttribute(
      "aria-errormessage"
    );

    const termsAndConditionsId =
      await credentials.termsAndConditions.getAttribute("aria-errormessage");

    await expect(credentials.form.locator(`#${emailMessageId}`)).toHaveText(
      /This field is required/i
    );
    await expect(credentials.form.locator(`#${firstNameId}`)).toHaveText(
      /This field is required/i
    );
    await expect(credentials.form.locator(`#${lastNameId}`)).toHaveText(
      /This field is required/i
    );
    await expect(credentials.form.locator(`#${passwordId}`)).toHaveText(
      /Password must/i
    );
    await expect(
      credentials.form.locator(`#${termsAndConditionsId}`)
    ).toHaveText(/Please accept the terms and conditions/i);

    await expect(credentials.submitButton).toBeEnabled();
  });

  test("Form submit validation", async () => {
    await credentials.email.fill("dotcom.squad.telnyx@gmail.com");
    await credentials.firstName.fill("Dotcom");
    await credentials.lastName.fill("Squad");
    await credentials.password.fill("Password123!");
    await credentials.termsAndConditions.check();

    await credentials.submitButton.click();

    // recaptcha script is also set to `execute` on form submit errors
    isLowRecaptchaScore = await hasLowRecaptchaScoreConsoleMessage();

    await expect(credentials.submitButton).toBeEnabled({
      timeout: Number(process.env.E2E_TEST_TIMEOUT),
    });

    const emailMessageId = await credentials.email.getAttribute(
      "aria-errormessage"
    );

    if (isLowRecaptchaScore) {
      await expect(
        page.getByText(/could not be authenticated via recaptcha/i)
      ).toBeVisible();

      return;
    }

    await expect(credentials.form.locator(`#${emailMessageId}`)).toHaveText(
      /another account already exists/i
    );

    await expect(
      page.getByText(/one or more fields are not valid/i)
    ).toBeVisible();

    await expect(credentials.submitButton).toBeEnabled();
  });

  test("Form submit", async () => {
    await credentials.email.fill("dotcom.squad@telnyx.com");
    await credentials.firstName.fill("Dotcom");
    await credentials.lastName.fill("Squad");
    await credentials.password.fill("Password123!");
    await credentials.termsAndConditions.check();

    await credentials.submitButton.click();

    const emailMessageId = await credentials.email.getAttribute(
      "aria-errormessage"
    );

    await expect(emailMessageId).toBeNull();

    if (isLowRecaptchaScore) {
      await expect(
        page.getByText(/could not be authenticated via recaptcha/i)
      ).toBeVisible();

      return;
    }

    await page.waitForURL(/^.*sign-up\/verify-email\/b.*/);

    await expect(
      page.getByRole("heading", { name: /One last step/i, level: 1 })
    ).toBeVisible();

    await expect(
      page.getByText(
        /In order to finish creating your account, please confirm your email address/i
      )
    ).toBeVisible();
  });
});
