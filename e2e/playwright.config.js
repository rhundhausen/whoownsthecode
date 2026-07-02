const { defineConfig } = require("@playwright/test");

// SITE_URL   - where the assessment page is served (default: production).
//              Point at http://localhost:1313 to test a local `hugo server`.
// WORKER_URL - the assessment worker origin (used by the email/scoring tests).
// WOTC_TEST_SECRET - shared secret that unlocks the worker test mode. When
//              unset, the worker email/scoring tests skip themselves.
module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: process.env.SITE_URL || "https://whoownsthecode.com",
    headless: true,
    trace: "on-first-retry",
  },
});
