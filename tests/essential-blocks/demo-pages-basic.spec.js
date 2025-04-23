//@ts-check
// import { test, expect } from "../../utils/base";
import { test, expect } from "@playwright/test";

const base_url = `${process.env.BASE_URL}`;
const demo_page_urls = {
  accordion: {
    title: "Accordion",
    edit: `${base_url}/wp-admin/post.php?post=110&action=edit`,
    view: `${base_url}/eb/content-blocks/accordion/`,
  },
  advanced_tabs: {
    title: "Advanced Tabs",
    edit: `${base_url}/wp-admin/post.php?post=235&action=edit`,
    view: `${base_url}/eb/content-blocks/advanced-tabs/`,
  },
  advanced_navigation: {
    title: "Advanced Navigation",
    edit: `${base_url}/wp-admin/post.php?post=251&action=edit`,
    view: `${base_url}/eb/creative-blocks/advanced-navigation/`,
  },
  advanced_video: {
    title: "Advanced Video",
    edit: `${base_url}/wp-admin/post.php?post=263&action=edit`,
    view: `${base_url}/eb/creative-blocks/advanced-video/`,
  },
  image_gallery: {
    title: "Image Gallery",
    edit: `${base_url}/wp-admin/post.php?post=228&action=edit`,
    view: `${base_url}/eb/creative-blocks/image-gallery/`,
  },
};

test.use({ storageState: "playwright/.auth/admin.json" });

test.describe("Demo pages basic test", () => {
  test("accordion @happy", async ({ page }) => {
    // Visit edit page
    await page.goto(demo_page_urls.accordion.edit);
    await page.waitForLoadState("domcontentloaded");

    // Verify classic template
    await expect(page.getByText("Automation - Classic Template - 250119v5.1.0")).toBeVisible();
    await expect(page.getByText("Classic Accordion Title One?")).toBeVisible();
    await expect(page.getByText("Classic Accordion Title Two?")).toBeVisible();
    await expect(page.getByText("Classic Accordion Title Three?")).toBeVisible();
    await expect(page.getByLabel("Add a New Accordion Item").first()).toBeVisible();

    // Verify iconic template
    await expect(page.getByText("Automation - Iconic Template - 250119v5.1.0")).toBeVisible();
    await expect(page.getByText("Iconic Accordion Title One?")).toBeVisible();
    await expect(page.getByText("Iconic Accordion Title Two?")).toBeVisible();
    await expect(page.getByText("Iconic Accordion Title Three?")).toBeVisible();
    await expect(page.getByLabel("Add a New Accordion Item").nth(1)).toBeVisible();

    // Verify storyboard template
    await expect(page.getByText("Automation - Storyboard Template - 250119v5.1.0")).toBeVisible();
    await expect(page.getByText("Storyboard Accordion Title One?")).toBeVisible();
    await expect(page.getByText("Storyboard Accordion Title Two?")).toBeVisible();
    await expect(page.getByText("Storyboard Accordion Title Three?")).toBeVisible();
    await expect(page.getByLabel("Add a New Accordion Item").nth(2)).toBeVisible();

    // Verify horizontal template
    await expect(page.getByText("Automation - Horizontal Template - 250119v5.1.0")).toBeVisible();
    await expect(page.getByText("Horizontal One?")).toBeVisible();
    await expect(page.getByText("Horizontal Two?")).toBeVisible();
    await expect(page.getByText("Horizontal Three?")).toBeVisible();
    await expect(page.getByLabel("Add a New Accordion Item").nth(3)).toBeVisible();

    await page.getByText("Horizontal One?").click();
    await expect(page.getByText("Horizontal Accordion Content One.")).toBeVisible();
    await page.getByText("Horizontal Two?").click();
    await expect(page.getByText("Horizontal Accordion Content Two.")).toBeVisible();

    // Visit view page
    await page.goto(demo_page_urls.accordion.view);

    // Verify classic template
    await expect(page.getByRole("heading", { name: "Automation – Classic Template" })).toBeVisible();
    await expect(page.getByRole("button", { name: " Classic Accordion Title One?" })).toBeVisible();
    await expect(page.getByText("Classic Accordion Content One.", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "  Classic Accordion Title" })).toBeVisible();
    await expect(page.getByRole("button", { name: " 3 Classic Accordion Title" })).toBeVisible();
    await page.getByRole("button", { name: "  Classic Accordion Title" }).click();
    await expect(page.getByText("Classic Accordion Content Two.", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: " 3 Classic Accordion Title" }).click();
    await expect(page.getByText("Classic Accordion Content Three.", { exact: true })).toBeVisible();

    // Verify iconic template
    await expect(page.getByRole("heading", { name: "Automation – Iconic Template" })).toBeVisible();
    await expect(page.getByRole("button", { name: " Iconic Accordion Title One" })).toBeVisible();
    await expect(page.getByText("Iconic Accordion Content One.", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "  Iconic Accordion Title" })).toBeVisible();
    await expect(page.getByRole("button", { name: "  Iconic Accordion Title" })).toBeVisible();
    await page.getByRole("button", { name: "  Iconic Accordion Title" }).click();
    await expect(page.getByText("Iconic Accordion Content Two.", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "  Iconic Accordion Title" }).click();
    await expect(page.getByText("Iconic Accordion Content Three.", { exact: true })).toBeVisible();

    // Verify storyboard template
    await expect(page.getByRole("heading", { name: "Automation – Storyboard" })).toBeVisible();
    await expect(page.getByRole("button", { name: " Storyboard Accordion Title" })).toBeVisible();
    await expect(page.getByText("Storyboard Accordion Content One.", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: " Storyboard Accordion Title Two?" })).toBeVisible();
    await expect(page.getByRole("button", { name: " Storyboard Accordion Title Three?" })).toBeVisible();
    await page.getByRole("button", { name: " Storyboard Accordion Title Two?" }).click();
    await expect(page.getByText("Storyboard Accordion Content Two.", { exact: true })).toBeVisible();
    await expect(page.locator(".eb-accordion-image-container > img")).toBeVisible();
    await page.getByRole("button", { name: " Storyboard Accordion Title Three?" }).click();
    await expect(page.getByText("Storyboard Accordion Content Three.", { exact: true })).toBeVisible();

    // Verify horizontal template
    await expect(page.getByRole("heading", { name: "Automation – Horizontal" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Horizontal One?" })).toBeVisible();
    await expect(page.getByText("Horizontal Accordion Content One.", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: " Horizontal Two?" })).toBeVisible();
    await expect(page.getByRole("button", { name: "  Horizontal Three?" })).toBeVisible();
    await page.getByRole("button", { name: " Horizontal Two?" }).click();
    await expect(page.getByText("Horizontal Accordion Content Two.", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "  Horizontal Three?" }).click();
    await expect(page.getByText("Horizontal Accordion Content Three.", { exact: true })).toBeVisible();
  });

  test("advanced tabs @happy", async ({ page }) => {
    // Visit edit page
    await page.goto(demo_page_urls.advanced_tabs.edit);
    await page.waitForLoadState("domcontentloaded");

    // Verify horizontal tabs
    await expect(page.getByText("Horizontal Advanced Tabs")).toBeVisible();
    await expect(page.getByText("Horizontal First Tab", { exact: true })).toBeVisible();
    await expect(page.getByText("Content For Horizontal First")).toBeVisible();
    await expect(page.getByText("Horizontal Second Tab", { exact: true })).toBeVisible();
    await expect(page.getByText("Horizontal Third Tab", { exact: true })).toBeVisible();
    await page.getByText("Horizontal Second Tab", { exact: true }).click();
    await expect(page.getByText("Content For Horizontal Second")).toBeVisible();
    await page.getByLabel("Editor content").getByText("Horizontal Third Tab", { exact: true }).click();
    await expect(page.getByText("Content For Horizontal Third")).toBeVisible();

    // Verify vertical tabs
    await expect(page.getByText("Vertical Advanced Tabs")).toBeVisible();
    await expect(page.getByText("Vertical First Tab", { exact: true })).toBeVisible();
    await expect(page.getByText("Content For Vertical First Tab")).toBeVisible();
    await expect(page.getByText("Vertical Second Tab", { exact: true })).toBeVisible();
    await expect(page.getByText("Vertical Third Tab", { exact: true })).toBeVisible();
    await page.getByText("Vertical Second Tab", { exact: true }).click();
    await expect(page.getByText("Content For Vertical Second")).toBeVisible();
    await page.getByLabel("Editor content").getByText("Vertical Third Tab", { exact: true }).click();
    await expect(page.getByText("Content For Vertical Third Tab")).toBeVisible();

    // Visit view page
    await page.goto(demo_page_urls.advanced_tabs.view);

    // Verify horizontal tabs
    await expect(page.getByRole("heading", { name: "Horizontal Advanced Tabs" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Horizontal First Tab", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Horizontal Second Tab" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Horizontal Third Tab" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Content For Horizontal First" })).toBeVisible();
    await page.getByRole("heading", { name: "Horizontal Second Tab" }).click();
    await expect(page.getByRole("heading", { name: "Content For Horizontal Second" })).toBeVisible();
    await page.getByRole("heading", { name: "Horizontal Third Tab" }).click();
    await expect(page.getByRole("heading", { name: "Content For Horizontal Third" })).toBeVisible();

    // Verify vertical tabs
    await expect(page.getByRole("heading", { name: "Vertical Advanced Tabs" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Vertical First Tab", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Content For Vertical First Tab" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Vertical Second Tab" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Vertical Third Tab" })).toBeVisible();
    await page.getByRole("heading", { name: "Vertical Second Tab" }).click();
    await expect(page.getByRole("heading", { name: "Content For Vertical Second" })).toBeVisible();
    await page.getByRole("heading", { name: "Vertical Third Tab" }).click();
    await expect(page.getByRole("heading", { name: "Content For Vertical Third Tab" })).toBeVisible();
  });

  test("advanced navigation @happy", async ({ page }) => {
    // Visit edit page
    await page.goto(demo_page_urls.advanced_navigation.edit);
    await page.waitForLoadState("domcontentloaded");

    await expect(page.getByText("Horizontal Preset One")).toBeVisible();
    await expect(page.getByLabel("Editor content").getByText("Home").first()).toBeVisible();
    await expect(page.getByText("HurayraIIT", { exact: true }).first()).toBeVisible();

    await expect(page.getByText("Horizontal Preset Two")).toBeVisible();
    await expect(page.getByLabel("Editor content").getByText("Home").nth(1)).toBeVisible();
    await expect(page.getByText("HurayraIIT", { exact: true }).nth(1)).toBeVisible();

    await expect(page.getByText("Horizontal Preset Three")).toBeVisible();
    await expect(page.getByLabel("Editor content").getByText("Home").nth(2)).toBeVisible();
    await expect(page.getByText("HurayraIIT", { exact: true }).nth(2)).toBeVisible();

    await expect(page.getByText("Horizontal Preset Four")).toBeVisible();
    await expect(page.getByLabel("Editor content").getByText("Home").nth(3)).toBeVisible();
    await expect(page.getByText("HurayraIIT", { exact: true }).nth(3)).toBeVisible();

    // Visit view page
    await page.goto(demo_page_urls.advanced_navigation.view);

    await expect(page.getByRole("heading", { name: "Horizontal Preset One" })).toBeVisible();
    await expect(page.getByLabel("Automation 250119 DONOTDELETE", { exact: true }).getByRole("list"))
      .toMatchAriaSnapshot(`
      - list:
        - listitem:
          - link "Home"
        - listitem:
          - link "Essential Blocks"
          - button "Essential Blocks submenu"
        - listitem:
          - link "HurayraIIT"
    `);

    await expect(page.getByRole("heading", { name: "Horizontal Preset Two" })).toBeVisible();
    await expect(page.getByLabel("Automation 250119 DONOTDELETE 2").getByRole("list")).toMatchAriaSnapshot(`
      - list:
        - listitem:
          - link "Home"
        - listitem:
          - link "Essential Blocks"
          - button "Essential Blocks submenu"
        - listitem:
          - link "HurayraIIT"
    `);

    await expect(page.getByRole("heading", { name: "Horizontal Preset Three" })).toBeVisible();
    await expect(page.getByLabel("Automation 250119 DONOTDELETE 3").getByRole("list")).toMatchAriaSnapshot(`
      - list:
        - listitem:
          - link "Home"
        - listitem:
          - link "Essential Blocks"
          - button "Essential Blocks submenu"
        - listitem:
          - link "HurayraIIT"
    `);

    await expect(page.getByRole("heading", { name: "Horizontal Preset Four" })).toBeVisible();
    await expect(page.getByLabel("Automation 250119 DONOTDELETE 4").getByRole("list")).toMatchAriaSnapshot(`
      - list:
        - listitem:
          - link "Home"
        - listitem:
          - link "Essential Blocks"
          - button "Essential Blocks submenu"
        - listitem:
          - link "HurayraIIT"
    `);
  });

  test.skip("advanced video @happy", async ({ page }) => {
    // Visit edit page
    await page.goto(demo_page_urls.advanced_video.edit);
    await page.waitForLoadState("domcontentloaded");

    await expect(page.getByText("Advanced Video - 250119v5.1.0")).toBeVisible();
    await expect(
      page
        .locator(
          'iframe[title="Essential Blocks For Gutenberg - Instantly Design Stunning Websites With Ready Blocks"]'
        )
        .contentFrame()
        .getByRole("link", { name: "Essential Blocks For" })
    ).toBeVisible();
    await expect(
      page
        .locator(
          'iframe[title="Essential Blocks For Gutenberg - Instantly Design Stunning Websites With Ready Blocks"]'
        )
        .contentFrame()
        .getByLabel("Play", { exact: true })
    ).toBeVisible();

    // Visit view page
    await page.goto(demo_page_urls.advanced_video.view);
    await expect(page.getByRole("heading", { name: "Advanced Video – 250119v5.1.0" })).toBeVisible();
    await expect(
      page
        .locator(
          'iframe[title="Essential Blocks For Gutenberg - Instantly Design Stunning Websites With Ready Blocks"]'
        )
        .contentFrame()
        .getByRole("link", { name: "Essential Blocks For" })
    ).toBeVisible();
    await expect(
      page
        .locator(
          'iframe[title="Essential Blocks For Gutenberg - Instantly Design Stunning Websites With Ready Blocks"]'
        )
        .contentFrame()
        .getByLabel("Play", { exact: true })
    ).toBeVisible();
  });

  test("image gallery @happy", async ({ page }) => {
    // Visit edit page
    await page.goto(demo_page_urls.image_gallery.edit);
    await page.waitForLoadState("domcontentloaded");

    await expect(page.getByText("Automation Image Gallery 250119v5.1.0")).toBeVisible();
    await expect(page.getByLabel("Block: Filterable Gallery").getByText("All")).toBeVisible();
    await expect(page.getByText("Even", { exact: true })).toBeVisible();
    await expect(page.getByText("Odd")).toBeVisible();
    await expect(page.locator("a").filter({ hasText: "Zero" })).toBeVisible();
    await expect(page.locator("a").filter({ hasText: /^One$/ })).toBeVisible();
    await expect(page.locator("a").filter({ hasText: "Two" })).toBeVisible();
    await expect(page.locator("a").filter({ hasText: "Three" })).toBeVisible();
    await expect(page.locator("a").filter({ hasText: "Four" })).toBeVisible();
    await expect(page.locator("a").filter({ hasText: "Five" })).toBeVisible();
    await expect(page.getByLabel("Add Image")).toBeVisible();

    await page.getByText("Even", { exact: true }).click();
    await expect(page.locator("a").filter({ hasText: "Zero" })).toBeVisible();
    await expect(page.locator("a").filter({ hasText: "Two" })).toBeVisible();
    await expect(page.locator("a").filter({ hasText: "Four" })).toBeVisible();

    await page.getByText("Odd").click();
    await expect(page.locator("a").filter({ hasText: /^One$/ })).toBeVisible();
    await expect(page.locator("a").filter({ hasText: "Three" })).toBeVisible();
    await expect(page.locator("a").filter({ hasText: "Five" })).toBeVisible();

    // Visit view page
    await page.goto(demo_page_urls.image_gallery.view);

    await expect(page.getByRole("heading", { name: "Automation Image Gallery" })).toBeVisible();
    await expect(page.locator("#post-228")).toMatchAriaSnapshot(`
      - list:
        - listitem: All
        - listitem: Even
        - listitem: Odd
      - link "Zero"
      - link "One"
      - link "Two"
      - link "Three"
      - link "Four"
      - link "Five"
    `);

    await page.getByText("Even", { exact: true }).click();
    await expect(page.locator("#post-228")).toMatchAriaSnapshot(`
      - list:
        - listitem: All
        - listitem: Even
        - listitem: Odd
      - link "Zero"
      - link "Two"
      - link "Four"
    `);

    await page.getByText("Odd", { exact: true }).click();
    await expect(page.locator("#post-228")).toMatchAriaSnapshot(`
      - list:
        - listitem: All
        - listitem: Even
        - listitem: Odd
      - link "One"
      - link "Three"
      - link "Five"
    `);
  });
});
