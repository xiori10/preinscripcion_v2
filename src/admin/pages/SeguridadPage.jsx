import { CCard, CCardBody, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import { useState } from 'react'

import SesionesTable from '../features/seguridad/SesionesTable'
import LoginAttemptsTable from '../features/seguridad/LoginAttemptsTable'
import PoliticasForm from '../features/seguridad/PoliticasForm'

const SeguridadPage = () => {
  const [activeTab, setActiveTab] = useState(1)

  return (
    <CCard>
      <CCardBody>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink active={activeTab === 1} onClick={() => setActiveTab(1)}>
              Sesiones Activas
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === 2} onClick={() => setActiveTab(2)}>
              Intentos Fallidos
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === 3} onClick={() => setActiveTab(3)}>
              Configuración
            </CNavLink>
          </CNavItem>
        </CNav>

        <CTabContent>
          <CTabPane visible={activeTab === 1}>
            <SesionesTable />
          </CTabPane>

          <CTabPane visible={activeTab === 2}>
            <LoginAttemptsTable />
          </CTabPane>

          <CTabPane visible={activeTab === 3}>
            <PoliticasForm />
          </CTabPane>
        </CTabContent>
      </CCardBody>
    </CCard>
  )
}

export default SeguridadPage