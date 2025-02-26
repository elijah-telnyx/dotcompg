import {
  test,
  expect,
  Page,
  BrowserContext,
  BrowserType,
  Locator,
} from "@playwright/test";
import * as path from "path";
import blockAdsAndTracking from "../blockAdsAndTracking";

test.describe.configure({ mode: "parallel" });

let browserType: BrowserType;
let context: BrowserContext;
let page: Page;
let form: Locator;
let submit: Locator;

const URL = "/law-enforcement-request";

test.beforeAll(async ({ browser }) => {
  browserType = browser.browserType();
  context = await browser.newContext();
  page = await browser.newPage();

  await blockAdsAndTracking(context);
  await page.goto(URL);
  await page.getByRole("button", { name: /accept all/i }).click();

  form = page.locator("form");
  submit = form.getByRole("button", { name: /Submit/i });
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
        name: /Telnyx Subpoena \/ Law Enforcement Request/i,
        level: 1,
      })
    ).toBeVisible();
  });
});

test.describe(URL, () => {
  test("Check form basic functionality", async () => {
    await form.getByLabel(/Full name/i).fill("Dotcom E2E Test");
    await form.getByLabel(/Authorized Agency \/ Department/i).fill("Telnyx");
    await form.getByLabel(/Email/i).fill("dotcom.squad@telnyx.com");
    await form.getByLabel(/Your Phone Number/i).fill("+14582471776");
    await form.getByLabel(/Subscriber Info/i).click();
    await form.getByLabel(/Request Start Date/i).fill("2024-01-01T04:00");

    await submit.click();

    const chooseFile = await form.getByLabel(
      /Attach Subpoena, Court Order, or Warrant/i
    );

    const chooseFileId = await form
      .getByLabel(/Attach Subpoena, Court Order, or Warrant/i)
      .getAttribute("aria-errormessage");

    const targetNumbersId = await form
      .getByLabel(/Target Telephone Number\(s\)/i)
      .getAttribute("aria-errormessage");

    const endDateId = await form
      .getByLabel(/Request End Date/i)
      .getAttribute("aria-errormessage");

    await expect(form.locator(`#${targetNumbersId}`)).toHaveText(
      /This field is required/i
    );

    await expect(form.locator(`#${endDateId}`)).toHaveText(
      /This field is required/i
    );

    await expect(form.locator(`#${chooseFileId}`)).toHaveText(
      /This field is required/i
    );

    await chooseFile.setInputFiles(path.join(__dirname, "subpoena.docx"));

    await submit.click();
    await expect(form.locator(`#${chooseFileId}`)).not.toBeAttached();
  });
});
