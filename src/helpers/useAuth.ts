// helpers/useAuth.ts
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

export const useAuth = () => {
  const auth = useAuthStore();

  useEffect(() => {
    auth.loadFromStorage();
  }, []);

  return auth;
};
