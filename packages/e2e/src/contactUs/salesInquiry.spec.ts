import {
  test,
  expect,
  Page,
  BrowserContext,
  BrowserType,
} from "@playwright/test";
import blockAdsAndTracking from "../../blockAdsAndTracking";
import {
  phoneExtensions,
  salesInputList,
  URL,
  FORM_ID,
  fillForm,
} from "./utils";

test.describe.configure({ mode: "parallel" });

let context: BrowserContext;
let page: Page;

const setRichBudget = async ({ page }: { page: Page }) => {
  const Form_Budget__c = salesInputList.find(
    ({ fieldId }) => fieldId === "Form_Budget__c"
  );

  await page
    .getByLabel(Form_Budget__c!.label)
    .selectOption({ value: "$5000+" });
};

/**
 * selects a product which yields no additional "use case" field
 */
const setInterestWithNoUseCase = async ({ page }: { page: Page }) => {
  const Form_Product__c = salesInputList.find(
    ({ fieldId }) => fieldId === "Form_Product__c"
  );

  await page
    .getByLabel(Form_Product__c!.label)
    .selectOption({ value: "Storage" });
};

const setPhoneExtension = async ({
  page,
  extension,
}: {
  page: Page;
  extension: keyof typeof phoneExtensions;
}) => {
  const phoneExt = salesInputList.find(
    ({ fieldId }) => fieldId === "Phone_Number_Extension__c"
  );

  await page
    .getByLabel(phoneExt!.label)
    .selectOption({ value: phoneExtensions[extension] });
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
  test("form sales submit - APAC", async () => {
    const form = page.locator(`#${FORM_ID}`);
    await expect(form).toBeVisible();

    await fillForm(page, true);

    await setPhoneExtension({ page, extension: "APAC" });
    await setRichBudget({ page });

    // wait for popup event and submit click, but only assign the first returned promise
    const [newTab] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("button", { name: "Submit" }).click(),
    ]);

    await page
      .getByRole("heading", {
        name: /Thank you/gi,
        level: 1,
      })
      .waitFor();

    await expect(page).toHaveURL(/thank-you/);

    // check that the new tab opened the correct URL
    await newTab.waitForLoadState();
    await expect(newTab).toHaveURL(/(domenichanuman)/);
  });

  test("form sales submit - AMER", async () => {
    const form = page.locator(`#${FORM_ID}`);
    await expect(form).toBeVisible();

    await fillForm(page, true);

    await setPhoneExtension({ page, extension: "AMER" });
    await setRichBudget({ page });

    // wait for popup event and submit click, but only assign the first returned promise
    const [newTab] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("button", { name: "Submit" }).click(),
    ]);

    await page
      .getByRole("heading", {
        name: /Thank you/gi,
        level: 1,
      })
      .waitFor();

    await expect(page).toHaveURL(/thank-you/);

    // check that the new tab opened the correct URL
    await newTab.waitForLoadState();
    await expect(newTab).toHaveURL(/(amer)/);
  });

  test("form sales submit - EMEA", async () => {
    const form = page.locator(`#${FORM_ID}`);
    await expect(form).toBeVisible();

    await fillForm(page, true);

    await setPhoneExtension({ page, extension: "EMEA" });
    await setRichBudget({ page });

    // wait for popup event and submit click, but only assign the first returned promise
    const [newTab] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("button", { name: "Submit" }).click(),
    ]);

    await page
      .getByRole("heading", {
        name: /Thank you/gi,
        level: 1,
      })
      .waitFor();

    await expect(page).toHaveURL(/thank-you/);

    // check that the new tab opened the correct URL
    await newTab.waitForLoadState();
    await expect(newTab).toHaveURL(/(emea)/);
  });

  test("form sales submit (no use case) - APAC", async () => {
    const form = page.locator(`#${FORM_ID}`);
    await expect(form).toBeVisible();

    await fillForm(page, true);

    await setPhoneExtension({ page, extension: "APAC" });
    await setRichBudget({ page });
    await setInterestWithNoUseCase({ page });

    // wait for popup event and submit click, but only assign the first returned promise
    const [newTab] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("button", { name: "Submit" }).click(),
    ]);

    await page
      .getByRole("heading", {
        name: /Thank you/gi,
        level: 1,
      })
      .waitFor();

    await expect(page).toHaveURL(/thank-you/);

    // check that the new tab opened the correct URL
    await newTab.waitForLoadState();
    await expect(newTab).toHaveURL(/(domenichanuman)/);
  });

  test("form sales submit (no use case) - AMER", async () => {
    const form = page.locator(`#${FORM_ID}`);
    await expect(form).toBeVisible();

    await fillForm(page, true);

    await setPhoneExtension({ page, extension: "AMER" });
    await setRichBudget({ page });
    await setInterestWithNoUseCase({ page });

    // wait for popup event and submit click, but only assign the first returned promise
    const [newTab] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("button", { name: "Submit" }).click(),
    ]);

    await page
      .getByRole("heading", {
        name: /Thank you/gi,
        level: 1,
      })
      .waitFor();

    await expect(page).toHaveURL(/thank-you/);

    // check that the new tab opened the correct URL
    await newTab.waitForLoadState();
    await expect(newTab).toHaveURL(/(amer)/);
  });

  test("form sales submit (no use case) - EMEA", async () => {
    const form = page.locator(`#${FORM_ID}`);
    await expect(form).toBeVisible();

    await fillForm(page, true);

    await setPhoneExtension({ page, extension: "EMEA" });
    await setRichBudget({ page });
    await setInterestWithNoUseCase({ page });

    // wait for popup event and submit click, but only assign the first returned promise
    const [newTab] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("button", { name: "Submit" }).click(),
    ]);

    await page
      .getByRole("heading", {
        name: /Thank you/gi,
        level: 1,
      })
      .waitFor();

    await expect(page).toHaveURL(/thank-you/);

    // check that the new tab opened the correct URL
    await newTab.waitForLoadState();
    await expect(newTab).toHaveURL(/(emea)/);
  });
});
