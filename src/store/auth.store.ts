import { clearScanReportCache } from "@/features/scans/services/scan.service";
import { jwtDecode } from "jwt-decode";

interface AccessTokenPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"?: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
}

type AuthState = {
  token: string | null;
  email: string | null;
  picture: string | null;
  firstName: string | null;
  lastName: string | null;
  login: (token: string, email?: string | null, picture?: string | null) => void;
  logout: () => void;
  updateProfile: (firstName: string | null, lastName: string | null, picture: string | null) => void;
};

type AuthListener = () => void;

declare global {
  interface Window {
    __AUTH_STATE?: AuthState;
  }
}

const isBrowser = typeof window !== "undefined";
const COOKIE_NAME = "auth_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const authListeners = new Set<AuthListener>();

const notifyAuthListeners = () => {
  authListeners.forEach((listener) => listener());
};

const setAuthCookie = (token: string) => {
  if (!isBrowser) return;
  const encoded = encodeURIComponent(token);
  document.cookie = `${COOKIE_NAME}=${encoded}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
};

const clearAuthCookie = () => {
  if (!isBrowser) return;
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
};

const getInitialState = (): AuthState => {
  if (!isBrowser) {
    return {
      token: null,
      email: null,
      picture: null,
      firstName: null,
      lastName: null,
      login: () => {},
      logout: () => {},
      updateProfile: () => {},
    };
  }

  return {
    token: localStorage.getItem("auth_token"),
    email: localStorage.getItem("auth_email"),
    picture: localStorage.getItem("auth_picture"),
    firstName: localStorage.getItem("auth_firstName"),
    lastName: localStorage.getItem("auth_lastName"),
    login: (token, fallbackEmail, fallbackPicture) => {
      const safeToken = token || "dummy_token_if_cookie_based";
      let finalEmail = fallbackEmail ?? null;
      let finalPicture = fallbackPicture ?? null;
      let finalFirstName: string | null = null;
      let finalLastName: string | null = null;

      try {
        const payload = jwtDecode<AccessTokenPayload>(safeToken);
        if (payload.firstName) finalFirstName = payload.firstName;
        if (payload.lastName) finalLastName = payload.lastName;
        
        const tokenEmail = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
        if (tokenEmail) finalEmail = tokenEmail;

        if (payload.picture && payload.picture.trim() !== "") {
          finalPicture = payload.picture;
        }
      } catch (e) {
        console.error("Failed to decode token in auth store", e);
      }

      localStorage.setItem("auth_token", safeToken);
      if (finalEmail) localStorage.setItem("auth_email", finalEmail);
      else localStorage.removeItem("auth_email");
      
      setAuthCookie(safeToken);
      
      if (finalPicture) localStorage.setItem("auth_picture", finalPicture);
      else localStorage.removeItem("auth_picture");

      if (finalFirstName) localStorage.setItem("auth_firstName", finalFirstName);
      else localStorage.removeItem("auth_firstName");

      if (finalLastName) localStorage.setItem("auth_lastName", finalLastName);
      else localStorage.removeItem("auth_lastName");

      if (isBrowser && window.__AUTH_STATE) {
        window.__AUTH_STATE = {
          ...window.__AUTH_STATE,
          token: safeToken,
          email: finalEmail,
          picture: finalPicture,
          firstName: finalFirstName,
          lastName: finalLastName,
        };
      }
      notifyAuthListeners();
    },
    logout: () => {
      clearScanReportCache();
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_email");
      localStorage.removeItem("auth_picture");
      localStorage.removeItem("auth_firstName");
      localStorage.removeItem("auth_lastName");
      clearAuthCookie();
      if (isBrowser && window.__AUTH_STATE) {
        window.__AUTH_STATE = {
          ...window.__AUTH_STATE,
          token: null,
          email: null,
          picture: null,
          firstName: null,
          lastName: null,
        };
      }
      notifyAuthListeners();
    },
    updateProfile: (firstName, lastName, picture) => {
      if (firstName) localStorage.setItem("auth_firstName", firstName);
      else localStorage.removeItem("auth_firstName");

      if (lastName) localStorage.setItem("auth_lastName", lastName);
      else localStorage.removeItem("auth_lastName");

      if (picture) localStorage.setItem("auth_picture", picture);
      else localStorage.removeItem("auth_picture");

      if (isBrowser && window.__AUTH_STATE) {
        window.__AUTH_STATE = {
          ...window.__AUTH_STATE,
          firstName: firstName,
          lastName: lastName,
          picture: picture,
        };
      }
      notifyAuthListeners();
    },
  };
};

// Use window to hold the state to prevent Next.js module scoping issues during fast refresh or chunk splitting
if (isBrowser && !window.__AUTH_STATE) {
  window.__AUTH_STATE = getInitialState();
}

export const useAuthStore = {
  getState: (): AuthState => {
    if (!isBrowser) return getInitialState();
    return window.__AUTH_STATE || getInitialState();
  },
  subscribe: (listener: AuthListener) => {
    authListeners.add(listener);
    return () => {
      authListeners.delete(listener);
    };
  },
};
