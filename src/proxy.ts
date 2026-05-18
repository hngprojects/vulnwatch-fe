import { NextResponse, type NextProxy } from "next/server";

const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

export const proxy: NextProxy = (request) => {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("auth_token")?.value;

  const authRoutes = new Set([
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/auth/verify",
  ]);

  const publicRoutes = new Set([
    "/",
    "/about-us",
    "/contact",
    "/faqs",
    "/how-it-works",
    "/legal-docs",
  ]);

  const dashboardPrefixes = [
    "/dashboard",
    "/domain",
    "/report",
    "/scan",
    "/settings",
  ];

  const isDashboardRoute = dashboardPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!authToken && isDashboardRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (authToken && (authRoutes.has(pathname) || publicRoutes.has(pathname))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const requestId =
    request.headers.get("x-request-id") ?? crypto.randomUUID();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-request-id", requestId);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  response.headers.set("x-request-id", requestId);

  return response;
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)$).*)",
  ],
};
