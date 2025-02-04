//@ts-check

import { test, expect } from "../../utils/base";

const image_path =
  "https://e2e.hurayraiit.com/wp-content/plugins/embedpress/EmbedPress/Ends/Back/Settings/assets/img/sources/icons";

const data = [
  {
    img: `${image_path}/google-photos.png`,
    name: "Google Photos",
    doc: "https://embedpress.com/docs/embed-google-photos-in-wordpress/",
  },
  {
    img: `${image_path}/instagram.png`,
    name: "Instagram",
    doc: "https://embedpress.com/docs/embed-instagram-wordpress/",
  },
  {
    img: `${image_path}/youtube.png`,
    name: "YouTube",
    doc: "https://embedpress.com/docs/embed-youtube-wordpress/",
  },
];

test.describe("imgur embedding test", () => {
  test("elementor widget", async ({ browser }) => {
    const context = await browser.newContext({ storageState: "playwright/.auth/admin.json" });
    const page = await context.newPage();
    await page.goto("/wp-admin/admin.php?page=embedpress&page_type=sources");

    for (let i = 0; i < data.length; i++) {
      const item = page.locator("div.tab-content-section div.source-item").nth(i);
      await expect(item.locator("div.icon img")).toHaveAttribute("src", data[i].img);
      await expect(item.locator("span.source-name")).toContainText(data[i].name);
      await expect(item.locator("div.source-right a").last()).toHaveAttribute("href", data[i].doc);
    }

    await context.close();
  });
});
