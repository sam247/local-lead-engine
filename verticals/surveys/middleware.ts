import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { guidesPages } from "@/data/guides";

const CANONICAL_GUIDES_PREFIX = "/drainage-guides";
const COST_PREFIX = "/drain-costs";

const LEGACY_GUIDE_PREFIXES = [
  "/drain-problems",
  "/drain-collapse",
  "/drain-insurance",
  "/drain-inspection",
  "/drain-causes",
  "/commercial-drainage",
  "/emergency",
  "/drain-repair-methods",
  "/property-drainage",
  "/drain-survey",
  "/property-types",
  "/drain-responsibility",
  "/homebuyer-drainage",
] as const;

const GUIDE_SLUGS = new Set(guidesPages.map((page) => page.slug));

function permanentRedirect(req: NextRequest, pathname: string) {
  const url = req.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url, 301);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith(CANONICAL_GUIDES_PREFIX) || pathname.startsWith(COST_PREFIX)) {
    return NextResponse.next();
  }

  for (const prefix of LEGACY_GUIDE_PREFIXES) {
    if (pathname === prefix || pathname === `${prefix}/`) {
      return permanentRedirect(req, CANONICAL_GUIDES_PREFIX);
    }

    if (!pathname.startsWith(`${prefix}/`)) continue;

    const slug = pathname.slice(prefix.length + 1).replace(/\/$/, "");
    if (!slug || slug.includes("/")) continue;

    if (GUIDE_SLUGS.has(slug)) {
      return permanentRedirect(req, `${CANONICAL_GUIDES_PREFIX}/${slug}`);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/drain-problems/:path*",
    "/drain-collapse/:path*",
    "/drain-insurance/:path*",
    "/drain-inspection/:path*",
    "/drain-causes/:path*",
    "/commercial-drainage/:path*",
    "/emergency/:path*",
    "/drain-repair-methods/:path*",
    "/property-drainage/:path*",
    "/drain-survey/:path*",
    "/property-types/:path*",
    "/drain-responsibility/:path*",
    "/homebuyer-drainage/:path*",
  ],
};
