export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id_token } = await req.json();

    if (!id_token) {
      return NextResponse.json(
        { success: false, message: "No id_token provided" },
        { status: 400 }
      );
    }

    const backendUrl =
      process.env.API_BASE_URL || "https://api.staging.vuln-watch.hng14.com/api";
    
    console.log(`Proxying Google Auth to: ${backendUrl}/Auth/google`);

    const response = await fetch(`${backendUrl}/Auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: id_token }),
    });

    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      console.error("Backend returned non-JSON response:", text);
      return NextResponse.json(
        { success: false, message: "Backend communication error" },
        { status: 502 }
      );
    }

    if (data?.isSuccess && data?.value) {
      return NextResponse.json(
        {
          success: true,
          token: data.value.string,
          email: data.value.email,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: data?.error?.message ?? "Authentication failed",
      },
      { status: response.status }
    );
  } catch (error) {
    console.error("Google Social Auth Proxy Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
