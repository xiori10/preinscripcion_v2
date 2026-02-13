import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "@/admin/layouts/AdminLayout";
import AdminProtectedRoute from "@/shared/guards/AdminProtectedRoute";

import Dashboard from "@/admin/pages/Dashboard";
import Preinscripciones from "@/admin/pages/Preinscripciones";
import PreinscripcionView from "@/admin/pages/PreinscripcionView";
import LoginAdmin from "@/admin/auth/LoginAdmin";

const AdminRoutes = () => (
  <Routes>
    {/* login libre */}
    <Route path="login" element={<LoginAdmin />} />

    {/* 🔐 rutas protegidas */}
    <Route element={<AdminProtectedRoute />}>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="preinscripciones" element={<Preinscripciones />} />
        <Route path="preinscripciones/:id" element={<PreinscripcionView />} />
      </Route>
    </Route>

    {/* 404 admin */}
    <Route path="*" element={<Navigate to="/admin" replace />} />
  </Routes>
);

export default AdminRoutes;
