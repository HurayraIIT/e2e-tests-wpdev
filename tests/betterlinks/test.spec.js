//@ts-check
import { test, expect } from "@playwright/test";
import { randomSlug, randomString } from "../../utils/random-data";

test.describe("Betterlinks @betterlinks", () => {
  const category_name = randomString();
  const tag_name = randomString();
  const link_title = randomString();
  const link_description = randomString();
  const target_link = `https://hurayraiit.com/notfound${randomSlug()}`;
  const short_link_slug = `ah/${randomSlug()}`;
  const short_link = `${process.env.BASE_URL}/${short_link_slug}`;

  test("can create links @happy", async ({ browser }) => {
    const adminContext = await browser.newContext({ storageState: "playwright/.auth/admin.json" });
    const page = await adminContext.newPage();

    await page.goto("/wp-admin/admin.php?page=betterlinks");

    await expect.soft(page.locator("#betterlinksbody div").filter({ hasText: /^BetterLinks$/ })).toBeVisible();
    await expect.soft(page.getByRole("button", { name: "Add New Link" })).toBeVisible();
    await expect.soft(page.getByRole("button", { name: "Favorite Links" })).toBeVisible();
    await expect.soft(page.getByText("Add New Category")).toBeVisible();

    // Create a new category
    await page.locator("button.dnd-create-category-button").click();
    await expect.soft(page.getByText("Add New Category")).toBeVisible();
    await page.getByPlaceholder("* Name").fill(category_name);
    await page.getByRole("button", { name: "Submit" }).click();
    await expect.soft(page.getByRole("heading", { name: category_name })).toBeVisible();

    // Create a new link
    await page
      .getByRole("heading", { name: category_name })
      .locator("..")
      .locator("..")
      .locator("button.btl-create-link-button")
      .click();

    await page.getByLabel("Title").fill(link_title);
    await page.getByLabel("Description").fill(link_description);

    await page.getByLabel("Target URL", { exact: true }).fill(target_link);
    await page.getByLabel("Shortened URL").fill(short_link_slug);

    await page.getByRole("button", { name: "Publish" }).click();
    await expect.soft(page.getByRole("button", { name: link_title, exact: true })).toBeVisible();

    // Assert link functionality
    await page.goto(short_link);
    expect.soft(page.url()).toBe(target_link);

    // Delete the link
    await page.goto("/wp-admin/admin.php?page=betterlinks");
    await page.getByRole("heading", { name: link_title }).locator("..").locator("button.delete-button").click();
    await expect.soft(page.getByRole("button", { name: "Yes", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Yes", exact: true }).click();
    await expect.soft(page.getByText(link_title)).not.toBeVisible();
    
    // Delete the category
    await page.getByRole("heading", { name: category_name }).locator("..").locator("div.dropdown").click();
    await page.getByRole("button", { name: "Delete" }).click();
    await expect.soft(page.getByText("Are You Sure?YesNo")).toBeVisible();
    await page.getByRole("button", { name: "Yes" }).click();
    await expect.soft(page.getByText("Add New Category")).toBeVisible();
    await expect.soft(page.getByText(category_name)).not.toBeVisible();

    // Reload and verify
    await page.reload();
    await expect.soft(page.getByText(link_title)).not.toBeVisible();
    await expect.soft(page.getByText(category_name)).not.toBeVisible();

    await adminContext.close();
  });
});
