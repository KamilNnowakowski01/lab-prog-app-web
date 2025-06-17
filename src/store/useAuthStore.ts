import { create } from "zustand";
import { User } from "../models/User";
import { AuthSupabase } from "../services/AuthSupabase";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
  loadFromSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: true,

  login: async (email, password) => {
    const user = await AuthSupabase.login(email, password);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    set({ user, isLoggedIn: true, isLoading: false });
  },

  logout: async () => {
    await AuthSupabase.logout();
    localStorage.removeItem("loggedInUser");
    set({ user: null, isLoggedIn: false, isLoading: false });
  },

  setUser: (user) => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    set({ user, isLoggedIn: true, isLoading: false });
  },

  loadFromSession: async () => {
    set({ isLoading: true });

    const stored = localStorage.getItem("loggedInUser");
    if (stored) {
      const parsed = JSON.parse(stored);
      set({ user: parsed, isLoggedIn: true, isLoading: false });
      return;
    }

    try {
      const user = await AuthSupabase.getCurrentUser();
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      set({ user, isLoggedIn: true, isLoading: false });
    } catch {
      set({ user: null, isLoggedIn: false, isLoading: false });
    }
  },
}));
