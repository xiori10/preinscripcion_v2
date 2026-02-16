import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CButton,
  CWidgetStatsC,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilUser,
  cilCheckCircle,
  cilXCircle,
  cilClock,
  cilArrowRight,
} from "@coreui/icons";
import { getDashboardStats } from "../../services/adminService";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  if (!stats)
    return <p className="p-4 text-center">Cargando estadísticas...</p>;

  return (
    <div className="px-3 py-4">
      {/* HERO SECTION - Gradiente y Diseño Limpio */}
      {/* <CCard 
        className="mb-5 border-0 shadow-lg text-white" 
        style={{ 
          background: 'linear-gradient(45deg, #321fdb 0%, #1f1498 100%)',
          borderRadius: '1.5rem' 
        }}
      > */}
      <CCard
        className="mb-5 border-0 shadow-lg "
        style={{
          background:
            "linear-gradient(45deg, var(--cui-secondary-color) 0%, var(--cui-primary-color) 100%)",
          borderRadius: "1.5rem",
        }}
      >
        <CCardBody className="p-5 d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bold mb-2">Panel de Control de Admisión</h2>
            <p className="opacity-75 mb-4">
              Bienvenido de nuevo. Tienes <strong>{stats.pendientes}</strong>{" "}
              solicitudes esperando revisión.
            </p>
            {/* <CButton
              color="light"
              size="lg"
              className="fw-semibold text-primary rounded-pill px-4"
            >
              Ver Preinscripciones{""}
              <CIcon icon={cilArrowRight} className="ms-2" />
            </CButton> */}
            <CButton
              color="light"
              size="lg"
              className="fw-semibold text-primary rounded-pill px-4"
              onClick={() => navigate("/admin/preinscripciones")}
            >
              Ver Preinscripciones
              <CIcon icon={cilArrowRight} className="ms-2" />
            </CButton>
          </div>
          <CIcon
            icon={cilUser}
            size="custom-size"
            height={120}
            className="opacity-25 d-none d-lg-block"
          />
        </CCardBody>
      </CCard>

      <CRow className="g-4">
        {/* TOTAL */}
        <CCol sm={6} xl={3}>
          <CCard className="metric-card border-0 shadow-sm rounded-4 overflow-hidden bg-body-tertiary">
            <div
              className="metric-accent"
              style={{
                background:
                  "linear-gradient(90deg, var(--cui-primary), var(--cui-info))",
              }}
            />

            <CCardBody className="p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-medium-emphasis small text-uppercase fw-semibold">
                    Total Postulantes
                  </div>
                  <h2 className="fw-bold mt-2 mb-0">{stats.total}</h2>
                  <small className="text-medium-emphasis">
                    Sistema completo
                  </small>
                </div>

                <div
                  className="metric-icon p-3 rounded-4"
                  style={{
                    background: "rgba(var(--cui-primary-rgb), 0.12)",
                    color: "var(--cui-primary)",
                  }}
                >
                  <CIcon icon={cilUser} size="xl" />
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* PENDIENTES */}
        <CCol sm={6} xl={3}>
          <CCard className="metric-card border-0 shadow-sm rounded-4 overflow-hidden bg-body-tertiary">
            <div
              className="metric-accent"
              style={{
                background:
                  "linear-gradient(90deg, var(--cui-warning), #ffca2c)",
              }}
            />

            <CCardBody className="p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-medium-emphasis small text-uppercase fw-semibold">
                    Pendientes
                  </div>
                  <h2 className="fw-bold mt-2 mb-0 text-warning">
                    {stats.pendientes}
                  </h2>
                  <small className="text-medium-emphasis">En revisión</small>
                </div>

                <div
                  className="metric-icon p-3 rounded-4"
                  style={{
                    background: "rgba(var(--cui-warning-rgb), 0.12)",
                    color: "var(--cui-warning)",
                  }}
                >
                  <CIcon icon={cilClock} size="xl" />
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* APROBADOS */}
        <CCol sm={6} xl={3}>
          <CCard className="metric-card border-0 shadow-sm rounded-4 overflow-hidden bg-body-tertiary">
            <div
              className="metric-accent"
              style={{
                background:
                  "linear-gradient(90deg, var(--cui-success), #20c997)",
              }}
            />

            <CCardBody className="p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-medium-emphasis small text-uppercase fw-semibold">
                    Aprobados
                  </div>
                  <h2 className="fw-bold mt-2 mb-0 text-success">
                    {stats.inscritos}
                  </h2>
                  <small className="text-medium-emphasis">Admitidos</small>
                </div>

                <div
                  className="metric-icon p-3 rounded-4"
                  style={{
                    background: "rgba(var(--cui-success-rgb), 0.12)",
                    color: "var(--cui-success)",
                  }}
                >
                  <CIcon icon={cilCheckCircle} size="xl" />
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* RECHAZADOS */}
        <CCol sm={6} xl={3}>
          <CCard className="metric-card border-0 shadow-sm rounded-4 overflow-hidden bg-body-tertiary">
            <div
              className="metric-accent"
              style={{
                background:
                  "linear-gradient(90deg, var(--cui-danger), #ff6b6b)",
              }}
            />

            <CCardBody className="p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-medium-emphasis small text-uppercase fw-semibold">
                    Rechazados
                  </div>
                  <h2 className="fw-bold mt-2 mb-0 text-danger">
                    {stats.rechazados}
                  </h2>
                  <small className="text-medium-emphasis">No admitidos</small>
                </div>

                <div
                  className="metric-icon p-3 rounded-4"
                  style={{
                    background: "rgba(var(--cui-danger-rgb), 0.12)",
                    color: "var(--cui-danger)",
                  }}
                >
                  <CIcon icon={cilXCircle} size="xl" />
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Dashboard;
