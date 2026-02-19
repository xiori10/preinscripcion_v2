import { useEffect, useState } from "react";
import apiClient from "@/services/api";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CBadge,
  CSpinner,
} from "@coreui/react";

const SesionesTable = () => {
  const [sesiones, setSesiones] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSesiones = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get("/admin/sesiones");
        setSesiones(res.data);
      } catch (error) {
        console.error("Error cargando sesiones:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSesiones();

    const interval = setInterval(loadSesiones, 15000);

    return () => clearInterval(interval);
  }, []);

  const cerrarSesionRemota = async (id) => {
    try {
      await apiClient.delete(`/admin/sesiones/${id}`);

      setSesiones((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "—";
    return new Date(fecha).toLocaleString();
  };

  return (
    <>
      {loading && <CSpinner color="primary" className="mb-3" />}

      <CTable striped hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Usuario</CTableHeaderCell>
            <CTableHeaderCell>Rol</CTableHeaderCell>
            <CTableHeaderCell>IP</CTableHeaderCell>
            <CTableHeaderCell>Login</CTableHeaderCell>
            <CTableHeaderCell>Última Actividad</CTableHeaderCell>
            <CTableHeaderCell>Estado</CTableHeaderCell>
            <CTableHeaderCell>Acción</CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {sesiones.length === 0 ? (
            <CTableRow>
              <CTableDataCell colSpan="7" className="text-center">
                No hay sesiones registradas
              </CTableDataCell>
            </CTableRow>
          ) : (
            sesiones.map((item) => (
              <CTableRow key={item.id}>
                <CTableDataCell>{item.name}</CTableDataCell>

                <CTableDataCell>
                  <CBadge
                    color={item.role === "admin" ? "danger" : "secondary"}
                  >
                    {item.role}
                  </CBadge>
                </CTableDataCell>

                <CTableDataCell>{item.ip_address || "—"}</CTableDataCell>

                <CTableDataCell>{formatearFecha(item.login_at)}</CTableDataCell>

                <CTableDataCell>
                  {formatearFecha(item.last_activity)}
                </CTableDataCell>

                <CTableDataCell>
                  {item.logout_at ? (
                    <CBadge color="secondary">Cerrada</CBadge>
                  ) : (
                    <CBadge color="success">Activa</CBadge>
                  )}
                </CTableDataCell>

                <CTableDataCell>
                  {!item.logout_at && (
                    <CButton
                      size="sm"
                      color="danger"
                      onClick={() => cerrarSesionRemota(item.id)}
                    >
                      Cerrar
                    </CButton>
                  )}
                </CTableDataCell>
              </CTableRow>
            ))
          )}
        </CTableBody>
      </CTable>
    </>
  );
};

export default SesionesTable;
