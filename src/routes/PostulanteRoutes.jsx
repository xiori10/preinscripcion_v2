import { Routes, Route } from "react-router-dom";

import PublicLayout from "@/postulante/layouts/PublicLayout";

import Home from "@/postulante/pages/Home";
import Preinscripcion from "@/postulante/pages/Preinscripcion";
import ModificarPreinscripcion from "@/postulante/pages/ModificarPreinscripcion";
import NotFound from "@/shared/pages/NotFound";

const PostulanteRoutes = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route index element={<Home />} />
      <Route path="postulante/preinscripcion" element={<Preinscripcion />} />
      <Route path="postulante/modificar" element={<ModificarPreinscripcion />} />
    </Route>

    {/* 404 público */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default PostulanteRoutes;
