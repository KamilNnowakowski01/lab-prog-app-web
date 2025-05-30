// store/useAuthStore.ts
import { create } from "zustand";
import { User } from "../models/User";
import { AuthService } from "../services/AuthService";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  loadFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,

  login: (user) => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    set({ user, isLoggedIn: true });
  },

  logout: () => {
    AuthService.logout();
    localStorage.removeItem("loggedInUser");
    set({ user: null, isLoggedIn: false });
  },

  loadFromStorage: () => {
    const stored = localStorage.getItem("loggedInUser");
    if (stored) {
      const user = JSON.parse(stored);
      set({ user, isLoggedIn: true });
    }
  },
}));
