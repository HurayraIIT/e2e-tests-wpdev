// @ts-check
const { test, expect } = require("@playwright/test");

test("has title", async ({ page }) => {
  await page.goto(`${process.env.BASE_URL}`);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/E2E Tests/);
});
