export type TrackCallClickContext = {
  page_path?: string;
  service_slug?: string | null;
  location_slug?: string | null;
  vertical?: string;
  source?: "cta" | "header" | "footer" | "inline";
};

export function digitsFromPhone(phone: string): string {
  return phone.replace(/\s/g, "");
}

/**
 * Progressive enhancement: keep `href="tel:…"` on the anchor.
 * With JS: prevent default, POST tracking (fire-and-forget), then navigate to tel:.
 */
export function handleCallClick(
  e: { preventDefault(): void },
  phoneDigits: string,
  context: TrackCallClickContext
): void {
  e.preventDefault();
  const telHref = `tel:${phoneDigits}`;
  const vertical = String(context.vertical ?? "").trim();
  const service_slug = String(context.service_slug ?? "").trim();
  const location_slug = String(context.location_slug ?? "").trim();
  const source = context.source ?? "inline";
  const page_path =
    typeof window !== "undefined"
      ? String(window.location?.pathname ?? "").trim()
      : String(context.page_path ?? "").trim();
  const utm_source =
    typeof window !== "undefined"
      ? String(new URLSearchParams(window.location?.search ?? "").get("utm_source") ?? "").trim()
      : "";

  // Fire GA4 event first (non-blocking, fail silently).
  try {
    if (typeof window !== "undefined" && typeof (window as { gtag?: unknown }).gtag === "function") {
      (window as { gtag: (...args: unknown[]) => void }).gtag("event", "call_click", {
        event_category: "engagement",
        event_label: `${vertical || "unknown"}:${service_slug || "unknown"}`,
        value: 1,
        vertical,
        service_slug,
        location_slug,
        page_path,
      });
    }
  } catch {
    // Do not block call behavior when GA4 is unavailable.
  }

  // Internal tracking is fire-and-forget and must not block dial action.
  void fetch("/api/track-call-click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      vertical,
      page_path,
      service_slug,
      location_slug,
      utm_source,
      source,
    }),
    keepalive: true,
  }).catch(() => {
    // Swallow tracking errors; dial should proceed regardless.
  });

  if (typeof window !== "undefined") {
    window.location.href = telHref;
  }
}
