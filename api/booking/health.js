export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  return res.status(200).json({
    ok: true,
    env: {
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      RESEND_FROM: process.env.RESEND_FROM || "(not set, will use fallback)",
      ADMIN_TOKEN: !!process.env.ADMIN_TOKEN,
    },
    environment: process.env.VERCEL_ENV || "local",
    timestamp: new Date().toISOString(),
  });
}
