import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, locales } from "@/i18n/locales";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segment = pathname.split("/")[1];
  if (isLocale(segment)) {
    return NextResponse.next();
  }

  // Preserve old links like /track/TOKEN or /confirm/TOKEN
  const url = request.nextUrl.clone();
  const accept = request.headers.get("accept-language") || "";
  const preferred =
    locales.find((l) => accept.toLowerCase().includes(l)) || defaultLocale;
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
