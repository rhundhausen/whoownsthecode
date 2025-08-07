const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
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

      // 🆕 Get client IP from Cloudflare header
      const clientIP = request.headers.get("CF-Connecting-IP") || "";
      console.log("🌐 Client IP:", clientIP);

      // 🔐 Verify CAPTCHA with remoteip
      const verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${env.RECAPTCHA_SECRET}&response=${recaptchaToken}&remoteip=${clientIP}`,
      });

      const verification = await verifyResponse.json();
      console.log("✅ reCAPTCHA response from Google:", verification);

      if (!verification.success) {
        return new Response(`CAPTCHA verification failed: ${verification['error-codes']?.join(", ")}`, {
          status: 403,
          headers: corsHeaders,
        });
      }

      if (verification.score !== undefined) {
        console.log(`🧪 score: ${verification.score}, action: ${verification.action}`);
        if (verification.score < 0.3) {
          return new Response(`CAPTCHA score too low (${verification.score})`, {
            status: 403,
            headers: corsHeaders,
          });
        }
      }

      const name = formData.name || "Anonymous";
      const email = formData.email || "N/A";
      const responses = formData.responses || {};

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