//@ts-check

import { test as setup, expect } from "@playwright/test";

const users = ["admin", "editor", "author", "contributor", "subscriber"];

users.forEach((user) => {
  setup(`authenticating as ${user}`, async ({ page }) => {
    const authFile = `playwright/.auth/${user}.json`;
    const username = `${process.env[`${user.toUpperCase()}_USER`]}`;
    const password = `${process.env.PASS}`;

    await page.goto(`${process.env.BASE_URL}/wp-login.php`);

    await page.getByLabel("Username or Email Address").click();
    await page.getByLabel("Username or Email Address").fill(username);

    await page.getByLabel("Password", { exact: true }).click();
    await page.getByLabel("Password", { exact: true }).fill(password);

    await page.getByLabel("Remember Me").check();
    await page.getByRole("button", { name: "Log In" }).click();

    await page.waitForURL(/wp-admin/);
    await expect(page.getByRole("menuitem", { name: `Howdy, ${username}` })).toBeVisible();

    await page.context().storageState({ path: authFile });
  });
});
