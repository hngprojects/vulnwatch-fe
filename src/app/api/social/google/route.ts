import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id_token } = await req.json();

  if (!id_token) {
    return NextResponse.json(
      { success: false, message: "No id_token provided" },
      { status: 400 }
    );
  }

  const response = await fetch(`${process.env.API_BASE_URL}/api/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken: id_token }),
  });

  const data = await response.json();

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
}
