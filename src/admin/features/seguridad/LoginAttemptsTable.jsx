import { useEffect, useState } from "react"
import apiClient from "@/services/api";
import {
  CTable, CTableHead, CTableRow, CTableHeaderCell,
  CTableBody, CTableDataCell, CBadge
} from "@coreui/react"

const LoginAttemptsTable = () => {

  // ✅ Mejora 1:
  // Agregamos estado "loading" para mejor UX.
  // Antes la tabla podía verse vacía mientras cargaba.
  const [attempts, setAttempts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    // ✅ Mejora 2:
    // Encapsulamos la llamada en una función async interna.
    // Es más limpio y evita promesas anidadas (.then/.catch).
    const fetchAttempts = async () => {
      try {

        const res = await apiClient.get("/admin/login-attempts")

        // ✅ Mejora 3:
        // Soporta tanto respuesta normal como paginada.
        // Si Laravel usa paginate(), los datos vienen en res.data.data
        // Si usa get(), vienen en res.data
        setAttempts(res.data.data ?? res.data)

      } catch (err) {

        // ✅ Mejora 4:
        // Mensaje de error más descriptivo.
        console.error("Error cargando intentos:", err)

      } finally {

        // ✅ Mejora 5:
        // Siempre apagamos loading aunque falle.
        setLoading(false)
      }
    }

    fetchAttempts()

  }, [])

  // ✅ Mejora 6:
  // Mientras carga mostramos mensaje.
  if (loading) return <p>Cargando intentos...</p>

  return (
    <CTable striped hover responsive>

      {/* ✅ Mejora 7:
          Agregamos "responsive" para que en móviles no se rompa */}
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Email</CTableHeaderCell>
          <CTableHeaderCell>IP</CTableHeaderCell>
          <CTableHeaderCell>Estado</CTableHeaderCell>
          <CTableHeaderCell>Fecha</CTableHeaderCell>
        </CTableRow>
      </CTableHead>

      <CTableBody>
        {attempts.map((item) => (
          <CTableRow key={item.id}>
            <CTableDataCell>{item.email}</CTableDataCell>
            <CTableDataCell>{item.ip_address}</CTableDataCell>
            <CTableDataCell>

              {/* ✅ Mejora 8:
                  Badge dinámico más limpio */}
              <CBadge color={item.successful ? "success" : "danger"}>
                {item.successful ? "Exitoso" : "Fallido"}
              </CBadge>

            </CTableDataCell>

            {/* ✅ Mejora 9:
                Formateo de fecha legible para humanos */}
            <CTableDataCell>
              {new Date(item.created_at).toLocaleString()}
            </CTableDataCell>

          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default LoginAttemptsTable
