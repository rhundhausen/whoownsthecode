// Exhaustive persona checks (page, no submit). Verifies that every persona
// resolves with the correct inbound/outbound RATING and that all promise-check
// stacking combinations produce the right stacked set and critical-outbound
// count. The expected ratings are the source of truth from the blog risk
// matrix; if the deployed PERSONAS table drifts from them, these fail.
const { test, expect } = require("@playwright/test");

const ASSESSMENT_PATH = "/assessment/";

// [inbound, outbound] per persona, from the blog risk-matrix table.
const RATINGS = {
  "Model Maker": ["Critical", "Low"],
  "Giver": ["Low", "None"],
  "Civic Coder": ["Moderate", "None"],
  "Acquirer": ["Low", "Moderate"],
  "Host": ["Low", "Moderate"],
  "Hired Gun": ["Low", "Critical"],
  "Inheritor": ["Low", "High"],
  "Internal Tooler": ["Low", "Low"],
  "Walled Garden": ["Low", "Low"],
  "Bootstrapper": ["Moderate", "High"],
  "Exiter": ["Moderate", "Critical"],
  "Onshorer": ["Low", "High"],
  "Offshorer": ["Low", "High"],
  "Licensor": ["Moderate", "Critical"],
  "Fed Supplier": ["Moderate", "Critical"],
  "Regulated": ["Moderate", "Critical"],
  "Two-Tier": ["Moderate", "Critical"],
  "Renter": ["Moderate", "Moderate"],
};

const OWN = ["persona_scope", "own"];
// Selections that reach the authorship question (P5).
const TO_AUTHORSHIP = [
  OWN,
  ["persona_model_maker", "no"],
  ["persona_giver", "no"],
  ["persona_civic", "no"],
  ["persona_host", "no"],
];

// Radio selections that reach each primary persona.
const PRIMARY_PATHS = {
  "Acquirer": [["persona_scope", "acquire"]],
  "Model Maker": [OWN, ["persona_model_maker", "yes"]],
  "Giver": [OWN, ["persona_model_maker", "no"], ["persona_giver", "yes"]],
  "Civic Coder": [OWN, ["persona_model_maker", "no"], ["persona_giver", "no"], ["persona_civic", "yes"]],
  "Host": [OWN, ["persona_model_maker", "no"], ["persona_giver", "no"], ["persona_civic", "no"], ["persona_host", "yes"]],
  "Hired Gun": [...TO_AUTHORSHIP, ["persona_authorship", "we_are_shop"]],
  "Inheritor": [...TO_AUTHORSHIP, ["persona_authorship", "inherited"]],
  "Internal Tooler": [...TO_AUTHORSHIP, ["persona_authorship", "employees"], ["persona_employee_usage", "internal"]],
  "Walled Garden": [...TO_AUTHORSHIP, ["persona_authorship", "employees"], ["persona_employee_usage", "walled"]],
  "Bootstrapper": [...TO_AUTHORSHIP, ["persona_authorship", "employees"], ["persona_employee_usage", "bootstrap"]],
  "Onshorer": [...TO_AUTHORSHIP, ["persona_authorship", "hired_shop"], ["persona_shop", "us"]],
  "Offshorer": [...TO_AUTHORSHIP, ["persona_authorship", "hired_shop"], ["persona_shop", "offshore"]],
  "Licensor": [...TO_AUTHORSHIP, ["persona_authorship", "employees"], ["persona_employee_usage", "sell_license"]],
  "Exiter": [...TO_AUTHORSHIP, ["persona_authorship", "employees"], ["persona_employee_usage", "raise_sell"]],
};

// Promise-check box -> persona it triggers.
const PROMISE_PERSONA = {
  warrant_title: "Licensor",
  fed: "Fed Supplier",
  regulated: "Regulated",
  two_tier: "Two-Tier",
  exit: "Exiter",
  renter: "Renter",
};
const BOXES = ["warrant_title", "fed", "regulated", "two_tier", "exit", "renter"];
const CRITICAL_OUTBOUND = new Set(
  Object.entries(RATINGS).filter(([, [, out]]) => out === "Critical").map(([name]) => name)
);

async function goTo(page) {
  await page.goto(ASSESSMENT_PATH, { waitUntil: "domcontentloaded" });
  await expect(page.locator("#personaWizard")).toBeVisible();
}
async function applyPath(page, selections) {
  for (const [name, value] of selections) {
    await page.locator(`input[name="${name}"][value="${value}"]`).check();
  }
}
async function personaResult(page) {
  return JSON.parse(await page.locator('input[name="persona_result"]').inputValue());
}

test.describe("every primary persona returns its correct inbound/outbound rating", () => {
  for (const [persona, path] of Object.entries(PRIMARY_PATHS)) {
    const [inb, out] = RATINGS[persona];
    test(`${persona} -> ${inb}/${out}`, async ({ page }) => {
      await goTo(page);
      await applyPath(page, path);
      const r = await personaResult(page);
      expect(r.primary.name).toBe(persona);
      expect([r.primary.inbound, r.primary.outbound]).toEqual(RATINGS[persona]);
    });
  }
});

test.describe("every promise-check persona returns its correct rating", () => {
  for (const [box, persona] of Object.entries(PROMISE_PERSONA)) {
    const [inb, out] = RATINGS[persona];
    test(`${box} -> ${persona} (${inb}/${out})`, async ({ page }) => {
      await goTo(page);
      await applyPath(page, PRIMARY_PATHS["Host"]);
      await page.locator(`input[name="persona_promise"][value="${box}"]`).check();
      const r = await personaResult(page);
      const flag = r.stacked.find((s) => s.name === persona);
      expect(flag, `${persona} should be a stacked flag`).toBeTruthy();
      expect([flag.inbound, flag.outbound]).toEqual(RATINGS[persona]);
    });
  }
});

test.describe("all 64 promise-check combinations stack correctly (Host path)", () => {
  for (let mask = 0; mask < 64; mask++) {
    const checked = BOXES.filter((_, i) => mask & (1 << i));
    const expectedStacked = checked.map((b) => PROMISE_PERSONA[b]);
    const expectedTriggers = expectedStacked.filter((n) => n !== "Renter");
    const expectedCrit = ["Host", ...expectedTriggers].filter((n) => CRITICAL_OUTBOUND.has(n)).length;
    const label = checked.length ? checked.join("+") : "(none)";
    test(`Host + [${label}] -> ${expectedCrit} critical-outbound`, async ({ page }) => {
      await goTo(page);
      await applyPath(page, PRIMARY_PATHS["Host"]);
      for (const b of checked) {
        await page.locator(`input[name="persona_promise"][value="${b}"]`).check();
      }
      const r = await personaResult(page);
      expect(r.primary.name).toBe("Host");
      expect(new Set(r.stacked.map((s) => s.name))).toEqual(new Set(expectedStacked));
      expect(r.criticalOutboundCount).toBe(expectedCrit);
      const renter = r.stacked.find((s) => s.name === "Renter");
      if (checked.includes("renter")) {
        expect(renter && renter.mitigating).toBe(true);
      } else {
        expect(renter).toBeFalsy();
      }
    });
  }
});
