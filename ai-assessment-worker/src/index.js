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
      const rawBody = await request.text();
      console.log("📥 Raw request body:", rawBody);

      let formData;
      try {
        formData = JSON.parse(rawBody);
      } catch (err) {
        console.error("❌ Failed to parse JSON:", err);
        return new Response("Invalid JSON payload", { status: 400, headers: corsHeaders });
      }

      const recaptchaToken = formData["recaptchaToken"];
      console.log("🔑 reCAPTCHA token received:", recaptchaToken);

      if (!recaptchaToken) {
        return new Response("Missing CAPTCHA token", {
          status: 400,
          headers: corsHeaders,
        });
      }

      const clientIP = request.headers.get("CF-Connecting-IP") || "";
      console.log("🌐 Client IP:", clientIP);

      const verifyBody = `secret=${env.RECAPTCHA_SECRET}&response=${recaptchaToken}&remoteip=${clientIP}`;
      console.log("📤 Sending to Google:", verifyBody);

      const verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: verifyBody,
      });

      const verification = await verifyResponse.json();
      console.log("🧾 Full verification response:", JSON.stringify(verification, null, 2));

      if (!verification.success) {
        return new Response(`CAPTCHA verification failed: ${verification['error-codes']?.join(", ")}`, {
          status: 403,
          headers: corsHeaders,
        });
      }

      if (verification.action !== "submit") {
        return new Response(`Invalid reCAPTCHA action: expected 'submit', got '${verification.action}'`, {
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
        console.error("📛 Resend error:", errorText);
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
      console.error("🔥 Uncaught Worker error:", err);
      return new Response("Internal Server Error", {
        status: 500,
        headers: corsHeaders,
      });
    }
  },
};