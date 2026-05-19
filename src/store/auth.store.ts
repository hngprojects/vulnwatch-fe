type AuthState = {
  token: string | null;
  email: string | null;
  picture: string | null;
  login: (token: string, email?: string | null, picture?: string | null) => void;
  logout: () => void;
};

declare global {
  interface Window {
    __AUTH_STATE?: AuthState;
  }
}

const isBrowser = typeof window !== "undefined";
const COOKIE_NAME = "auth_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

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
      login: () => {},
      logout: () => {},
    };
  }

  return {
    token: localStorage.getItem("auth_token"),
    email: localStorage.getItem("auth_email"),
    picture: localStorage.getItem("auth_picture"),
    login: (token, email, picture) => {
      const safeToken = token || "dummy_token_if_cookie_based";
      const safeEmail = email ?? null;
      const safePicture = picture ?? null;

      localStorage.setItem("auth_token", safeToken);
      if (safeEmail) {
        localStorage.setItem("auth_email", safeEmail);
      } else {
        localStorage.removeItem("auth_email");
      }
      setAuthCookie(safeToken);
      if (safePicture) {
        localStorage.setItem("auth_picture", safePicture);
      } else {
        localStorage.removeItem("auth_picture");
      }

      if (isBrowser && window.__AUTH_STATE) {
        window.__AUTH_STATE.token = safeToken;
        window.__AUTH_STATE.email = safeEmail;
        window.__AUTH_STATE.picture = safePicture;
      }
    },
    logout: () => {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_email");
      localStorage.removeItem("auth_picture");
      clearAuthCookie();
      if (isBrowser && window.__AUTH_STATE) {
        window.__AUTH_STATE.token = null;
        window.__AUTH_STATE.email = null;
        window.__AUTH_STATE.picture = null;
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
