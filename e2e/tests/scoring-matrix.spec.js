// Exhaustive scoring checks (worker test mode). Verifies the two-axis scoring:
// each scored question moves the correct axis by the correct normalized amount
// and leaves the other axis at 0; band thresholds map to the right level; and
// the outbound cap holds. Needs WOTC_TEST_SECRET (see worker-email.spec.js).
const { test, expect, request } = require("@playwright/test");

const WORKER_URL = process.env.WORKER_URL || "https://ai-assessment-worker.richard-dd5.workers.dev";
const TEST_SECRET = process.env.WOTC_TEST_SECRET;

// Every scored answer at its non-risky value -> both axes 0.
const ALL_GOOD = {
  prompting_policy: "Yes", code_reviewed: "Yes", ai_restricted: "Yes", reviewed_ai_licenses: "Yes",
  code_labeled: "Yes", store_prompts: "Yes",
  assert_code_ownership: "Yes", content_policy: "Yes", awareness: "Yes", contracts_address_ai: "Yes",
  ai_training: "Yes", mentioned_in_commits: "Yes", mentioned_in_docs: "Yes",
  ai_in_production: "No", vendor_ai_use: "No",
};

const INBOUND_KEYS = ["prompting_policy", "code_reviewed", "ai_restricted", "reviewed_ai_licenses", "code_labeled", "store_prompts"];
const OUTBOUND_KEYS = ["assert_code_ownership", "content_policy", "awareness", "contracts_address_ai", "ai_training", "mentioned_in_commits", "mentioned_in_docs", "ai_in_production", "vendor_ai_use"];
const WEIGHT = {
  prompting_policy: 10, code_reviewed: 10, ai_restricted: 10, reviewed_ai_licenses: 10, code_labeled: 5, store_prompts: 5,
  assert_code_ownership: 20, content_policy: 10, awareness: 10, contracts_address_ai: 10, ai_training: 10,
  mentioned_in_commits: 5, mentioned_in_docs: 5, ai_in_production: 10, vendor_ai_use: 5,
};
const INVERTED = new Set(["ai_in_production", "vendor_ai_use"]); // risky value is "Yes"
const POSSIBLE = { inbound: 50, outbound: 85 };

const axisOf = (key) => (INBOUND_KEYS.includes(key) ? "inbound" : "outbound");
const riskyValue = (key) => (INVERTED.has(key) ? "Yes" : "No");
function band(score) {
  if (score >= 81) return "Critical";
  if (score >= 51) return "High";
  if (score >= 21) return "Moderate";
  return "Low";
}

test.describe("assessment scoring matrix (worker test mode)", () => {
  test.skip(!TEST_SECRET, "Set WOTC_TEST_SECRET (and `wrangler secret put TEST_SECRET`) to run these.");

  async function preview(payload) {
    const ctx = await request.newContext();
    const res = await ctx.post(WORKER_URL, {
      headers: { "Content-Type": "application/json", "X-Test-Secret": TEST_SECRET },
      data: payload,
    });
    expect(res.status()).toBe(200);
    const json = await res.json();
    await ctx.dispose();
    return json;
  }

  test("all-good baseline scores 0/Low on both axes", async () => {
    const p = await preview({ name: "baseline", ...ALL_GOOD });
    expect(p.assessment.inbound.score).toBe(0);
    expect(p.assessment.inbound.level).toBe("Low");
    expect(p.assessment.outbound.score).toBe(0);
    expect(p.assessment.outbound.level).toBe("Low");
  });

  for (const key of [...INBOUND_KEYS, ...OUTBOUND_KEYS]) {
    const axis = axisOf(key);
    const other = axis === "inbound" ? "outbound" : "inbound";
    const expected = Math.round((WEIGHT[key] / POSSIBLE[axis]) * 100);
    test(`flipping ${key} adds ${expected} to ${axis} only`, async () => {
      const p = await preview({ name: key, ...ALL_GOOD, [key]: riskyValue(key) });
      expect(p.assessment[axis].score, `${key} should move ${axis}`).toBe(expected);
      expect(p.assessment[axis].level).toBe(band(expected));
      expect(p.assessment[other].score, `${key} should not move ${other}`).toBe(0);
    });
  }

  // Band thresholds on the inbound axis (possible = 50).
  const bandCases = [
    { flip: ["code_reviewed"], score: 20, level: "Low" },
    { flip: ["code_reviewed", "ai_restricted"], score: 40, level: "Moderate" },
    { flip: ["code_reviewed", "ai_restricted", "prompting_policy", "code_labeled"], score: 70, level: "High" },
    { flip: ["code_reviewed", "ai_restricted", "prompting_policy", "reviewed_ai_licenses", "code_labeled"], score: 90, level: "Critical" },
    { flip: INBOUND_KEYS, score: 100, level: "Critical" },
  ];
  for (const bc of bandCases) {
    test(`inbound ${bc.score} -> ${bc.level}`, async () => {
      const form = { ...ALL_GOOD };
      for (const k of bc.flip) form[k] = "No";
      const p = await preview({ name: "band", ...form });
      expect(p.assessment.inbound.score).toBe(bc.score);
      expect(p.assessment.inbound.level).toBe(bc.level);
    });
  }

  test("outbound caps at 80 when ownership is asserted despite the multiplier", async () => {
    const form = {
      ...ALL_GOOD,
      content_policy: "No", awareness: "No", contracts_address_ai: "No", ai_training: "No",
      mentioned_in_commits: "No", mentioned_in_docs: "No", ai_in_production: "Yes", vendor_ai_use: "Yes",
      assert_code_ownership: "Yes", // asserted -> outbound cap applies
      ai_tools: ["a", "b", "c", "d", "e", "f"], ai_usage: ["Code"], // multiplier 1.10
    };
    const p = await preview({ name: "cap", ...form });
    expect(p.assessment.multiplier).toBeCloseTo(1.1, 5);
    expect(p.assessment.outbound.score).toBe(80);
  });

  // Multiplier: the >5-tools (+0.05) and code-like-usage (+0.05) bumps scale an
  // UN-capped score and re-band it. Base config keeps ownership "No" (so the
  // 80-cap never fires) with outbound risky = 40 (ownership 20 + content_policy
  // 10 + awareness 10) and inbound all-good (0). Base score 40/85 = 47, chosen so
  // the 1.10 bump crosses the Moderate -> High boundary.
  const MULT_BASE = {
    ...ALL_GOOD,
    assert_code_ownership: "No", content_policy: "No", awareness: "No",
  };
  const multCases = [
    { name: "multiplier 1.00 (<=5 tools, no code usage)", tools: ["a", "b"], usage: ["Tests"], mult: 1.0, outbound: 47, level: "Moderate" },
    { name: "multiplier 1.05 (>5 tools only)", tools: ["a", "b", "c", "d", "e", "f"], usage: ["Tests"], mult: 1.05, outbound: 49, level: "Moderate" },
    { name: "multiplier 1.05 (code-like usage only)", tools: ["a"], usage: ["Code"], mult: 1.05, outbound: 49, level: "Moderate" },
    { name: "multiplier 1.10 (both) pushes Moderate -> High", tools: ["a", "b", "c", "d", "e", "f"], usage: ["Code"], mult: 1.1, outbound: 52, level: "High" },
  ];
  for (const mc of multCases) {
    test(mc.name, async () => {
      const p = await preview({ name: "mult", ...MULT_BASE, ai_tools: mc.tools, ai_usage: mc.usage });
      expect(p.assessment.multiplier).toBeCloseTo(mc.mult, 5);
      expect(p.assessment.inbound.score, "multiplier must not manufacture score from 0").toBe(0);
      expect(p.assessment.outbound.score).toBe(mc.outbound);
      expect(p.assessment.outbound.level).toBe(mc.level);
    });
  }

  test("multiplier cannot push a maxed axis past 100", async () => {
    const p = await preview({
      name: "mult-cap", ...ALL_GOOD,
      assert_code_ownership: "No", content_policy: "No", awareness: "No", contracts_address_ai: "No",
      ai_training: "No", mentioned_in_commits: "No", mentioned_in_docs: "No",
      ai_in_production: "Yes", vendor_ai_use: "Yes",
      ai_tools: ["a", "b", "c", "d", "e", "f"], ai_usage: ["Code"], // multiplier 1.10, outbound risky = 85
    });
    expect(p.assessment.multiplier).toBeCloseTo(1.1, 5);
    expect(p.assessment.outbound.score).toBe(100);
    expect(p.assessment.outbound.level).toBe("Critical");
  });

  // Band thresholds on the OUTBOUND axis (possible = 85, so the rounding differs
  // from the inbound band cases above). Multiplier 1.0; ownership "No" so no cap.
  const outboundBandCases = [
    { flip: [], score: 24, level: "Moderate" }, // ownership only: 20/85
    { flip: ["content_policy", "awareness", "ai_in_production"], score: 59, level: "High" }, // 50/85
    { flip: ["content_policy", "awareness", "contracts_address_ai", "ai_training", "ai_in_production"], score: 82, level: "Critical" }, // 70/85
  ];
  for (const bc of outboundBandCases) {
    test(`outbound ${bc.score} -> ${bc.level}`, async () => {
      const form = { ...ALL_GOOD, assert_code_ownership: "No" };
      for (const k of bc.flip) form[k] = k === "ai_in_production" ? "Yes" : "No";
      const p = await preview({ name: "outband", ...form });
      expect(p.assessment.multiplier).toBeCloseTo(1.0, 5);
      expect(p.assessment.outbound.score).toBe(bc.score);
      expect(p.assessment.outbound.level).toBe(bc.level);
    });
  }
});
