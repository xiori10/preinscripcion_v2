// src/admin/auth/LoginAdmin.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import HeroSection from "./HeroSection";
import LoginForm from "./LoginForm";

export default function LoginAdmin() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="container-fluid p-0 overflow-hidden">
      <div className="row g-0 min-vh-100">
        {/* SECCIÓN IZQUIERDA: Hero (75%) */}
        <div className="d-none d-lg-flex col-lg-9 p-0">
          <HeroSection />
        </div>

        {/* SECCIÓN DERECHA: Formulario (25%) */}
        <div className="col-12 col-lg-3 d-flex p-0">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}