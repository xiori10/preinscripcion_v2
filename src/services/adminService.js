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