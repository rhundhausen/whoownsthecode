const { defineConfig } = require("@playwright/test");

// Three named test groups (Playwright projects):
//   UI      - the assessment page / persona wizard (no secrets, no submission)
//   Results - the worker's scoring and rendered email via test mode (no send)
//   Emails  - actually sends real emails for ~20 scenarios (opt-in)
//
// Env vars:
//   SITE_URL         - assessment page origin (default: production). Point at
//                      http://localhost:1313 to test a local `hugo server`.
//   WORKER_URL       - assessment worker origin (Results and Emails).
//   WOTC_TEST_SECRET - shared secret that unlocks the worker test mode.
//   TEST_EMAIL_TO    - recipient for the Emails group (required to actually send).
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
  projects: [
    { name: "UI", testMatch: ["**/wizard.spec.js", "**/persona-matrix.spec.js"] },
    { name: "Results", testMatch: ["**/worker-email.spec.js", "**/scoring-matrix.spec.js", "**/results-matrix.spec.js"] },
    { name: "Emails", testMatch: ["**/live-email.spec.js"] },
  ],
});
