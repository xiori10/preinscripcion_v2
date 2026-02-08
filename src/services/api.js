import axios from 'axios';


// Configurar la URL base de la API
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

// Crear instancia de axios con configuración por defecto
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para manejar errores globalmente
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 422) {
//       console.error('Errores de validación:', error.response.data.errors);
//     }
//     return Promise.reject(error);
//   }
// );

    apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
      
        return Promise.reject(error);
      }
    );

/**
 * Verificar si un DNI ya está registrado
 */
export const verificarDNI = (tipoDocumento, numeroDocumento) => {
  return apiClient.post('/preinscripciones/verificar-dni', {
    tipo_documento: tipoDocumento,
    numero_documento: numeroDocumento,
  });
};

/**
 * Obtener un nuevo CAPTCHA
 */
export const obtenerCaptcha = () => {
  return apiClient.get('/captcha'); // GET http://127.0.0.1:8000/api/captcha
};

/**
 * Validar un CAPTCHA
 */
export const validarCaptcha = (token, captcha) => {
  return apiClient.post('/captcha/validate', {
    token,
    captcha,
  });
};





/**
 * Guardar una nueva pre-inscripción
 */
export const guardarPreinscripcion = (formData) => {






  const payload = {
    // Paso 1: Declaraciones juradas
    tiene_dni: formData.tieneDNI,
    tiene_certificado_estudios: formData.tieneCertificadoEstudios,
    cursara_5to_anio: formData.cursara5toAnio,

    // Paso 2: Datos generales
    tipo_documento: formData.tipoDocumento,
    numero_documento: String(formData.dni),
    apellido_paterno: formData.apellidoPaterno,
    apellido_materno: formData.apellidoMaterno,
    nombres: formData.nombres,
    celular_personal: formData.celularPersonal,
    celular_apoderado: formData.celularApoderado,
    correo_electronico: formData.correoElectronico,
    genero: formData.genero,
    estado_civil: formData.estadoCivil,

    // Paso 3: Nacimiento y residencia
    fecha_nacimiento: formData.fechaNacimiento,
    pais_nacimiento: formData.paisNacimiento || 'PERÚ',

    departamento_nacimiento: formData.codigoDepartamentoNacimiento, 
    provincia_nacimiento: formData.codigoProvinciaNacimiento,  
    distrito_nacimiento: formData.codigoDistritoNacimiento,
    ubigeo_nacimiento: formData.ubigeoNacimiento,


    pais_residencia: formData.paisResidencia || 'PERÚ',
    departamento_residencia: formData.codigoDepartamentoResidencia,
    provincia_residencia: formData.codigoProvinciaResidencia,
    distrito_residencia: formData.codigoDistritoResidencia,
    ubigeo_residencia: formData.ubigeoResidencia,
    direccion_completa: formData.direccionCompleta,

    // Paso 4: Datos del colegio
    anio_termino_secundaria: formData.anioTerminoSecundaria,
    pais_colegio: formData.paisColegio || 'PERÚ',
    departamento_colegio: formData.codigoDepartamentoColegio,
    provincia_colegio: formData.codigoProvinciaColegio,
    distrito_colegio: formData.codigoDistritoColegio,
    // nombre_colegio: formData.nombreColegio,

    nombre_colegio: formData.nombreColegio === 'OTRO'
    ? formData.nombreColegioManual
    : formData.nombreColegio,
 




    // Paso 4: Datos del colegio
    // anio_termino_secundaria: formData.anioTerminoSecundaria,
    // pais_colegio: formData.paisColegio || 'PERÚ',

   
    // departamento_colegio: formData.codigoDepartamentoColegio,
    // provincia_colegio: formData.codigoProvinciaColegio,
    // distrito_colegio: formData.codigoDistritoColegio,

    
    // departamento_colegio_nombre: formData.departamentoColegioNombre,
    // provincia_colegio_nombre: formData.provinciaColegioNombre,
    // distrito_colegio_nombre: formData.distritoColegioNombre,

    // nombre_colegio: formData.nombreColegio,



    // Paso 5: Información adicional
    escuela_profesional: formData.escuelaProfesional,
    esta_en_otra_universidad: formData.estaEnOtraUniversidad,
    identidad_etnica: formData.identidadEtnica,
    tiene_conadis: formData.tieneCONADIS,
    lengua_materna: formData.lenguaMaterna,
  };


  return apiClient.post('/preinscripciones', payload);
};

/**
 * Consultar datos para modificar una pre-inscripción
 */
export const consultarParaModificar = (dni, codigoSeguridad) => {
  return apiClient.post('/preinscripciones/consultar', {
    numero_documento: dni,
    codigo_seguridad: codigoSeguridad,
  });
};

/**
 * Modificar una pre-inscripción existente
 */
// export const modificarPreinscripcion = (dni, codigoSeguridad, formData) => {
//   const payload = {
//     codigo_seguridad: codigoSeguridad,
//     ...formData,
//   };

//   return apiClient.put(`/preinscripciones/${dni}`, payload);
// };

  const limpiarPayload = (data) =>
    Object.fromEntries(
      Object.entries(data).filter(
        ([, value]) => value !== "" && value !== null && value !== undefined
      )
    );

  export const modificarPreinscripcion = (dni, codigoSeguridad, formData) => {
    const payload = {
      codigo_seguridad: codigoSeguridad,
      ...limpiarPayload(formData),
    };

    return apiClient.put(`/preinscripciones/${dni}`, payload);
  };



/**
 * Imprimir ficha de inscripción
 */
export const imprimirFicha = (dni) => {
  return apiClient.get(`/preinscripciones/${dni}/ficha`, {
    responseType: 'blob',
  });
};

/**
 * Obtener listado de escuelas profesionales
 */
export const obtenerEscuelasProfesionales = () => {
  return apiClient.get('/escuelas-profesionales');
};

/**
 * Obtener estadísticas del dashboard
 */
export const obtenerEstadisticas = () => {
  return apiClient.get('/preinscripciones/estadisticas');
};

export default apiClient;
