import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const token = searchParams.get("token");

    if (!userId || !token) {
      return NextResponse.json(
        { isSuccess: false, error: { message: "Missing userId or token" } },
        { status: 400 }
      );
    }

    const backendResponse = await fetch(
      `${process.env.API_BASE_URL}/api/Auth/verify?userId=${encodeURIComponent(userId)}&token=${encodeURIComponent(token)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const text = await backendResponse.text();
    const data = text ? JSON.parse(text) : {};

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("Verify proxy error:", error);
    return NextResponse.json(
      { isSuccess: false, error: { message: "Empty response from backend" } },
      { status: 500 }
    );
  }
}
