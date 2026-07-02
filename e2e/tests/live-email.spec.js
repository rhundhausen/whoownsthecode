// Live email delivery: sends REAL emails through the worker for ~20 choice
// scenarios, so you can eyeball the actual reports in your inbox. Uses the
// worker's secret-gated test mode with `testSend: true`, which delivers only to
// the submitter address (TEST_EMAIL_TO), not the production inbox.
//
// This spec ONLY runs when BOTH are set (otherwise it skips, and never sends):
//   WOTC_TEST_SECRET  - same value as `wrangler secret put TEST_SECRET`
//   TEST_EMAIL_TO     - the address you want the 20 emails delivered to
//
// Run it on its own:  npm run test:live-email
const { test, expect, request } = require("@playwright/test");

const WORKER_URL = process.env.WORKER_URL || "https://ai-assessment-worker.richard-dd5.workers.dev";
const TEST_SECRET = process.env.WOTC_TEST_SECRET;
const TEST_EMAIL_TO = process.env.TEST_EMAIL_TO;

// [inbound, outbound] per persona, from the blog risk matrix.
const RATINGS = {
  "Model Maker": ["Critical", "Low"], "Giver": ["Low", "None"], "Civic Coder": ["Moderate", "None"],
  "Acquirer": ["Low", "Moderate"], "Host": ["Low", "Moderate"], "Hired Gun": ["Low", "Critical"],
  "Inheritor": ["Low", "High"], "Internal Tooler": ["Low", "Low"], "Walled Garden": ["Low", "Low"],
  "Bootstrapper": ["Moderate", "High"], "Exiter": ["Moderate", "Critical"], "Onshorer": ["Low", "High"],
  "Offshorer": ["Low", "High"], "Licensor": ["Moderate", "Critical"], "Fed Supplier": ["Moderate", "Critical"],
  "Regulated": ["Moderate", "Critical"], "Two-Tier": ["Moderate", "Critical"], "Renter": ["Moderate", "Moderate"],
};

const ACQUIRER_EXCLUDED = [
  "ai_tools", "ai_usage", "prompting_policy", "content_policy", "code_reviewed", "code_labeled",
  "mentioned_in_commits", "mentioned_in_docs", "ai_in_production", "ai_restricted", "store_prompts",
  "reviewed_ai_licenses", "ai_training", "assert_code_ownership",
];
const OWNERSHIP_EXCLUDED = ["assert_code_ownership"];

// Maturity-answer presets so the emailed scores span a realistic range.
const MATURITY = {
  poor: {
    prompting_policy: "No", content_policy: "No", code_reviewed: "No", ai_restricted: "No",
    reviewed_ai_licenses: "No", ai_training: "No", awareness: "No", contracts_address_ai: "No",
    code_labeled: "No", mentioned_in_commits: "No", mentioned_in_docs: "No", store_prompts: "No",
    assert_code_ownership: "No", ai_in_production: "Yes", vendor_ai_use: "Yes",
    ai_tools: ["GitHub Copilot", "ChatGPT", "Cursor"], ai_usage: ["Code", "Agentic"],
  },
  good: {
    prompting_policy: "Yes", content_policy: "Yes", code_reviewed: "Yes", ai_restricted: "Yes",
    reviewed_ai_licenses: "Yes", ai_training: "Yes", awareness: "Yes", contracts_address_ai: "Yes",
    code_labeled: "Yes", mentioned_in_commits: "Yes", mentioned_in_docs: "Yes", store_prompts: "Yes",
    assert_code_ownership: "Yes", ai_in_production: "No", vendor_ai_use: "No",
    ai_tools: ["GitHub Copilot"], ai_usage: ["Tests"],
  },
  mixed: {
    prompting_policy: "Yes", content_policy: "No", code_reviewed: "Yes", ai_restricted: "No",
    reviewed_ai_licenses: "No", ai_training: "Yes", awareness: "Yes", contracts_address_ai: "No",
    code_labeled: "No", mentioned_in_commits: "Yes", mentioned_in_docs: "No", store_prompts: "No",
    assert_code_ownership: "No", ai_in_production: "Yes", vendor_ai_use: "No",
    ai_tools: ["GitHub Copilot", "Claude / Claude Code"], ai_usage: ["Code", "Refactoring"],
  },
};

function personaFields(primary, stacked) {
  const stackedObjs = stacked.map((n) => ({ name: n, inbound: RATINGS[n][0], outbound: RATINGS[n][1], mitigating: n === "Renter" }));
  const triggers = stacked.filter((n) => n !== "Renter");
  const crit = [primary, ...triggers].filter((n) => RATINGS[n][1] === "Critical").length;
  return {
    persona_primary: primary,
    persona_stacked: stacked.join(", "),
    persona_path: `E2E ${primary}${stacked.length ? " > Promises: " + stacked.join(", ") : ""}`,
    persona_result: JSON.stringify({
      primary: { name: primary, inbound: RATINGS[primary][0], outbound: RATINGS[primary][1] },
      stacked: stackedObjs,
      criticalOutboundCount: crit,
    }),
  };
}

function payloadFor(s) {
  return {
    name: `E2E ${s.name}`,
    email: TEST_EMAIL_TO,
    testSend: true,
    ...MATURITY[s.maturity],
    ...(s.excluded ? { scored_excluded: s.excluded.join(",") } : {}),
    ...personaFields(s.primary, s.stacked || []),
  };
}

// 20 choice scenarios: every persona, the key stacks, and a score range.
const SCENARIOS = [
  { name: "Model Maker", primary: "Model Maker", maturity: "mixed" },
  { name: "Giver", primary: "Giver", maturity: "good", excluded: OWNERSHIP_EXCLUDED },
  { name: "Civic Coder", primary: "Civic Coder", maturity: "mixed", excluded: OWNERSHIP_EXCLUDED },
  { name: "Acquirer", primary: "Acquirer", maturity: "mixed", excluded: ACQUIRER_EXCLUDED },
  { name: "Host", primary: "Host", maturity: "mixed" },
  { name: "Host + Renter (mitigating)", primary: "Host", stacked: ["Renter"], maturity: "mixed" },
  { name: "Hired Gun", primary: "Hired Gun", maturity: "poor" },
  { name: "Inheritor", primary: "Inheritor", maturity: "mixed" },
  { name: "Internal Tooler", primary: "Internal Tooler", maturity: "good" },
  { name: "Walled Garden", primary: "Walled Garden", maturity: "good" },
  { name: "Bootstrapper", primary: "Bootstrapper", maturity: "mixed" },
  { name: "Onshorer", primary: "Onshorer", maturity: "mixed" },
  { name: "Offshorer", primary: "Offshorer", maturity: "poor" },
  { name: "Licensor", primary: "Licensor", maturity: "mixed" },
  { name: "Licensor + Fed + Regulated (3 critical-out)", primary: "Licensor", stacked: ["Fed Supplier", "Regulated"], maturity: "poor" },
  { name: "Exiter", primary: "Exiter", maturity: "mixed" },
  { name: "Exiter + Two-Tier", primary: "Exiter", stacked: ["Two-Tier"], maturity: "poor" },
  { name: "Host + Fed Supplier", primary: "Host", stacked: ["Fed Supplier"], maturity: "mixed" },
  { name: "Host + Two-Tier", primary: "Host", stacked: ["Two-Tier"], maturity: "mixed" },
  { name: "Licensor + Fed + Regulated + Two-Tier (4 critical-out)", primary: "Licensor", stacked: ["Fed Supplier", "Regulated", "Two-Tier"], maturity: "poor" },
];

test.describe("live email delivery (sends real emails)", () => {
  test.describe.configure({ retries: 2 }); // absorb occasional Resend rate limits
  test.skip(!TEST_SECRET || !TEST_EMAIL_TO, "Set WOTC_TEST_SECRET and TEST_EMAIL_TO to actually send emails.");

  for (const s of SCENARIOS) {
    test(`sends: ${s.name}`, async () => {
      const ctx = await request.newContext();
      const res = await ctx.post(WORKER_URL, {
        headers: { "Content-Type": "application/json", "X-Test-Secret": TEST_SECRET },
        data: payloadFor(s),
      });
      expect(res.status()).toBe(200);
      const j = await res.json();
      await ctx.dispose();
      expect(j.persona.primary).toBe(s.primary);
      expect(j.sent, "worker should have attempted a send").toBeTruthy();
      expect(j.sent.ok, `Resend send failed: ${JSON.stringify(j.sent)}`).toBe(true);
    });
  }
});
