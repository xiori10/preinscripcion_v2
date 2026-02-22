import React, { useEffect, useState, useCallback } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CFormSelect,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
  CSpinner,
  CAlert,
  CRow,
  CCol,

  // cilOptions,
} from "@coreui/react";

import {
  cilSearch,
  cilPlus,
  cilFilterX,
  cilCloudDownload,
} from "@coreui/icons";

import CIcon from "@coreui/icons-react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";

const Preinscripciones = () => {
  const navigate = useNavigate();

  // --- Estados ---
  const [preinscripciones, setPreinscripciones] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Estados de Filtros ---
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("todos");
  const [carrera, setCarrera] = useState("todas");

  // 🔥 ACTUALIZAR ESTADO
  // const actualizarEstado = async (id, nuevoEstado) => {
  //   try {
  //     await api.put(`/admin/preinscripciones/${id}/estado`, {
  //       estado: nuevoEstado,
  //     });

  //     fetchPreinscripciones(); 
  //   } catch (error) {
  //     console.error("Error actualizando estado:", error);
  //   }
  // };

  // 1. Obtener datos de la API
  const fetchPreinscripciones = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        search: busqueda || undefined,
        estado: estado !== "todos" ? estado : undefined,
        // Enviamos 'carrera' o 'escuela_profesional' según espere tu backend
        carrera: carrera !== "todas" ? carrera : undefined,
      };

      const { data } = await api.get("/admin/preinscripciones", { params });

      const listaData = data.data || [];
      setPreinscripciones(listaData);

      // Extraer lista de carreras únicas solo si el select está vacío
      if (listaData.length > 0 && carreras.length === 0) {
        const únicas = [
          ...new Set(listaData.map((i) => i.escuela_profesional)),
        ].sort();
        setCarreras(únicas);
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [busqueda, estado, carrera, carreras.length]);

  // 2. Ejecutar búsqueda con Debounce (300ms)
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchPreinscripciones();
    }, 300);
    return () => clearTimeout(delay);
  }, [fetchPreinscripciones]);

  // 3. Función para limpiar filtros
  const resetFilters = () => {
    setBusqueda("");
    setEstado("todos");
    setCarrera("todas");
    // Al cambiar estos estados, el useEffect se dispara automáticamente
  };

  // const getBadgeColor = (estado) => {
  //   const colors = {
  //     pendiente: "warning",
  //     aprobado: "success",
  //     rechazado: "danger",
  //   };
  //   return colors[estado.toLowerCase()] || "secondary";
  // };
  const getBadgeColor = (estado) => {
    const colors = {
      pendiente: "warning",
      inscrito: "success",
      rechazado: "danger",
    };
    return colors[estado?.toLowerCase()] || "secondary";
  };

  // 4. Filtrado de seguridad en Frontend
  // (Por si el backend ignora el parámetro 'carrera')
  const datosFiltrados = preinscripciones.filter((item) => {
    const cumpleCarrera =
      carrera === "todas" || item.escuela_profesional === carrera;
    return cumpleCarrera;
  });

  return (
    <div className="animate__animated animate__fadeIn">
      {/* Título y Botón Superior */}
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h3 className="fw-bold text-body mb-1">Preinscripciones</h3>
          <p className="text-body-secondary mb-0">
            Listado de postulantes y gestión de escuelas.
          </p>
        </div>

        <div className="d-flex gap-2">
          {/* BOTÓN PRO: Exportar */}
          <CButton
            color="success"
            variant="outline"
            className="rounded-pill px-3 fw-semibold"
          >
            <CIcon icon={cilCloudDownload} className="me-2" />
            Exportar
          </CButton>
          <CButton
            color="primary"
            className="rounded-pill px-4 shadow-sm fw-semibold"
            onClick={() => navigate("/admin/preinscripciones/nueva")}
          >
            <CIcon icon={cilPlus} className="me-2" />
            Nuevo Registro
          </CButton>
        </div>

        {/* <CButton
          color="primary"
          className="rounded-pill px-4 shadow-sm"
          onClick={() => navigate("/admin/preinscripciones/nueva")}
        >
          <CIcon icon={cilPlus} className="me-2" /> Nueva
        </CButton> */}
      </div>

      <CCard className="border-0 shadow-sm rounded-4 mb-4">
        <CCardHeader className="bg-body-tertiary border-0 py-3 px-4">
          <CRow className="g-3">
            {/* Buscador de Texto */}
            <CCol md={4}>
              <div className="position-relative">
                <CIcon
                  icon={cilSearch}
                  className="position-absolute text-body-secondary"
                  style={{
                    top: "50%",
                    left: "15px",
                    transform: "translateY(-50%)",
                    zIndex: 5,
                  }}
                />
                <CFormInput
                  placeholder="Buscar por nombre o DNI..."
                  className="ps-5 rounded-3 border-0 bg-body shadow-none"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </CCol>

            {/* Filtro Estado */}
            <CCol md={3}>
              <CFormSelect
                className="rounded-3 border-0 bg-body shadow-none"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="todos">Todos los Estados</option>
                <option value="pendiente">🕒 Pendientes</option>
                <option value="inscrito">✅ Inscritos</option>
                <option value="rechazado">❌ Rechazados</option>
              </CFormSelect>
            </CCol>

            {/* Filtro Carrera (Dinamico) */}
            <CCol md={3}>
              <CFormSelect
                className="rounded-3 border-0 bg-body shadow-none"
                value={carrera}
                onChange={(e) => setCarrera(e.target.value)}
              >
                <option value="todas">Todas las Carreras</option>
                {carreras.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            {/* Botón Reset */}
            <CCol
              md={2}
              className="text-md-end d-flex align-items-center justify-content-md-end"
            >
              <CButton
                variant="ghost"
                color="danger"
                size="sm"
                onClick={resetFilters}
                className="text-nowrap"
              >
                <CIcon icon={cilFilterX} className="me-1" /> Limpiar Filtros
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>

        <CCardBody className="p-0">
          {error && (
            <CAlert color="danger" className="m-3">
              {error}
            </CAlert>
          )}

          <CTable hover responsive align="middle" className="mb-0 border-top">
            {/* Quitamos color="light" y usamos bordes sutiles */}
            <CTableHead className="text-nowrap">
              <CTableRow className="bg-body-secondary bg-opacity-25">
                <CTableHeaderCell className="ps-4 border-2 small text-body-secondary py-3">
                  POSTULANTE
                </CTableHeaderCell>
                <CTableHeaderCell className="border-2 small text-body-secondary py-3">
                  DNI
                </CTableHeaderCell>
                <CTableHeaderCell className="border-2 small text-body-secondary py-3">
                  ESCUELA
                </CTableHeaderCell>
                <CTableHeaderCell className="border-2 small text-body-secondary py-3 text-center">
                  ESTADO
                </CTableHeaderCell>
                <CTableHeaderCell className="border-2 small text-body-secondary py-3 text-center">
                  FECHA
                </CTableHeaderCell>

                <CTableHeaderCell className="border-2 small text-body-secondary py-3 text-center">
                  EDITABLE
                </CTableHeaderCell>

                <CTableHeaderCell className="border-2 small text-body-secondary py-3 text-center">
                  ACCIONES
                </CTableHeaderCell>

                {/* <CTableHeaderCell className="border-2 pe-4 py-3"></CTableHeaderCell> */}
              </CTableRow>
            </CTableHead>

            <CTableBody className="text-body">
              {loading ? (
                <CTableRow>
                  <CTableDataCell colSpan="6" className="text-center py-5">
                    <CSpinner color="primary" variant="grow" />
                  </CTableDataCell>
                </CTableRow>
              ) : datosFiltrados.length === 0 ? (
                <CTableRow>
                  <CTableDataCell
                    colSpan="6"
                    className="text-center py-5 text-body-secondary"
                  >
                    No hay registros que coincidan con los filtros.
                  </CTableDataCell>
                </CTableRow>
              ) : (
                datosFiltrados.map((item) => (
                  <CTableRow
                    key={item.id}
                    className="align-middle border-bottom"
                  >
                    <CTableDataCell className="ps-4 py-3 border-2">
                      <div className="fw-bold text-body">
                        {item.nombre_completo}
                      </div>
                      <div className="small text-body-secondary">
                        ID: #{item.id}
                      </div>
                    </CTableDataCell>

                    <CTableDataCell className="small font-monospace text-body-secondary border-2">
                      {item.numero_documento}
                    </CTableDataCell>

                    <CTableDataCell className="border-2">
                      <span className="small fw-medium text-uppercase text-body-emphasis ">
                        {item.escuela_profesional}
                      </span>
                    </CTableDataCell>

                    <CTableDataCell className="text-center border-2">
                      {/* El Badge ya es inteligente con su color, solo asegúrate que el texto se lea bien */}
                      <CBadge
                        shape="rounded-pill"
                        color={getBadgeColor(item.estado)}
                        className="px-3 py-2 text-uppercase"
                        style={{ fontSize: "0.65rem", letterSpacing: "0.5px" }}
                      >
                        {item.estado}
                      </CBadge>
                    </CTableDataCell>

                    <CTableDataCell className="text-center small text-body-secondary border-2">
                      {new Date(item.created_at).toLocaleDateString("es-PE")}
                    </CTableDataCell>

                    <CTableDataCell className="pe-2 text-end border-2">
                      <span>
                        {item.puede_modificar ? "Si" : "No"}
                      </span>

                    </CTableDataCell>

                    {/* <CTableDataCell className="pe-4 text-end border-2">
                      <CButton
                        size="sm"
                        color="primary"
                        variant="ghost"
                        className="rounded-pill px-3 fw-bold"
                        onClick={() =>
                          navigate(`/admin/preinscripciones/${item.id}`)
                        }
                      >
                        Ver Detalle
                      </CButton>
                    </CTableDataCell> */}

                    <CTableDataCell className="pe-4 text-end border-2">
                      <div className="d-flex justify-content-end gap-2">
                        {/* {item.estado?.toLowerCase() === "pendiente" && (
                          <>
                            <CButton
                              size="sm"
                              color="success"
                              variant="outline"
                              className="rounded-pill px-3 fw-bold"
                              onClick={() =>
                                actualizarEstado(item.id, "INSCRITO")
                              }
                            >
                              Aprobar
                            </CButton>

                            <CButton
                              size="sm"
                              color="danger"
                              variant="outline"
                              className="rounded-pill px-3 fw-bold"
                              onClick={() =>
                                actualizarEstado(item.id, "RECHAZADO")
                              }
                            >
                              Rechazar
                            </CButton>

                          </>
                        )} */}

                        <CButton
                          size="sm"
                          color="primary"
                          variant="ghost"
                          className="rounded-pill px-3 fw-bold"
                          onClick={() =>
                            navigate(`/admin/preinscripciones/${item.id}`)
                          }
                        >
                          Ver
                        </CButton>
                        
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
            
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Preinscripciones;
