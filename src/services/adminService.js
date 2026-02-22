import api from './api'

export const getDashboardStats = async () => {
  const { data } = await api.get('/admin/dashboard')
  return data
}

// export const getReportes = async () => {
//   const { data } = await api.get('/admin/reportes')
//   return data
// }

/**
 * Obtener reportes / filtros generales (si lo usas en tablas)
 */

export const getReportes = async (filters = {}) => {
  const { data } = await api.get('/admin/reportes', { params: filters })
  return data
}

// export const actualizarEstado = async (id, estado) => {
//   const { data } = await api.put(`/admin/preinscripciones/${id}/estado`, {
//     estado
//   });
//   return data;
// };

/**
 * Actualizar el estado de una preinscripción
 * 🔹 Incluye motivo en caso de RECHAZADO
 */
export const actualizarEstado = async (id, estado, motivo = "") => {
  const payload = { estado };

  if (estado === "RECHAZADO") {
    payload.motivo = motivo; // obligatorio si rechazas
  }

  const { data } = await api.put(`/admin/preinscripciones/${id}/estado`, payload);
  return data;
};

/**
 * Obtener datos completos de una preinscripción (showAdmin)
 */
export const getPreinscripcionDetalle = async (id) => {
  const { data } = await api.get(`/admin/preinscripciones/${id}`);
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

// 🔹 Obtener logs con filtros y paginación
export const getLogs = async (params = {}) => {
  const { data } = await api.get("/admin/logs", {
    params,
  })
  return data
}

// 🔹 Limpiar logs antiguos
export const cleanLogs = async () => {
  const { data } = await api.delete("/admin/logs/clean")
  return data
}
