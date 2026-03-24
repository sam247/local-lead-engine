export type TrackCallClickContext = {
  page_path: string;
  service_slug: string | null;
  location_slug: string | null;
  vertical: string;
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
  const body = JSON.stringify({
    page_path: context.page_path,
    service_slug: context.service_slug,
    location_slug: context.location_slug,
    vertical: context.vertical,
  });
  void fetch("/api/track-call-click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).finally(() => {
    if (typeof window !== "undefined") {
      window.location.href = telHref;
    }
  });
}
