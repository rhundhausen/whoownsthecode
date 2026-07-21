---
title: "Contact Us"
date: 2025-06-29
---

We’re passionate about the intersection of AI, code, and the law, and we built this site to help others navigate the complexities of AI-generated software and code ownership.

Have feedback? Questions? Want to collaborate or attend a workshop? We’d love to hear from you. Send us a message below, or [email us](mailto:whoownsthecode@gmail.com) directly.

<form id="contactForm" method="POST" style="display:flex; flex-direction:column; gap:1.1rem; max-width:560px; margin-top:1.6rem;">
  <input type="hidden" name="form_type" value="contact">
  <div aria-hidden="true" style="position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap;">
    <label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label>
  </div>

  <div style="display:flex; flex-direction:column; gap:.35rem;">
    <label for="cf-name">Name *</label>
    <input type="text" id="cf-name" name="name" required aria-required="true" autocomplete="name">
  </div>

  <div style="display:flex; flex-direction:column; gap:.35rem;">
    <label for="cf-email">Email *</label>
    <input type="email" id="cf-email" name="email" required aria-required="true" autocomplete="email" placeholder="you@example.com">
  </div>

  <div style="display:flex; flex-direction:column; gap:.35rem;">
    <label for="cf-subject">Subject</label>
    <input type="text" id="cf-subject" name="subject" autocomplete="off">
  </div>

  <div style="display:flex; flex-direction:column; gap:.35rem;">
    <label for="cf-message">Message *</label>
    <textarea id="cf-message" name="message" rows="6" required aria-required="true"></textarea>
  </div>

  <button type="submit">Send message</button>
  <p style="font-size:.9em; color:var(--fg-muted); margin:0;">Protected by reCAPTCHA. We’ll only use your message to reply.</p>
</form>

<script src="https://www.google.com/recaptcha/api.js?render=6Lf_I5wrAAAAAKATl51T-YdiY00ZjOVdmuk-M2GX"></script>
<script>
  (function () {
    var form = document.getElementById("contactForm");
    if (!form) return;
    var btn = form.querySelector("button[type='submit']");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (btn) btn.disabled = true;
      grecaptcha.ready(function () {
        grecaptcha.execute("6Lf_I5wrAAAAAKATl51T-YdiY00ZjOVdmuk-M2GX", { action: "submit" }).then(async function (token) {
          try {
            var res = await fetch("https://ai-assessment-worker.richard-dd5.workers.dev", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                form_type: "contact",
                name: form.name.value.trim(),
                email: form.email.value.trim(),
                subject: form.subject.value.trim(),
                message: form.message.value.trim(),
                website: form.website.value,
                recaptchaToken: token
              })
            });
            var text = await res.text();
            if (res.ok) {
              alert("Thanks! Your message has been sent.");
              form.reset();
            } else {
              alert("Submission failed: " + text);
            }
          } catch (err) {
            alert("Submission failed: network or worker error.");
          } finally {
            if (btn) btn.disabled = false;
          }
        }).catch(function () {
          alert("reCAPTCHA failed to execute.");
          if (btn) btn.disabled = false;
        });
      });
    });
  })();
</script>
