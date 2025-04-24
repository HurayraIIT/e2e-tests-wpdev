//@ts-check

// Card: https://projects.startise.com/fbs-75156
// This issue was introduced from WordPress version 6.8, fixed in EmbedPress v4.2.4

import { test, expect } from "@playwright/test";
import { randomSlug, randomString } from "../../../utils/random-data";


test.describe("EmbedPress Free Release 4.2.4 @embedpress", () => {
  test("should not throw the '_load_textdomain_just_in_time' PHP error", async ({ browser }) => {
    const context = await browser.newContext({ storageState: "playwright/.auth/admin.json" });
    const page = await context.newPage();
    await page.goto("/wp-admin/admin.php?page=embedpress");
    await page.waitForLoadState("domcontentloaded");

    // Verify that the error is not present in the webpage
    await expect(page.locator('text=/_load_textdomain_just_in_time.*embedpress/')).toHaveCount(0);
  });
});
