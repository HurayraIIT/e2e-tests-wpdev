// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { config } from 'dotenv';

config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 4 : 4,
  timeout: 30 * 1000,

  expect: {
    timeout: 5_000,
    toMatchSnapshot: { maxDiffPixelRatio: 0.03 },
    toHaveScreenshot: { maxDiffPixelRatio: 0.03 },
  },
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL,
    testIdAttribute: "data-id",

    screenshot: "on",
    trace: "retain-on-failure",
    video: "retain-on-failure",

    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ]
});

