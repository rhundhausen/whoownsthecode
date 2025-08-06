const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Change to your domain in production
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
    }

    try {
      const formData = await request.json();
      const recaptchaToken = formData["recaptchaToken"];

      if (!recaptchaToken) {
        return new Response("Missing CAPTCHA token", {
          status: 400,
          headers: corsHeaders,
        });
      }

      // Verify reCAPTCHA
      const verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${env.RECAPTCHA_SECRET}&response=${recaptchaToken}`,
      });

      const verification = await verifyResponse.json();

      if (!verification.success || verification.score < 0.5) {
        return new Response("CAPTCHA verification failed", {
          status: 403,
          headers: corsHeaders,
        });
      }

      // Extract and sanitize form fields
      const name = formData.name || "Anonymous";
      const email = formData.email || "N/A";
      const responses = formData.responses || {};

      // Send email via Resend
      const sendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Who Owns The Code <no-reply@whoownsthecode.com>",
          to: "whoownsthecode@gmail.com",
          subject: `New AI Risk Assessment from ${name}`,
          text: `Name: ${name}
Email: ${email}
Responses:
${JSON.stringify(responses, null, 2)}`,
        }),
      });

      if (!sendRes.ok) {
        const errorText = await sendRes.text();
        console.error("Resend error:", errorText);
        return new Response("Failed to send email", {
          status: 500,
          headers: corsHeaders,
        });
      }

      return new Response("Assessment submitted successfully!", {
        status: 200,
        headers: corsHeaders,
      });
    } catch (err) {
      console.error("Worker error:", err);
      return new Response("Internal Server Error", {
        status: 500,
        headers: corsHeaders,
      });
    }
  },
};
