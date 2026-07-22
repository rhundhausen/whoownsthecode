// Script A: drive the deployed assessment page and verify the persona wizard.
// No form submission happens here, so reCAPTCHA is never involved. These tests
// exercise the client-side logic and assert both the visible result and the
// hidden fields that would be posted to the worker.
const { test, expect } = require("@playwright/test");

const ASSESSMENT_PATH = "/assessment/";

async function goToAssessment(page) {
  await page.goto(ASSESSMENT_PATH, { waitUntil: "domcontentloaded" });
  await expect(page.locator("#personaWizard")).toBeVisible();
}

function radio(page, name, value) {
  return page.locator(`input[name="${name}"][value="${value}"]`);
}

function hiddenValue(page, name) {
  return page.locator(`input[name="${name}"]`).inputValue();
}

test.describe("persona wizard (deployed page)", () => {
  test("short-circuit resolves Model Maker immediately", async ({ page }) => {
    await goToAssessment(page);
    await radio(page, "persona_scope", "own").check();
    await radio(page, "persona_model_maker", "yes").check();
    await expect(page.locator("#personaResult")).toContainText("Model Maker");
    expect(await hiddenValue(page, "persona_primary")).toBe("Model Maker");
  });

  test("Acquirer hides the build-process questions", async ({ page }) => {
    await goToAssessment(page);
    await radio(page, "persona_scope", "acquire").check();
    await expect(page.locator("#personaResult")).toContainText("Acquirer");

    // Build-process block and its section headers are hidden.
    await expect(page.locator("#sec-tools")).toBeHidden();
    await expect(page.locator("#sec-policies")).toBeHidden();
    await expect(page.locator('input[name="ai_tools"]').first()).toBeHidden();
    await expect(page.locator('input[name="assert_code_ownership"]').first()).toBeHidden();

    // Diligence-relevant questions remain.
    await expect(page.locator('input[name="vendor_ai_use"]').first()).toBeVisible();
    await expect(page.locator('input[name="awareness"]').first()).toBeVisible();
    await expect(page.locator("#sec-support")).toBeVisible();

    const excluded = await hiddenValue(page, "scored_excluded");
    expect(excluded).toContain("assert_code_ownership");
    expect(excluded.split(",").length).toBe(16);
  });

  test("promise check stacks Licensor + Fed Supplier + Regulated", async ({ page }) => {
    await goToAssessment(page);
    await radio(page, "persona_scope", "own").check();
    await radio(page, "persona_model_maker", "no").check();
    await radio(page, "persona_giver", "no").check();
    await radio(page, "persona_civic", "no").check();
    await radio(page, "persona_host", "no").check();
    await radio(page, "persona_authorship", "employees").check();
    await radio(page, "persona_employee_usage", "sell_license").check();
    await page.locator('input[name="persona_promise"][value="fed"]').check();
    await page.locator('input[name="persona_promise"][value="regulated"]').check();

    const result = page.locator("#personaResult");
    await expect(result).toContainText("Licensor");
    await expect(result).toContainText("Fed Supplier");
    await expect(result).toContainText("Regulated");

    const payload = JSON.parse(await hiddenValue(page, "persona_result"));
    expect(payload.primary.name).toBe("Licensor");
    expect(payload.criticalOutboundCount).toBe(3);
  });

  test("hired US shop sees the promise check and stacks Fed Supplier on Onshorer", async ({ page }) => {
    await goToAssessment(page);
    await radio(page, "persona_scope", "own").check();
    await radio(page, "persona_model_maker", "no").check();
    await radio(page, "persona_giver", "no").check();
    await radio(page, "persona_civic", "no").check();
    await radio(page, "persona_host", "no").check();
    await radio(page, "persona_authorship", "hired_shop").check();

    // The promise question is reachable on this branch even before US/offshore.
    await expect(page.locator('[data-step="p8"]')).toBeVisible();

    await radio(page, "persona_shop", "us").check();
    await page.locator('input[name="persona_promise"][value="fed"]').check();

    const result = page.locator("#personaResult");
    await expect(result).toContainText("Onshorer");
    await expect(result).toContainText("Fed Supplier");

    const payload = JSON.parse(await hiddenValue(page, "persona_result"));
    expect(payload.primary.name).toBe("Onshorer");
    const fed = payload.stacked.find((s) => s.name === "Fed Supplier");
    expect(fed.outbound).toBe("Critical");
    expect(payload.criticalOutboundCount).toBe(1);
  });

  test("offshore shop with two critical promises counts both on Offshorer", async ({ page }) => {
    await goToAssessment(page);
    await radio(page, "persona_scope", "own").check();
    await radio(page, "persona_model_maker", "no").check();
    await radio(page, "persona_giver", "no").check();
    await radio(page, "persona_civic", "no").check();
    await radio(page, "persona_host", "no").check();
    await radio(page, "persona_authorship", "hired_shop").check();
    await radio(page, "persona_shop", "offshore").check();
    await page.locator('input[name="persona_promise"][value="fed"]').check();
    await page.locator('input[name="persona_promise"][value="regulated"]').check();

    const payload = JSON.parse(await hiddenValue(page, "persona_result"));
    expect(payload.primary.name).toBe("Offshorer");
    // Offshorer itself is High, so exactly the two promises are critical.
    expect(payload.criticalOutboundCount).toBe(2);

    // Switching authorship away hides the promise check and drops the stack.
    await radio(page, "persona_authorship", "employees").check();
    await radio(page, "persona_employee_usage", "internal").check();
    await expect(page.locator('[data-step="p8"]')).toBeHidden();
    const after = JSON.parse(await hiddenValue(page, "persona_result"));
    expect(after.primary.name).toBe("Internal Tooler");
    expect(after.stacked).toEqual([]);
  });

  test("Renter is shown as a mitigating flag on the Host path", async ({ page }) => {
    await goToAssessment(page);
    await radio(page, "persona_scope", "own").check();
    await radio(page, "persona_model_maker", "no").check();
    await radio(page, "persona_giver", "no").check();
    await radio(page, "persona_civic", "no").check();
    await radio(page, "persona_host", "yes").check();
    await page.locator('input[name="persona_promise"][value="renter"]').check();

    const result = page.locator("#personaResult");
    await expect(result).toContainText("Host");
    await expect(result).toContainText("Renter");
    await expect(result).toContainText("offsets much of the risk");
  });

  test("start over resets the wizard and restores the maturity questions", async ({ page }) => {
    await goToAssessment(page);
    await radio(page, "persona_scope", "acquire").check();
    await expect(page.locator("#personaResult")).toBeVisible();

    await page.locator("#personaResult a#personaReset").click();
    await expect(page.locator("#personaResult")).toBeHidden();
    expect(await hiddenValue(page, "persona_primary")).toBe("");
    expect(await hiddenValue(page, "scored_excluded")).toBe("");
    await expect(page.locator("#sec-tools")).toBeVisible();
    await expect(page.locator('input[name="assert_code_ownership"]').first()).toBeVisible();
  });

  test("blog link points at the persona article", async ({ page }) => {
    await goToAssessment(page);
    await radio(page, "persona_scope", "own").check();
    await radio(page, "persona_model_maker", "yes").check();
    const link = page.locator('#personaResult a', { hasText: "Learn more about AI-code risk personas" });
    await expect(link).toHaveAttribute("href", "https://accentient.com/blog/ai-code-ownership-by-persona/");
  });
});
