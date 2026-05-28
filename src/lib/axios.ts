import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request interceptor: attach the access token ───────────────────────────
privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ─── Response interceptor: silent token refresh on 401 ──────────────────────

// Tracks whether a refresh is already in-flight so concurrent 401s
// don't each fire their own refresh request.
let isRefreshing = false;

// Queued requests that arrived while the refresh was in progress.
// Each entry is a pair of resolve/reject callbacks that will be
// settled once the refresh completes (or fails).
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

/**
 * Drains the queue — either retrying every queued request with the
 * fresh token or rejecting them all if the refresh failed.
 */
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * Performs a full logout: clears stored tokens and redirects to login.
 * Imported lazily to avoid circular-dependency issues with the auth store.
 */
const performLogout = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_refresh_token");
  localStorage.removeItem("auth_email");
  localStorage.removeItem("auth_picture");

  // Clear the auth cookie
  document.cookie = "auth_token=; path=/; max-age=0; SameSite=Lax";

  window.location.href = "/login";
};

privateApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    // Only attempt a refresh for 401 responses that haven't already been retried
    if (error.response?.status !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    // If a refresh is already in progress, queue this request and wait
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((newToken) => {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        originalRequest._retry = true;
        return privateApi(originalRequest);
      });
    }

    // Mark this request so we don't retry it infinitely
    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = localStorage.getItem("auth_refresh_token");

    // No refresh token stored — nothing we can do, log out
    if (!refreshToken) {
      isRefreshing = false;
      processQueue(error, null);
      performLogout();
      return Promise.reject(error);
    }

    try {
      // Call the refresh endpoint using publicApi (no auth header needed)
      const { data } = await publicApi.post<{
        isSuccess: boolean;
        value: { accessToken: string; refreshToken: string } | null;
        error: { code: string; message: string } | null;
      }>("/api/auth/refresh-token", { refreshToken });

      if (!data.isSuccess || !data.value) {
        throw new Error(data.error?.message ?? "Token refresh failed");
      }

      const newAccessToken = data.value.accessToken;
      const newRefreshToken = data.value.refreshToken;

      // Persist the new tokens
      localStorage.setItem("auth_token", newAccessToken);
      localStorage.setItem("auth_refresh_token", newRefreshToken);

      // Update the auth cookie
      const encoded = encodeURIComponent(newAccessToken);
      document.cookie = `auth_token=${encoded}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;

      // Also update the in-memory auth state if it exists
      if (typeof window !== "undefined" && window.__AUTH_STATE) {
        window.__AUTH_STATE.token = newAccessToken;
      }

      isRefreshing = false;

      // Resolve all queued requests with the fresh token
      processQueue(null, newAccessToken);

      // Retry the original request with the new token
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return privateApi(originalRequest);
    } catch (refreshError) {
      isRefreshing = false;
      processQueue(refreshError, null);
      performLogout();
      return Promise.reject(refreshError);
    }
  },
);
