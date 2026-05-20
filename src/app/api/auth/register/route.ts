import { NextRequest, NextResponse } from "next/server";

const resolveBackendUrl = (baseUrl: string, path: string) => {
  if (!baseUrl) return path;
  const trimmedBase = baseUrl.replace(/\/+$/, "");
  if (trimmedBase.endsWith("/api")) {
    return `${trimmedBase}${path.startsWith("/") ? "" : "/"}${path}`;
  }
  return `${trimmedBase}/api${path.startsWith("/") ? "" : "/"}${path}`;
};

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const backendUrl = resolveBackendUrl(
      process.env.API_BASE_URL ?? "",
      "/Auth/register"
    );

    const backendResponse = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await backendResponse.text();
    const data = text ? JSON.parse(text) : {};

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("Register proxy error:", error);
    return NextResponse.json(
      { isSuccess: false, value: null, error: { code: "proxy_error", message: "Register proxy failed" } },
      { status: 500 }
    );
  }
}
