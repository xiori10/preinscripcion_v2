import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight
  
} from 'lucide-react'
// import './sidebar.css'

const Sidebar = ({ isOpen, onToggle }) => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Usuarios', icon: Users, path: '/admin/usuarios' },
    { name: 'Reportes', icon: FileText, path: '/admin/reportes' },
    { name: 'Configuración', icon: Settings, path: '/configuracion' },
  ]

  return (
    <aside
      className={`
        sidebar bg-white border-end d-none d-lg-flex flex-column
        ${isOpen ? 'sidebar-open' : 'sidebar-closed'}
      `}
    >
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between px-3 py-3 border-bottom">
        {isOpen && (
          <h1 className="fw-bold  m-0 color1">
            Admin Panel
          </h1>
        )}

        <button
          onClick={onToggle}
          className="btn btn-sm btn-light"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-grow-1 px-2 py-3 ">
        {menuItems.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded mb-1
              ${isActive ? 'active bg-primary-subtle text-primary' : 'text-secondary'}`
            }
          >
            <Icon size={18} />
            {isOpen && <span>{name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-2 border-top text-muted small">
        {isOpen && '© 2026 Chappi Admin'}
      </div>
    </aside>
  )
}

export default Sidebar
