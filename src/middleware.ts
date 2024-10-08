import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

// this can be a list of subdomains you want from the api
const SUBDOMAINS = ["admin", "app", "api"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes("_next")) return;

  const host = request.headers.get("host");
  const subdomain = getValidSubdomain(host);
  const searchParams = url.searchParams.toString();

  const pathWithSearchParams = `${url.pathname}${
    searchParams ? `?${searchParams}` : ""
  }`;

  if (subdomain && SUBDOMAINS.includes(subdomain)) {
    return NextResponse.rewrite(
      new URL(`/${subdomain}${pathWithSearchParams}`, request.url)
    );
  }

  if (url.pathname === "/" || url.pathname === "/site") {
    return NextResponse.rewrite(new URL("/site", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/:path*",
};

const getValidSubdomain = (host?: string | null) => {
  let subdomain: string | null = null;
  if (!host && typeof window !== "undefined") {
    // On client side, get the host from window
    host = window.location.host;
  }
  if (host && host.includes(".")) {
    const candidate = host.split(".")[0];
    if (candidate && !candidate.includes("localhost")) {
      // Valid candidate
      subdomain = candidate;
    }
  }
  return subdomain;
};
