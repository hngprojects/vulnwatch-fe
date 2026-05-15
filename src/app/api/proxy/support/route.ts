export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BASE_URL || "https://api.staging.vuln-watch.hng14.com/api";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const res = await fetch(`${BACKEND_URL}/Support`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Version": "1",
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : { isSuccess: true, value: null };

  return NextResponse.json(data, { status: res.status });
}
