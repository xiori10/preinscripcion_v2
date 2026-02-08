import { Routes, Route } from 'react-router-dom'

import AdminLayout from '@/admin/layouts/AdminLayout'

import Dashboard from '@/admin/pages/Dashboard'
import Preinscripciones from '@/admin/pages/Preinscripciones'
import PreinscripcionView from '@/admin/pages/PreinscripcionView'
import LoginAdmin from '@/admin/auth/LoginAdmin'

const AdminRoutes = () => (
  <Routes>
  {/* login fuera del layout */}
    <Route path="login" element={<LoginAdmin />} />

    {/* resto del admin con layout */}
    <Route path="" element={<AdminLayout />}>
      {/* Dashboard como página por defecto */}
      <Route index element={<Dashboard />} />

      <Route path="preinscripciones" element={<Preinscripciones />} />
      <Route path="preinscripciones/:id" element={<PreinscripcionView />} />
    </Route>
  </Routes>
)

export default AdminRoutes
