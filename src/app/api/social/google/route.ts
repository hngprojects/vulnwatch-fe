import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id_token } = await req.json();

    const backendResponse = await fetch(
      `${process.env.API_BASE_URL}/api/auth/google`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: id_token }),
      }
    );

    const text = await backendResponse.text();
    const data = text ? JSON.parse(text) : {};

    if (!data.isSuccess) {
      return NextResponse.json(
        { success: false, message: data.error?.message || "Authentication failed" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      token: data.value?.string,
      email: data.value?.email,
    });
  } catch (error) {
    console.error("Google auth proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Empty response from backend" },
      { status: 500 }
    );
  }
}
