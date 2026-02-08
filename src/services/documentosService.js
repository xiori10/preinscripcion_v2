import apiClient from './api';

export const descargarDocumento = async (filename) => {
  return apiClient.get(`/documentos/${filename}`, {
    responseType: 'blob', // MUY IMPORTANTE
  });
};
