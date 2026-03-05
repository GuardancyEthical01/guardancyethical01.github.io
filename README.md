
  # Deteqt landingspagina

  This is a code bundle for Deteqt landingspagina. The original project is available at https://www.figma.com/design/QXrAVZJ9z4i3Azdjq6RqK0/Deteqt-landingspagina.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

---

## Booking API (Vercel Serverless Functions)

### Environment Variables (Vercel Dashboard > Settings > Environment Variables)

| Key | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes | Resend API key (from resend.com/api-keys) |
| `RESEND_FROM` | Yes | Verified sender, e.g. `Deteqt <info@deteqt.nl>` |
| `ADMIN_TOKEN` | Yes | Secret token to protect the /api/booking/test endpoint |

### Endpoints

#### 1. Health check

```
GET https://www.deteqt.nl/api/booking/health
```

Returns env var presence flags, deployment environment, and timestamp. No authentication required.

#### 2. Test email

```bash
curl -X POST https://www.deteqt.nl/api/booking/test \
  -H "Content-Type: application/json" \
  -H "x-admin-token: YOUR_ADMIN_TOKEN" \
  -d '{"to": "your@email.com"}'
```

Sends a single test email using the same Resend client and `RESEND_FROM` address. Returns the Resend message ID on success.

#### 3. Booking form submission

```bash
curl -X POST https://www.deteqt.nl/api/booking \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"your@email.com","organisation":"TestBV","message":"Test","date":"Ma 10:00"}'
```

Sends 2 emails (admin notification + customer confirmation) and returns `correlationId` + Resend message IDs.

### Debugging Checklist (after deploy)

1. Open `/api/booking/health` -- verify `RESEND_API_KEY: true`, `RESEND_FROM` shows your verified domain.
2. Run the `/api/booking/test` curl command -- check for a `resendId` in the response and verify the email arrives.
3. If test works but booking does not: check Vercel Logs for `[booking]` entries with the correlationId.
4. In Resend Dashboard (resend.com/emails): search for the `resendId` to see delivery status.
5. Common issues:
   - `RESEND_FROM` domain not verified in Resend --> emails are silently rejected.
   - `RESEND_FROM` format wrong --> must be `Display Name <email@domain>`.
   - API key from wrong Resend team/project --> no permission to send from the domain.
