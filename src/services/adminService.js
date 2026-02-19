import api from './api'

export const getDashboardStats = async () => {
  const { data } = await api.get('/admin/dashboard')
  return data
}

// export const getReportes = async () => {
//   const { data } = await api.get('/admin/reportes')
//   return data
// }

export const getReportes = async (filters = {}) => {
  const { data } = await api.get('/admin/reportes', { params: filters })
  return data
}

export const actualizarEstado = async (id, estado) => {
  const { data } = await api.put(`/admin/preinscripciones/${id}/estado`, {
    estado
  });
  return data;
};



export const getUsuarios = async () => {
  const { data } = await api.get('/admin/usuarios');
  return data;
};

export const createUsuario = async (payload) => {
  const { data } = await api.post('/admin/usuarios', payload);
  return data;
};

export const updateUsuario = async (id, payload) => {
  const { data } = await api.put(`/admin/usuarios/${id}`, payload);
  return data;
};

export const deleteUsuario = async (id) => {
  const { data } = await api.delete(`/admin/usuarios/${id}`);
  return data;
};


/**
 * 🔐 Obtener intentos de login (módulo Seguridad)
 */
export const getLoginAttempts = async (filters = {}) => {
  const { data } = await api.get('/admin/login-attempts', {
    params: filters
  });
  return data;
};

// Obtiene todas las sesiones activas
export const getSessions = async (filters = {}) => {
  const { data } = await api.get('/admin/sesiones', {
    params: filters, 
  });
  return data;
};

// configutación de seguridad
export const getConfiguracion = async () => {
  const { data } = await api.get("/admin/configuracion")
  return data
}

export const updateConfiguracion = async (payload) => {
  const { data } = await api.put("/admin/configuracion", payload)
  return data
}


