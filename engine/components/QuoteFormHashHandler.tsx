"use client";

import { useEffect } from "react";
import { handlePrimaryCtaClick } from "../utils/quoteFormCta";

const HASH = "#quote-form";

export function QuoteFormHashHandler() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== HASH) return;
    const t = window.setTimeout(() => {
      handlePrimaryCtaClick();
    }, 100);
    return () => window.clearTimeout(t);
  }, []);

  return null;
}
