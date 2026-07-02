// Results group, backend parity with the UI persona matrix. Runs the same
// persona and stacking scenarios through the WORKER (test mode, no send) and
// asserts the returned persona echo, the computed inbound/outbound scores and
// levels, and the rendered persona profile. Maturity answers are fixed at
// all-risky so the expected scores are deterministic; the notable per-persona
// difference is Acquirer, whose inbound questions are all excluded (-> 0/Low).
// Per-question scoring detail lives in scoring-matrix.spec.js.
const { test, expect, request } = require("@playwright/test");

const WORKER_URL = process.env.WORKER_URL || "https://ai-assessment-worker.richard-dd5.workers.dev";
const TEST_SECRET = process.env.WOTC_TEST_SECRET;

// [inbound, outbound] per persona, from the blog risk matrix.
const RATINGS = {
  "Model Maker": ["Critical", "Low"], "Giver": ["Low", "None"], "Civic Coder": ["Moderate", "None"],
  "Acquirer": ["Low", "Moderate"], "Host": ["Low", "Moderate"], "Hired Gun": ["Low", "Critical"],
  "Inheritor": ["Low", "High"], "Internal Tooler": ["Low", "Low"], "Walled Garden": ["Low", "Low"],
  "Bootstrapper": ["Moderate", "High"], "Exiter": ["Moderate", "Critical"], "Onshorer": ["Low", "High"],
  "Offshorer": ["Low", "High"], "Licensor": ["Moderate", "Critical"], "Fed Supplier": ["Moderate", "Critical"],
  "Regulated": ["Moderate", "Critical"], "Two-Tier": ["Moderate", "Critical"], "Renter": ["Moderate", "Moderate"],
};

const INBOUND_KEYS = ["prompting_policy", "code_reviewed", "ai_restricted", "reviewed_ai_licenses", "code_labeled", "store_prompts"];
const ACQUIRER_EXCLUDED = [
  "ai_tools", "ai_usage", "prompting_policy", "content_policy", "code_reviewed", "code_labeled",
  "mentioned_in_commits", "mentioned_in_docs", "ai_in_production", "ai_restricted", "store_prompts",
  "reviewed_ai_licenses", "ai_training", "assert_code_ownership",
];
const OWNERSHIP_EXCLUDED = ["assert_code_ownership"];
const EXCLUSIONS = { "Acquirer": ACQUIRER_EXCLUDED, "Civic Coder": OWNERSHIP_EXCLUDED, "Giver": OWNERSHIP_EXCLUDED };

// All scored answers at their risky value.
const POOR = {
  prompting_policy: "No", content_policy: "No", code_reviewed: "No", ai_restricted: "No",
  reviewed_ai_licenses: "No", ai_training: "No", awareness: "No", contracts_address_ai: "No",
  code_labeled: "No", mentioned_in_commits: "No", mentioned_in_docs: "No", store_prompts: "No",
  assert_code_ownership: "No", ai_in_production: "Yes", vendor_ai_use: "Yes",
  ai_tools: ["GitHub Copilot", "ChatGPT", "Cursor"], ai_usage: ["Code", "Agentic"],
};

const PRIMARIES = [
  "Model Maker", "Giver", "Civic Coder", "Acquirer", "Host", "Hired Gun", "Inheritor",
  "Internal Tooler", "Walled Garden", "Bootstrapper", "Onshorer", "Offshorer", "Licensor", "Exiter",
];
const PROMISE_PERSONA = {
  warrant_title: "Licensor", fed: "Fed Supplier", regulated: "Regulated",
  two_tier: "Two-Tier", exit: "Exiter", renter: "Renter",
};
const BOXES = ["warrant_title", "fed", "regulated", "two_tier", "exit", "renter"];

function personaFields(primary, stacked) {
  const stackedObjs = stacked.map((n) => ({ name: n, inbound: RATINGS[n][0], outbound: RATINGS[n][1], mitigating: n === "Renter" }));
  const triggers = stacked.filter((n) => n !== "Renter");
  const crit = [primary, ...triggers].filter((n) => RATINGS[n][1] === "Critical").length;
  return {
    fields: {
      persona_primary: primary,
      persona_stacked: stacked.join(", "),
      persona_path: `Results ${primary}`,
      persona_result: JSON.stringify({
        primary: { name: primary, inbound: RATINGS[primary][0], outbound: RATINGS[primary][1] },
        stacked: stackedObjs,
        criticalOutboundCount: crit,
      }),
    },
    crit,
  };
}

function buildPayload(primary, stacked, excluded) {
  const { fields } = personaFields(primary, stacked);
  return { name: `Results ${primary}`, email: "results@example.com", ...POOR, ...(excluded ? { scored_excluded: excluded.join(",") } : {}), ...fields };
}

test.describe("results matrix: worker output for every persona scenario", () => {
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

  // Expected scores under POOR: outbound is always 100/Critical (there is always
  // at least one shown, risky outbound question); inbound is 0/Low only when all
  // inbound questions are excluded (Acquirer), else 100/Critical.
  function assertScores(j, excluded) {
    const inboundAllExcluded = !!excluded && INBOUND_KEYS.every((k) => excluded.includes(k));
    expect(j.assessment.inbound.score).toBe(inboundAllExcluded ? 0 : 100);
    expect(j.assessment.inbound.level).toBe(inboundAllExcluded ? "Low" : "Critical");
    expect(j.assessment.outbound.score).toBe(100);
    expect(j.assessment.outbound.level).toBe("Critical");
  }

  function assertProfile(j, primary, stacked, crit) {
    expect(j.persona.primary).toBe(primary);
    expect(j.email.text).toContain(primary);
    for (const s of stacked) expect(j.email.text).toContain(s);
    if (crit >= 2) expect(j.email.text).toContain(`${crit} critical-outbound triggers on one codebase`);
    if (stacked.includes("Renter")) expect(j.email.text).toContain("[mitigating]");
  }

  test.describe("every primary persona", () => {
    for (const persona of PRIMARIES) {
      const [inb, out] = RATINGS[persona];
      test(`${persona} -> ${inb}/${out}`, async () => {
        const excluded = EXCLUSIONS[persona] || null;
        const { crit } = personaFields(persona, []);
        const j = await preview(buildPayload(persona, [], excluded));
        assertProfile(j, persona, [], crit);
        assertScores(j, excluded);
      });
    }
  });

  test.describe("every promise-check persona (stacked on Host)", () => {
    for (const [box, persona] of Object.entries(PROMISE_PERSONA)) {
      test(`${box} -> ${persona}`, async () => {
        const { crit } = personaFields("Host", [persona]);
        const j = await preview(buildPayload("Host", [persona], null));
        assertProfile(j, "Host", [persona], crit);
        assertScores(j, null);
      });
    }
  });

  test.describe("all 64 promise-check combinations (stacked on Host)", () => {
    for (let mask = 0; mask < 64; mask++) {
      const checked = BOXES.filter((_, i) => mask & (1 << i));
      const stacked = checked.map((b) => PROMISE_PERSONA[b]);
      const triggers = stacked.filter((n) => n !== "Renter");
      const crit = ["Host", ...triggers].filter((n) => RATINGS[n][1] === "Critical").length;
      const label = checked.length ? checked.join("+") : "(none)";
      test(`Host + [${label}] -> ${crit} critical-outbound`, async () => {
        const j = await preview(buildPayload("Host", stacked, null));
        expect(j.persona.primary).toBe("Host");
        for (const n of stacked) expect(j.email.text).toContain(n);
        if (crit >= 2) expect(j.email.text).toContain(`${crit} critical-outbound triggers on one codebase`);
        else expect(j.email.text).not.toContain("critical-outbound triggers on one codebase");
        if (checked.includes("renter")) expect(j.email.text).toContain("[mitigating]");
        assertScores(j, null);
      });
    }
  });
});
