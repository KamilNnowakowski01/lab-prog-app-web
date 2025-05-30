// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

interface ProtectedRouteProps {
  page: React.ReactNode;
  roles?: Array<"admin" | "devops" | "developer">;
}

const ProtectedRoute = ({ page, roles }: ProtectedRouteProps) => {
  const { isLoggedIn, user } = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (roles && (!user || !roles.includes(user.role))) {
    return <Navigate to="/" />;
  }

  return page;
};

export default ProtectedRoute;
