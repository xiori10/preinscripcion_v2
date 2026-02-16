import React, { useEffect, useState } from "react";
import {
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CAvatar,
  CBadge,
  CNavItem,
  CNavLink,
  CFormInput,
  CButton,
  CContainer,
  CDropdownDivider,
} from "@coreui/react";

import {
  cilBell,
  cilMenu,
  cilSearch,
  cilMoon,
  cilSun,
  cilContrast,
  cilSettings,
  cilAccountLogout,
  cilUser,
} from "@coreui/icons";

import CIcon from "@coreui/icons-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import api from "@/services/api";

const Header = ({ sidebarVisible, setSidebarVisible }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { theme, setTheme } = useTheme();

  const [pendientes, setPendientes] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 🔹 Reloj en vivo optimizado
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // 🔹 Notificaciones (Corrección de 'error' no usado)
  useEffect(() => {
    const fetchPendientes = async () => {
      try {
        const { data } = await api.get("/admin/dashboard");
        setPendientes(data.pendientes || 0);
      } catch (error) {
        console.error(error);
        // Usamos '_' para indicar que el error no se necesita
        console.warn("No se pudieron cargar las notificaciones");
      }
    };
    fetchPendientes();
  }, []);

  const formattedDateTime = currentTime.toLocaleString("es-PE", {
    weekday: "short", // Más corto para no saturar el header
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    // <CHeader
    //   position="sticky"
    //   className="mb-2 p-4 border-bottom shadow-sm bg-body"
    // >
    <CHeader
      position="sticky"
      className="mb-4 border-bottom shadow-sm bg-body"
      style={{
        "--cui-header-padding-y": "1.2rem",
        "--cui-header-padding-x": "1.2rem",
      }}
    >
      <CContainer fluid className="px-5 d-flex align-items-center">
        {/* IZQUIERDA: Toggle y Breadcrumb/Título */}
        <div className="d-flex align-items-center flex-grow-1">
          <CHeaderToggler
            className="ps-1"
            onClick={() => setSidebarVisible(!sidebarVisible)}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>

          <div className="ms-3 d-none d-md-block">
            <h5 className="mb-0 fw-bold">Panel Administrativo</h5>
            <small className="text-primary fw-medium">
              {formattedDateTime}
            </small>
          </div>
        </div>

        {/* DERECHA: Acciones */}
        <CHeaderNav className="align-items-center">
          {/* Buscador Estilizado */}

          <div
            className="d-none d-lg-flex position-relative me-3"
            style={{ width: "220px" }}
          >
            <CIcon
              icon={cilSearch}
              className="position-absolute text-body-secondary" // Cambiado de text-muted
              style={{
                top: "50%",
                left: "12px",
                transform: "translateY(-50%)",
                zIndex: 4,
              }}
            />
            <CFormInput
              type="search"
              placeholder="Buscar..."
              // CAMBIO CLAVE: Usa bg-body-tertiary o borra bg-light
              className="ps-5 rounded-pill border-0 bg-body-tertiary text-body"
              style={{ boxShadow: "none" }}
            />
          </div>

          {/* Botón Acción Rápida */}
          <CButton
            color="primary"
            className="rounded-pill px-3 me-3 d-none d-sm-flex align-items-center shadow-sm"
            size="sm"
            onClick={() => navigate("/admin/preinscripciones/nueva")}
          >
            <span className="fw-semibold">+ Nueva Preinscripción</span>
          </CButton>

          {/* Notificaciones con Punto de Luz */}
          <CNavItem className="me-2">
            <CNavLink className="position-relative p-2">
              <CIcon icon={cilBell} size="lg" className="text-dark-emphasis" />
              {pendientes > 0 && (
                <CBadge
                  color="danger"
                  shape="rounded-pill"
                  className="position-absolute translate-middle-y border border-2 border-white"
                  style={{ top: "10px", right: "-5px" }}
                >
                  {pendientes}
                </CBadge>
              )}
            </CNavLink>
          </CNavItem>

          {/* Divisor Visual */}
          <div
            className="vr mx-2 text-muted opacity-25"
            style={{ height: "30px" }}
          ></div>

          {/* Selector de Tema Moderno */}
          <CDropdown variant="nav-item" className="mx-1">
            <CDropdownToggle
              caret={false}
              className="p-2 border-0 bg-transparent"
            >
              {theme === "dark" && (
                <CIcon icon={cilMoon} className="text-info" size="lg" />
              )}
              {theme === "light" && (
                <CIcon icon={cilSun} className="text-warning" size="lg" />
              )}
              {theme === "auto" && (
                <CIcon icon={cilContrast} className="text-primary" size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu className="shadow-lg border-0 rounded-3 mt-2">
              <CDropdownItem
                onClick={() => setTheme("light")}
                className="d-flex align-items-center py-2"
              >
                <CIcon icon={cilSun} className="me-3 text-warning" /> Modo Claro
              </CDropdownItem>
              <CDropdownItem
                onClick={() => setTheme("dark")}
                className="d-flex align-items-center py-2"
              >
                <CIcon icon={cilMoon} className="me-3 text-info" /> Modo Oscuro
              </CDropdownItem>
              <CDropdownItem
                onClick={() => setTheme("auto")}
                className="d-flex align-items-center py-2"
              >
                <CIcon icon={cilContrast} className="me-3 text-primary" />{" "}
                Automático
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          {/* Usuario con diseño de Card */}
          <CDropdown variant="nav-item">
            <CDropdownToggle
              caret={false}
              className="p-1 border-0 bg-transparent d-flex align-items-center"
            >
              <CAvatar
                color="primary"
                className="shadow-sm border border-2 border-primary border-opacity-25"
                style={{ cursor: "pointer" }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </CAvatar>

              <div className="ms-2 d-none d-xl-block text-start">
                <div className="fw-bold lh-1 small">{user?.name}</div>
                <small className="text-muted" style={{ fontSize: "0.7rem" }}>
                  Admin
                </small>
              </div>
            </CDropdownToggle>

            <CDropdownMenu
              className="shadow-lg border-0 rounded-3 mt-2"
              style={{ minWidth: "200px" }}
            >
              {/* Información del usuario */}
              <div className="px-3 py-2 border-bottom mb-2">
                <div className="fw-bold">{user?.name}</div>
                <div className="small text-muted truncate">{user?.email}</div>
              </div>
              {/* Opciones */}
              <CDropdownItem
                onClick={() => navigate("/admin/perfil")}
                className="py-2"
              >
                <CIcon icon={cilUser} className="me-2" /> Mi Perfil
              </CDropdownItem>
              <CDropdownItem className="py-2">
                <CIcon icon={cilSettings} className="me-2" /> Ajustes
              </CDropdownItem>
              {/* 👇 AQUÍ VA EL CAMBIO CORRECTO */}
              <CDropdownDivider /> {/* Separador en CoreUI v5 */}
              <CDropdownItem
                onClick={handleLogout}
                className="text-danger py-2"
              >
                <CIcon icon={cilAccountLogout} className="me-2" /> Cerrar sesión
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
};

export default Header;
