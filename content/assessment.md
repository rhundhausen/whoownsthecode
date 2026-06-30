---
title: "AI Usage Assessment"
date: 2025-08-05
---

We’re here to help you understand the risks and responsibilities of using AI tools in software development. Answer a few quick questions below and we’ll follow up with a personalized risk assessment. This is an educational service and not legal advice.

<div style="max-width: 900px; margin: 0 auto; border: 1px solid #ccc; border-radius: 8px; padding: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); background-color: #fff;">
  <form action="https://ai-assessment-worker.richard-dd5.workers.dev" method="POST" style="max-width: 850px; margin: 0 auto; font-family: sans-serif; display: flex; flex-direction: column; gap: 1.2rem;">
    <input type="hidden" name="form_type" value="assessment">
    <input type="hidden" name="website" tabindex="-1" autocomplete="off">
    <h3 style="margin-top:2rem; font-size:1.25rem; font-weight:600; color:#0047AB;">AI Tools & Usage</h3>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">1. Which AI tools are you using?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="checkbox" name="ai_tools" value="GitHub Copilot"> GitHub Copilot</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Cursor"> Cursor</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Claude / Claude Code"> Claude / Claude Code</label><br/>
        <label><input type="checkbox" name="ai_tools" value="ChatGPT"> ChatGPT</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Google Gemini / Gemini Code Assist"> Google Gemini / Gemini Code Assist</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Windsurf"> Windsurf (formerly Codeium)</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Amazon Q Developer"> Amazon Q Developer (formerly CodeWhisperer)</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Replit Agent"> Replit Agent</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Devin"> Devin</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Cline"> Cline</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Tabnine"> Tabnine</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Sourcegraph Cody"> Sourcegraph Cody</label><br/>
        <label><input type="checkbox" name="ai_tools" value="OpenHands"> OpenHands (formerly OpenDevin)</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Other"> Other:</label>
        <input type="text" name="ai_tools_other" placeholder="Please specify" style="margin-top: 0.25rem; width: 100%;">
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">2. How are you using AI?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="checkbox" name="ai_usage" value="UI Design"> UI Design/Content</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Code"> Code</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Agentic"> Agentic / autonomous coding (&quot;vibe coding&quot;)</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Refactoring"> Refactoring / migration</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Code Review"> Code review</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Tests"> Unit Tests</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Acceptance Tests"> Acceptance Tests</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Docs"> Documentation</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Schema"> Database Schema</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Static Data"> Static Data</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Other"> Other:</label>
        <input type="text" name="ai_usage_other" placeholder="Please specify" style="margin-top: 0.25rem; width: 100%;">
      </div>
    </div>
    <h3 style="margin-top:2rem; font-size:1.25rem; font-weight:600; color:#0047AB;">Policies & Governance</h3>
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
    <h3 style="margin-top:2rem; font-size:1.25rem; font-weight:600; color:#0047AB;">People & Training</h3>
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
      <label style="flex: 1 1 400px; min-width: 300px;">15. Do your employee and contractor agreements address AI use and IP ownership?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="contracts_address_ai" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="contracts_address_ai" value="No"> No</label>
      </div>
    </div>
    <h3 style="margin-top:2rem; font-size:1.25rem; font-weight:600; color:#0047AB;">Awareness & Ownership</h3>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">16. Are you aware of the risks of using AI-generated code?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="awareness" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="awareness" value="No"> No</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">17. Do you assert that you own the code?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="assert_code_ownership" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="assert_code_ownership" value="No"> No</label>
      </div>
    </div> 
    <h3 style="margin-top:2rem; font-size:1.25rem; font-weight:600; color:#0047AB;">Support Needed</h3>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">18. What kind of assistance are you looking for?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="checkbox" name="assistance" value="assistance_ip_patents"> IP & Patents</label><br/>
        <label><input type="checkbox" name="assistance" value="assistance_risk"> AI Risk Assessment</label><br/>
        <label><input type="checkbox" name="assistance" value="assistance_audit"> Development Audits</label><br/>
        <label><input type="checkbox" name="assistance" value="assistance_best_practices"> Best Practices & Policies</label><br/>
        <label><input type="checkbox" name="assistance" value="assistance_governance"> Governance & Agreements</label><br/>
        <label><input type="checkbox" name="assistance" value="assistance_due_diligence"> M&A Due Diligence</label><br/>
        <label><input type="checkbox" name="assistance" value="assistance_training"> Training & Education</label><br/>
        <label><input type="checkbox" name="assistance" value="assistance_other"> Other (please specify)</label>
        <input type="text" name="assistance_other" placeholder="Please specify" style="margin-top: 0.25rem; width: 100%;">
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label for="name" style="flex: 1 1 400px; min-width: 300px;">Your name</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <input type="text" id="name" name="name" required aria-required="true" placeholder="John Doe" style="margin-top: 0.25rem; width: 100%;">
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