import { create } from "zustand";
import api from "@/lib/axios";
import { User } from "@/types";

interface LoginResponse {
  require_2fa?: boolean;
  access?: string;
  refresh?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (
    email: string,
    password: string,
    totp_code?: string
  ) => Promise<LoginResponse>;

  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
}


export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async (email, password, totp_code) => {
    const { data } = await api.post("/auth/login/", {
      email,
      password,
      ...(totp_code && { totp_code }),
    });
  
    if (!data.require_2fa) {
      await get().fetchUser();
    }
  
    return data;
  },
  logout: async () => {
    await api.post("/auth/logout/");
    set({ user: null, isAuthenticated: false });
  },
  fetchUser: async () => {
    try {
      const response = await api.get("/auth/profile/");
      set({ user: response.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
  setUser: (user) => set({ user, isAuthenticated: !!user }),
}));