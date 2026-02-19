import { useEffect, useState } from "react";
import {
  getUsuarios,
  createUsuario,
  deleteUsuario,
} from "@/services/adminService";

import UsuariosForm from "@/admin/features/usuarios/UsuariosForm";
import UsuariosTable from "@/admin/features/usuarios/UsuariosTable";

const UsuarioPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsuarios();
  }, []);

  const handleCreate = async (form) => {
    await createUsuario(form);
    loadUsuarios();
  };

  const handleDelete = async (id) => {
    await deleteUsuario(id);
    loadUsuarios();
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="container mt-4">
      <h3>Usuarios y Roles</h3>

      <UsuariosForm onSubmit={handleCreate} />

      <UsuariosTable
        usuarios={usuarios}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UsuarioPage;