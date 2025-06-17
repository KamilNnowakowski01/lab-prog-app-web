import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

interface ProtectedRouteProps {
  page: React.ReactNode;
  roles?: Array<"admin" | "devops" | "developer">;
}

const ProtectedRoute = ({ page, roles }: ProtectedRouteProps) => {
  const { isLoggedIn, isLoading, user } = useAuthStore();

  // ⏳ Czekaj aż stan użytkownika się załaduje
  if (isLoading) {
    return <p>Loading...</p>; // lub spinner
  }

  // 🔐 Brak sesji – przekieruj do logowania
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // ⛔ Brak odpowiednich uprawnień
  if (roles && (!user || !roles.includes(user.role))) {
    return <Navigate to="/" replace />;
  }

  // ✅ Użytkownik ma dostęp
  return page;
};

export default ProtectedRoute;
