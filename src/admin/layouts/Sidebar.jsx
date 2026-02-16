import React from 'react'
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CNavItem,
  CNavTitle,
  CNavLink,
  CSidebarHeader,
  CSidebarToggler
} from '@coreui/react'
import { cilSpeedometer, cilList, cilChart, cilUser, cilSchool } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { NavLink } from 'react-router-dom'

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
            style={{ width: '40px', height: '40px' }}
          >
            <CIcon icon={cilSchool} className="text-white" size="lg" />
          </div>
          <div className="d-flex flex-column text-start">
            <span className="fw-bold fs-5 lh-1 text-body">ADMISION</span>
            <small className="text-muted fw-semibold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
              PORTAL ADMIN
            </small>
          </div>
        </CSidebarBrand>
      </CSidebarHeader>

      <CSidebarNav className="p-2 fs-6 fw-semibold">
        <CNavTitle className="fw-bold text-uppercase mt-3 mb-2 px-3" style={{ fontSize: '0.85rem', opacity: 2.5 }}>
          General
        </CNavTitle>

        <CNavItem>
          <CNavLink as={NavLink} to="/admin" className="rounded-3 py-2 px-3 mb-1">
            <CIcon icon={cilSpeedometer} className="nav-icon text-primary" />
            Dashboard
          </CNavLink>
        </CNavItem>

        <CNavTitle className="fw-bold text-uppercase mt-4 mb-2 px-3" style={{ fontSize: '0.85rem', opacity: 2.5 }}>
          Gestión de Procesos
        </CNavTitle>

        <CNavItem>
          <CNavLink as={NavLink} to="/admin/preinscripciones" className="rounded-3 py-2 px-3 mb-1">
            <CIcon icon={cilList} className="nav-icon text-warning" />
            Preinscripciones
          </CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink as={NavLink} to="/admin/reportes" className="rounded-3 py-2 px-3 mb-1">
            <CIcon icon={cilChart} className="nav-icon text-info" />
            Reportes Estadísticos
          </CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink as={NavLink} to="/admin/usuarios" className="rounded-3 py-2 px-3 mb-1">
            <CIcon icon={cilUser} className="nav-icon text-danger" />
            Usuarios y Roles
          </CNavLink>
        </CNavItem>
      </CSidebarNav>
      
      <CSidebarToggler 
        className="d-none d-lg-flex border-top" 
        onClick={() => setVisible(!visible)} 
      />
    </CSidebar>
  )
}

export default Sidebar