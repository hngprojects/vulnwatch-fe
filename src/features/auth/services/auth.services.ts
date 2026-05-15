import type {
  LoginFormData,
  SignUpFormData,
  ForgotPasswordFormData,
} from "@/types/auth.types";

// NOTE: Using local proxy routes to bypass CORS during development.
// Revert to NEXT_PUBLIC_API_URL once the backend team enables CORS.
const PROXY_BASE = "/api/proxy";

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
    const res = await fetch(`${PROXY_BASE}/login`, {
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
    const res = await fetch(`${PROXY_BASE}/register`, {
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
    const res = await fetch(`${PROXY_BASE}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
