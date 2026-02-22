import { useEffect, useState, useMemo } from "react";
import apiClient from "@/services/api";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
  CButton,
  CFormSelect,
  CFormInput,
  CCard,
  CCardHeader,
  CCardBody,
  CSpinner,
  CButtonGroup,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCol,
} from "@coreui/react";
import {
  Filter,
  User,
  Activity,
  Calendar,
  Globe,
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const SystemLogsTable = () => {
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(false);

  const initialFilters = useMemo(
    () => ({
      user: "",
      action: "",
      start_date: "",
      end_date: "",
      page: 1,
    }),
    [],
  );

  const [filters, setFilters] = useState(initialFilters);

  const [pagination, setPagination] = useState({
    last_page: 1,
    current_page: 1,
    total: 0,
  });

  // ✅ CARGAR METADATOS (Usuarios y Acciones)
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [resUsers, resActions] = await Promise.all([
          apiClient.get("/admin/logs/users"),
          apiClient.get("/admin/logs/actions"),
        ]);
        setUsers(resUsers.data);
        setActions(resActions.data);
      } catch (error) {
        console.error("Error cargando metadatos:", error);
      }
    };
    fetchMetadata();
  }, []);

  // ✅ FETCH PRINCIPAL DE LOGS
  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get("/admin/logs", { params: filters });
        setLogs(res.data.data || []);
        setPagination({
          last_page: res.data.last_page || 1,
          current_page: res.data.current_page || 1,
          total: res.data.total || 0,
        });
      } catch (error) {
        console.error("Error cargando logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1,
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      setFilters((prev) => ({ ...prev, page: newPage }));
    }
  };

  const handleClearFilters = () => setFilters(initialFilters);

  return (
    <CCard className="mb-4 shadow-sm">
      <CCardHeader className="bg-body-tertiary d-flex align-items-center justify-content-between py-3">
        <div className="d-flex align-items-center gap-2">
          <Activity size={20} className="bg-body-tertiary" />
          <h5 className="mb-0">Logs del Sistema</h5>
        </div>
        <CBadge
          color="secondary"
          variant="outline"
          className="text-body fw-bold fs-6"
        >
          Total: {pagination.total} registros
        </CBadge>
      </CCardHeader>

      <CCardBody>
        {/* 🔎 SECCIÓN DE FILTROS */}
        <CRow className="g-3 mb-4">
          <CCol md={3}>
            <CInputGroup>
              <CInputGroupText>
                <User size={16} />
              </CInputGroupText>
              <CFormSelect
                name="user"
                value={filters.user}
                onChange={handleFilterChange}
              >
                <option value="">Todos los usuarios</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </CFormSelect>
            </CInputGroup>
          </CCol>

          <CCol md={3}>
            <CInputGroup>
              <CInputGroupText>
                <Activity size={16} />
              </CInputGroupText>
              <CFormSelect
                name="action"
                value={filters.action}
                onChange={handleFilterChange}
              >
                <option value="">Todas las acciones</option>
                {actions.map((a, idx) => (
                  <option key={idx} value={a}>
                    {a}
                  </option>
                ))}
              </CFormSelect>
            </CInputGroup>
          </CCol>

          <CCol md={2}>
            <CInputGroup>
              <CInputGroupText>
                <Calendar size={16} />
              </CInputGroupText>
              <CFormInput
                type="date"
                name="start_date"
                value={filters.start_date}
                onChange={handleFilterChange}
              />
            </CInputGroup>
          </CCol>

          <CCol md={2}>
            <CInputGroup>
              <CInputGroupText>
                <Calendar size={16} />
              </CInputGroupText>
              <CFormInput
                type="date"
                name="end_date"
                value={filters.end_date}
                onChange={handleFilterChange}
              />
            </CInputGroup>
          </CCol>

          <CCol md={2} className="d-grid">
            <CButton
              color="warning"
              variant="outline"
              onClick={handleClearFilters}
            >
              <RefreshCcw size={16} className="me-2" /> Limpiar
            </CButton>
          </CCol>
        </CRow>

        {/* 📊 TABLA MEJORADA */}
        <div className="table-responsive">
          <CTable align="middle" hover responsive striped className="border">
            <CTableHead
              color="none"
              className="border-bottom text-body text-center"
            >
              <CTableRow>
                {/* <CTableHeaderCell className="py-3">Usuario</CTableHeaderCell>
                <CTableHeaderCell className="py-3">Acción</CTableHeaderCell>
                <CTableHeaderCell className="py-3">Descripción</CTableHeaderCell>
                <CTableHeaderCell className="py-3">Detalles Técnicos (ip)</CTableHeaderCell>
                <CTableHeaderCell className="py-3">Fecha y Hora</CTableHeaderCell> */}

                <CTableHeaderCell className="bg-body-tertiary py-3 border-1">
                  Usuario
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary py-3 border-1">
                  Acción
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary py-3 border-1">
                  Descripción
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary py-3 border-1">
                  IP / Origen
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary py-3 border-1 ">
                  Fecha
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {loading ? (
                <CTableRow>
                  <CTableDataCell colSpan={5} className="text-center py-5">
                    <CSpinner color="primary" variant="grow" />
                    <div className="mt-2 text-muted">Cargando registros...</div>
                  </CTableDataCell>
                </CTableRow>
              ) : logs.length === 0 ? (
                <CTableRow>
                  <CTableDataCell
                    colSpan={5}
                    className="text-center py-5 text-muted"
                  >
                    No se encontraron registros coincidentes.
                  </CTableDataCell>
                </CTableRow>
              ) : (
                logs.map((log) => (
                  <CTableRow key={log.id}>
                    <CTableDataCell>
                      <div className="d-flex align-items-center gap-2">
                        <div className="avatar-placeholder bg-body-tertiary rounded-circle p-2">
                          <User size={16} className="text-secondary" />
                        </div>
                        <span className="fw-semibold text-body">
                          {log.user?.name ?? "Sistema"}
                        </span>
                      </div>
                    </CTableDataCell>

                    <CTableDataCell>
                      <CBadge
                        color="info"
                        variant="solid"
                        className="px-2 py-1"
                      >
                        {log.action}
                      </CBadge>
                    </CTableDataCell>

                    <CTableDataCell
                      className="small text-wrap"
                      style={{ maxWidth: "250px" }}
                    >
                      {log.description}
                    </CTableDataCell>

                    {/* <CTableDataCell >
                      <div className="d-flex flex-column text-center">
                        <small className=" d-flex align-items-center gap-1 ">
                          <Globe size={14} /> {log.ip_address}
                        </small>
                        {log.user_agent && (
                          <small className="text-truncate text-muted" style={{maxWidth: '150px'}} title={log.user_agent}>
                            {log.user_agent}
                          </small>
                        )}
                      </div>
                    </CTableDataCell> */}
                    
                    <CTableDataCell>
                      {/* align-items-center centra los bloques de texto horizontalmente */}
                      <div className="d-flex flex-column align-items-center justify-content-center text-center">
                        {/* Contenedor de Icono + IP */}
                        <small className="d-flex align-items-center gap-1 fw-medium text-body">
                          <Globe size={14} className="text-primary" />
                          {log.ip_address}
                        </small>

                        {/* Contenedor del User Agent */}
                        {log.user_agent && (
                          <small
                            className="text-truncate text-muted"
                            style={{ maxWidth: "150px", fontSize: "0.7rem" }}
                            title={log.user_agent}
                          >
                            {log.user_agent}
                          </small>
                        )}
                      </div>
                    </CTableDataCell>

                    <CTableDataCell>
                      <div className="small fw-medium text-body text-center">
                        {format(new Date(log.created_at), "dd MMM, yyyy", {
                          locale: es,
                        })}
                      </div>
                      <div className="small text-info text-center">
                        {format(new Date(log.created_at), "HH:mm:ss 'hrs'")}
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>
        </div>

        {/* 🔢 PAGINACIÓN ESTILO PROFESIONAL */}
        {!loading && logs.length > 0 && (
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 gap-3">
            <div className="text-muted small">
              Mostrando página <strong>{pagination.current_page}</strong> de{" "}
              <strong>{pagination.last_page}</strong>
            </div>

            <CButtonGroup>
              <CButton
                color="primary"
                variant="outline"
                disabled={filters.page <= 1}
                onClick={() => handlePageChange(filters.page - 1)}
              >
                <ChevronLeft size={18} /> Anterior
              </CButton>

              <CButton color="primary" className="px-4">
                {pagination.current_page}
              </CButton>

              <CButton
                color="primary"
                variant="outline"
                disabled={filters.page >= pagination.last_page}
                onClick={() => handlePageChange(filters.page + 1)}
              >
                Siguiente <ChevronRight size={18} />
              </CButton>
            </CButtonGroup>
          </div>
        )}
      </CCardBody>
    </CCard>
  );
};

export default SystemLogsTable;
