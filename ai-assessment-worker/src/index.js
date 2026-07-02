const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function cleanDisplayName(name) {
  return String(name || "")
    .replace(/[\r\n]/g, " ")
    .replace(/[<>]/g, "")
    .replace(/"/g, "'")
    .trim();
}

function escapeHtml(v) {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function asList(value) {
  if (value == null) return "";
  return Array.isArray(value)
    ? [...new Set(value.map(v => String(v).trim()).filter(Boolean))].join(", ")
    : String(value).trim();
}

function asArray(value) {
  if (value == null) return [];
  return Array.isArray(value)
    ? [...new Set(value.map(v => String(v).trim()).filter(Boolean))]
    : [String(value).trim()].filter(Boolean);
}

function orDash(value) {
  const v = asList(value);
  return v ? v : "—";
}

/** Normalize various yes/no shapes to boolean */
function isYes(v) {
  if (v == null) return false;
  if (typeof v === "boolean") return v;
  const s = String(v).trim().toLowerCase();
  return s === "yes" || s === "y" || s === "true" || s === "on" || s === "1";
}

/** Count selected tools in Q1 (ignore "other" free text for safety) */
function countSelectedTools(form) {
  return asArray(form.ai_tools).length;
}

/** Did Q2 include code-like usage? (matches the form's checkbox values) */
function hasCodeLikeUsage(form) {
  const usage = asArray(form.ai_usage).map(s => s.toLowerCase());
  return ["code", "agentic", "refactoring"].some(v => usage.includes(v));
}

/** Keys the client hid for the identified persona; excluded from scoring and
 * the emailed survey detail. Mirrors PERSONA_EXCLUDED in content/assessment.md. */
function getExcluded(form) {
  const raw = form.scored_excluded;
  if (!raw) return new Set();
  return new Set(String(raw).split(",").map(s => s.trim()).filter(Boolean));
}

/** Compute inbound and outbound risk (each 0-100) + band/color per axis */
function computeRiskAssessment(form) {
  // weight = points that a risky answer adds on that question's axis.
  // riskWhen "no": good-practice questions where "No" is the risk.
  // riskWhen "yes": questions where doing the thing is the risk (inverted).
  // axis: which of the two risk directions the question speaks to.
  //   inbound  = what the AI ingested into your build (infringing/copyleft
  //              fragments, tool training data): catching and tracing it.
  //   outbound = what you ship (can you own, license, warrant, and sell it).
  const SCORED = [
    // Outbound: ownership, title, authorship record, what reaches customers.
    { key: "assert_code_ownership", weight: 20, riskWhen: "no",  axis: "outbound" },
    { key: "content_policy",        weight: 10, riskWhen: "no",  axis: "outbound" },
    { key: "awareness",             weight: 10, riskWhen: "no",  axis: "outbound" },
    { key: "contracts_address_ai",  weight: 10, riskWhen: "no",  axis: "outbound" },
    { key: "ai_training",           weight: 10, riskWhen: "no",  axis: "outbound" },
    { key: "mentioned_in_commits",  weight: 5,  riskWhen: "no",  axis: "outbound" },
    { key: "mentioned_in_docs",     weight: 5,  riskWhen: "no",  axis: "outbound" },
    { key: "ai_in_production",      weight: 10, riskWhen: "yes", axis: "outbound" }, // shipping AI code is the risk
    { key: "vendor_ai_use",         weight: 5,  riskWhen: "yes", axis: "outbound" }, // third-party AI use is the exposure
    // Inbound: vetting and tracing what the model put into the codebase.
    { key: "prompting_policy",      weight: 10, riskWhen: "no",  axis: "inbound" },
    { key: "code_reviewed",         weight: 10, riskWhen: "no",  axis: "inbound" },
    { key: "ai_restricted",         weight: 10, riskWhen: "no",  axis: "inbound" },
    { key: "reviewed_ai_licenses",  weight: 10, riskWhen: "no",  axis: "inbound" },
    { key: "code_labeled",          weight: 5,  riskWhen: "no",  axis: "inbound" },
    { key: "store_prompts",         weight: 5,  riskWhen: "no",  axis: "inbound" },
  ];

  const excluded = getExcluded(form);
  const axes = {
    inbound:  { possible: 0, risky: 0, flagged: 0 },
    outbound: { possible: 0, risky: 0, flagged: 0 },
  };

  for (const q of SCORED) {
    if (excluded.has(q.key)) continue;
    const ax = axes[q.axis];
    ax.possible += q.weight;
    const yes = isYes(form[q.key]);
    const risky = q.riskWhen === "yes" ? yes : !yes;
    if (risky) { ax.risky += q.weight; ax.flagged += 1; }
  }

  let multiplier = 1.0;
  const toolsCount = countSelectedTools(form);
  if (toolsCount > 5) multiplier += 0.05;
  if (hasCodeLikeUsage(form)) multiplier += 0.05;
  if (multiplier > 1.15) multiplier = 1.15;

  const ownershipAsserted = !excluded.has("assert_code_ownership") && isYes(form.assert_code_ownership);

  function band(score) {
    if (score >= 81) return { level: "Critical", color: "#dc2626" };
    if (score >= 51) return { level: "High",     color: "#ea580c" };
    if (score >= 21) return { level: "Moderate", color: "#ca8a04" };
    return { level: "Low", color: "#16a34a" };
  }

  // Normalize each axis to 0-100 over the questions actually shown, so the two
  // scores are comparable and persona exclusions do not skew the scale.
  function finalize(ax, capWhenOwned) {
    let score = ax.possible > 0 ? Math.round((ax.risky / ax.possible) * 100 * multiplier) : 0;
    if (score > 100) score = 100;
    if (capWhenOwned && ownershipAsserted) score = Math.min(score, 80);
    return { score, ...band(score), flagged: ax.flagged, possible: ax.possible, risky: ax.risky };
  }

  return {
    inbound: finalize(axes.inbound, false),
    outbound: finalize(axes.outbound, true),
    multiplier,
    toolsCount,
    ownershipAsserted,
  };
}

// Keys must match the assistance checkbox values in content/assessment.md (Q18)
const ASSISTANCE_VALUE_TO_LABEL = {
  assistance_ip_patents: "IP & Patents",
  assistance_risk: "AI Risk Assessment",
  assistance_audit: "Development Audits",
  assistance_best_practices: "Best Practices & Policies",
  assistance_governance: "Governance & Agreements",
  assistance_due_diligence: "M&A Due Diligence",
  assistance_training: "Training & Education",
  assistance_other: "Other",
};

function mapAssistanceValuesToLabels(values) {
  const arr = asArray(values);
  if (!arr.length) return "No assistance selected";
  return arr.map(v => ASSISTANCE_VALUE_TO_LABEL[v] || v).join(", ");
}

const QUESTIONS = [
  { num: 1, key: "ai_tools", label: "Which AI tools are you using?" },
  { num: 2, key: "ai_usage", label: "How are you using AI?" },
  { num: 3, key: "prompting_policy", label: "Policy for AI prompting?" },
  { num: 4, key: "content_policy", label: "Policy for AI content use?" },
  { num: 5, key: "code_reviewed", label: "Review AI-generated code?" },
  { num: 6, key: "code_labeled", label: "Label/comment AI-generated code?" },
  { num: 7, key: "mentioned_in_commits", label: "Mention AI code in commits?" },
  { num: 8, key: "mentioned_in_docs", label: "Mention AI code in documentation?" },
  { num: 9, key: "ai_in_production", label: "Push AI code to production?" },
  { num: 10, key: "ai_restricted", label: "Restrict AI code in certain systems?" },
  { num: 11, key: "store_prompts", label: "Store AI prompts in version control?" },
  { num: 12, key: "reviewed_ai_licenses", label: "Reviewed license terms for AI coding tools?" },
  { num: 13, key: "ai_training", label: "Developers trained on responsible AI?" },
  { num: 14, key: "vendor_ai_use", label: "Contractors/vendors use AI on codebase?" },
  { num: 15, key: "contracts_address_ai", label: "Agreements address AI use and IP ownership?" },
  { num: 16, key: "awareness", label: "Aware of risks of using AI-generated code?" },
  { num: 17, key: "assert_code_ownership", label: "Do you assert that you own the code?" },
  { num: 18, key: "assistance", label: "What kind of assistance are you looking for?" },
];

// Persona profile is computed client-side (see content/assessment.md) and
// posted in hidden fields. The worker only renders it. persona_result is a JSON
// string: { primary:{name,inbound,outbound}, stacked:[{name,inbound,outbound,mitigating}], criticalOutboundCount }.
function parsePersonaResult(form) {
  if (!form.persona_result) return null;
  try {
    const r = JSON.parse(form.persona_result);
    return r && r.primary && r.primary.name ? r : null;
  } catch (_) {
    return null;
  }
}

function buildPersonaLines(form) {
  const primaryName = form.persona_primary ? String(form.persona_primary).trim() : "";
  if (!primaryName) return [];
  const r = parsePersonaResult(form);
  const lines = ["Persona Profile"];
  if (form.persona_path) lines.push(`Path: ${String(form.persona_path).trim()}`);
  if (r) {
    lines.push(`Primary: ${r.primary.name} (Inbound ${r.primary.inbound}, Outbound ${r.primary.outbound})`);
    if (Array.isArray(r.stacked) && r.stacked.length) {
      lines.push("Also flagged:");
      for (const s of r.stacked) {
        const tag = s.mitigating ? " [mitigating]" : "";
        lines.push(`  - ${s.name} (Inbound ${s.inbound}, Outbound ${s.outbound})${tag}`);
      }
    }
    if (r.criticalOutboundCount >= 2) {
      lines.push(`>> ${r.criticalOutboundCount} critical-outbound triggers on one codebase.`);
    }
  } else {
    lines.push(`Primary: ${primaryName}`);
    if (form.persona_stacked) lines.push(`Also flagged: ${String(form.persona_stacked).trim()}`);
  }
  lines.push("");
  return lines;
}

function buildPersonaHTML(form) {
  const primaryName = form.persona_primary ? String(form.persona_primary).trim() : "";
  if (!primaryName) return "";
  const r = parsePersonaResult(form);
  const levelColor = { None: "#9ca3af", Low: "#16a34a", Moderate: "#ca8a04", High: "#ea580c", Critical: "#dc2626" };
  const chip = (label, level) =>
    `<span style="display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:12px;margin-right:14px;"><span style="color:#666;">${label}:</span> <strong style="color:${levelColor[level] || "#666"};">${escapeHtml(level)}</strong></span>`;

  let inner = "";
  if (r) {
    inner += `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;margin-bottom:6px;"><strong>Primary:</strong> ${escapeHtml(r.primary.name)} &nbsp; ${chip("Inbound", r.primary.inbound)} ${chip("Outbound", r.primary.outbound)}</div>`;
    if (Array.isArray(r.stacked) && r.stacked.length) {
      inner += `<div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;margin:6px 0 2px;">Also flagged on this codebase:</div>`;
      for (const s of r.stacked) {
        const tag = s.mitigating ? ` <em style="color:#166534;">(mitigating)</em>` : "";
        inner += `<div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;margin:2px 0;">${escapeHtml(s.name)}${tag} &nbsp; ${chip("Inbound", s.inbound)} ${chip("Outbound", s.outbound)}</div>`;
      }
    }
    if (r.criticalOutboundCount >= 2) {
      inner += `<div style="margin-top:8px;padding:6px 10px;background:#fef2f2;border:1px solid #fecaca;color:#991b1b;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;border-radius:4px;">${r.criticalOutboundCount} critical-outbound triggers on one codebase.</div>`;
    }
  } else {
    inner += `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;"><strong>Primary:</strong> ${escapeHtml(primaryName)}</div>`;
    if (form.persona_stacked) inner += `<div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;">Also flagged: ${escapeHtml(String(form.persona_stacked).trim())}</div>`;
  }
  const pathLine = form.persona_path
    ? `<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#555;margin-top:6px;">Path: ${escapeHtml(String(form.persona_path).trim())}</div>`
    : "";
  return `<h2>Persona Profile</h2><div style="padding:4px 0;">${inner}${pathLine}</div>`;
}

function buildAssessmentText(form) {
  const site = "whoownsthecode.com";
  const name = form.name ? String(form.name).trim() : "Anonymous";
  const email = form.email ? String(form.email).trim() : "N/A";
  const a = computeRiskAssessment(form);
  const lines = [
    `Form submitted on ${site}`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    ``,
    "Assessment",
    `Inbound Risk: ${a.inbound.score}/100 (${a.inbound.level}) - what the AI ingested into your build`,
    `Outbound Risk: ${a.outbound.score}/100 (${a.outbound.level}) - whether you can own, license, and warrant what you ship`,
    `Multiplier: x${a.multiplier.toFixed(2)}  Tools: ${a.toolsCount}`,
    ``,
    ...buildPersonaLines(form),
    "Details",
    ``
  ];

  const excluded = getExcluded(form);
  for (const q of QUESTIONS) {
    if (excluded.has(q.key)) continue;
    if (q.key === "ai_tools") {
      const main = asList(form.ai_tools) || "No AI tools selected";
      const other = asList(form.ai_tools_other);
      const val = other ? `${main}${main.includes("No AI") ? "" : ", "}Other: ${other}` : main;
      lines.push(`${q.num}. ${q.label} ${val}`);
      continue;
    }
    if (q.key === "ai_usage") {
      const main = asList(form.ai_usage) || "No AI practices selected";
      const other = asList(form.ai_usage_other);
      const val = other ? `${main}${main.includes("No AI") ? "" : ", "}Other: ${other}` : main;
      lines.push(`${q.num}. ${q.label} ${val}`);
      continue;
    }
    if (q.key === "assistance") {
      const main = mapAssistanceValuesToLabels(form.assistance);
      const other = asList(form.assistance_other);
      const val = other ? `${main}${main.includes("No assistance") ? "" : ", "}Other: ${other}` : main;
      lines.push(`${q.num}. ${q.label} ${val}`);
      continue;
    }
    lines.push(`${q.num}. ${q.label} ${orDash(form[q.key])}`);
  }
  return lines.join("\n");
}

function buildAssessmentHTML(form) {
  const name = form.name ? escapeHtml(String(form.name).trim()) : "Anonymous";
  const email = form.email ? escapeHtml(String(form.email).trim()) : "N/A";
  const baseCell = "padding:8px 8px;line-height:18px;mso-line-height-rule:exactly;vertical-align:top;border-bottom:1px solid #eee;font-family:Arial,Helvetica,sans-serif;font-size:14px;";
  const numberCell = `${baseCell} width:44px;text-align:right;color:#666;`;
  const questionCell = `${baseCell} font-weight:600;`;
  const answerCell = `${baseCell}`;
  const a = computeRiskAssessment(form);

  const rowQA = (num, label, value) => `
    <tr>
      <td style="${numberCell}">${escapeHtml(String(num))}.</td>
      <td style="${questionCell}">${escapeHtml(label)}</td>
      <td style="${answerCell}">${value}</td>
    </tr>`;

  const excluded = getExcluded(form);
  const rows = [];
  for (const q of QUESTIONS) {
    if (excluded.has(q.key)) continue;
    if (q.key === "ai_tools") {
      const main = asList(form.ai_tools) || "No AI tools selected";
      const other = asList(form.ai_tools_other);
      const val = other ? `${escapeHtml(main)}${main.includes("No AI") ? "" : ", "}<em>Other:</em> ${escapeHtml(other)}` : escapeHtml(main);
      rows.push(rowQA(q.num, q.label, val));
      continue;
    }
    if (q.key === "ai_usage") {
      const main = asList(form.ai_usage) || "No AI practices selected";
      const other = asList(form.ai_usage_other);
      const val = other ? `${escapeHtml(main)}${main.includes("No AI") ? "" : ", "}<em>Other:</em> ${escapeHtml(other)}` : escapeHtml(main);
      rows.push(rowQA(q.num, q.label, val));
      continue;
    }
    if (q.key === "assistance") {
      const main = mapAssistanceValuesToLabels(form.assistance);
      const other = asList(form.assistance_other);
      const val = other ? `${escapeHtml(main)}${main.includes("No assistance") ? "" : ", "}<em>Other:</em> ${escapeHtml(other)}` : escapeHtml(main);
      rows.push(rowQA(q.num, q.label, val));
      continue;
    }
    rows.push(rowQA(q.num, q.label, escapeHtml(orDash(form[q.key]))));
  }

  return `<!doctype html>
<html>
  <head><meta charset="utf-8"><title>WhoOwnsTheCode Assessment</title></head>
  <body>

    <h2>Submitted by</h2>
    <div style="padding:0 20px;background:#f3f4f6;">
      <table role="presentation" cellpadding="0" cellspacing="0"
            style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:4px 0;vertical-align:middle;
                    font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;
                    color:#111;">
            ${name || "—"}
          </td>
        </tr>
        <tr>
          <td style="padding:4px 0;vertical-align:middle;
                    font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;
                    color:#111;">
            ${email !== "N/A"
              ? `<a href="mailto:${email}" style="text-decoration:underline;">${email}</a>`
              : "N/A"}
          </td>
        </tr>
      </table>
    </div>

    <h2>Assessment</h2>
    AI Usage Maturity & Risk Posture
    <div style="margin-top:6px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
        <tr>
          <td style="padding:0 8px 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#555;vertical-align:middle;">Inbound risk</td>
          <td style="padding-bottom:6px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;"><tr>
              <td align="center" style="background:${a.inbound.color};color:#fff;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;text-transform:uppercase;padding:6px 14px;border:1px solid #00000033;">
                ${a.inbound.level} &nbsp; ${a.inbound.score}/100
              </td>
            </tr></table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#555;vertical-align:middle;">Outbound risk</td>
          <td>
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;"><tr>
              <td align="center" style="background:${a.outbound.color};color:#fff;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;text-transform:uppercase;padding:6px 14px;border:1px solid #00000033;">
                ${a.outbound.level} &nbsp; ${a.outbound.score}/100
              </td>
            </tr></table>
          </td>
        </tr>
      </table>
    </div>
    <div style="margin-top:10px;font-size:12px;color:#555;line-height:1.4;">
      <strong>What these two scores mean:</strong><br/>
      &nbsp;&nbsp;• <strong>Inbound risk</strong> is about what the AI ingested into your build: infringing or copyleft fragments from training data, and whether you catch and trace them.<br/>
      &nbsp;&nbsp;• <strong>Outbound risk</strong> is about what you ship: whether you can actually own, license, warrant, and sell the result.<br/><br/>

      <strong>Your calculation details:</strong><br/>
      &nbsp;&nbsp;• Inbound: <strong>${a.inbound.score}/100</strong> (${a.inbound.flagged} risk-flagged answer${a.inbound.flagged === 1 ? "" : "s"}).<br/>
      &nbsp;&nbsp;• Outbound: <strong>${a.outbound.score}/100</strong> (${a.outbound.flagged} risk-flagged answer${a.outbound.flagged === 1 ? "" : "s"}).<br/>
      &nbsp;&nbsp;• Multiplier: <strong>×${a.multiplier.toFixed(2)}</strong> (from ${a.toolsCount} AI tool${a.toolsCount === 1 ? "" : "s"} in use and how AI is applied).<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each axis is scored over only the questions shown for your persona, then normalized to 0-100.<br/><br/>

      <strong>How the bands work:</strong><br/>
      &nbsp;&nbsp;Each risk axis ranges from <strong>0</strong> (lowest risk) to <strong>100</strong> (highest risk).<br/>
      &nbsp;&nbsp;• <span style="color:#16a34a;font-weight:600;">Low</span>: 0-20<br/>
      &nbsp;&nbsp;• <span style="color:#ca8a04;font-weight:600;">Moderate</span>: 21-50<br/>
      &nbsp;&nbsp;• <span style="color:#ea580c;font-weight:600;">High</span>: 51-80<br/>
      &nbsp;&nbsp;• <span style="color:#dc2626;font-weight:600;">Critical</span>: 81-100<br/>
    </div>

    ${buildPersonaHTML(form)}

    <h2>Survey Details</h2>
    <table style="margin-top:20px;width:100%;border-collapse:collapse;">
      <tbody>
        ${rows.join("")}
      </tbody>
    </table>
  </body>
</html>`;
}

async function sendWithResend(env, payload) {
  const url = "https://api.resend.com/emails";
  if (!env.RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  let body = text;
  try { body = JSON.parse(text); } catch (_) {}
  return { ok: res.ok, status: res.status, statusText: res.statusText, body };
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });
    if (request.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
    try {
      const rawBody = await request.text();
      let formData;
      try { formData = JSON.parse(rawBody); }
      catch { return new Response("Invalid JSON payload", { status: 400, headers: corsHeaders }); }

      if (formData.website) return new Response("OK", { status: 200, headers: corsHeaders });

      // Secret-gated test mode: with a valid X-Test-Secret header, skip
      // reCAPTCHA and Resend and return the computed scores plus the rendered
      // email so automated tests can assert on them. Nothing is sent. Inactive
      // unless the TEST_SECRET secret is set (wrangler secret put TEST_SECRET).
      const testSecret = request.headers.get("X-Test-Secret");
      if (env.TEST_SECRET && testSecret && testSecret === env.TEST_SECRET) {
        const testName = formData.name ? String(formData.name).trim() : "Anonymous";
        const testEmail = formData.email && String(formData.email).trim() ? String(formData.email).trim() : null;
        const subject = `New assessment from ${cleanDisplayName(testName)}`;
        const text = buildAssessmentText(formData);
        const html = buildAssessmentHTML(formData);
        const preview = {
          testMode: true,
          assessment: computeRiskAssessment(formData),
          persona: {
            primary: formData.persona_primary || "",
            stacked: formData.persona_stacked || "",
            path: formData.persona_path || "",
          },
          email: { subject, text, html },
          sent: null,
        };
        // Opt-in real send, still secret-gated. Delivers only to the submitter
        // address (not the production inbox) so automated runs don't pile up
        // test data in whoownsthecode@gmail.com.
        if (isYes(formData.testSend) && testEmail) {
          const siteName = cleanDisplayName("Who Owns The Code");
          const result = await sendWithResend(env, {
            from: `${siteName} <no-reply@buildmeasurelearn.com>`,
            to: [testEmail],
            subject,
            text,
            html,
            reply_to: testEmail,
          });
          preview.sent = { ok: result.ok, status: result.status, statusText: result.statusText };
        }
        return new Response(JSON.stringify(preview), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const recaptchaToken = formData.recaptchaToken;
      if (!recaptchaToken) return new Response("Missing CAPTCHA token", { status: 400, headers: corsHeaders });

      const clientIP = request.headers.get("CF-Connecting-IP") || "";
      const verifyBody = `secret=${env.RECAPTCHA_SECRET}&response=${recaptchaToken}&remoteip=${clientIP}`;
      const verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: verifyBody,
      });
      const verification = await verifyResponse.json();
      if (!verification.success) return new Response(`CAPTCHA verification failed: ${verification["error-codes"]?.join(", ")}`, { status: 403, headers: corsHeaders });
      if (verification.action !== "submit") return new Response(`Invalid reCAPTCHA action: expected 'submit', got '${verification.action}'`, { status: 403, headers: corsHeaders });
      if (verification.score !== undefined && verification.score < 0.3) return new Response(`CAPTCHA score too low (${verification.score})`, { status: 403, headers: corsHeaders });

      const siteName = cleanDisplayName("Who Owns The Code");
      const name = formData.name ? String(formData.name).trim() : "Anonymous";
      const email = formData.email && String(formData.email).trim() ? String(formData.email).trim() : null;

      const textBody = buildAssessmentText(formData);
      const htmlBody = buildAssessmentHTML(formData);

      const payload = {
        from: `${siteName} <no-reply@buildmeasurelearn.com>`,
        to: ["whoownsthecode@gmail.com", email],  // 👈 send to both
        subject: `New assessment from ${cleanDisplayName(name)}`,
        text: textBody,
        html: htmlBody,
      };
      if (email) payload.reply_to = email;

      const result = await sendWithResend(env, payload);
      if (!result.ok) {
        const bodyStr = typeof result.body === "string" ? result.body : JSON.stringify(result.body);
        return new Response(`Failed to send email via Resend: ${result.status} ${result.statusText}\n${bodyStr}`, { status: 500, headers: corsHeaders });
      }
      return new Response("Assessment submitted successfully!", { status: 200, headers: corsHeaders });
    } catch {
      return new Response("Internal Server Error", { status: 500, headers: corsHeaders });
    }
  },
};

// Named exports for unit testing. The Worker runtime only uses the default
// export above; these do not affect deployment.
export { computeRiskAssessment, getExcluded, buildAssessmentText, buildAssessmentHTML };