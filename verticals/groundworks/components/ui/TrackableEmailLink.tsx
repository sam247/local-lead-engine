"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";

type TrackableEmailLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href" | "onClick"> & {
  email: string;
  sourcePagePath?: string;
  sourceServiceSlug?: string;
  sourceLocationSlug?: string;
  sourceVertical?: string;
  sourceQueryTheme?: string;
};

export default function TrackableEmailLink({
  email,
  sourcePagePath = "",
  sourceServiceSlug = "",
  sourceLocationSlug = "",
  sourceVertical = "groundworks",
  sourceQueryTheme = "generic_informational",
  children,
  ...rest
}: TrackableEmailLinkProps) {
  const href = `mailto:${email}`;

  const onClick = (_e: MouseEvent<HTMLAnchorElement>) => {
    window.gtag?.("event", "email_click", {
      source_page_path: sourcePagePath || window.location.pathname,
      source_service_slug: sourceServiceSlug,
      source_location_slug: sourceLocationSlug,
      source_vertical: sourceVertical,
      source_query_theme: sourceQueryTheme,
    });
  };

  return (
    <a href={href} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
