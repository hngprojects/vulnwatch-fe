import type {
  LoginFormData,
  SignUpFormData,
  ForgotPasswordFormData,
} from "@/types/auth.types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export interface ApiResponse<T> {
  isSuccess: boolean;
  value: T | null;
  error: {
    code: string;
    message: string;
  } | null;
}

export const authService = {
  async login(
    data: LoginFormData,
  ): Promise<ApiResponse<{ token: string; email: string }>> {
    const res = await fetch(`${API_BASE}/api/Auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async register(
    data: SignUpFormData,
  ): Promise<ApiResponse<{ token: string; email: string }>> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registerData } = data;
    const res = await fetch(`${API_BASE}/api/Auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });
    return res.json();
  },

  async forgotPassword(
    data: ForgotPasswordFormData,
  ): Promise<ApiResponse<{ message: string }>> {
    const res = await fetch(`${API_BASE}/api/Auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async verify(
    userId: string,
    token: string,
  ): Promise<ApiResponse<{ message: string }>> {
    // Backend double-decodes the token, so we encode twice to preserve '+'.
    const doubleEncodedToken = encodeURIComponent(encodeURIComponent(token));

    const res = await fetch(
      `${API_BASE}/api/Auth/verify?userId=${encodeURIComponent(userId)}&token=${doubleEncodedToken}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  },
};
