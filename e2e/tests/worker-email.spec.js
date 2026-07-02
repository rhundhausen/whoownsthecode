// Script B: verify the worker's scoring and rendered email via its test mode.
// The worker returns { testMode, assessment, persona, email } when given a valid
// X-Test-Secret header, skipping reCAPTCHA and Resend. Nothing is emailed.
//
// To run: set WOTC_TEST_SECRET to the same value you set on the worker with
//   wrangler secret put TEST_SECRET
// Without it these tests skip themselves.
const { test, expect, request } = require("@playwright/test");

const WORKER_URL = process.env.WORKER_URL || "https://ai-assessment-worker.richard-dd5.workers.dev";
const TEST_SECRET = process.env.WOTC_TEST_SECRET;

// Every scored answer set to its risky value (max base on both axes).
const MAX_RISK = {
  assert_code_ownership: "No", prompting_policy: "No", content_policy: "No", code_reviewed: "No",
  ai_restricted: "No", reviewed_ai_licenses: "No", ai_training: "No", awareness: "No",
  contracts_address_ai: "No", code_labeled: "No", mentioned_in_commits: "No", mentioned_in_docs: "No",
  store_prompts: "No", ai_in_production: "Yes", vendor_ai_use: "Yes",
};

const ACQUIRER_EXCLUDED = [
  "ai_tools", "ai_usage", "prompting_policy", "content_policy", "code_reviewed", "code_labeled",
  "mentioned_in_commits", "mentioned_in_docs", "ai_in_production", "ai_restricted", "store_prompts",
  "reviewed_ai_licenses", "ai_training", "assert_code_ownership",
];

test.describe("worker scoring + email (test mode)", () => {
  test.skip(!TEST_SECRET, "Set WOTC_TEST_SECRET (and `wrangler secret put TEST_SECRET`) to run these.");

  async function preview(payload) {
    const ctx = await request.newContext();
    const res = await ctx.post(WORKER_URL, {
      headers: { "Content-Type": "application/json", "X-Test-Secret": TEST_SECRET },
      data: payload,
    });
    expect(res.status(), "worker should accept the test-mode request").toBe(200);
    const json = await res.json();
    await ctx.dispose();
    expect(json.testMode).toBe(true);
    return json;
  }

  test("max risk scores both axes Critical and renders both in the email", async () => {
    const p = await preview({ name: "E2E Max", email: "e2e@example.com", ...MAX_RISK });
    expect(p.assessment.inbound.score).toBe(100);
    expect(p.assessment.inbound.level).toBe("Critical");
    expect(p.assessment.outbound.score).toBe(100);
    expect(p.assessment.outbound.level).toBe("Critical");
    expect(p.email.text).toContain("Inbound Risk: 100/100 (Critical)");
    expect(p.email.text).toContain("Outbound Risk: 100/100 (Critical)");
    expect(p.email.html).toContain("Inbound risk");
    expect(p.email.html).toContain("Outbound risk");
  });

  test("Acquirer: build-process hidden, inbound falls to 0, ownership Q omitted", async () => {
    const p = await preview({
      name: "E2E Acquirer",
      email: "acquirer@example.com",
      ...MAX_RISK,
      scored_excluded: ACQUIRER_EXCLUDED.join(","),
      persona_primary: "Acquirer",
      persona_path: "Evaluating code to acquire",
      persona_result: JSON.stringify({
        primary: { name: "Acquirer", inbound: "Low", outbound: "Moderate" },
        stacked: [], criticalOutboundCount: 0,
      }),
    });
    expect(p.assessment.inbound.score).toBe(0);
    expect(p.assessment.inbound.level).toBe("Low");
    expect(p.assessment.inbound.possible).toBe(0);
    expect(p.persona.primary).toBe("Acquirer");
    expect(p.email.text).toContain("Persona Profile");
    expect(p.email.text).toContain("Acquirer");
    expect(p.email.text).not.toContain("Do you assert that you own the code?");
    expect(p.email.text).not.toContain("Which AI tools are you using?");
  });

  test("stacked promise triggers surface in the persona profile", async () => {
    const p = await preview({
      name: "E2E Licensor",
      email: "licensor@example.com",
      ...MAX_RISK,
      persona_primary: "Licensor",
      persona_stacked: "Fed Supplier, Regulated",
      persona_result: JSON.stringify({
        primary: { name: "Licensor", inbound: "Moderate", outbound: "Critical" },
        stacked: [
          { name: "Fed Supplier", inbound: "Moderate", outbound: "Critical", mitigating: false },
          { name: "Regulated", inbound: "Moderate", outbound: "Critical", mitigating: false },
        ],
        criticalOutboundCount: 3,
      }),
    });
    expect(p.email.text).toContain("Fed Supplier");
    expect(p.email.text).toContain("Regulated");
    expect(p.email.text).toContain("3 critical-outbound triggers on one codebase");
  });

  test("ownership-assertion exclusion keeps Civic Coder outbound from being penalized", async () => {
    const clean = {
      assert_code_ownership: "No", prompting_policy: "Yes", content_policy: "Yes", code_reviewed: "Yes",
      ai_restricted: "Yes", reviewed_ai_licenses: "Yes", ai_training: "Yes", awareness: "Yes",
      contracts_address_ai: "Yes", code_labeled: "Yes", mentioned_in_commits: "Yes", mentioned_in_docs: "Yes",
      store_prompts: "Yes", ai_in_production: "No", vendor_ai_use: "No",
    };
    const withoutFix = await preview({ name: "Civic A", email: "civic-a@example.com", ...clean });
    expect(withoutFix.assessment.outbound.score).toBeGreaterThan(0);
    const withFix = await preview({
      name: "Civic B", email: "civic-b@example.com", ...clean,
      scored_excluded: "assert_code_ownership", persona_primary: "Civic Coder",
    });
    expect(withFix.assessment.outbound.score).toBe(0);
  });
});
