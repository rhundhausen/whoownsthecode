---
title: "Assessment"
date: 2026-07-22
---

Answer a few questions about how your team uses AI to write code, and we’ll email you a personalized risk assessment. It shows where AI-generated code puts your ownership and compliance at risk.

<style>
  .info-tip { position: relative; display: inline-block; margin-left: 6px; cursor: help; vertical-align: middle; top: -3px; }
  .info-tip .info-icon {
    display: inline-flex; align-items: center; justify-content: center;
    width: 16px; height: 16px; border-radius: 50%;
    background: var(--accent); color: var(--accent-ink); font-size: 11px; font-weight: 700;
    font-style: normal; line-height: 1;
  }
  .info-tip .info-bubble {
    visibility: hidden; opacity: 0; transition: opacity .15s ease;
    position: absolute; left: 50%; transform: translateX(-50%);
    bottom: 150%; width: 240px; max-width: 70vw;
    background: var(--fg); color: var(--bg); text-align: left;
    padding: 8px 10px; border-radius: 6px;
    font-size: 12px; font-weight: 400; line-height: 1.4; z-index: 20;
    box-shadow: 0 2px 8px rgba(0,0,0,0.25);
  }
  .info-tip:hover .info-bubble, .info-tip:focus-within .info-bubble { visibility: visible; opacity: 1; }

  /* Honeypot: visually removed but present in the DOM so bots fill it. */
  .hp-field { position: absolute; left: -9999px; top: -9999px; height: 0; width: 0; overflow: hidden; }

  .persona-wizard { display: flex; flex-direction: column; gap: 1.1rem; }
  .persona-q { display: flex; flex-direction: column; gap: 0.4rem; }
  .persona-q.hidden, .persona-result.hidden { display: none; }
  .persona-q .pq-text { font-weight: 600; }
  .persona-q .pq-options { display: flex; flex-direction: column; gap: 0.25rem; }
  .persona-q .pq-options.inline { flex-direction: row; gap: 1.5rem; }
  .persona-q .pq-options label { font-weight: 400; }
  .persona-result { margin-top: 0.4rem; border: 1px solid var(--border); border-radius: 8px; padding: 1rem 1.25rem; background: var(--panel-2); }
  .persona-result h4 { margin: 0 0 0.25rem; font-size: 1.1rem; color: var(--fg); }
  .persona-card { padding: 0.5rem 0; }
  .persona-card + .persona-card { border-top: 1px solid var(--border); }
  .persona-name { font-weight: 700; }
  .persona-desc { font-size: 0.9em; color: var(--fg-muted); margin: 0.1rem 0 0.35rem; }
  .persona-flags-label { font-weight: 600; margin-top: 0.6rem; font-size: 0.9em; color: var(--fg); }
  .persona-mitigation { margin-top: 0.5rem; font-size: 0.85em; color: var(--tok-string); }
  .persona-more { margin-top: 0.75rem; font-size: 0.9em; }
</style>

  <form style="font-family: var(--sans); display: flex; flex-direction: column; gap: 1.2rem;">
    <input type="hidden" name="form_type" value="assessment">
    <div class="hp-field" aria-hidden="true">
      <label for="website">Website</label>
      <input type="text" id="website" name="website" tabindex="-1" autocomplete="off">
    </div>
    <input type="hidden" name="persona_primary" value="">
    <input type="hidden" name="persona_stacked" value="">
    <input type="hidden" name="persona_result" value="">
    <input type="hidden" name="persona_path" value="">
    <input type="hidden" name="scored_excluded" value="">
    <h3 style="margin-top:0; font-size:1.25rem; font-weight:600; color:var(--fg); border-bottom:1px solid var(--border); padding-bottom:0.4rem; margin-bottom:0;">Part 1: AI-Code Risk Persona</h3>
    <p style="margin:0; font-size:0.95rem; color:var(--fg-muted);">First, let's identify your organization's AI-code risk persona. Answer a few questions. Your persona appears below and updates as you go, then continue to the questions that follow.</p>
    <div class="persona-wizard" id="personaWizard">
      <div class="persona-q" data-step="p0">
        <span class="pq-text">Are you assessing code your organization built or owns, or code it is evaluating to acquire?</span>
        <div class="pq-options">
          <label><input type="radio" name="persona_scope" value="own"> Code your organization built or owns</label>
          <label><input type="radio" name="persona_scope" value="acquire"> Code your organization is evaluating to acquire</label>
        </div>
      </div>
      <div class="persona-q hidden" data-step="p1">
        <span class="pq-text">Does your organization train or ship an AI model that others build on?</span>
        <div class="pq-options inline">
          <label><input type="radio" name="persona_model_maker" value="yes"> Yes</label>
          <label><input type="radio" name="persona_model_maker" value="no"> No</label>
        </div>
      </div>
      <div class="persona-q hidden" data-step="p2">
        <span class="pq-text">Is all of your organization's code free and open source, with no paid tier and nothing sold?</span>
        <div class="pq-options inline">
          <label><input type="radio" name="persona_giver" value="yes"> Yes</label>
          <label><input type="radio" name="persona_giver" value="no"> No</label>
        </div>
      </div>
      <div class="persona-q hidden" data-step="p3">
        <span class="pq-text">Is the code written by government employees, not contractors?</span>
        <div class="pq-options inline">
          <label><input type="radio" name="persona_civic" value="yes"> Yes</label>
          <label><input type="radio" name="persona_civic" value="no"> No</label>
        </div>
      </div>
      <div class="persona-q hidden" data-step="p4">
        <span class="pq-text">Does the code only ever run on servers your organization controls, and never gets delivered or distributed to anyone else?</span>
        <div class="pq-options inline">
          <label><input type="radio" name="persona_host" value="yes"> Yes</label>
          <label><input type="radio" name="persona_host" value="no"> No</label>
        </div>
      </div>
      <div class="persona-q hidden" data-step="p5">
        <span class="pq-text">Who writes the code being assessed?</span>
        <div class="pq-options">
          <label><input type="radio" name="persona_authorship" value="employees"> Your organization's own employees</label>
          <label><input type="radio" name="persona_authorship" value="hired_shop"> A contractor or shop your organization hired</label>
          <label><input type="radio" name="persona_authorship" value="we_are_shop"> Your organization is the contractor or shop, building for clients</label>
          <label><input type="radio" name="persona_authorship" value="inherited"> Your organization inherited it through an acquisition</label>
        </div>
      </div>
      <div class="persona-q hidden" data-step="p6">
        <span class="pq-text">What does your organization do with that code?</span>
        <div class="pq-options">
          <label><input type="radio" name="persona_employee_usage" value="internal"> Internal only; it never leaves your organization</label>
          <label><input type="radio" name="persona_employee_usage" value="walled"> It feeds an internal LLM trained on your organization's own data</label>
          <label><input type="radio" name="persona_employee_usage" value="sell_license"> Your organization sells or licenses it to customers</label>
          <label><input type="radio" name="persona_employee_usage" value="raise_sell"> Your organization is building it to raise money and sell the company</label>
          <label><input type="radio" name="persona_employee_usage" value="bootstrap"> A bootstrapped paid product, no investors, not for sale</label>
        </div>
      </div>
      <div class="persona-q hidden" data-step="p7">
        <span class="pq-text">Is that shop US-based or offshore?</span>
        <div class="pq-options">
          <label><input type="radio" name="persona_shop" value="us"> US-based</label>
          <label><input type="radio" name="persona_shop" value="offshore"> Offshore</label>
        </div>
      </div>
      <div class="persona-q hidden" data-step="p8">
        <span class="pq-text">Which of these promises does your organization make about its codebase? Check all that apply.</span>
        <div class="pq-options">
          <label><input type="checkbox" name="persona_promise" value="warrant_title"> Your organization warrants clear title to customers in its licenses</label>
          <label><input type="checkbox" name="persona_promise" value="fed"> Your organization delivers to the federal government under contract</label>
          <label><input type="checkbox" name="persona_promise" value="regulated"> Your organization operates under HIPAA, SEC, or FDA regulation</label>
          <label><input type="checkbox" name="persona_promise" value="two_tier"> Your organization has an open-source core plus a proprietary paid tier</label>
          <label><input type="checkbox" name="persona_promise" value="exit"> Your organization is raising or selling, and will warrant title at exit</label>
          <label><input type="checkbox" name="persona_promise" value="renter"> A vendor contractually indemnifies your organization's AI output</label>
        </div>
      </div>
    </div>
    <div class="persona-result hidden" id="personaResult" aria-live="polite"></div>
    <h3 id="sec-tools" style="margin-top:1.1rem; font-size:1.25rem; font-weight:600; color:var(--fg); border-bottom:1px solid var(--border); padding-bottom:0.4rem; margin-bottom:0;">Part 2: AI Tools & Usage</h3>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">1. Which AI tools are you using?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="checkbox" name="ai_tools" value="GitHub Copilot"> GitHub Copilot</label><br/>
        <label><input type="checkbox" name="ai_tools" value="ChatGPT"> ChatGPT</label><br/>
        <label><input type="checkbox" name="ai_tools" value="OpenAI Codex"> OpenAI Codex</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Cursor"> Cursor</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Claude / Claude Code"> Claude / Claude Code</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Google Gemini / Gemini Code Assist"> Google Gemini / Gemini Code Assist</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Windsurf"> Windsurf</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Amazon Q Developer"> Amazon Q Developer</label><br/>
        <label><input type="checkbox" name="ai_tools" value="Other"> Other:</label>
        <input type="text" name="ai_tools_other" placeholder="Please specify" style="margin-top: 0.25rem; width: 100%;">
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">2. Under what kind of agreements are these tools used?<span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">Enterprise and business plans often include IP indemnification and no-training commitments. Individual and free accounts usually do not.</span></span></label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="ai_tool_tier" value="Enterprise"> Enterprise/business agreements</label><br/>
        <label><input type="radio" name="ai_tool_tier" value="Individual"> Individual or free accounts</label><br/>
        <label><input type="radio" name="ai_tool_tier" value="Mixed"> Mixed</label><br/>
        <label><input type="radio" name="ai_tool_tier" value="Don't know"> Don't know</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">3. How are you using AI?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="checkbox" name="ai_usage" value="Code"> Writing or generating code</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Agentic"> Agentic / autonomous coding (&quot;vibe coding&quot;)</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Refactoring"> Refactoring or migration</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Code Review"> Code review</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Tests"> Tests</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Docs"> Documentation</label><br/>
        <label><input type="checkbox" name="ai_usage" value="UI Design"> UI design / content</label><br/>
        <label><input type="checkbox" name="ai_usage" value="Other"> Other:</label>
        <input type="text" name="ai_usage_other" placeholder="Please specify" style="margin-top: 0.25rem; width: 100%;">
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">4. Roughly what share of the codebase is AI-generated or AI-assisted?<span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">Your best estimate. The larger the share, the more of the codebase may fall outside copyright protection.</span></span></label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="ai_code_share" value="Under 10%"> Under 10%</label><br/>
        <label><input type="radio" name="ai_code_share" value="10-50%"> 10&ndash;50%</label><br/>
        <label><input type="radio" name="ai_code_share" value="Over 50%"> Over 50%</label><br/>
        <label><input type="radio" name="ai_code_share" value="Don't know"> Don't know</label>
      </div>
    </div>
    <h3 id="sec-policies" style="margin-top:1.1rem; font-size:1.25rem; font-weight:600; color:var(--fg); border-bottom:1px solid var(--border); padding-bottom:0.4rem; margin-bottom:0;">Part 3: Policies & Governance</h3>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">5. Do you have a policy for AI prompting?<span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">A documented standard for how your team writes prompts. For example, what information may or may not be pasted into an AI tool.</span></span></label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="prompting_policy" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="prompting_policy" value="No"> No</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">6. Do you have a policy for AI content use?<span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">Rules for where and how AI-generated material may be used in your products and code.</span></span></label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="content_policy" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="content_policy" value="No"> No</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">7. Is AI-generated code reviewed by a person before merge?<span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">Whether a person reviews AI-generated code before it is merged, instead of accepting it unchecked.</span></span></label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="code_reviewed" value="Always"> Always</label>&nbsp;&nbsp;
        <label><input type="radio" name="code_reviewed" value="Sometimes"> Sometimes</label>&nbsp;&nbsp;
        <label><input type="radio" name="code_reviewed" value="Never"> Never</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">8. Do you label or comment the AI-generated code?<span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">Marking AI-generated sections in the source (such as a comment) so they can be identified later.</span></span></label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="code_labeled" value="Always"> Always</label>&nbsp;&nbsp;
        <label><input type="radio" name="code_labeled" value="Sometimes"> Sometimes</label>&nbsp;&nbsp;
        <label><input type="radio" name="code_labeled" value="Never"> Never</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">9. Do you mention AI-generated code in commits?<span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">Noting in commit messages when changes were produced with AI assistance.</span></span></label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="mentioned_in_commits" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="mentioned_in_commits" value="No"> No</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">10. Do you mention AI-generated code in documentation?<span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">Recording in your documentation that AI tools contributed to the codebase.</span></span></label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="mentioned_in_docs" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="mentioned_in_docs" value="No"> No</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">11. Does AI-generated code reach production without human review?<span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">Whether unreviewed AI-generated code can end up in live, customer-facing systems.</span></span></label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="ai_in_production" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="ai_in_production" value="No"> No</label>&nbsp;&nbsp;
        <label><input type="radio" name="ai_in_production" value="Don't know"> Don't know</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">12. Do you restrict AI-generated code in certain systems?<span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">Whether you forbid AI-generated code in sensitive areas such as security, payments, or core IP.</span></span></label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="ai_restricted" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="ai_restricted" value="No"> No</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">13. Do you store AI prompts in version control?<span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">Saving the prompts used to generate code (for example in git) as a record of how it was created.</span></span></label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="store_prompts" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="store_prompts" value="No"> No</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">14. Have you reviewed the license terms for your AI coding tools?<span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">Whether you have read your AI tools' terms covering ownership, training data, and indemnity.</span></span></label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="reviewed_ai_licenses" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="reviewed_ai_licenses" value="No"> No</label>&nbsp;&nbsp;
        <label><input type="radio" name="reviewed_ai_licenses" value="Don't know"> Don't know</label>
      </div>
    </div>
    <h3 id="sec-people" style="margin-top:1.1rem; font-size:1.25rem; font-weight:600; color:var(--fg); border-bottom:1px solid var(--border); padding-bottom:0.4rem; margin-bottom:0;">Part 4: People & Training</h3>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">15. Are developers trained on the responsible use of AI tools?<span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">Whether developers have been taught to use AI tools responsibly and understand the IP risks.</span></span></label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="ai_training" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="ai_training" value="No"> No</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">16. Do contractors or vendors use AI tools on your codebase?<span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">Whether outside contractors or vendors run AI tools against your code. Third-party AI use can create ownership gaps, and not knowing is itself a gap.</span></span></label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="vendor_ai_use" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="vendor_ai_use" value="No"> No</label>&nbsp;&nbsp;
        <label><input type="radio" name="vendor_ai_use" value="Don't know"> Don't know</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">17. Do your employee and contractor agreements address AI use and IP ownership?<span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">Whether your employment and contractor agreements state who may use AI and who owns the resulting code.</span></span></label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="contracts_address_ai" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="contracts_address_ai" value="No"> No</label>
      </div>
    </div>
    <h3 id="sec-awareness" style="margin-top:1.1rem; font-size:1.25rem; font-weight:600; color:var(--fg); border-bottom:1px solid var(--border); padding-bottom:0.4rem; margin-bottom:0;">Part 5: Awareness & Ownership</h3>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">18. Are you aware of the risks of using AI-generated code?<span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">Whether you understand that AI-generated code may not be copyrightable or fully owned by you.</span></span></label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="awareness" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="awareness" value="No"> No</label>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">19. Do you assert that you own the code?<span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">Whether you currently claim legal ownership of your code. Purely AI-generated portions may not be ownable.</span></span></label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="radio" name="assert_code_ownership" value="Yes"> Yes</label>&nbsp;&nbsp;
        <label><input type="radio" name="assert_code_ownership" value="No"> No</label>
      </div>
    </div>
    <h3 id="sec-support" style="margin-top:1.1rem; font-size:1.25rem; font-weight:600; color:var(--fg); border-bottom:1px solid var(--border); padding-bottom:0.4rem; margin-bottom:0;">Part 6: Support Needed</h3>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label style="flex: 1 1 400px; min-width: 300px;">20. What kind of assistance are you looking for?</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <label><input type="checkbox" name="assistance" value="assistance_ip_patents"> IP & Patents</label><span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">Help protecting your code and inventions through copyrights, patents, and trade secrets.</span></span><br/>
        <label><input type="checkbox" name="assistance" value="assistance_risk"> AI Risk Assessment</label><span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">A deeper review of how you use AI and the ownership and compliance risks it creates.</span></span><br/>
        <label><input type="checkbox" name="assistance" value="assistance_audit"> Development Audits</label><span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">A review of your codebase and process to find AI-generated code and document how it was made.</span></span><br/>
        <label><input type="checkbox" name="assistance" value="assistance_best_practices"> Best Practices & Policies</label><span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">Written guidance for using AI tools safely and consistently across your team.</span></span><br/>
        <label><input type="checkbox" name="assistance" value="assistance_governance"> Governance & Agreements</label><span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">Frameworks and contract language defining permitted AI use and who owns the output.</span></span><br/>
        <label><input type="checkbox" name="assistance" value="assistance_due_diligence"> M&A Due Diligence</label><span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">Assessing AI-related IP risk before an acquisition, investment, or sale.</span></span><br/>
        <label><input type="checkbox" name="assistance" value="assistance_training"> Training & Education</label><span class="info-tip" tabindex="0"><span class="info-icon">i</span><span class="info-bubble">Sessions for developers, executives, or legal teams on AI, IP, and ownership.</span></span><br/>
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
      <label for="company" style="flex: 1 1 400px; min-width: 300px;">Company (optional)</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <input type="text" id="company" name="company" placeholder="Acme Corp" style="margin-top: 0.25rem; width: 100%;">
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label for="role" style="flex: 1 1 400px; min-width: 300px;">Your role</label>
      <div style="flex: 1 1 250px; min-width: 200px;">
        <select id="role" name="role" style="margin-top: 0.25rem; width: 100%;">
          <option value="">Select one</option>
          <option value="Engineering">Engineering</option>
          <option value="Legal / Compliance">Legal / Compliance</option>
          <option value="Executive / Founder">Executive / Founder</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <label for="email" style="flex: 1 1 400px; min-width: 300px;">Where should we send your personalized assessment?</label>
        <div style="flex: 1 1 250px; min-width: 200px;">
          <input type="email" id="email" name="email" required aria-required="true" placeholder="you@example.com" style="margin-top: 0.25rem; width: 100%;">
        </div>
    </div>
    <button type="submit">Submit Assessment</button>
    <p style="font-size: 0.9em; color: var(--fg-muted);">
      We’ll review your answers and send you a free personalized assessment. This is an educational service and not legal advice.
    </p>
  </form>

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
  // AI-code risk persona wizard. Branching logic and ratings mirror the blog
  // post risk-matrix table (the source of truth). Runs entirely client-side;
  // the computed result is written into hidden fields and posted with the form.
  (function () {
    var PERSONAS = {
      "Model Maker":     { inbound: "Critical", outbound: "Low",      desc: "Your organization trains or ships an AI model that others build on, which puts it at the center of the unresolved fair-use fight over training data." },
      "Giver":           { inbound: "Low",      outbound: "None",     desc: "Your organization gives all of its code away for free and never monetizes it, so ownership of the AI output is moot by choice." },
      "Civic Coder":     { inbound: "Moderate", outbound: "None",     desc: "Government employees write the code, which is uncopyrightable by statute and open by default, so there is nothing to own or sell." },
      "Acquirer":        { inbound: "Low",      outbound: "Moderate", desc: "Your organization buys companies and asks who owns their code, inheriting any ownership gap that diligence misses." },
      "Host":            { inbound: "Low",      outbound: "Moderate", desc: "Your organization runs its code as pure SaaS on its own servers and never distributes it, so copyright is a weak moat, though exit diligence still asks what it actually owns." },
      "Hired Gun":       { inbound: "Low",      outbound: "Critical", desc: "Your organization is the dev shop on the hook for the title warranty it signs, bearing the breach and misrepresentation exposure when AI code cannot transfer title." },
      "Inheritor":       { inbound: "Low",      outbound: "High",     desc: "Your organization bought a codebase and the ownership gap surfaces later, leaving it to remediate the code or pursue the seller on a broken warranty." },
      "Internal Tooler": { inbound: "Low",      outbound: "Low",      desc: "Your organization builds the code, runs it, and never sells it, so unowned AI code rarely matters in practice." },
      "Walled Garden":   { inbound: "Low",      outbound: "Low",      desc: "Your organization trains its own model on its own data and keeps the output in-house, which holds both inbound and outbound risk down." },
      "Bootstrapper":    { inbound: "Moderate", outbound: "High",     desc: "Your organization runs a bootstrapped paid product with no investors and no plan to sell, but the unowned code can be copied freely, so there is no lawful monopoly protecting the revenue." },
      "Exiter":          { inbound: "Moderate", outbound: "Critical", desc: "Your organization is building an AI-heavy product to raise money and sell the company, where the acquisition warranty of title can't be made and a vibe-coded core leaves little a buyer can own." },
      "Onshorer":        { inbound: "Low",      outbound: "High",     desc: "Your organization hires a US-based shop that may quietly use AI; the shop is reachable and easy to audit, but it can still warrant title it cannot actually give." },
      "Offshorer":       { inbound: "Low",      outbound: "High",     desc: "Your organization hires an offshore shop that is hard to audit, so it cannot easily verify how much of the delivered code is AI-generated or whether the title warranty holds." },
      "Licensor":        { inbound: "Moderate", outbound: "Critical", desc: "Your organization ships licensed software to customers and keeps the company, and every customer license demands a warranty of title that unowned AI code cannot support." },
      "Fed Supplier":    { inbound: "Moderate", outbound: "Critical", desc: "Your organization delivers to the federal government under contract, where title and accuracy warranties can be breached by AI code and trigger debarment." },
      "Regulated":       { inbound: "Moderate", outbound: "Critical", desc: "Your organization operates under HIPAA, SEC, or FDA rules that demand an auditability and provenance trail that vibe-coded code cannot satisfy." },
      "Two-Tier":        { inbound: "Moderate", outbound: "Critical", desc: "Your organization runs an open-source core plus a proprietary paid tier, where one unowned or copyleft module can force disclosure of the proprietary code." },
      "Renter":          { inbound: "Moderate", outbound: "Moderate", desc: "Your organization builds on a vendor platform that contractually indemnifies its AI output, transferring much of the risk to a solvent vendor." }
    };

    var PROMISE_MAP = {
      warrant_title: "Licensor",
      fed: "Fed Supplier",
      regulated: "Regulated",
      two_tier: "Two-Tier",
      exit: "Exiter",
      renter: "Renter"
    };

    // The follow-on maturity questions, grouped by their section header id.
    // Used to hide questions (and empty section headers) that do not apply to
    // the identified persona, and to tell the worker which keys to skip when
    // scoring. Order and keys mirror the form fields and the worker's SCORED array.
    var MATURITY_SECTIONS = {
      "sec-tools":     ["ai_tools", "ai_tool_tier", "ai_usage", "ai_code_share"],
      "sec-policies":  ["prompting_policy", "content_policy", "code_reviewed", "code_labeled", "mentioned_in_commits", "mentioned_in_docs", "ai_in_production", "ai_restricted", "store_prompts", "reviewed_ai_licenses"],
      "sec-people":    ["ai_training", "vendor_ai_use", "contracts_address_ai"],
      "sec-awareness": ["awareness", "assert_code_ownership"],
      "sec-support":   ["assistance"]
    };

    // Questions that do not apply to a given primary persona. Hidden in the form
    // and excluded from the risk score.
    //  - Acquirer evaluates code it did not build, so the whole build-process
    //    block (and the "do you own it" question) does not apply.
    //  - Civic Coder output is uncopyrightable by statute and Giver ownership is
    //    moot by choice, so a "No" to asserting ownership is correct, not a risk.
    var PERSONA_EXCLUDED = {
      "Acquirer": ["ai_tools", "ai_tool_tier", "ai_usage", "ai_code_share", "prompting_policy", "content_policy", "code_reviewed", "code_labeled", "mentioned_in_commits", "mentioned_in_docs", "ai_in_production", "ai_restricted", "store_prompts", "reviewed_ai_licenses", "ai_training", "assert_code_ownership"],
      "Civic Coder": ["assert_code_ownership"],
      "Giver": ["assert_code_ownership"]
    };

    var wizard = document.getElementById("personaWizard");
    var resultBox = document.getElementById("personaResult");
    if (!wizard || !resultBox) return;

    function radioVal(name) {
      var el = wizard.querySelector('input[name="' + name + '"]:checked');
      return el ? el.value : "";
    }
    function checkedVals(name) {
      var out = [];
      var els = wizard.querySelectorAll('input[name="' + name + '"]:checked');
      for (var i = 0; i < els.length; i++) out.push(els[i].value);
      return out;
    }
    function setHidden(name, value) {
      var el = document.querySelector('input[type="hidden"][name="' + name + '"]');
      if (el) el.value = value;
    }
    function show(step, on) {
      var el = wizard.querySelector('[data-step="' + step + '"]');
      if (el) el.classList.toggle("hidden", !on);
    }

    function answers() {
      return {
        scope: radioVal("persona_scope"),
        model: radioVal("persona_model_maker"),
        giver: radioVal("persona_giver"),
        civic: radioVal("persona_civic"),
        host: radioVal("persona_host"),
        authorship: radioVal("persona_authorship"),
        usage: radioVal("persona_employee_usage"),
        shop: radioVal("persona_shop"),
        promise: checkedVals("persona_promise")
      };
    }

    function updateVisibility(a) {
      var own = a.scope === "own";
      var afterModel = own && a.model === "no";
      var afterGiver = afterModel && a.giver === "no";
      var afterCivic = afterGiver && a.civic === "no";
      show("p1", own);
      show("p2", afterModel);
      show("p3", afterGiver);
      show("p4", afterCivic);
      var atP5 = afterCivic && a.host === "no";
      show("p5", atP5);
      show("p6", atP5 && a.authorship === "employees");
      show("p7", atP5 && a.authorship === "hired_shop");
      // Gate the promise check on the full active path so a stale answer from a
      // previously explored branch (e.g. switching back to "acquire") can't
      // leave it showing. Bootstrapper sees it too: a bootstrapped paid product
      // still licenses to customers and can be regulated or a fed supplier.
      // Hired-shop orgs (Onshorer/Offshorer) stack promises for the same reason:
      // outsourcing the build does not remove title, federal, or regulatory duties.
      var hostReached = afterCivic && a.host === "yes";
      var promiseVisible = hostReached
        || (atP5 && (a.authorship === "we_are_shop" || a.authorship === "inherited" || a.authorship === "hired_shop"))
        || (atP5 && a.authorship === "employees" && (a.usage === "sell_license" || a.usage === "raise_sell" || a.usage === "bootstrap"));
      show("p8", promiseVisible);
    }

    function withPromise(primary, a) {
      var stacked = [];
      for (var i = 0; i < a.promise.length; i++) {
        var name = PROMISE_MAP[a.promise[i]];
        if (name && name !== primary && stacked.indexOf(name) === -1) stacked.push(name);
      }
      return { primary: primary, stacked: stacked };
    }

    function computeResult(a) {
      if (a.scope === "acquire") return { primary: "Acquirer", stacked: [] };
      if (a.scope !== "own") return null;
      if (a.model === "yes") return { primary: "Model Maker", stacked: [] };
      if (a.model !== "no") return null;
      if (a.giver === "yes") return { primary: "Giver", stacked: [] };
      if (a.giver !== "no") return null;
      if (a.civic === "yes") return { primary: "Civic Coder", stacked: [] };
      if (a.civic !== "no") return null;
      if (a.host === "yes") return withPromise("Host", a);
      if (a.host !== "no") return null;
      if (a.authorship === "we_are_shop") return withPromise("Hired Gun", a);
      if (a.authorship === "inherited") return withPromise("Inheritor", a);
      if (a.authorship === "hired_shop") {
        if (a.shop === "us") return withPromise("Onshorer", a);
        if (a.shop === "offshore") return withPromise("Offshorer", a);
        return null;
      }
      if (a.authorship === "employees") {
        if (a.usage === "internal") return { primary: "Internal Tooler", stacked: [] };
        if (a.usage === "walled") return { primary: "Walled Garden", stacked: [] };
        if (a.usage === "sell_license") return withPromise("Licensor", a);
        if (a.usage === "raise_sell") return withPromise("Exiter", a);
        if (a.usage === "bootstrap") return withPromise("Bootstrapper", a);
        return null;
      }
      return null;
    }

    function cardHTML(name, note) {
      var p = PERSONAS[name];
      return '<div class="persona-card">' +
        '<div class="persona-name">' + name + '</div>' +
        '<div class="persona-desc">' + p.desc + '</div>' +
        (note ? '<div class="persona-mitigation">' + note + '</div>' : '') +
        '</div>';
    }

    function pathSummary(a, stacked) {
      if (a.scope === "acquire") return "Evaluating code to acquire";
      var parts = [];
      if (a.scope === "own") parts.push("Own code");
      if (a.authorship === "employees") parts.push("Employees write it");
      else if (a.authorship === "hired_shop") parts.push("Hired a shop");
      else if (a.authorship === "we_are_shop") parts.push("We are the shop");
      else if (a.authorship === "inherited") parts.push("Inherited via acquisition");
      var um = { internal: "Internal only", walled: "Internal LLM", sell_license: "Sold/licensed", raise_sell: "Raise and sell", bootstrap: "Bootstrapped" };
      if (a.usage && um[a.usage]) parts.push(um[a.usage]);
      if (a.shop) parts.push(a.shop === "us" ? "US shop" : "Offshore shop");
      if (stacked && stacked.length) parts.push("Promises: " + stacked.join(", "));
      return parts.join(" > ");
    }

    // Show or hide the follow-on maturity questions based on the primary persona,
    // and record the excluded keys so the worker scores only what is shown.
    function applyMaturity(primary) {
      var excluded = (primary && PERSONA_EXCLUDED[primary]) ? PERSONA_EXCLUDED[primary] : [];
      for (var sec in MATURITY_SECTIONS) {
        var keys = MATURITY_SECTIONS[sec];
        var anyShown = false;
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var input = document.querySelector('[name="' + key + '"]');
          var hide = excluded.indexOf(key) !== -1;
          if (!hide) anyShown = true;
          if (!input) continue;
          // Match on "flex-wrap" only: the CSSOM re-serializes the style
          // attribute without the space after the colon once .style is touched,
          // so a selector containing "flex-wrap: wrap" would stop matching.
          var wrap = input.closest('div[style*="flex-wrap"]');
          if (wrap) wrap.style.display = hide ? "none" : "flex";
        }
        var header = document.getElementById(sec);
        if (header) header.style.display = anyShown ? "" : "none";
      }
      setHidden("scored_excluded", excluded.join(","));
    }

    function render() {
      var a = answers();
      updateVisibility(a);
      var r = computeResult(a);

      if (!r) {
        resultBox.classList.add("hidden");
        resultBox.innerHTML = "";
        setHidden("persona_primary", "");
        setHidden("persona_stacked", "");
        setHidden("persona_result", "");
        setHidden("persona_path", "");
        applyMaturity(null);
        return;
      }

      var stacked = r.stacked.slice();
      var hasRenter = stacked.indexOf("Renter") !== -1;
      var triggers = stacked.filter(function (n) { return n !== "Renter"; });

      var set = [r.primary].concat(triggers);
      var critCount = 0;
      for (var i = 0; i < set.length; i++) {
        if (PERSONAS[set[i]] && PERSONAS[set[i]].outbound === "Critical") critCount++;
      }

      var html = '<h4>Your primary persona: ' + r.primary + '</h4>';
      html += '<div class="persona-desc">' + PERSONAS[r.primary].desc + '</div>';

      if (triggers.length) {
        html += '<div class="persona-flags-label">Also flagged on this codebase:</div>';
        for (var j = 0; j < triggers.length; j++) html += cardHTML(triggers[j]);
      }
      if (hasRenter) {
        html += cardHTML("Renter", "A vendor contractually indemnifies your AI output, which offsets much of the risk.");
      }
      html += '<div class="persona-more"><a href="https://accentient.com/blog/ai-code-ownership-by-persona/" target="_blank" rel="noopener">Learn more about AI-code risk personas</a> | <a href="#" id="personaReset">Start over</a></div>';

      resultBox.innerHTML = html;
      resultBox.classList.remove("hidden");

      setHidden("persona_primary", r.primary);
      setHidden("persona_stacked", stacked.join(", "));
      setHidden("persona_path", pathSummary(a, stacked));
      var payload = {
        primary: { name: r.primary, inbound: PERSONAS[r.primary].inbound, outbound: PERSONAS[r.primary].outbound },
        stacked: stacked.map(function (n) {
          return { name: n, inbound: PERSONAS[n].inbound, outbound: PERSONAS[n].outbound, mitigating: n === "Renter" };
        }),
        criticalOutboundCount: critCount
      };
      setHidden("persona_result", JSON.stringify(payload));
      applyMaturity(r.primary);
    }

    wizard.addEventListener("change", render);
    resultBox.addEventListener("click", function (e) {
      var t = e.target;
      if (t && t.id === "personaReset") {
        e.preventDefault();
        var inputs = wizard.querySelectorAll('input[type="radio"], input[type="checkbox"]');
        for (var i = 0; i < inputs.length; i++) inputs[i].checked = false;
        render();
      }
    });
    render();
  })();
</script>