import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.API_BASE_URL || "https://api.staging.vuln-watch.hng14.com/api";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const token = searchParams.get("token");

    if (!userId || !token) {
      return NextResponse.json(
        { isSuccess: false, error: { message: "Missing userId or token" } },
        { status: 400 }
      );
    }

    // The backend seems to manually URL-decode the token in the controller,
    // which means it gets double-decoded (once by the framework, once by their code).
    // To prevent the '+' signs from becoming spaces, we MUST double-encode the token here.
    const doubleEncodedToken = encodeURIComponent(encodeURIComponent(token));

    // Pass the query parameters to the backend
    const res = await fetch(
      `${BACKEND_URL}/Auth/verify?userId=${encodeURIComponent(userId)}&token=${doubleEncodedToken}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const text = await res.text();
    const data = text ? JSON.parse(text) : { isSuccess: true, value: null };

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Verify Proxy Error:", error);
    return NextResponse.json(
      { isSuccess: false, error: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}
