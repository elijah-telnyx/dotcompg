import {
  test,
  expect,
  Page,
  BrowserContext,
  BrowserType,
} from "@playwright/test";
import blockAdsAndTracking from "../../blockAdsAndTracking";
import {
  initialInputList,
  endInputList,
  supportInputList,
  URL,
  FORM_ID,
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
  test("form loads", async () => {
    await expect(page).toHaveTitle(
      /Contact - Get in touch with Telnyx Sales or Support/
    );
    await expect(
      page.getByRole("heading", {
        name: /Talk to an expert/,
        level: 1,
      })
    ).toBeVisible();

    const form = page.locator(`#${FORM_ID}`);
    await expect(form).toBeVisible();

    // reason not selected yet, use default input list
    for (const element of [...initialInputList, ...endInputList]) {
      const label = page.getByLabel(element.label);
      await expect(label).toBeVisible();
    }
  });

  test("form validates", async () => {
    const form = page.locator(`#${FORM_ID}`);
    await expect(form).toBeVisible();

    for (const element of supportInputList) {
      if (element.isRequired) {
        await page.click(`button[type="submit"]`);
        await expect(page.locator(`#ValidMsg${element.fieldId}`)).toBeVisible();

        if (element.field.type === "input") {
          await page.getByLabel(element.label).fill(element.field.value);
        }
        if (element.field.type === "select") {
          await page
            .getByLabel(element.label)
            .selectOption({ value: element.field.value });
        }
        if (element.field.type === "checkbox") {
          await page.getByLabel(element.label).click();
        }

        await page.click(`button[type="submit"]`);
        await expect(
          page.locator(`#ValidMsg${element.fieldId}`)
        ).not.toBeVisible();
      }
    }
  });
});
