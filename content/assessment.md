---
title: "Free Online Assessment"
date: 2025-08-05
---

We’re here to help you understand the risks and responsibilities of using AI tools in software development. Answer a few quick questions below and we’ll follow up with a personalized risk assessment and recommendations.

<div style="max-width: 900px; margin: 0 auto; border: 1px solid #ccc; border-radius: 8px; padding: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); background-color: #fff;">
  <form action="https://ai-assessment-worker.richard-dd5.workers.dev" method="POST" style="max-width: 850px; margin: 0 auto; font-family: sans-serif; display: flex; flex-direction: column; gap: 1.2rem;">
    <input type="hidden" name="form_type" value="assessment">
    <input type="text" name="website" style="display:none;" tabindex="-1" autocomplete="off">
    <h2>AI in Your Workflow</h2>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">1. Which AI tools are you using?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="checkbox" name="ai_tools" value="GitHub Copilot"> GitHub Copilot</label><br/>
        <label><input type="checkbox" name="ai_tools" value="ChatGPT"> ChatGPT</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Amazon CodeWhisperer"> Amazon CodeWhisperer</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Tabnine"> Tabnine</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Cursor"> Cursor</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Codeium"> Codeium</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Phind"> Phind</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Mutable AI"> Mutable AI</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Sourcegraph Cody"> Sourcegraph Cody</label><br/>
        <label><input type="checkbox" name="ai_tools" value="OpenDevin"> OpenDevin</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Other"> Other:</label>
        <input type="text" name="ai_tools_other" placeholder="Please specify" style="margin-top: 0.25rem; width: 100%;">
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">2. How are you using AI?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="checkbox" name="ai_usage" value="UI Design"> UI Design/Content</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Code"> Code</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Tests"> Unit Tests</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Acceptance Tests"> Acceptance Tests</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Docs"> Documentation</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Schema"> Database Schema</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Static Data"> Static Data</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Other"> Other:</label>
        <input type="text" name="ai_usage_other" placeholder="Please specify" style="margin-top: 0.25rem; width: 100%;">
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">3. Do you have a policy for AI prompting?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="prompting_policy" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="prompting_policy" value="No"> No</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">4. Do you have a policy for AI content use?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="content_policy" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="content_policy" value="No"> No</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">5. Do you review the AI-generated code?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="code_reviewed" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="code_reviewed" value="No"> No</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">6. Do you label or comment the AI-generated code?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="code_labeled" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="code_labeled" value="No"> No</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">7. Do you mention AI-generated code in commits?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="mentioned_in_commits" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="mentioned_in_commits" value="No"> No</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">8. Do you mention AI-generated code in documentation?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="mentioned_in_docs" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="mentioned_in_docs" value="No"> No</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">9. Do you push AI-generated code to production?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="ai_in_production" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="ai_in_production" value="No"> No</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">10. Do you restrict AI-generated code in certain systems?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="ai_restricted" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="ai_restricted" value="No"> No</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">11. Do you store AI prompts in version control?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="store_prompts" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="store_prompts" value="No"> No</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">12. Have you reviewed the license terms for your AI coding tools?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="reviewed_ai_licenses" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="reviewed_ai_licenses" value="No"> No</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">13. Are developers trained on the responsible use of AI tools?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="ai_training" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="ai_training" value="No"> No</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">14. Do contractors or vendors use AI tools on your codebase?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="vendor_ai_use" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="vendor_ai_use" value="No"> No</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">15. Are you aware of the risks of using AI-generated code?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="awareness" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="awareness" value="No"> No</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">16. Do you assert that you own the code?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="assert_code_ownership" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="assert_code_ownership" value="No"> No</label>
      </div>
    </div>    
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">17. What kind of assistance are you looking for?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="checkbox" name="assistance" value="assistance_patent_disclosure"> Advising on AI-related patent disclosure</label><br/>
        <label><input type="checkbox" name="assistance" value="assistance_ip_risk"> Assessing AI-related IP risks</label><br/>
        <label><input type="checkbox" name="assistance" value="assistance_audit_trails"> Auditing for AI-assisted development</label><br/>
        <label><input type="checkbox" name="assistance" value="assistance_documentation"> Best practices for AI documentation</label><br/>
        <label><input type="checkbox" name="assistance" value="assistance_documentation"> Best practices for AI use</label><br/>
        <label><input type="checkbox" name="assistance" value="assistance_tool_selection"> Choosing appropriate AI tools</label><br/>
        <label><input type="checkbox" name="assistance" value="assistance_policy"> Creating an AI use policy</label><br/>
        <label><input type="checkbox" name="assistance" value="assistance_governance"> Developing an AI governance framework</label><br/>
        <label><input type="checkbox" name="assistance" value="assistance_usage_agreements"> Drafting AI tool usage agreements</label><br/>
        <label><input type="checkbox" name="assistance" value="assistance_due_diligence"> Performing due diligence for M&A</label><br/>
        <label><input type="checkbox" name="assistance" value="assistance_claim_response"> Responding to legal claims involving AI</label><br/>
        <label><input type="checkbox" name="assistance" value="assistance_training_execs"> Training executives</label><br/>
        <label><input type="checkbox" name="assistance" value="assistance_training_legal"> Training legal/compliance teams</label><br/>
        <label><input type="checkbox" name="assistance" value="assistance_training_devs"> Training developers</label><br/>
        <label><input type="checkbox" name="assistance" value="assistance_other"> Other training or consulting</label>
        <input type="text" name="assistance_other" placeholder="Please specify" style="margin-top: 0.25rem; width: 100%;">
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label for="name" style="flex: 1 1 400px; min-width: 300px;">Your name</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <input type="text" id="name" name="name" required aria-required="true" style="margin-top: 0.25rem; width: 100%;">
      </div>
    </div>    
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label for="email" style="flex: 1 1 400px; min-width: 300px;">Where should we send your personalized assessment?</label>
        <div style="flex: 1 1 250px; min-width: 200px;">
          <input type="email" id="email" name="email" required aria-required="true" placeholder="you@example.com" style="margin-top: 0.25rem; width: 100%;">
        </div>
    </div>
    <button type="submit" style="background-color: #0057b8; color: white; border: none; border-radius: 4px; padding: 0.5rem 1rem; font-weight: 600; cursor: pointer;">Submit Assessment</button>
    <p style="font-size: 0.9em; color: #555;">
      We’ll review your answers and send you a free personalized assessment. This is an educational service and not legal advice.
    </p>
  </form>
</div>

<script src="https://www.google.com/recaptcha/api.js?render=6Lf_I5wrAAAAAKATl51T-YdiY00ZjOVdmuk-M2GX"></script>
<script>
  document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    if (data[key]) {
      data[key] = Array.isArray(data[key]) ? data[key].concat(value) : [data[key], value];
    } else {
      data[key] = value;
    }
  });
  grecaptcha.ready(() => {
    grecaptcha.execute("6Lf_I5wrAAAAAKATl51T-YdiY00ZjOVdmuk-M2GX", { action: "submit" }).then(async (token) => {
      if (!token) {
        alert("Failed to generate reCAPTCHA token.");
        return;
      }
      data.recaptchaToken = token;
      try {
        const response = await fetch("https://ai-assessment-worker.richard-dd5.workers.dev", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const responseText = await response.text();
        if (response.ok) {
          alert("Your assessment has been submitted! Please expect a report soon.");
          form.reset();
        } else {
          alert("Submission failed: " + responseText);
        }
      } catch {
        alert("Submission failed: network or worker error.");
      }
    }).catch(() => {
      alert("reCAPTCHA failed to execute.");
    });
  });
});
</script>
<script>
document.addEventListener("DOMContentLoaded", () => {
  if (true) { // <-- toggle to false to disable test autofill
    const level = (prompt("Enter sample data level: 1-Low, 2-Moderate, 3-High, 4-Critical") || "").trim();
    // Risk bands (final score). We target BASE in these same bands since multiplier is ~1.0 here.
    const BANDS = {
      "1": { min: 0,  max: 20 },  // Low
      "2": { min: 21, max: 50 },  // Moderate
      "3": { min: 51, max: 80 },  // High
      "4": { min: 81, max: 100 }, // Critical
    };
    const band = BANDS[level] || BANDS["1"];
    const HIGH_KEYS = [
      "prompting_policy","content_policy","code_reviewed",
      "ai_restricted","reviewed_ai_licenses","ai_training","awareness"
    ];
    const MED_KEYS = [
      "code_labeled","mentioned_in_commits","mentioned_in_docs",
      "ai_in_production","store_prompts","vendor_ai_use"
    ];
    // Helpers
    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const shuffle = (arr) => arr.map(v => [Math.random(), v]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
    const pickK = (arr, k) => shuffle(arr).slice(0, k);
    // Find a random base target within band that is achievable by 10*h + 5*m
    function randomAchievableBase(min, max) {
      // pick a random value in [min,max], force to multiple of 5
      for (let tries = 0; tries < 200; tries++) {
        let target = randInt(min, max);
        target = target - (target % 5); // multiple of 5
        if (isAchievable(target)) return target;
      }
      // fallback: search outward from the midpoint for a solvable multiple of 5
      const mid = Math.round((min + max) / 10) * 10;
      for (let delta = 0; delta <= 20; delta += 5) {
        for (const sign of [-1, 1]) {
          const candidate = Math.min(max, Math.max(min, mid + sign * delta));
          const c5 = candidate - (candidate % 5);
          if (isAchievable(c5)) return c5;
        }
      }
      return 0; // last resort
    }
    function isAchievable(base) {
      // 10*h + 5*m = base, with 0<=h<=7, 0<=m<=6
      for (let h = 0; h <= 7; h++) {
        const rem = base - 10*h;
        if (rem < 0) break;
        if (rem % 5 !== 0) continue;
        const m = rem / 5;
        if (m >= 0 && m <= 6) return true;
      }
      return false;
    }
    // Given a base target, pick a random (h,m) that satisfies it
    function randomCountsForBase(base) {
      const solutions = [];
      for (let h = 0; h <= 7; h++) {
        const rem = base - 10*h;
        if (rem < 0) break;
        if (rem % 5 !== 0) continue;
        const m = rem / 5;
        if (m >= 0 && m <= 6) solutions.push({ h, m });
      }
      return solutions.length ? solutions[randInt(0, solutions.length - 1)] : { h:0, m:0 };
    }
    // Compute target base, then choose which questions are "No"
    const baseTarget = randomAchievableBase(band.min, band.max);
    const { h: highNoCount, m: medNoCount } = randomCountsForBase(baseTarget);
    // Set radios for each group based on random subset that matches counts
    const highNoSet = new Set(pickK(HIGH_KEYS, highNoCount));
    const medNoSet  = new Set(pickK(MED_KEYS,  medNoCount));
    const setRadioGroup = (name, yes) => {
      const y = document.querySelector(`input[type="radio"][name="${name}"][value="Yes"]`);
      const n = document.querySelector(`input[type="radio"][name="${name}"][value="No"]`);
      if (yes) { if (y) y.checked = true; } else { if (n) n.checked = true; }
    };
    HIGH_KEYS.forEach(key => setRadioGroup(key, !highNoSet.has(key)));
    MED_KEYS.forEach(key  => setRadioGroup(key,  !medNoSet.has(key)));
    // Only handle "Other" fields for High (3) and Critical (4)
    if (level === "3" || level === "4") {
      const otherTextMatrix = {
        "3": { tools: "Extra AI tools for coding", usage: "Specialized code generation tasks", assist: "Help with AI code reviews" },
        "4": { tools: "Many unapproved AI tools",  usage: "Critical production code generation", assist: "Urgent legal/compliance assistance" },
      };
      const otherData = otherTextMatrix[level];
      ["ai_tools","ai_usage","assistance"].forEach(groupName => {
        document.querySelectorAll(`input[type="checkbox"][name="${groupName}"]`).forEach(cb => {
          if ((cb.value || "").toLowerCase().includes("other")) cb.checked = true;
        });
      });
      [
        { name: "ai_tools_other",   value: otherData.tools  },
        { name: "ai_usage_other",   value: otherData.usage  },
        { name: "assistance_other", value: otherData.assist }
      ].forEach(({ name, value }) => {
        const input = document.querySelector(`input[name="${name}"]`);
        if (input) input.value = value;
      });
    }
    // Name / Email
    const nameInput = document.querySelector('input[name="name"]');
    if (nameInput) nameInput.value = "Richard Hundhausen";
    const emailInput = document.querySelector('input[name="email"]');
    if (emailInput) emailInput.value = "richard@hundhausen.com";
  }
});
</script>