import { Resend } from "resend";

export default async function handler(req, res) {
  // ── Method guard ─────────────────────────────────────────────────────
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // ── Auth guard ───────────────────────────────────────────────────────
  const token = req.headers["x-admin-token"];
  const expected = process.env.ADMIN_TOKEN;

  if (!expected) {
    console.error("[booking/test] ADMIN_TOKEN env var is not set");
    return res.status(500).json({ error: "ADMIN_TOKEN is niet geconfigureerd op de server." });
  }

  if (!token || token !== expected) {
    return res.status(401).json({ error: "Ongeldig of ontbrekend x-admin-token header." });
  }

  // ── Env check ────────────────────────────────────────────────────────
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM || "Deteqt <onboarding@resend.dev>";

  if (!apiKey) {
    return res.status(500).json({ error: "RESEND_API_KEY ontbreekt." });
  }

  // ── Parse body ───────────────────────────────────────────────────────
  const { to } = req.body || {};

  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return res.status(400).json({ error: "Geef een geldig 'to' e-mailadres op in de body." });
  }

  // ── Send test email ──────────────────────────────────────────────────
  const resend = new Resend(apiKey);

  try {
    console.log(`[booking/test] Sending test email from="${fromAddress}" to="${to}"`);

    const result = await resend.emails.send({
      from: fromAddress,
      to,
      subject: "Deteqt - Test e-mail",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="font-size: 18px;">Test e-mail van Deteqt</h2>
          <p>Als je dit leest, werkt de Resend-integratie correct.</p>
          <p style="font-size: 13px; color: #6b7280; margin-top: 24px;">
            Verzonden op ${new Date().toISOString()}<br/>
            From: ${fromAddress}<br/>
            Environment: ${process.env.VERCEL_ENV || "local"}
          </p>
        </div>
      `,
    });

    console.log("[booking/test] Result:", JSON.stringify(result));

    return res.status(200).json({
      ok: true,
      resendId: result?.data?.id || null,
      from: fromAddress,
      to,
      fullResult: result,
    });
  } catch (error) {
    console.error("[booking/test] Error:", error);

    return res.status(500).json({
      ok: false,
      error: error?.message || "Onbekende fout",
      statusCode: error?.statusCode || null,
      response: error?.response || null,
    });
  }
}
