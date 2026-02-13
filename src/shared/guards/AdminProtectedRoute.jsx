import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const AdminProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // mientras verificamos sesión
  if (loading) {
    return <div className="p-6">Cargando...</div>;
  }

  // si NO está logueado → login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // si está logueado → deja pasar
  return <Outlet />;
};

export default AdminProtectedRoute;
