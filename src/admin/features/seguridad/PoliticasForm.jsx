import { useEffect, useState } from "react"
import { CForm, CFormInput, CButton, CSpinner } from "@coreui/react"
import apiClient from "@/services/api"

const PoliticasForm = () => {
  // 🔹 Estado de formulario
  const [tiempoSesion, setTiempoSesion] = useState("")
  const [maxIntentos, setMaxIntentos] = useState("")
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  // 🔹 Cargar configuración al montar
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await apiClient.get("/admin/configuracion")
        // 🔹 Protegemos contra null o undefined
        setTiempoSesion(res.data?.tiempo_sesion ?? "")
        setMaxIntentos(res.data?.max_intentos_login ?? "")
      } catch (error) {
        console.error("Error cargando configuración", error)
      } finally {
        setFetching(false)
      }
    }

    fetchConfig()
  }, [])

  // 🔹 Guardar configuración
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await apiClient.put("/admin/configuracion", {
        tiempo_sesion: Number(tiempoSesion),
        max_intentos_login: Number(maxIntentos),
      })

      alert("Configuración actualizada correctamente")
    } catch (error) {
      console.error("Error actualizando configuración", error)
      alert("Error al guardar")
    } finally {
      setLoading(false)
    }
  }

  // 🔹 Mostrar loading mientras carga datos
  if (fetching) {
    return (
      <div className="text-center my-5">
        <CSpinner />
        <p>Cargando configuración...</p>
      </div>
    )
  }

  return (
    <CForm onSubmit={handleSubmit}>
      <CFormInput
        type="number"
        label="Tiempo de sesión (minutos)"
        value={tiempoSesion ?? ""}
        onChange={(e) => setTiempoSesion(e.target.value)}
        min={5}
        max={240}
        required
      />

      <CFormInput
        type="number"
        label="Máx intentos login"
        value={maxIntentos ?? ""}
        onChange={(e) => setMaxIntentos(e.target.value)}
        min={1}
        max={10}
        required
        className="mt-3"
      />

      <CButton
        type="submit"
        color="primary"
        className="mt-3"
        disabled={loading}
      >
        {loading ? "Guardando..." : "Guardar Configuración"}
      </CButton>
    </CForm>
  )
}

export default PoliticasForm
