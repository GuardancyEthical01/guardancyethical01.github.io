import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, organisation, message, date } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Naam en e-mail zijn verplicht." });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // A) Notificatie naar Deteqt inbox
    await resend.emails.send({
      from: "Deteqt <info@deteqt.nl>",
      to: "ingobeute@gmail.com",
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
              <td style="padding: 12px 0;">${escapeHtml(message || "Geen toelichting opgegeven")}</td>
            </tr>
          </table>
          <p style="margin-top: 32px; font-size: 13px; color: #6b7280;">Verzonden via deteqt.nl op ${new Date().toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam" })}</p>
        </div>
      `,
    });

    // B) Bevestiging naar de klant
    await resend.emails.send({
      from: "Deteqt <info@deteqt.nl>",
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
            Dit is een automatisch bericht. U ontvangt deze e-mail omdat u een aanvraag heeft ingediend via deteqt.nl.
          </p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Resend error:", error);
    return res.status(500).json({ error: "Er ging iets mis bij het versturen." });
  }
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
