import {
  test,
  expect,
  Page,
  BrowserContext,
  BrowserType,
} from "@playwright/test";
import blockAdsAndTracking from "../blockAdsAndTracking";

test.describe.configure({ mode: "serial" });

let browserType: BrowserType;
let context: BrowserContext;
let page: Page;
const URL = "/resources";

test.beforeAll(async ({ browser }) => {
  browserType = browser.browserType();
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
  test("Page title and headings", async () => {
    await expect(page).toHaveTitle(/Telnyx Blog \| CPaas & UCaaS Resources/);
    await expect(
      page.getByRole("heading", {
        name: /Browse all articles, guides, and news/,
        level: 1,
      })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: /Most popular/,
        level: 3,
      })
    ).toBeVisible();
  });

  test.skip("Check for resource urls", async () => {
    const refs = await page.getByRole("link").all();
    const links = await Promise.all(refs.map((i) => i.getAttribute("href")));
    const hasResourceLinks = links.some((i) => i?.includes("/resources/"));
    expect(hasResourceLinks).toBe(true);
  });

  test("Check for filter copy", async () => {
    const refs = await page.getByText("Filter by ").all();
    const labels = await Promise.all(refs.map((i) => i.innerText()));

    const productFilter = labels.some((i) => i?.includes("product:"));
    expect(productFilter).toBe(true);

    const contentTypeFilter = labels.some((i) => i?.includes("content type:"));
    expect(contentTypeFilter).toBe(true);
  });
});
