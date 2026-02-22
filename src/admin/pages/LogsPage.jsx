import { CCard, CCardBody } from "@coreui/react"
import SystemLogsTable from "../features/seguridad/SystemLogsTable"

const LogsPage = () => {
  return (
    <CCard>
      <CCardBody>
        <SystemLogsTable />
      </CCardBody>
    </CCard>
  )
}

export default LogsPage