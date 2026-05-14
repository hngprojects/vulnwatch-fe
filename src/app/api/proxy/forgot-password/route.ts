import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.API_BASE_URL || "https://api.staging.vuln-watch.hng14.com/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const res = await fetch(`${BACKEND_URL}/Auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : { isSuccess: true, value: null };

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Forgot Password Proxy Error:", error);
    return NextResponse.json(
      { isSuccess: false, error: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}
