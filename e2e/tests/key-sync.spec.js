// Key-sync checks: the form in content/assessment.md and the worker in
// ai-assessment-worker/src/index.js each carry their own copy of several lists
// (PERSONA_EXCLUDED, the scored and reported question keys, the assistance
// values). A key present on one side but not the other is silently unscored or
// unreported, so this spec diffs the two source files. It reads from disk only:
// no network, no secrets, so it runs in every `npm test`.
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const FORM = fs.readFileSync(path.join(ROOT, "content", "assessment.md"), "utf8");
const WORKER = fs.readFileSync(path.join(ROOT, "ai-assessment-worker", "src", "index.js"), "utf8");

// Pull `NAME = {...};` out of a source file and parse it as JSON after
// stripping line comments and trailing commas and quoting bare identifier keys.
// The copies are plain object literals of strings and string arrays, so this
// stays well within what JSON accepts.
function objectLiteral(source, name) {
  const m = source.match(new RegExp(`${name} = (\\{[\\s\\S]*?\\});`));
  expect(m, `${name} not found`).toBeTruthy();
  const cleaned = m[1]
    .replace(/\/\/.*$/gm, "")
    .replace(/^(\s*)([A-Za-z_]\w*):/gm, '$1"$2":')
    .replace(/,(\s*[}\]])/g, "$1");
  return JSON.parse(cleaned);
}

const formFieldNames = new Set([...FORM.matchAll(/name="([a-z_]+)"/g)].map((x) => x[1]));
const formValues = (field) => [...FORM.matchAll(new RegExp(`name="${field}"[^>]*value="([^"]*)"`, "g"))].map((x) => x[1]);
const scoredKeys = [...WORKER.matchAll(/^\s*\{ key: "([a-z_]+)",\s+weight:/gm)].map((x) => x[1]);
const questionKeys = [...WORKER.matchAll(/^\s*\{ num: \d+,\s*key: "([a-z_]+)"/gm)].map((x) => x[1]);

test.describe("form <-> worker key sync", () => {
  test("PERSONA_EXCLUDED is identical in the form and the worker", () => {
    const form = objectLiteral(FORM, "var PERSONA_EXCLUDED");
    const worker = objectLiteral(WORKER, "const PERSONA_EXCLUDED");
    expect(worker).toEqual(form);
  });

  test("every excluded key is a form field", () => {
    const worker = objectLiteral(WORKER, "const PERSONA_EXCLUDED");
    for (const key of Object.values(worker).flat()) expect(formFieldNames, key).toContain(key);
  });

  test("every SCORED key is a form field and a reported question", () => {
    expect(scoredKeys.length).toBe(15);
    for (const key of scoredKeys) {
      expect(formFieldNames, key).toContain(key);
      expect(questionKeys, key).toContain(key);
    }
  });

  test("every QUESTIONS key is a form field", () => {
    expect(questionKeys.length).toBe(20);
    for (const key of questionKeys) expect(formFieldNames, key).toContain(key);
  });

  test("assistance checkbox values match ASSISTANCE_VALUE_TO_LABEL", () => {
    const labels = objectLiteral(WORKER, "const ASSISTANCE_VALUE_TO_LABEL");
    expect(Object.keys(labels).sort()).toEqual(formValues("assistance").sort());
  });

  test("graded answers are Always/Sometimes/Never on both graded questions", () => {
    for (const key of ["code_reviewed", "code_labeled"]) {
      expect(formValues(key), key).toEqual(["Always", "Sometimes", "Never"]);
    }
  });

  test("the retired scored_excluded field is gone from the form", () => {
    expect(formFieldNames).not.toContain("scored_excluded");
  });
});
