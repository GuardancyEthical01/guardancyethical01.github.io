import { Resend } from "resend";
import crypto from "crypto";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function correlationId() {
  return crypto.randomUUID().slice(0, 12);
}

function redactEmail(email) {
  if (!email) return "(empty)";
  const [local, domain] = email.split("@");
  return `${local.slice(0, 2)}***@${domain}`;
}

function maskKey(key) {
  if (!key) return "(missing)";
  return `${key.slice(0, 4)}...${key.slice(-4)} (${key.length} chars)`;
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function safeHeaders(headers) {
  const safe = { ...headers };
  delete safe.authorization;
  delete safe.cookie;
  delete safe["x-admin-token"];
  return safe;
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export default async function handler(req, res) {
  const cid = correlationId();
  const log = (msg, data) =>
    console.log(`[booking][${cid}] ${msg}`, data !== undefined ? JSON.stringify(data) : "");

  log("START", {
    method: req.method,
    url: req.url,
    headers: safeHeaders(req.headers),
  });

  // ── Method guard ─────────────────────────────────────────────────────
  if (req.method !== "POST") {
    log("REJECT method_not_allowed");
    return res.status(405).json({ error: "Method not allowed", correlationId: cid });
  }

  // ── Env var checks ───────────────────────────────────────────────────
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM || "Deteqt <onboarding@resend.dev>";

  log("ENV_CHECK", {
    RESEND_API_KEY_present: !!apiKey,
    RESEND_API_KEY_masked: maskKey(apiKey),
    RESEND_FROM: fromAddress,
    VERCEL_ENV: process.env.VERCEL_ENV || "local",
  });

  if (!apiKey) {
    log("ERROR missing RESEND_API_KEY");
    return res.status(500).json({
      error: "Server configuratiefout: RESEND_API_KEY ontbreekt.",
      correlationId: cid,
    });
  }

  // ── Parse & validate body ────────────────────────────────────────────
  const body = req.body || {};
  const { name, email, organisation, message, date } = body;

  log("BODY_PARSED", {
    name: name || "(empty)",
    email: redactEmail(email),
    organisation: organisation || "(empty)",
    message: message ? `${message.slice(0, 80)}...` : "(empty)",
    date: date || "(empty)",
  });

  const missing = [];
  if (!name || !String(name).trim()) missing.push("name");
  if (!email || !String(email).trim()) missing.push("email");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) missing.push("email (invalid format)");

  if (missing.length > 0) {
    log("VALIDATION_FAILED", { missing });
    return res.status(400).json({
      error: `Verplichte velden ontbreken of zijn ongeldig: ${missing.join(", ")}`,
      correlationId: cid,
    });
  }

  // ── Send emails ──────────────────────────────────────────────────────
  const resend = new Resend(apiKey);
  const timestamp = new Date().toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam" });

  try {
    // A) Admin notification
    log("SEND_ADMIN", { from: fromAddress, to: "info@deteqt.nl", subject: "Nieuwe afspraakaanvraag via deteqt.nl" });

    const adminResult = await resend.emails.send({
      from: fromAddress,
      to: "info@deteqt.nl",
      subject: "Nieuwe afspraakaanvraag via deteqt.nl",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="margin-bottom: 24px; font-size: 20px;">Nieuwe afspraakaanvraag</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-weight: 600; width: 160px; vertical-align: top;">Naam</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-weight: 600; vertical-align: top;">E-mail</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;"><a href="mailto:${escapeHtml(email)}" style="color: #2563eb;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-weight: 600; vertical-align: top;">Organisatie</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">${escapeHtml(organisation || "Niet opgegeven")}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-weight: 600; vertical-align: top;">Gewenst moment</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">${escapeHtml(date || "Niet opgegeven")}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: 600; vertical-align: top;">Toelichting</td>
              <td style="padding: 12px 0; white-space: pre-line;">${escapeHtml(message || "Geen toelichting opgegeven")}</td>
            </tr>
          </table>
          <p style="margin-top: 32px; font-size: 13px; color: #6b7280;">Verzonden via deteqt.nl op ${timestamp} | ref: ${cid}</p>
        </div>
      `,
    });

    log("ADMIN_RESULT", adminResult);

    // B) Customer confirmation
    log("SEND_CLIENT", { from: fromAddress, to: redactEmail(email), subject: "Bevestiging: aanvraag ontvangen (Deteqt)" });

    const clientResult = await resend.emails.send({
      from: fromAddress,
      to: email,
      subject: "Bevestiging: aanvraag ontvangen (Deteqt)",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="margin-bottom: 8px; font-size: 20px;">Bedankt voor uw aanvraag</h2>
          <p style="color: #4b5563; line-height: 1.6; margin-bottom: 24px;">
            Beste ${escapeHtml(name)},
          </p>
          <p style="color: #4b5563; line-height: 1.6; margin-bottom: 24px;">
            Wij hebben uw aanvraag voor een verkennend gesprek ontvangen. U ontvangt binnen twee werkdagen een reactie met een bevestiging of een voorstel voor een passend moment.
          </p>
          ${date ? `<p style="color: #4b5563; line-height: 1.6; margin-bottom: 24px;"><strong>Gewenst moment:</strong> ${escapeHtml(date)}</p>` : ""}
          <p style="color: #4b5563; line-height: 1.6; margin-bottom: 24px;">
            Heeft u in de tussentijd vragen? Neem gerust contact op via
            <a href="mailto:info@deteqt.nl" style="color: #2563eb;">info@deteqt.nl</a>.
          </p>
          <p style="color: #4b5563; line-height: 1.6;">
            Met vriendelijke groet,<br />
            <strong>Deteqt</strong>
          </p>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0 16px;" />
          <p style="font-size: 12px; color: #9ca3af;">
            Dit is een automatisch bericht. U ontvangt deze e-mail omdat u een aanvraag heeft ingediend via deteqt.nl. | ref: ${cid}
          </p>
        </div>
      `,
    });

    log("CLIENT_RESULT", clientResult);

    // ── Success ────────────────────────────────────────────────────────
    log("SUCCESS both emails sent");

    return res.status(200).json({
      ok: true,
      correlationId: cid,
      adminEmailId: adminResult?.data?.id || null,
      clientEmailId: clientResult?.data?.id || null,
    });
  } catch (error) {
    log("ERROR", {
      name: error?.name,
      message: error?.message,
      statusCode: error?.statusCode,
      response: error?.response ? JSON.stringify(error.response) : undefined,
    });

    return res.status(500).json({
      error: "Er ging iets mis bij het versturen van de e-mail.",
      correlationId: cid,
      detail: error?.message || null,
    });
  }
}
