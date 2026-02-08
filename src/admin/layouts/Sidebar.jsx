import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

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
        bg-white border-r border-gray-200 h-full
        transition-all duration-300
        ${isOpen ? 'w-64' : 'w-20'}
        hidden lg:flex flex-col
      `}
    >
      {/* Logo / Título */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
        {isOpen && (
          <h1 className="text-lg font-bold text-blue-600">
            Admin Panel
          </h1>
        )}

        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Menú */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `
              flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
              transition-colors
              ${
                isActive
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }
              `
            }
          >
            <Icon className="w-5 h-5" />
            {isOpen && <span>{name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer del Sidebar */}
      <div className="px-4 py-3 border-t border-gray-200 text-xs text-gray-500">
        {isOpen && '© 2026 Chappi Admin'}
      </div>
    </aside>
  )
}

export default Sidebar
