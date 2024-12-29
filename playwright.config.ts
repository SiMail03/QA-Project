import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  timeout: 30000,
  retries: 0,
  use: {
    headless: true,

    viewport: { width: 1920, height: 1080 }, // Set the initial viewport size (you can customize this)
    actionTimeout: 15000,
    ignoreHTTPSErrors: true,
    video: "on",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "Chromium",
      use: { browserName: "chromium" },
    },
  ],
};

export default config;
