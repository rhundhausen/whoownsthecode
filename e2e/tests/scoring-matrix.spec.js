// Exhaustive scoring checks (worker test mode). Verifies the two-axis scoring:
// each scored question moves the correct axis by the correct normalized amount
// and leaves the other axis at 0; band thresholds map to the right level; the
// ownership-assertion rule holds; and the multiplier behaves. Needs
// WOTC_TEST_SECRET (see worker-email.spec.js).
const { test, expect, request } = require("@playwright/test");

const WORKER_URL = process.env.WORKER_URL || "https://ai-assessment-worker.richard-dd5.workers.dev";
const TEST_SECRET = process.env.WOTC_TEST_SECRET;

// Every scored answer at its non-risky value -> both axes 0. The graded
// questions (code_reviewed, code_labeled) are safe only at "Always"; the
// ownership assertion is safe only when at least two authorship-record answers
// (commits, docs, prompts, labeling "Always") are also safe.
const ALL_GOOD = {
  prompting_policy: "Yes", code_reviewed: "Always", ai_restricted: "Yes", code_labeled: "Always",
  assert_code_ownership: "Yes", content_policy: "Yes", awareness: "Yes", contracts_address_ai: "Yes",
  ai_training: "Yes", reviewed_ai_licenses: "Yes", mentioned_in_commits: "Yes", mentioned_in_docs: "Yes",
  store_prompts: "Yes", ai_in_production: "No", vendor_ai_use: "No",
};

// Axis membership mirrors the SCORED array in ai-assessment-worker/src/index.js.
const INBOUND_KEYS = ["prompting_policy", "code_reviewed", "ai_restricted", "code_labeled"];
const OUTBOUND_KEYS = [
  "assert_code_ownership", "content_policy", "awareness", "contracts_address_ai", "ai_training",
  "reviewed_ai_licenses", "mentioned_in_commits", "mentioned_in_docs", "store_prompts",
  "ai_in_production", "vendor_ai_use",
];
const WEIGHT = {
  prompting_policy: 10, code_reviewed: 10, ai_restricted: 10, code_labeled: 5,
  assert_code_ownership: 10, content_policy: 10, awareness: 10, contracts_address_ai: 10, ai_training: 10,
  reviewed_ai_licenses: 10, mentioned_in_commits: 5, mentioned_in_docs: 5, store_prompts: 5,
  ai_in_production: 10, vendor_ai_use: 5,
};
const INVERTED = new Set(["ai_in_production", "vendor_ai_use"]); // risky value is "Yes"
const GRADED = new Set(["code_reviewed", "code_labeled"]); // risky value is "Never"
const POSSIBLE = { inbound: 35, outbound: 90 };

const axisOf = (key) => (INBOUND_KEYS.includes(key) ? "inbound" : "outbound");
const riskyValue = (key) => (INVERTED.has(key) ? "Yes" : GRADED.has(key) ? "Never" : "No");
const pct = (points, axis) => Math.round((points / POSSIBLE[axis]) * 100);
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
    expect(p.assessment.ownershipAsserted).toBe(true);
    expect(p.assessment.ownershipSubstantiated).toBe(true);
  });

  // Flipping one answer from ALL_GOOD moves only its own axis. Ownership "No"
  // scores half its weight; a flipped record question still leaves three safe
  // records, so the ownership assertion stays substantiated.
  for (const key of [...INBOUND_KEYS, ...OUTBOUND_KEYS]) {
    const axis = axisOf(key);
    const other = axis === "inbound" ? "outbound" : "inbound";
    const points = key === "assert_code_ownership" ? WEIGHT[key] / 2 : WEIGHT[key];
    const expected = pct(points, axis);
    test(`flipping ${key} adds ${expected} to ${axis} only`, async () => {
      const p = await preview({ name: key, ...ALL_GOOD, [key]: riskyValue(key) });
      expect(p.assessment[axis].score, `${key} should move ${axis}`).toBe(expected);
      expect(p.assessment[axis].level).toBe(band(expected));
      expect(p.assessment[other].score, `${key} should not move ${other}`).toBe(0);
    });
  }

  test("graded 'Sometimes' scores half weight", async () => {
    const p = await preview({ name: "graded", ...ALL_GOOD, code_reviewed: "Sometimes", code_labeled: "Sometimes" });
    expect(p.assessment.inbound.score).toBe(pct(7.5, "inbound"));
    expect(p.assessment.outbound.score).toBe(0);
  });

  // Band thresholds on the inbound axis (possible = 35).
  const bandCases = [
    { flip: ["code_labeled"], points: 5, level: "Low" },
    { flip: ["code_reviewed"], points: 10, level: "Moderate" },
    { flip: ["code_reviewed", "ai_restricted"], points: 20, level: "High" },
    { flip: ["code_reviewed", "ai_restricted", "prompting_policy"], points: 30, level: "Critical" },
    { flip: INBOUND_KEYS, points: 35, level: "Critical" },
  ];
  for (const bc of bandCases) {
    const score = pct(bc.points, "inbound");
    test(`inbound ${score} -> ${bc.level}`, async () => {
      const form = { ...ALL_GOOD };
      for (const k of bc.flip) form[k] = riskyValue(k);
      const p = await preview({ name: "band", ...form });
      expect(p.assessment.inbound.score).toBe(score);
      expect(p.assessment.inbound.level).toBe(bc.level);
    });
  }

  // Ownership assertion rule: "Yes" is safe only with at least two safe
  // authorship-record answers; otherwise it scores full weight and both emails
  // carry a note. "No" scores half weight and no note.
  test.describe("ownership assertion", () => {
    const NO_RECORDS = { mentioned_in_commits: "No", mentioned_in_docs: "No", store_prompts: "No", code_labeled: "Never" };
    const NOTE_TEXT = "ownership is asserted but the authorship record does not yet support it";
    const NOTE_HTML = "Ownership is asserted, but the authorship record";

    test("Yes with two records is substantiated", async () => {
      const p = await preview({ name: "own-2", ...ALL_GOOD, store_prompts: "No", code_labeled: "Never" });
      expect(p.assessment.ownershipSubstantiated).toBe(true);
      expect(p.assessment.outbound.score).toBe(pct(5, "outbound")); // prompts only
      expect(p.assessment.inbound.score).toBe(pct(5, "inbound")); // labeling only
      expect(p.email.text).not.toContain(NOTE_TEXT);
    });

    test("Yes with one record scores full weight and adds the note to both emails", async () => {
      const p = await preview({ name: "own-1", ...ALL_GOOD, ...NO_RECORDS, mentioned_in_commits: "Yes" });
      expect(p.assessment.ownershipAsserted).toBe(true);
      expect(p.assessment.ownershipSubstantiated).toBe(false);
      expect(p.assessment.outbound.score).toBe(pct(10 + 5 + 5, "outbound")); // ownership + docs + prompts
      expect(p.email.text).toContain(NOTE_TEXT);
      expect(p.email.html).toContain(NOTE_HTML);
      expect(p.userEmail.text).toContain(NOTE_TEXT);
      expect(p.userEmail.html).toContain(NOTE_HTML);
    });

    test("labeling 'Sometimes' does not count as a record", async () => {
      const p = await preview({ name: "own-sometimes", ...ALL_GOOD, ...NO_RECORDS, mentioned_in_commits: "Yes", code_labeled: "Sometimes" });
      expect(p.assessment.ownershipSubstantiated).toBe(false);
    });

    test("No scores half weight with no note", async () => {
      const p = await preview({ name: "own-no", ...ALL_GOOD, assert_code_ownership: "No" });
      expect(p.assessment.ownershipAsserted).toBe(false);
      expect(p.assessment.outbound.score).toBe(pct(5, "outbound"));
      expect(p.assessment.outbound.flagged).toBe(1);
      expect(p.email.text).not.toContain(NOTE_TEXT);
      expect(p.email.html).not.toContain(NOTE_HTML);
    });

    test("No costs less than an unsupported Yes", async () => {
      const yes = await preview({ name: "own-yes-bare", ...ALL_GOOD, ...NO_RECORDS });
      const no = await preview({ name: "own-no-bare", ...ALL_GOOD, ...NO_RECORDS, assert_code_ownership: "No" });
      expect(yes.assessment.outbound.score).toBe(pct(10 + 15, "outbound"));
      expect(no.assessment.outbound.score).toBe(pct(5 + 15, "outbound"));
    });

    test("Giver: the question is excluded, so a bare Yes is neither asserted nor penalized", async () => {
      const p = await preview({ name: "own-giver", ...ALL_GOOD, ...NO_RECORDS, persona_primary: "Giver" });
      expect(p.assessment.ownershipAsserted).toBe(false);
      expect(p.assessment.outbound.possible).toBe(80);
      expect(p.assessment.outbound.score).toBe(Math.round((15 / 80) * 100));
      expect(p.email.html).not.toContain(NOTE_HTML);
    });
  });

  // Multiplier: the >5-tools (+0.05) and code-like-usage (+0.05) bumps scale the
  // normalized score and re-band it. Base config: inbound all-good (0) and
  // outbound risky = 45 of 90 (content_policy, awareness, contracts, training,
  // vendor), so the base score sits exactly on 50 and the first bump crosses
  // the Moderate -> High boundary.
  const MULT_BASE = {
    ...ALL_GOOD,
    content_policy: "No", awareness: "No", contracts_address_ai: "No", ai_training: "No", vendor_ai_use: "Yes",
  };
  const multCases = [
    { name: "multiplier 1.00 (<=5 tools, no code usage)", tools: ["a", "b"], usage: ["Tests"], mult: 1.0, outbound: 50, level: "Moderate" },
    { name: "multiplier 1.05 (>5 tools only) pushes Moderate -> High", tools: ["a", "b", "c", "d", "e", "f"], usage: ["Tests"], mult: 1.05, outbound: 53, level: "High" },
    { name: "multiplier 1.05 (code-like usage only)", tools: ["a"], usage: ["Code"], mult: 1.05, outbound: 53, level: "High" },
    { name: "multiplier 1.10 (both)", tools: ["a", "b", "c", "d", "e", "f"], usage: ["Code"], mult: 1.1, outbound: 55, level: "High" },
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
    const form = { ...ALL_GOOD };
    for (const k of OUTBOUND_KEYS) form[k] = riskyValue(k);
    form.assert_code_ownership = "Yes"; // unsupported assertion = full weight
    const p = await preview({
      name: "mult-cap", ...form,
      ai_tools: ["a", "b", "c", "d", "e", "f"], ai_usage: ["Code"], // multiplier 1.10, outbound risky = 90
    });
    expect(p.assessment.multiplier).toBeCloseTo(1.1, 5);
    expect(p.assessment.outbound.score).toBe(100);
    expect(p.assessment.outbound.level).toBe("Critical");
  });

  // Band thresholds on the OUTBOUND axis (possible = 90, so the rounding differs
  // from the inbound band cases above). Multiplier 1.0; ownership "No" (5 pts).
  const outboundBandCases = [
    { flip: [], points: 5, level: "Low" }, // ownership "No" only
    { flip: ["content_policy", "awareness", "ai_in_production"], points: 35, level: "Moderate" },
    { flip: ["content_policy", "awareness", "contracts_address_ai", "ai_training", "ai_in_production"], points: 55, level: "High" },
    { flip: ["content_policy", "awareness", "contracts_address_ai", "ai_training", "ai_in_production", "reviewed_ai_licenses", "mentioned_in_commits", "mentioned_in_docs", "store_prompts"], points: 80, level: "Critical" },
  ];
  for (const bc of outboundBandCases) {
    const score = pct(bc.points, "outbound");
    test(`outbound ${score} -> ${bc.level}`, async () => {
      const form = { ...ALL_GOOD, assert_code_ownership: "No" };
      for (const k of bc.flip) form[k] = riskyValue(k);
      const p = await preview({ name: "outband", ...form });
      expect(p.assessment.multiplier).toBeCloseTo(1.0, 5);
      expect(p.assessment.outbound.score).toBe(score);
      expect(p.assessment.outbound.level).toBe(bc.level);
    });
  }

  test("a persona_primary that collides with an Object.prototype key is harmless", async () => {
    for (const persona of ["constructor", "__proto__", "toString"]) {
      const p = await preview({ name: "proto", ...ALL_GOOD, persona_primary: persona });
      expect(p.assessment.inbound.score).toBe(0);
      expect(p.assessment.outbound.score).toBe(0);
    }
  });
});
