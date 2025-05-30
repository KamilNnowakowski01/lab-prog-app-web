import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/AuthService";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.logout();
    navigate("/login");
  }, [navigate]);

  return null;
}
