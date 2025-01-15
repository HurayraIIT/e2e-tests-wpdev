//@ts-check
import { test, expect } from "@playwright/test";
import { randomSlug, randomString } from "../../utils/random-data";

test.describe("Notificationx Quick Builder @notificationx", () => {
  test("can create notifcaiton using the quick builder @happy", async ({ browser }) => {
    const context = await browser.newContext({ storageState: "playwright/.auth/admin.json" });
    const page = await context.newPage();
    await page.goto("/wp-admin/index.php");

    // Verify dashboard widget
    await expect(page.locator("#nx_analytics_dashboard_widget")).toMatchAriaSnapshot(`
      - heading "NotificationX Analytics" [level=2]
      - button "Move up"
      - button "Move down"
      - 'button "Toggle panel: NotificationX Analytics" [expanded]'
      - link /Total Views \\d+ Total Views/:
        - img "Total Views"
      - link /Total Clicks \\d+ Total Clicks/:
        - img "Total Clicks"
      - link /Click-Through-Rate \\d+% Click-Through-Rate/:
        - img "Click-Through-Rate"
    `);

    // Verify menu items
    await expect(page.getByRole("link", { name: "NotificationX", exact: true })).toBeVisible();
    await page.getByRole("link", { name: "NotificationX", exact: true }).hover();
    await expect(page.locator("#toplevel_page_nx-admin")).toMatchAriaSnapshot(`
      - list:
        - listitem:
          - link "Dashboard"
        - listitem:
          - link "All NotificationX"
        - listitem:
          - link "Add New"
        - listitem:
          - link "Settings"
        - listitem:
          - link "Analytics"
        - listitem:
          - link "Quick Builder"
    `);

    // Visit quick builder
    await page.goto("/wp-admin/admin.php?page=nx-builder");

    // admin header image and version number
    await expect.soft(page.locator("div.nx-admin-header svg")).toBeVisible();
    // await expect.soft(page.locator("div.nx-header-right span")).toContainText(/NotificationX: \d/);

    // Menu
    await expect(page.locator("#notificationx")).toMatchAriaSnapshot(`
      - list:
        - listitem: Source
        - listitem: Design
        - listitem: Display
        - listitem: Finalize
    `);

    // Source Tab
    await page.getByRole("heading", { name: "Notification Type" }).click();
    await page
      .locator("div")
      .filter({ hasText: /^Notification Type$/ })
      .click();
    await page.getByRole("heading", { name: "Source" }).first().click();
    await page.locator("#source_section").getByRole("heading", { name: "Source" }).click();
    await expect(page.getByRole("heading", { name: "Source" }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Notification Type" })).toBeVisible();
    await expect(page.getByText("WooCommerce", { exact: true })).toBeVisible();
    await expect(page.getByText("Sales Notification")).toBeVisible();
    await expect(page.getByText("eLearning", { exact: true })).toBeVisible();
    await expect(page.getByText("Notification Bar")).toBeVisible();
    await expect(page.getByText("Reviews", { exact: true })).toBeVisible();
    await expect(page.getByText("Contact Form")).toBeVisible();
    await expect(page.getByText("Download Stats")).toBeVisible();
    await expect(page.getByText("Comments", { exact: true })).toBeVisible();
    await expect(page.getByText("ProDiscount Alert")).toBeVisible();
    await expect(page.getByText("Donations", { exact: true })).toBeVisible();
    await expect(page.getByText("ProFlashing Tab")).toBeVisible();
    await expect(page.getByText("ProGrowth Alert 🚀")).toBeVisible();
    await expect(page.getByText("ProCustom Notification")).toBeVisible();
    await expect(page.getByText("ProVideo")).toBeVisible();
    await expect(page.getByText("ProEmail Subscription")).toBeVisible();
    await expect(page.getByText("ProPage Analytics")).toBeVisible();
    await expect(page.locator("#source_section").getByRole("heading", { name: "Source" })).toBeVisible();
    await expect(page.locator("#source_section").getByRole("img")).toBeVisible();
    await expect(page.getByRole("button", { name: "Next" })).toBeVisible();

    await page.getByText("Download Stats").click();
    await expect(page.getByRole("img").nth(1)).toBeVisible();
    await expect(page.locator("label").filter({ hasText: /^Pro$/ })).toBeVisible();

    await expect(page.getByText("Product Type")).toBeVisible();
    await expect(page.getByText("Slug", { exact: true })).toBeVisible();
    await page.getByPlaceholder("Slug").fill("academy");
    await page.getByRole("button", { name: "Next" }).click();

    // Design Tab
    await expect(page.locator("li").filter({ hasText: "For Desktop" })).toBeVisible();
    await expect(page.locator("li").filter({ hasText: "For Mobile" })).toBeVisible();
    await page.locator("li").filter({ hasText: "For Mobile" }).click();
    await expect(page.getByRole("link", { name: "Get PRO to Unlock" })).toBeVisible();
    await page.locator("li").filter({ hasText: "For Desktop" }).click();
    await expect(page.getByRole("button", { name: "Previous" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Next" })).toBeVisible();
    await page.getByRole("button", { name: "Next" }).click();

    // Display Tab
    await expect(page.getByRole("heading", { name: "Visibility" })).toBeVisible();
    await expect(page.getByText("Show OnShow Everywhere")).toBeVisible();
    await expect(page.getByText("Display ForEveryoneMore")).toBeVisible();
    await expect(page.getByRole("link", { name: "More Control in Pro" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Appearance" })).toBeVisible();
    await expect(page.getByText("PositionBottom Left")).toBeVisible();
    await page.getByRole("button", { name: "Next" }).click();

    // Finalize Tab
    await expect(page.getByRole("heading", { name: "Finalize" })).toBeVisible();
    await expect(page.getByText("You are about to publish")).toBeVisible();
    await page.getByRole("button", { name: "Publish" }).click();

    // Search and delete
    await page.getByRole("img", { name: "search-icon" }).click();
    await page.getByPlaceholder("Search...").fill("notificationx - download stats");
    await expect(page.getByRole("link", { name: "NotificationX - Download Stats - " })).toBeVisible();
    await page.getByTitle("Three Dots").first().click();
    await page.getByTitle("Delete").click();
    await expect(page.getByRole("heading", { name: "Are you sure?" })).toBeVisible();
    await expect(page.getByText("You won't be able to revert")).toBeVisible();
    await expect(page.getByRole("button", { name: "No, Cancel" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Yes, Delete It" })).toBeVisible();
    await page.getByRole("button", { name: "Yes, Delete It" }).click();
    await expect(page.getByText("Notification Alert has been Deleted")).toBeVisible();
    await expect(page.getByRole('heading', { name: 'No notifications are found.' })).toBeVisible();
    await expect(page.getByText('Seems like you haven’t')).toBeVisible();
  });
});
