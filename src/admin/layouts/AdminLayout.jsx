import React, { useState } from 'react'
import { CContainer } from '@coreui/react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { ThemeProvider } from '../../context/ThemeContext'
// import '@/admin/styles/admin.css';

const AdminLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true)

  return (

    <ThemeProvider>  
    {/* // Agregamos bg-body para que el fondo gris/oscuro se aplique a toda la ventana */}
    <div className="bg-body">
      <Sidebar
        visible={sidebarVisible}
        setVisible={setSidebarVisible}
      />

      <div
        className="wrapper d-flex flex-column min-vh-100"
        style={{
          // Tip: CoreUI Sidebar suele manejar su propio overlay, 
          // pero si usas margen manual, asegúrate de que sea fluido
          marginLeft: sidebarVisible ? '256px' : '0px',
          transition: 'margin-left 0.15s ease-in-out',
          backgroundColor: 'transparent' // Deja que bg-body mande
        }}
      >
        <Header
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
        />

        {/* CAMBIO CLAVE: Quitamos 'bg-light' y usamos 'bg-transparent' o nada */}
        <div className="body flex-grow-1 px-3 py-4">
          <CContainer fluid>
            <Outlet />
          </CContainer>
        </div>
      </div>
    </div>
    </ThemeProvider>
  )
}

export default AdminLayout