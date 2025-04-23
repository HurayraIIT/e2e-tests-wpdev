//@ts-check

import { test, expect } from "../../utils/base";

test.describe("imgur embedding test", () => {
  test("elementor widget", async ({ page }) => {
    await page.goto("/ep/elementor/imgur/");
    await page.waitForLoadState("networkidle");

    const frame = page.locator("#imgur-embed-iframe-pub-PExBxCZ").contentFrame();

    await expect(page.getByRole("heading", { name: "Automation Imgur" })).toBeVisible();
    await expect(page.locator(".ose-imgur")).toBeVisible();
    await expect(frame.getByRole("button", { name: "Share" })).toBeVisible();
    await expect(page.locator(".ep-social-share-wraper")).toBeVisible();
    await expect(page.locator("#ep-elements-id-26f3eef")).toMatchAriaSnapshot(`
      - link:
        - img
      - link:
        - img
      - link:
        - img
      - link:
        - img
      `);
    await expect(frame.getByRole("link", { name: "The image of zero" })).toBeVisible();
    await expect(frame.getByText("The image of zero")).toBeVisible();
    await expect(
      page
        .locator("#imgur-embed-iframe-pub-PExBxCZ")
        .contentFrame()
        .getByRole("link", { name: "image of zero", exact: true })
    ).toBeVisible();
    await expect(frame.locator("#footer")).toMatchAriaSnapshot(`
      - text: The image of zero
      - link "image of zero"
      `);
    await frame.getByRole("button", { name: "Share" }).click();
    await expect(frame.locator("#shareModal div").filter({ hasText: "Copy" }).nth(4)).toBeVisible();
    await expect(frame.locator("#shareLink")).toBeVisible();
    await expect(frame.getByRole("button", { name: "×" })).toBeVisible();
    await frame.getByRole("button", { name: "×" }).click();

    // link should be https://imgur.com/PExBxCZ
    // Social share section should be present
    // width 601px height 801px
    // margin 1 px
    // padding 2 px
    // alignment center

    await expect(frame.locator("img#image-element")).toHaveAttribute("src", "//i.imgur.com/PExBxCZl.png");
    await expect(frame.locator("img#image-element")).toHaveCSS("width", "601px");
    await expect(frame.locator("img#image-element")).toHaveCSS("height", "601px");

    await expect(page.locator("div.ose-imgur")).toHaveCSS("height", "801px");
    await expect(page.locator("div.ose-imgur")).toHaveCSS("width", "601px");
  });

  test("gutenberg block", async ({ page }) => {
    await page.goto("/ep/gutenberg-blocks/imgur/");
    await page.waitForLoadState("networkidle");

    const frame = page.locator("#imgur-embed-iframe-pub-PExBxCZ").contentFrame();

    await expect(page.getByRole("heading", { name: "Imgur Gutenberg Embedding 250122" })).toBeVisible();
    await expect(page.locator("#ep-gutenberg-content-38f532857861dccae77e676e759621d8")).toMatchAriaSnapshot(`
      - link:
        - img
      - link:
        - img
      - link:
        - img
      - link:
        - img
      `);
    await expect(frame.getByRole("link", { name: "The image of zero" })).toBeVisible();
    await expect(frame.getByText("The image of zero")).toBeVisible();
    await expect(frame.getByRole("link", { name: "image of zero", exact: true })).toBeVisible();
    await expect(frame.locator("#footer")).toMatchAriaSnapshot(`
      - text: The image of zero
      - link "image of zero"
      `);
    await frame.getByRole("button", { name: "Share" }).click();
    await expect(frame.locator("#shareLink")).toBeVisible();
    await expect(frame.locator("#shareLink")).toBeVisible();
    await expect(frame.getByRole("button", { name: "×" })).toBeVisible();
    await frame.getByRole("button", { name: "×" }).click();

    await expect(frame.locator("img#image-element")).toHaveAttribute("src", "//i.imgur.com/PExBxCZl.png");
    await expect(frame.locator("img#image-element")).toHaveAttribute("alt", "The image of zero");
  });

  test("classic editor", async ({ page }) => {
    await page.goto("/ep/classic-editor/imgur/");
    await page.waitForLoadState("networkidle");

    const frame = page.locator("#imgur-embed-iframe-pub-k0lqsY0").contentFrame();

    await expect(page.getByRole("heading", { name: "Imgur Classic Shortcode Embed 250121 Heading" })).toBeVisible();
    await expect(frame.getByRole("button", { name: "Share" })).toBeVisible();
    await expect(frame.locator("#header")).toBeVisible();
    await expect(frame.locator("#image-link")).toBeVisible();
    await expect(frame.getByRole("link", { name: "image of one" })).toBeVisible();
    await expect(frame.locator("#footer")).toMatchAriaSnapshot(`
      - link "image of one"
      - link /\\d+/:
        - img
      - link:
        - img
      `);
    await frame.getByRole("button", { name: "Share" }).click();
    await expect(frame.locator("#shareLink")).toBeVisible();
    await expect(frame.locator("#shareModal div").filter({ hasText: "Copy" }).nth(4)).toBeVisible();
    await expect(frame.getByRole("button", { name: "×" })).toBeVisible();
    await frame.getByRole("button", { name: "×" }).click();

    await expect(frame.locator("img#image-element")).toHaveAttribute("src", "//i.imgur.com/k0lqsY0l.png");
  });
});
