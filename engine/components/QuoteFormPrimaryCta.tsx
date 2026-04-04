"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "../utils/cn";
import {
  handlePrimaryCtaClick,
  LAST_CTA_SEED_KEY,
  LAST_CTA_TEXT_KEY,
  QUOTE_FORM_ELEMENT_ID,
} from "../utils/quoteFormCta";
import type { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "./ui/button";

export { LAST_CTA_TEXT_KEY, LAST_CTA_SEED_KEY } from "../utils/quoteFormCta";

export interface QuoteFormPrimaryCtaProps {
  contactPath?: string;
  children: ReactNode;
  /** Visible CTA copy for attribution (sessionStorage + call tracking). */
  ctaText?: string;
  /** Seed used with getCtaVariant for this surface. */
  ctaSeed?: string;
  /** Runs first on click (e.g. analytics) before scroll or navigation. */
  onBeforeNavigate?: () => void;
  onAfterNavigate?: () => void;
  /** Plain text-style link (no Button wrapper). */
  linkClassName?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  className?: string;
}

function ctaTextFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  return "";
}

export function QuoteFormPrimaryCta({
  contactPath = "/contact",
  children,
  ctaText: ctaTextProp,
  ctaSeed,
  onBeforeNavigate,
  onAfterNavigate,
  linkClassName,
  variant = "highlight",
  size = "lg",
  className,
}: QuoteFormPrimaryCtaProps) {
  const router = useRouter();
  const href = `${contactPath}#${QUOTE_FORM_ELEMENT_ID}`;

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const text = String(ctaTextProp ?? "").trim() || ctaTextFromChildren(children).trim();
    const seed = String(ctaSeed ?? "").trim();
    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(LAST_CTA_TEXT_KEY, text);
        window.sessionStorage.setItem(LAST_CTA_SEED_KEY, seed);
      }
    } catch {
      // non-blocking
    }
    onBeforeNavigate?.();
    if (handlePrimaryCtaClick()) {
      onAfterNavigate?.();
      return;
    }
    void router.push(href);
    onAfterNavigate?.();
  };

  if (linkClassName) {
    return (
      <Link href={href} onClick={onClick} className={linkClassName}>
        {children}
      </Link>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      asChild
      className={cn("md:py-2.5 md:pl-5 md:pr-5 md:text-[0.9375rem]", className)}
    >
      <Link href={href} onClick={onClick} className="inline-flex items-center justify-center gap-2">
        {children}
      </Link>
    </Button>
  );
}
