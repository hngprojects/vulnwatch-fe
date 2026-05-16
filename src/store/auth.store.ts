type AuthState = {
  token: string | null;
  email: string | null;
  login: (token: string, email: string) => void;
  logout: () => void;
};

declare global {
  interface Window {
    __AUTH_STATE?: AuthState;
  }
}

const isBrowser = typeof window !== "undefined";

const getInitialState = (): AuthState => {
  if (!isBrowser) return { token: null, email: null, login: () => {}, logout: () => {} };
  
  return {
    token: localStorage.getItem("auth_token"),
    email: localStorage.getItem("auth_email"),
    login: (token, email) => {
      // In case the backend returns accessToken instead of token, or just rely on what is passed
      const safeToken = token || "dummy_token_if_cookie_based";
      const safeEmail = email || "user@email.com";
      
      localStorage.setItem("auth_token", safeToken);
      localStorage.setItem("auth_email", safeEmail);
      
      // Also update the in-memory state for instant updates
      if (typeof window !== "undefined" && window.__AUTH_STATE) {
        window.__AUTH_STATE.token = safeToken;
        window.__AUTH_STATE.email = safeEmail;
      }
    },
    logout: () => {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_email");
      if (typeof window !== "undefined" && window.__AUTH_STATE) {
        window.__AUTH_STATE.token = null;
        window.__AUTH_STATE.email = null;
      }
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
};
