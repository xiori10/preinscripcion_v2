import { Routes, Route, Navigate } from 'react-router-dom'

import AdminRoutes from './AdminRoutes'
import PostulanteRoutes from './PostulanteRoutes'

const AppRouter = () => (
  <Routes>

    {/* 🔐 ADMIN */}
    <Route path="/admin/*" element={<AdminRoutes />} />

    {/* 🌐 PÚBLICO */}
    <Route path="/*" element={<PostulanteRoutes />} />

    {/* 404 */}
    <Route path="*" element={<Navigate to="/" replace />} />

  </Routes>
)

export default AppRouter
