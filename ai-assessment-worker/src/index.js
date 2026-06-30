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
  return ["code", "agentic", "refactoring", "schema"].some(v => usage.includes(v));
}

/** Compute 0-100 risk score + label/color */
function computeRiskAssessment(form) {
  // weight = points added when the answer is the risky one.
  // riskWhen "no": good-practice questions where "No" is the risk.
  // riskWhen "yes": questions where doing the thing is the risk (inverted).
  const SCORED = [
    { key: "assert_code_ownership", weight: 20, riskWhen: "no" },  // critical
    { key: "prompting_policy",      weight: 10, riskWhen: "no" },
    { key: "content_policy",        weight: 10, riskWhen: "no" },
    { key: "code_reviewed",         weight: 10, riskWhen: "no" },
    { key: "ai_restricted",         weight: 10, riskWhen: "no" },
    { key: "reviewed_ai_licenses",  weight: 10, riskWhen: "no" },
    { key: "ai_training",           weight: 10, riskWhen: "no" },
    { key: "awareness",             weight: 10, riskWhen: "no" },
    { key: "contracts_address_ai",  weight: 10, riskWhen: "no" },
    { key: "code_labeled",          weight: 5,  riskWhen: "no" },
    { key: "mentioned_in_commits",  weight: 5,  riskWhen: "no" },
    { key: "mentioned_in_docs",     weight: 5,  riskWhen: "no" },
    { key: "store_prompts",         weight: 5,  riskWhen: "no" },
    { key: "ai_in_production",      weight: 10, riskWhen: "yes" }, // inverted: shipping AI code is the risk
    { key: "vendor_ai_use",         weight: 5,  riskWhen: "yes" }, // inverted: third-party AI use is the exposure
  ];

  let base = 0;
  let criticalFlags = 0;
  let highFlags = 0;
  let medFlags = 0;

  for (const q of SCORED) {
    const yes = isYes(form[q.key]);
    const risky = q.riskWhen === "yes" ? yes : !yes;
    if (!risky) continue;
    base += q.weight;
    if (q.weight >= 20) criticalFlags += 1;
    else if (q.weight >= 10) highFlags += 1;
    else medFlags += 1;
  }
  if (base > 100) base = 100;

  let multiplier = 1.0;
  const toolsCount = countSelectedTools(form);
  if (toolsCount > 5) multiplier += 0.05;
  if (hasCodeLikeUsage(form)) multiplier += 0.05;
  if (multiplier > 1.15) multiplier = 1.15;

  let finalScore = Math.min(100, Math.round(base * multiplier));

  if (isYes(form.assert_code_ownership)) {
    finalScore = Math.min(finalScore, 80);
  }

  let level = "Low";
  let color = "#16a34a";
  if (finalScore >= 21 && finalScore <= 50) { level = "Moderate"; color = "#ca8a04"; }
  if (finalScore >= 51 && finalScore <= 80) { level = "High"; color = "#ea580c"; }
  if (finalScore >= 81) { level = "Critical"; color = "#dc2626"; }

  return { score: finalScore, base, multiplier, criticalFlags, highFlags, medFlags, toolsCount, level, color };
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
    `Risk Score: ${a.score}/100 (${a.level} Risk)`,
    `Base: ${a.base}/100  Multiplier: x${a.multiplier.toFixed(2)}  Critical: ${a.criticalFlags}  High: ${a.highFlags}  Med: ${a.medFlags}  Tools: ${a.toolsCount}`,
    ``,
    "Details",
    ``
  ];

  for (const q of QUESTIONS) {
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

  const rows = [];
  for (const q of QUESTIONS) {
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
          <td align="center" style="background:${a.color};color:#fff;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;text-transform:uppercase;padding:6px 14px;border:1px solid #00000033;">
            ${a.level} Risk
          </td>
        </tr>
      </table>
    </div>
    <div style="margin-top:10px;font-size:12px;color:#555;line-height:1.4;">
      <strong>Your calculation details:</strong><br/>
      &nbsp;&nbsp;• Assessment score: <strong>${a.score}/100</strong><br/>
      &nbsp;&nbsp;• Base: <strong>${a.base}/100</strong> - points from your risk-flagged answers
        (20 pts per critical item, 10 pts per high-impact item, 5 pts per medium-impact item).<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Critical risks flagged: <strong>${a.criticalFlags}</strong><br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- High-impact risks flagged: <strong>${a.highFlags}</strong><br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Medium-impact risks flagged: <strong>${a.medFlags}</strong><br/>
      &nbsp;&nbsp;• Multiplier: <strong>×${a.multiplier.toFixed(2)}</strong><br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Different AI tools in use: <strong>${a.toolsCount}</strong><br/><br/>

      <strong>How this score works:</strong><br/>
      &nbsp;&nbsp;Risk scores range from <strong>0</strong> (lowest risk) to <strong>100</strong> (highest risk).<br/>
      &nbsp;&nbsp;• <span style="color:#16a34a;font-weight:600;">Low</span>: 0–20<br/>
      &nbsp;&nbsp;• <span style="color:#ca8a04;font-weight:600;">Moderate</span>: 21–50<br/>
      &nbsp;&nbsp;• <span style="color:#ea580c;font-weight:600;">High</span>: 51–80<br/>
      &nbsp;&nbsp;• <span style="color:#dc2626;font-weight:600;">Critical</span>: 81–100<br/>
    </div>

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