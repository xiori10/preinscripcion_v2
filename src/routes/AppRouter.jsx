import { Routes, Route, Navigate } from 'react-router-dom'

import AdminRoutes from './AdminRoutes'
import PostulanteRoutes from './PostulanteRoutes'

const AppRouter = () => (
  <Routes>

    {/* 🔐 ADMIN */}
    <Route path="/admin/*" element={<AdminRoutes />} />

    {/* 🌐 PÚBLICO */}
    <Route path="/*" element={<PostulanteRoutes />} />

   

  </Routes>
)

export default AppRouter
