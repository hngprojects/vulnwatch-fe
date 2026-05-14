type AuthState = {
  token: string | null;
  email: string | null;
  login: (token: string, email: string) => void;
  logout: () => void;
};

const state: AuthState = {
  token: null,
  email: null,
  login: (token, email) => {
    state.token = token;
    state.email = email;
  },
  logout: () => {
    state.token = null;
    state.email = null;
  },
};

export const useAuthStore = {
  getState: () => state,
};
