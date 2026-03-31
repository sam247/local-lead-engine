# Groundworks Twilio + GA4 + Sheets Setup

This runbook is for the groundworks vertical only.

## 1) Environment variables

Set these in the groundworks deployment environment:

- `FORWARD_PHONE_NUMBER=+447XXXXXXXXX`
- `GA4_MEASUREMENT_ID=G-XXXXXXXXXX`
- `GA4_API_SECRET=XXXXXXXXXX`
- `GOOGLE_SHEETS_WEBHOOK_URL=https://hooks.zapier.com/...`

Optional existing click-log vars (already used by `/api/track-call-click`):

- `GOOGLE_SHEETS_SHEET_ID`
- `GOOGLE_SHEETS_CLIENT_EMAIL`
- `GOOGLE_SHEETS_PRIVATE_KEY`

## 2) Twilio number configuration

In Twilio Console for the groundworks number:

- **Groundworks Twilio number**
  - `+441865537995`

- **A call comes in**
  - Type: `Webhook`
  - URL: `https://mainlinegroundworks.co.uk/api/twilio/voice`
  - Method: `HTTP POST`

- **Call status changes**
  - URL: `https://mainlinegroundworks.co.uk/api/twilio/status`
  - Method: `HTTP POST`

- **Region**
  - Set regional routing to `IE1 (Ireland)` if required by your account setup.

Save the configuration.

## 3) What each endpoint does

- `POST /api/twilio/voice`
  - Reads query context (`service`, `location`, `page`, `issue`)
  - Returns TwiML that dials `FORWARD_PHONE_NUMBER`

- `POST /api/twilio/status`
  - Receives Twilio call updates
  - Sends GA4 Measurement Protocol event `phone_call`
  - Sends webhook payload to `GOOGLE_SHEETS_WEBHOOK_URL`
  - Includes `event_type: "call"`

- `POST /api/track-call-click`
  - Existing click-intent logging
  - Includes `event_type: "click"`

## 4) Reporting rules (important)

- Treat `event_type: "call"` as the source of truth for real call outcomes/leads.
- Treat `event_type: "click"` as pre-call intent only (not guaranteed connected calls).
- Use click-to-call conversion rates by joining both event types in reporting, not click rows alone.

## 5) Validation checklist

- Click any call CTA on groundworks pages.
- Confirm Twilio number dials and forwards to `FORWARD_PHONE_NUMBER`.
- Confirm Twilio debugger/logs show `/api/twilio/voice` and `/api/twilio/status` hits.
- Confirm GA4 receives `phone_call`.
- Confirm Sheets/Zapier receives rows for:
  - `event_type: "click"` (intent)
  - `event_type: "call"` (actual call outcome)

## 6) Troubleshooting

- 500 on `/api/twilio/voice`:
  - Missing `FORWARD_PHONE_NUMBER`.
- No GA4 event:
  - Check `GA4_MEASUREMENT_ID` and `GA4_API_SECRET`.
- No Sheets webhook rows from status callback:
  - Check `GOOGLE_SHEETS_WEBHOOK_URL` and endpoint availability.
