export const QUOTE_FORM_ELEMENT_ID = "quote-form";

/** sessionStorage keys — shared with call tracking and lead forms. */
export const LAST_CTA_TEXT_KEY = "last_cta_text";
export const LAST_CTA_SEED_KEY = "last_cta_seed";

export function getLastCtaFromSession(): { cta_text: string; cta_seed: string } {
  if (typeof window === "undefined") return { cta_text: "", cta_seed: "" };
  try {
    return {
      cta_text: String(window.sessionStorage.getItem(LAST_CTA_TEXT_KEY) ?? "").trim(),
      cta_seed: String(window.sessionStorage.getItem(LAST_CTA_SEED_KEY) ?? "").trim(),
    };
  } catch {
    return { cta_text: "", cta_seed: "" };
  }
}

const MOBILE_BREAKPOINT = 768;
const SCROLL_TOP_OFFSET = 80;
const DESKTOP_FOCUS_DELAY_MS = 350;

/**
 * Scroll to #quote-form on mobile (no focus); on desktop optionally scroll then focus first field.
 * @returns true if the form element exists and behaviour ran; false if SSR or missing element.
 */
export function handlePrimaryCtaClick(): boolean {
  if (typeof document === "undefined") return false;
  const form = document.getElementById(QUOTE_FORM_ELEMENT_ID);
  if (!form) return false;

  const isMobile = window.innerWidth < MOBILE_BREAKPOINT;

  if (isMobile) {
    const y = Math.max(form.getBoundingClientRect().top + window.scrollY - SCROLL_TOP_OFFSET, 0);
    window.scrollTo({ top: y, behavior: "smooth" });
    return true;
  }

  const rect = form.getBoundingClientRect();
  const isVisible = rect.top >= SCROLL_TOP_OFFSET && rect.bottom <= window.innerHeight;
  if (!isVisible) {
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const input = form.querySelector<HTMLElement>(
    'input:not([type="hidden"]):not([disabled]), textarea:not([disabled])'
  );
  if (input) {
    window.setTimeout(() => {
      input.focus();
    }, DESKTOP_FOCUS_DELAY_MS);
  }

  return true;
}
