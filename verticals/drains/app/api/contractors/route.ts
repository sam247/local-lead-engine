import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { leadEmailField, leadPhoneField } from "engine";

const VERTICAL_LABEL = "Mainline Drains";
const emailTo = "sampettiford@googlemail.com";
const emailFrom = "Mainline Drains <leads@mainlinedrains.co.uk>";

const ContractorInputSchema = z.object({
  company: z.string().trim().min(1, "Company name is required").max(200),
  contact: z.string().trim().min(1, "Contact name is required").max(100),
  email: leadEmailField,
  phone: leadPhoneField,
  areas: z.string().trim().max(2000).optional(),
});

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable: ${name}`);
  return v;
}

function escapeHtmlText(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildStaffBody(data: z.infer<typeof ContractorInputSchema>) {
  return [
    `New contractor application — ${VERTICAL_LABEL}`,
    "",
    `Company: ${data.company}`,
    `Contact: ${data.contact}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    data.areas ? `Areas / postcodes: ${data.areas}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = ContractorInputSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", issues: parsed.error.issues.map((i) => ({ path: i.path, message: i.message })) },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const resend = new Resend(requireEnv("RESEND_API_KEY"));
    const maxRetries = 3;
    let lastError: unknown = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const { error } = await resend.emails.send({
        to: emailTo,
        from: emailFrom,
        subject: `Contractor application — ${VERTICAL_LABEL} — ${data.company}`,
        text: buildStaffBody(data),
      });
      if (!error) {
        const ackTo = data.email.trim();
        if (ackTo.includes("@")) {
          try {
            const name = data.contact.trim() ? escapeHtmlText(data.contact.trim()) : "there";
            await resend.emails.send({
              from: emailFrom,
              to: ackTo,
              subject: "Thanks — we've received your application",
              html: `<p>Hi ${name},</p>
<p>Thanks for applying to work with us — we've received your contractor application and will review it shortly.</p>
<p>We'll be in touch if we'd like to move forward or need any further details.</p>
<p>Thanks,<br/>${escapeHtmlText(VERTICAL_LABEL)}</p>`,
            });
          } catch (autoErr) {
            console.error("[contractors] Auto-response failed:", autoErr);
          }
        }
        return NextResponse.json({ ok: true });
      }
      lastError = error;
      const statusCode = (error as { statusCode?: number })?.statusCode;
      const isRetryable = statusCode === 429 || (statusCode != null && statusCode >= 500);
      if (!isRetryable || attempt === maxRetries) break;
      await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
    }

    console.error("[contractors] Resend failed after retries:", lastError);
    return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: "Contractor submission failed", message }, { status: 500 });
  }
}
