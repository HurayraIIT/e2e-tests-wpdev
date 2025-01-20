import { test as base, expect } from "@playwright/test";

export const test = base.extend({
  failOnJsError: [true, { option: true }],
  page: async ({ page, failOnJsError }, use) => {
    const error_messages = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        error_messages.push({ message, type: message.type() });
      }
    });

    await use(page);

    if (failOnJsError) {
      expect.soft(error_messages).toHaveLength(0);
      console.log(error_messages);
    }
  },
});

export { expect } from "@playwright/test";
