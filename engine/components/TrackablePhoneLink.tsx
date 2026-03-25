"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { digitsFromPhone, handleCallClick, type TrackCallClickContext } from "../lib/phone/handleCallClick";

export type TrackablePhoneLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href" | "onClick"> & {
  phone: string;
  vertical: string;
  serviceSlug?: string | null;
  locationSlug?: string | null;
  /** When set (e.g. static near-me path), used instead of `usePathname()` */
  pagePath?: string;
  source?: "cta" | "header" | "footer" | "inline";
};

export function TrackablePhoneLink({
  phone,
  vertical,
  serviceSlug = null,
  locationSlug = null,
  pagePath: pagePathProp,
  source = "inline",
  children,
  ...rest
}: TrackablePhoneLinkProps) {
  const pathname = usePathname();
  const digits = digitsFromPhone(phone);
  const href = `tel:${digits}`;
  const page_path = pagePathProp ?? pathname ?? "";

  const context: TrackCallClickContext = {
    page_path,
    service_slug: serviceSlug,
    location_slug: locationSlug,
    vertical: vertical ?? "",
    source,
  };

  return (
    <a
      href={href}
      {...rest}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => handleCallClick(e, digits, context)}
    >
      {children}
    </a>
  );
}
