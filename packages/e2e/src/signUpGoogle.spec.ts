import { test, Page, BrowserContext } from "@playwright/test";
import blockAdsAndTracking from "../blockAdsAndTracking";

test.describe.configure({ mode: "serial" });

let context: BrowserContext;
let page: Page;
const URL = "/sign-up";

test.beforeAll(async ({ browser }) => {
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
  test("Sign up with Google Button click", async () => {
    // https://github.com/microsoft/playwright/issues/12298 - iframe and google gsi button overlay intercepts clicks
    const container = await page.getByTestId("google-gsi-signup-form");
    await container.click();

    // https://accounts.google.com/v3/signin/identifier
    await page.waitForURL(/.*accounts.google.com\/v3\/signin\/identifier.*/);
  });

  test("Sign up with Google redirect to the portal", async () => {
    await page
      .getByLabel(/Email or phone/i)
      .fill(String(process.env.E2E_GOOGLE_USER_EMAIL));
    await page.getByRole("button", { name: /next/i }).click();

    // https://accounts.google.com/v3/signin/challenge/pwd
    await page.waitForURL(
      /.*accounts.google.com\/v3\/signin\/challenge\/pwd.*/
    );
    await page
      .getByLabel(/Enter your password/gi)
      .fill(String(process.env.E2E_GOOGLE_USER_PASSWORD));
    await page // on google screen there are both `identifierNext` and `passwordNext`
      .locator("#passwordNext")
      .getByRole("button", { name: /next/i })
      .click();

    // https://portaldev.telnyx.com/#/login/sign-in-provider?user=...&token=...&provider=google_sign_in&requires_two_factor_auth=false&first_name=Telnyx&last_name=Engineering
    await page.waitForURL(
      /.*portal(dev)?.telnyx.com.*\?user=.*telnyx.company&token=.*/
    );
  });
});
