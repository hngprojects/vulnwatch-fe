type AuthState = {
  token: string | null;
  email: string | null;
  picture: string | null;
  login: (token: string, email: string, picture?: string) => void;
  logout: () => void;
};

const state: AuthState = {
  token: null,
  email: null,
  picture: null,
  login: (token, email, picture) => {
    state.token = token;
    state.email = email;
    state.picture = picture || null;
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", token);
      localStorage.setItem("user_email", email);
      if (picture) localStorage.setItem("user_picture", picture);
    }
  },
  logout: () => {
    state.token = null;
    state.email = null;
    state.picture = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_email");
      localStorage.removeItem("user_picture");
    }
  },
};

if (typeof window !== "undefined") {
  const storedToken = localStorage.getItem("access_token");
  const storedEmail = localStorage.getItem("user_email");
  const storedPicture = localStorage.getItem("user_picture");
  if (storedToken) state.token = storedToken;
  if (storedEmail) state.email = storedEmail;
  if (storedPicture) state.picture = storedPicture;
}

export const useAuthStore = {
  getState: () => state,
};

