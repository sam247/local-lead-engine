import { google } from "googleapis";

import { deleteCallSid, getIntentIdByCallSid } from "@/lib/twilioIntentStore";

const SHEET_TAB_NAME = "call_clicks";
const FALLBACK_WINDOW_MS = 15 * 60 * 1000;

function toStringValue(value: FormDataEntryValue | null, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

function toDuration(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function trimToString(value: unknown): string {
  return String(value ?? "").trim();
}

function normalizePhoneKey(s: string): string {
  return s.replace(/\s/g, "");
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function normalizePrivateKey(maybeEscaped: string): string {
  return maybeEscaped.includes("\\n") ? maybeEscaped.replace(/\\n/g, "\n") : maybeEscaped;
}

function columnIndexToLetter(index: number): string {
  let n = index + 1;
  let out = "";
  while (n > 0) {
    const rem = (n - 1) % 26;
    out = String.fromCharCode(65 + rem) + out;
    n = Math.floor((n - 1) / 26);
  }
  return out || "A";
}

async function getSheetsClient() {
  const auth = new google.auth.JWT({
    email: requireEnv("GOOGLE_SHEETS_CLIENT_EMAIL"),
    key: normalizePrivateKey(requireEnv("GOOGLE_SHEETS_PRIVATE_KEY")),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

function buildMeasurementProtocolUrl(): string | null {
  const measurementId = process.env.GA4_MEASUREMENT_ID?.trim();
  const apiSecret = process.env.GA4_API_SECRET?.trim();
  if (!measurementId || !apiSecret) return null;
  return `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`;
}

type SheetSnapshot = { headers: string[]; rows: string[][] };

async function readCallClicksSnapshot(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string
): Promise<SheetSnapshot> {
  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_TAB_NAME}!A1:ZZ50000`,
  });
  const values = resp.data.values ?? [];
  if (values.length === 0) return { headers: [], rows: [] };
  const headers = (values[0] ?? []).map((c) => trimToString(c));
  const rows = values.slice(1).map((r) => {
    const arr = (r ?? []).map((c) => trimToString(c ?? ""));
    while (arr.length < headers.length) arr.push("");
    return arr.slice(0, headers.length);
  });
  return { headers, rows };
}

/** 1-based sheet row number (including header row = 1). */
function findRowByIntentId(snapshot: SheetSnapshot, intentId: string): number | null {
  if (!intentId) return null;
  const idx = snapshot.headers.indexOf("intent_id");
  if (idx < 0) return null;
  for (let i = 0; i < snapshot.rows.length; i++) {
    if (trimToString(snapshot.rows[i][idx]) === intentId) return i + 2;
  }
  return null;
}

function findRowByFallback(
  snapshot: SheetSnapshot,
  toFromTwilio: string,
  nowMs: number
): number | null {
  const tsIdx = snapshot.headers.indexOf("timestamp");
  const toIdx = snapshot.headers.indexOf("to_number");
  if (tsIdx < 0 || toIdx < 0) return null;
  const wantTo = normalizePhoneKey(toFromTwilio);
  if (!wantTo) return null;

  let bestRow: number | null = null;
  let bestDelta = Infinity;

  for (let i = 0; i < snapshot.rows.length; i++) {
    const row = snapshot.rows[i];
    const rowTo = normalizePhoneKey(row[toIdx] ?? "");
    if (!rowTo || rowTo !== wantTo) continue;
    const tsRaw = row[tsIdx] ?? "";
    const t = Date.parse(tsRaw);
    if (!Number.isFinite(t)) continue;
    if (nowMs - t > FALLBACK_WINDOW_MS || t > nowMs + 60_000) continue;
    const delta = Math.abs(nowMs - t);
    if (delta < bestDelta) {
      bestDelta = delta;
      bestRow = i + 2;
    }
  }
  return bestRow;
}

async function updateTwilioColumnsOnly(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  headers: string[],
  sheetRow1Based: number,
  twilio: { twilio_call_sid: string; call_status: string; call_duration: string }
): Promise<void> {
  const idxSid = headers.indexOf("twilio_call_sid");
  const idxSt = headers.indexOf("call_status");
  const idxDur = headers.indexOf("call_duration");
  if (idxSid < 0 || idxSt < 0 || idxDur < 0) {
    console.error("[twilio_status] Sheet missing twilio_call_sid, call_status, or call_duration column");
    return;
  }
  const data = [
    {
      range: `${SHEET_TAB_NAME}!${columnIndexToLetter(idxSid)}${sheetRow1Based}`,
      values: [[twilio.twilio_call_sid]],
    },
    {
      range: `${SHEET_TAB_NAME}!${columnIndexToLetter(idxSt)}${sheetRow1Based}`,
      values: [[twilio.call_status]],
    },
    {
      range: `${SHEET_TAB_NAME}!${columnIndexToLetter(idxDur)}${sheetRow1Based}`,
      values: [[twilio.call_duration]],
    },
  ];
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId,
    requestBody: {
      valueInputOption: "RAW",
      data,
    },
  });
}

function formatCallId(n: number): string {
  return `CALL-${String(n).padStart(4, "0")}`;
}

function parseCallId(callId: string): number | null {
  const match = /^CALL-(\d{4,})$/i.exec(trimToString(callId));
  if (!match) return null;
  const n = Number(match[1]);
  return Number.isFinite(n) ? n : null;
}

async function getNextCallIdForOrphan(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  headers: string[]
): Promise<string> {
  const callIdIndex = headers.indexOf("call_id");
  if (callIdIndex < 0) return formatCallId(1);
  const colLetter = columnIndexToLetter(callIdIndex);
  const range = `${SHEET_TAB_NAME}!${colLetter}:${colLetter}`;
  const resp = await sheets.spreadsheets.values.get({ spreadsheetId, range });
  const values = resp.data.values ?? [];
  for (let i = values.length - 1; i >= 0; i--) {
    const raw = trimToString(values[i]?.[0]);
    if (!raw) continue;
    const parsed = parseCallId(raw);
    if (parsed != null) return formatCallId(parsed + 1);
  }
  return formatCallId(1);
}

async function appendOrphanRow(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  headers: string[],
  twilio: { twilio_call_sid: string; call_status: string; call_duration: string },
  toNumber: string
): Promise<void> {
  const callId = await getNextCallIdForOrphan(sheets, spreadsheetId, headers);
  const byHeader: Record<string, string> = {
    timestamp: new Date().toISOString(),
    call_id: callId,
    vertical: "groundworks",
    source_site: "",
    page_path: "",
    service_slug: "",
    location_slug: "",
    utm_source: "",
    source: "orphan",
    user_agent: "",
    contractor: "",
    call_status: twilio.call_status,
    event_type: "twilio_orphan",
    intent_id: "",
    to_number: toNumber,
    twilio_call_sid: twilio.twilio_call_sid,
    call_duration: twilio.call_duration,
    orphan: "yes",
  };
  const row: string[] = headers.map((h) => byHeader[h] ?? "");

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SHEET_TAB_NAME}!A:ZZ`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const requestUrl = new URL(req.url);
  const twilioSignature = req.headers.get("x-twilio-signature");
  const twilioSignaturePresent = twilioSignature != null && twilioSignature.trim().length > 0;
  const requestHost = requestUrl.host;
  const requestPath = requestUrl.pathname;
  const requestUserAgent = req.headers.get("user-agent") ?? "";

  const parentCallSidRaw = trimToString(formData.get("ParentCallSid"));
  const callSidRaw = trimToString(formData.get("CallSid"));
  const callSid = callSidRaw.length > 0 ? callSidRaw : "unknown";
  const status = toStringValue(formData.get("CallStatus"), "unknown");
  const from = toStringValue(formData.get("From"), "unknown");
  const to = toStringValue(formData.get("To"), "unknown");
  const durationRaw = toStringValue(formData.get("CallDuration"), "0");
  const duration = toDuration(durationRaw);

  const service = toStringValue(formData.get("service"), "unknown");
  const location = toStringValue(formData.get("location"), "unknown");
  const page = toStringValue(formData.get("page"), "unknown");
  const issue = toStringValue(formData.get("issue"), "none");

  const intentIdFromQuery = trimToString(requestUrl.searchParams.get("intent_id"));
  const nowMs = Date.now();

  let intentFromStore: string | undefined;
  if (parentCallSidRaw) {
    intentFromStore = getIntentIdByCallSid(parentCallSidRaw);
  }
  if (!intentFromStore && callSidRaw) {
    intentFromStore = getIntentIdByCallSid(callSidRaw);
  }

  console.log("[twilio_status]", {
    intent_id: intentIdFromQuery,
    intentFromStore,
    callSid,
    callStatus: status,
  });

  const twilioPayload = {
    twilio_call_sid: callSid,
    call_status: status,
    call_duration: String(duration),
  };

  const forwardTo = trimToString(process.env.FORWARD_PHONE_NUMBER);
  let matchedRow: number | null = null;

  try {
    const spreadsheetId = requireEnv("GOOGLE_SHEETS_SHEET_ID");
    const sheets = await getSheetsClient();
    const snapshot = await readCallClicksSnapshot(sheets, spreadsheetId);

    if (intentFromStore) {
      matchedRow = findRowByIntentId(snapshot, intentFromStore);
    }
    if (matchedRow == null && intentIdFromQuery) {
      matchedRow = findRowByIntentId(snapshot, intentIdFromQuery);
    }
    if (matchedRow == null) {
      matchedRow = findRowByFallback(snapshot, to, nowMs);
    }

    if (matchedRow != null) {
      await updateTwilioColumnsOnly(sheets, spreadsheetId, snapshot.headers, matchedRow, twilioPayload);
      if (parentCallSidRaw) deleteCallSid(parentCallSidRaw);
      if (callSidRaw && callSidRaw !== parentCallSidRaw) deleteCallSid(callSidRaw);
    } else {
      await appendOrphanRow(sheets, spreadsheetId, snapshot.headers, twilioPayload, forwardTo || to);
    }
  } catch (err) {
    console.error("[twilio_status] Sheets update failed", err);
  }

  const resolvedIntentId = intentFromStore ?? intentIdFromQuery;

  const ga4Enabled = process.env.TWILIO_GA4_ENABLED?.trim() === "true";
  const gaUrl = ga4Enabled ? buildMeasurementProtocolUrl() : null;
  if (gaUrl) {
    try {
      await fetch(gaUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: callSid,
          events: [
            {
              name: "phone_call",
              params: {
                event_type: "call",
                call_status: status,
                call_duration: duration,
                from_number: from,
                to_number: to,
                vertical: "groundworks",
                service,
                location,
                page,
                issue,
                intent_id: resolvedIntentId,
                twilio_signature_present: twilioSignaturePresent,
              },
            },
          ],
        }),
      });
    } catch (error) {
      console.error("[twilio_status] Failed GA4 post", error);
    }
  } else if (ga4Enabled) {
    console.warn("[twilio_status] TWILIO_GA4_ENABLED but GA4 env vars missing, skipping GA4 call event");
  }

  const sheetsWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  if (sheetsWebhook) {
    try {
      await fetch(sheetsWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_type: "call",
          callSid,
          status,
          from,
          to,
          duration,
          vertical: "groundworks",
          service,
          location,
          page,
          issue,
          intent_id: resolvedIntentId,
          twilio_signature_present: twilioSignaturePresent,
          request_host: requestHost,
          request_path: requestPath,
          request_user_agent: requestUserAgent,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error("[twilio_status] Failed Sheets webhook post", error);
    }
  } else {
    console.warn("[twilio_status] GOOGLE_SHEETS_WEBHOOK_URL missing, skipping call log webhook");
  }

  return new Response("OK");
}
