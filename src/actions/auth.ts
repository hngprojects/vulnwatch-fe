"use client";

type RegisterPayload = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

type RegisterResponse = {
  status: number;
  error?: string;
};

export async function registerUser(
  values: RegisterPayload,
): Promise<RegisterResponse> {
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "";
  const response = await fetch(`${apiBase}/api/Auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return response.json();
}
