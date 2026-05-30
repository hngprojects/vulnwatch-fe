import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    const returnUrl = request.nextUrl.pathname + request.nextUrl.search;
    loginUrl.searchParams.set("returnUrl", returnUrl);
    
    // Use 307 Temporary Redirect to ensure method and body are preserved if ever relevant
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/domain/:path*",
    "/scan/:path*",
    "/report/:path*",
    "/settings/:path*"
  ],
};
