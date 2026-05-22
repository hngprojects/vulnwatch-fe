import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload {
  sub?: string;
  nameid?: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string;
}

/**
 * Safely parses the authenticated user ID from the active JWT token.
 * Checks common standard claims such as `sub`, `nameid`, and full URI nameidentifier.
 */
export function getUserIdFromToken(): string | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("auth_token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    const userId =
      decoded.sub ??
      decoded.nameid ??
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ??
      null;
    return userId;
  } catch (err) {
    console.error("Error decoding auth_token:", err);
    return null;
  }
}
