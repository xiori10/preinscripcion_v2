import React from "react";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CNavItem,
  CNavTitle,
  CNavLink,
  CSidebarHeader,
  CSidebarToggler,
  CNavGroup,
} from "@coreui/react";
import {
  cilSpeedometer,
  cilList,
  cilChart,
  cilUser,
  cilShieldAlt,
  cilDescription,
  cilSchool,
  cilHome,
  cilPeople,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ visible, setVisible }) => {
  return (
    <CSidebar
      position="fixed"
      visible={visible}
      onVisibleChange={setVisible}
      className="border-end shadow-sm"
    >
      <CSidebarHeader className="border-bottom p-4">
        <CSidebarBrand className="d-flex align-items-center text-decoration-none">
          <div
            className="bg-primary d-flex align-items-center justify-content-center rounded-3 me-3 shadow"
            style={{ width: "40px", height: "40px" }}
          >
            <CIcon icon={cilSchool} className="text-white" size="lg" />
          </div>
          <div className="d-flex flex-column text-start">
            <span className="fw-bold fs-5 lh-1 text-body">ADMISION</span>
            <small
              className="text-muted fw-semibold"
              style={{ fontSize: "0.7rem", letterSpacing: "1px" }}
            >
              PORTAL ADMIN
            </small>
          </div>
        </CSidebarBrand>
      </CSidebarHeader>

      <CSidebarNav className="p-2 fs-6 fw-semibold">
        {/* General fijo */}
        {/* <CNavTitle className="fw-bold text-uppercase mt-3 mb-2 px-3">
          General
        </CNavTitle> */}
        {/* <CNavTitle className="fw-bold text-uppercase mt-3 mb-2 px-3 text-primary">
          <CIcon icon={cilSpeedometer} className="me-2 text-primary" />
          General
        </CNavTitle> */}
        <CNavTitle className="fw-bold text-uppercase mt-3 mb-2 px-3 text-primary"> 
          <CIcon icon={cilHome} className="me-2 text-primary" />
            General 
        </CNavTitle>
        <CNavItem>
          <CNavLink as={NavLink} to="/admin" className="rounded-3 py-2 px-3 mb-1">
            <CIcon icon={cilSpeedometer} className="nav-icon text-primary me-2" />
            Dashboard
          </CNavLink>
        </CNavItem>

        {/* Gestión de Procesos como acordeón */}
        <CNavGroup
          toggler={
            <>
              <CIcon icon={cilList} className="nav-icon text-warning me-2" />
              Gestión de Procesos
            </>
          }
        >
          <CNavItem>
            <CNavLink as={NavLink} to="/admin/preinscripciones">
              <CIcon icon={cilList} className="me-2 text-warning" />
              Preinscripciones
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink as={NavLink} to="/admin/reportes">
              <CIcon icon={cilChart} className="me-2 text-info" />
              Reportes Estadísticos
            </CNavLink>
          </CNavItem>
        </CNavGroup>

        {/* Administración como acordeón */}
        <CNavGroup
          toggler={
            <>
              <CIcon icon={cilPeople} className="nav-icon text-danger me-2" />
              Administración
            </>
          }
        >
          <CNavItem>
            <CNavLink as={NavLink} to="/admin/usuarios">
              <CIcon icon={cilUser} className="me-2 text-danger" />
              Usuarios
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink as={NavLink} to="/admin/seguridad">
              <CIcon icon={cilShieldAlt} className="me-2 text-success" />
              Seguridad
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink as={NavLink} to="/admin/logs">
              <CIcon icon={cilDescription} className="me-2 text-secondary" />
              Logs del Sistema
            </CNavLink>
          </CNavItem>
        </CNavGroup>
      </CSidebarNav>

      <CSidebarToggler
        className="d-none d-lg-flex border-top"
        onClick={() => setVisible(!visible)}
      />
    </CSidebar>
  );
};

export default Sidebar;
