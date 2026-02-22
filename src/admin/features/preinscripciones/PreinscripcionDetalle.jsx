import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { imprimirFicha } from "@/services/api";
import apiClient from "@/services/api";
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CFormTextarea,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CRow,
  CCol,
  CSpinner,
  CAvatar,
} from "@coreui/react";
import {
  User,
  MapPin,
  GraduationCap,
  Printer,
  CheckCircle,
  XCircle,
  ChevronLeft,
  Mail,
  Phone,
  Calendar,
  FileBadge,
  Globe,
  School,
  Hash,
  Landmark,
  Baby,
  Languages,
  FileText,
  ClipboardCheck,
  HeartPulse,
  Fingerprint,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";

const PreinscripcionDetalle = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalRechazo, setModalRechazo] = useState(false);
  const [motivoRechazo, setMotivoRechazo] = useState("");
  const [accionLoading, setAccionLoading] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  // const fechaFormateada = new Date(data.fecha_nacimiento).toLocaleDateString('es-ES');

  useEffect(() => {
    const fetchPreinscripcion = async () => {
      try {
        const res = await apiClient.get(`/admin/preinscripciones/${id}`);
        setData(res.data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPreinscripcion();
  }, [id]);

  const handleImprimir = async () => {
    setDownloadingPdf(true);
    try {
      const response = await imprimirFicha(data.numero_documento);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ficha_${data.numero_documento}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error PDF:", err);
      alert("Error al generar PDF");
    } finally {
      setDownloadingPdf(false);
    }
  };

  // const actualizarEstado = async (nuevoEstado) => {
  //   if (nuevoEstado === "RECHAZADO" && !motivoRechazo.trim())
  //     return alert("Motivo requerido");
  //   setAccionLoading(true);
  //   try {
  //     const res = await apiClient.put(
  //       `/admin/preinscripciones/${data.id}/estado`,
  //       {
  //         estado: nuevoEstado,
  //         motivo: nuevoEstado === "RECHAZADO" ? motivoRechazo : null,
  //       },
  //     );
  //     setData(res.data.data);
  //     setModalRechazo(false);
  //   } catch (err) {
  //     console.error("Error update:", err);
  //     alert("Error al actualizar");
  //   } finally {
  //     setAccionLoading(false);
  //   }
  // };

  const actualizarEstado = async (nuevoEstado) => {
    if (nuevoEstado === "RECHAZADO" && !motivoRechazo.trim())
      return alert("Motivo requerido");

    setAccionLoading(true);
    try {
      const payload = { estado: nuevoEstado };
      if (nuevoEstado === "RECHAZADO") {
        payload.motivo = motivoRechazo.trim();
      }

      const res = await apiClient.put(
        `/admin/preinscripciones/${data.id}/estado`,
        payload,
      );

      setData(res.data.data);
      setModalRechazo(false);
    } catch (err) {
      console.error("Error update:", err);
      alert(
        err.response?.data?.message ||
          "Error al actualizar. Verifica los datos enviados.",
      );
    } finally {
      setAccionLoading(false);
    }
  };

  const Stat = ({
    label,
    value,
    icon: IconComponent,
    color = "text-primary",
  }) => (
    <div className="d-flex align-items-center mb-3">
      {IconComponent && (
        <div
          className={`p-2 rounded-3 me-3 bg-${color} bg-opacity-10 text-${color}`}
        >
          <IconComponent size={20} />
        </div>
      )}
      <div>
        <p
          className="text-muted mb-0 fw-bold text-uppercase"
          style={{ fontSize: "0.6rem" }}
        >
          {label}
        </p>
        <p
          className="mb-0 fw-bold border-bottom border-light"
          style={{ fontSize: "0.85rem" }}
        >
          {value || "---"}
        </p>
      </div>
    </div>
  );

  // if (loading)
  //   return (
  //     <div className="text-center py-5">
  //       <CSpinner color="primary" />
  //     </div>
  //   );

  if (loading || !data) {
    return (
      <div className="text-center py-5">
        <CSpinner color="primary" />
      </div>
    );
  }

  const fechaFormateada = data?.fecha_nacimiento
    ? new Date(data.fecha_nacimiento).toLocaleDateString("es-ES")
    : "---";

  const tieneConadis =
    data.tiene_conadis &&
    data.tiene_conadis.toString().trim().toLowerCase() === "si";

  const gestion_dependencia = data.gestion_dependencia
    ?.toUpperCase()
    .includes("PUBLICA");
  const esta_en_otra_universidad = data.esta_en_otra_universidad
    ?.toUpperCase()
    .includes("SI");

  // === CONFIGURACIÓN DINÁMICA SEGÚN ESTADO ===
  let estadoIcono;
  let estadoColor;
  let estadoMensaje;

  if (data.estado === "PENDIENTE") {
    estadoIcono = Clock;
    estadoColor = "text-warning";
    estadoMensaje = "La solicitud está pendiente de validación.";
  }

  if (data.estado === "INSCRITO") {
    estadoIcono = CheckCircle2;
    estadoColor = "text-success";
    estadoMensaje =
      "Solicitud procesada correctamente. El postulante fue inscrito.";
  }

  if (data.estado === "RECHAZADO") {
    estadoIcono = XCircle;
    estadoColor = "text-danger";
    estadoMensaje = data.motivo_rechazo
      ? `Motivo: ${data.motivo_rechazo}`
      : "Solicitud rechazada.";
  }
  // Componente para JSX
  const IconoEstado = estadoIcono;

  return (
    <div className="pb-5 container-fluid">
      {/* HEADER PRINCIPAL */}

      {/* <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4 p-4 gap-4 shadow-sm border-2 border-3 border-danger rounded-4 bg-body-tertiary"> */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start mb-4 p-4 gap-4 shadow-sm border-top border-3 border-danger rounded-4 bg-body-tertiary">
        {/* BLOQUE IZQUIERDO */}
        <div className="d-flex flex-column flex-md-row align-items-center align-items-md-center gap-3 flex-wrap text-center text-md-start w-100">
          <CAvatar
            color="primary"
            size="xl"
            className="shadow border border-white"
          >
            {data.nombres.charAt(0)}
            {data.apellido_paterno.charAt(0)}
          </CAvatar>

          <div className="w-100">
            <h2 className="m-0 fw-black">
              {data.apellido_paterno} {data.apellido_materno} {data.nombres}
            </h2>

            <div className="d-flex flex-wrap gap-3 mt-2 justify-content-center justify-content-md-start">
              <CBadge
                color="secondary"
                shape="rounded-pill"
                className="px-3 py-2"
              >
                DNI {data.numero_documento}
              </CBadge>

              <CBadge
                color={
                  data.estado === "PENDIENTE"
                    ? "warning"
                    : data.estado === "INSCRITO"
                      ? "success"
                      : "danger"
                }
                shape="rounded-pill"
                className="px-3 py-2"
              >
                {data.estado}
              </CBadge>
            </div>

            <div className="mt-3 w-100 text-center text-md-start">
              <span className="text-muted small d-inline-flex align-items-center fw-bold justify-content-center justify-content-md-start">
                <Calendar size={14} className="me-1" />
                Recibido: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* BOTÓN */}
        <div className="d-flex align-items-center justify-content-center justify-content-md-end w-100 w-md-auto">
          <CButton
            color="primary"
            className="rounded-pill px-5 py-2 shadow-sm fw-bold  w-md-auto"
            onClick={handleImprimir}
            disabled={downloadingPdf}
          >
            {downloadingPdf ? (
              <CSpinner size="sm" />
            ) : (
              <Printer size={18} className="me-2" />
            )}
            IMPRIMIR
          </CButton>
        </div>
      </div>

      {/* FILA SUPERIOR: 3 CARDS */}
      <CRow className="g-4 mb-4">
        {/* 1. CHECKLIST DOCUMENTAL */}
        <CCol lg={4}>
          <CCard className="h-100 border-1 shadow-sm border-top border-5 border-danger rounded-4">
            <CCardBody className="p-4">
              <h6 className="fw-black text-danger mb-4 text-uppercase d-flex align-items-center">
                <ClipboardCheck size={20} className="me-2" /> 1. Checklist
                Documental
              </h6>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between align-items-center p-2 bg-body-tertiary rounded-3">
                  <div className="small fw-bold ">
                    <FileText size={14} className="me-2" /> Cert. Estudios
                  </div>
                  {data.tiene_certificado_estudios ? (
                    <CBadge color="success">SÍ</CBadge>
                  ) : (
                    <CBadge color="danger">NO</CBadge>
                  )}
                </div>
                <div className="d-flex justify-content-between align-items-center p-2 bg-body-tertiary rounded-3">
                  <div className="small fw-bold ">
                    <CheckCircle size={14} className="me-2" /> Declaración
                    Jurada
                  </div>
                  <CBadge color="success">ENTREGADO</CBadge>
                </div>
                <div className="d-flex justify-content-between align-items-center p-2 bg-body-tertiary rounded-3">
                  <div className="small fw-bold ">
                    <Hash size={14} className="me-2" /> Cursará 5to Año
                  </div>
                  {data.cursara_5to_anio ? (
                    <CBadge color="info">SÍ</CBadge>
                  ) : (
                    <CBadge color="secondary">NO</CBadge>
                  )}
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* 2. DATOS PERSONALES */}
        <CCol lg={4}>
          <CCard className="h-100 border-1 shadow-sm border-top border-5 border-primary rounded-4">
            <CCardBody className="p-4">
              <h6 className="fw-black text-primary mb-4 text-uppercase d-flex align-items-center">
                <User size={20} className="me-2" /> 2. Datos Personales
              </h6>
              <Stat
                label="Fecha de Nacimiento / Edad"
                value={`${fechaFormateada} - ${data.edad} años`}
                icon={User}
                color="primary"
              />

              <Stat
                label="Género"
                value={data.genero}
                icon={Globe}
                color="primary"
              />

              <Stat
                label="Estado Civil"
                value={data.estado_civil}
                icon={Fingerprint}
                color="primary"
              />

              <Stat
                label="Celular Personal"
                value={data.celular_personal}
                icon={Phone}
                color="primary"
              />

              <Stat
                label="Celular Apoderado"
                value={data.celular_apoderado}
                icon={Phone}
                color="primary"
              />
              <Stat
                label="Correo Electrónico"
                value={data.correo_electronico}
                icon={Mail}
                color="primary"
              />
            </CCardBody>
          </CCard>
        </CCol>

        {/* 3. IDENTIDAD Y CULTURA */}
        <CCol lg={4}>
          <CCard className="h-100 border-1 shadow-sm border-top border-5 border-info rounded-4">
            <CCardBody className="p-4">
              <h6 className="fw-black text-info mb-4 text-uppercase d-flex align-items-center">
                <Globe size={20} className="me-2" /> 3. Identidad y Cultura
              </h6>
              <Stat
                label="Identidad Étnica"
                value={data.identidad_etnica}
                icon={Globe}
                color="info"
              />
              <Stat
                label="Lengua Materna"
                value={data.lengua_materna}
                icon={Languages}
                color="info"
              />

              <div className="p-2 border rounded-3 bg-info bg-opacity-10 d-flex justify-content-between align-items-center mt-3">
                <small className="fw-bold">CONADIS:</small>

                <CBadge color={tieneConadis ? "success" : "danger"}>
                  {tieneConadis ? "INSCRITO" : "NINGUNA"}
                </CBadge>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* FILA INFERIOR: 2 CARDS ANCHAS */}
      <CRow className="g-4">
        {/* 4. ORIGEN Y RESIDENCIA */}
        <CCol lg={6}>
          <CCard className="border-1 shadow-sm border-top border-5 border-warning rounded-4 h-100">
            <CCardBody className="p-4">
              <h6 className="fw-black text-warning mb-4 text-uppercase d-flex align-items-center">
                <MapPin size={20} className="me-2" /> 4. Origen y Residencia
              </h6>
              <CRow>
                <CCol md={6}>
                  <p className="small fw-bold text-muted border-bottom mb-3">
                    LUGAR DE NACIMIENTO
                  </p>
                  <Stat
                    label="País / Departamento"
                    value={`${data.pais_nacimiento} / ${data.departamento_nacimiento_nombre}`}
                    icon={Baby}
                    color="warning"
                  />
                  <Stat
                    label="Provincia / Distrito"
                    value={`${data.provincia_nacimiento_nombre} / ${data.distrito_nacimiento_nombre}`}
                    color="warning"
                  />
                </CCol>

                <CCol md={6}>
                  <p className="small fw-bold text-muted border-bottom mb-3">
                    RESIDENCIA ACTUAL
                  </p>

                  <Stat
                    label="País / Departamento"
                    value={`${data.pais_residencia} / ${data.departamento_residencia_nombre}`}
                    icon={MapPin}
                    color="warning"
                  />

                  <Stat
                    label="Provincia / Distrito"
                    value={`${data.provincia_residencia_nombre} / ${data.distrito_residencia_nombre}`}
                    color="warning"
                  />

                  {/* DIRECCIÓN DESTACADA */}
                  {/* <div className="mt-3 p-3 rounded-3 border bg-warning bg-opacity-10"> */}
                  <div className="mt-3 p-3 rounded-4 border-start border-4 border-warning bg-body-tertiary">
                    <p className="text-muted small fw-bold mb-1">
                      DIRECCIÓN COMPLETA
                    </p>
                    <p className="mb-0 fw-semibold">
                      {data.direccion_completa || "---"}
                    </p>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>

        {/* 5. FORMACIÓN ESCOLAR */}
        <CCol lg={6}>
          <CCard className="border-1 shadow-sm border-top border-5 border-success rounded-4 h-100">
            <CCardBody className="p-4">
              <h6 className="fw-black text-success mb-4 text-uppercase d-flex align-items-center">
                <GraduationCap size={20} className="me-2" /> 5. Formación
                Escolar
              </h6>

              {/* LOCALIDAD ESCOLAR DESTACADA */}
              <div className="mb-3 p-3 rounded-3 bg-success bg-opacity-10 border">
                <p className="small text-muted fw-bold mb-1">
                  LOCALIDAD ESCOLAR
                </p>
                <p className="mb-0 fw-semibold">
                  {`${data.departamento_colegio_nombre} - 
                    ${data.provincia_colegio_nombre} - 
                    ${data.distrito_colegio_nombre}`}
                </p>
              </div>

              <Stat
                label="Colegio"
                value={data.nombre_colegio}
                icon={School}
                color="success"
              />

              <Stat
                label="Año de Egreso"
                value={data.anio_termino_secundaria}
                icon={Calendar}
                color="success"
              />

              <div className="mt-3 d-flex justify-content-between align-items-center">
                <small className="fw-bold text-muted">
                  GESTIÓN DE DEPENDENCIA
                </small>
                <CBadge color={gestion_dependencia ? "primary" : "secondary"}>
                  {gestion_dependencia ? "PRIVADA" : "PÚBLICA"}
                </CBadge>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* 6. DATOS DE POSTULACIÓN */}
        <CCol lg={6}>
          <CCard className="border-1 shadow-sm border-top border-5 border-primary rounded-4 h-100">
            <CCardBody className="p-4">
              <h6 className="fw-black text-tertiary mb-4 text-uppercase d-flex align-items-center">
                <FileBadge size={20} className="me-2" /> 6. Datos de Postulación
              </h6>

              {/* Carrera destacada */}
              <div className="p-4 rounded-4 bg-tertiary  text-center shadow-sm mb-4">
                <p className="small mb-1 text-uppercase">Escuela Profesional</p>
                <h5 className="fw-bold mb-0">{data.escuela_profesional}</h5>
              </div>

              <div className="d-flex justify-content-between align-items-center p-3 border rounded-3 bg-body-tertiary">
                <small className="fw-bold text-muted">Otra Universidad</small>
                <CBadge
                  color={esta_en_otra_universidad ? "warning" : "secondary"}
                >
                  {esta_en_otra_universidad ? "SÍ" : "NO"}
                </CBadge>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* 6. VERIFICACIÓN DE FICHA */}
        <CCol lg={6}>
          <CCard className="border-1 shadow-sm border-bottom border-5 border-info rounded-4 h-100">
            <CCardBody className="p-4">
              <h5 className="mb-4 d-flex align-items-center gap-2">
                <ShieldCheck size={20} className="text-info" /> Verificación
              </h5>

              {/* Estado principal */}
              <div
                className={`text-center p-4 rounded-4 border border-2 mb-3 ${
                  data.estado === "INSCRITO"
                    ? "bg-success bg-opacity-10 border-success"
                    : data.estado === "RECHAZADO"
                      ? "bg-danger bg-opacity-10 border-danger"
                      : "bg-warning bg-opacity-10 border-warning"
                }`}
              >
                {/* Icono dinámico */}
                {estadoIcono && (
                  <IconoEstado size={48} className={`mb-3 ${estadoColor}`} />
                )}

                {/* Estado */}
                <h4 className={`fw-bold mb-2 ${estadoColor}`}>{data.estado}</h4>

                {/* Mensaje */}
                {data.estado === "RECHAZADO" && data.motivo_rechazo ? (
                  <p className="small mb-0">
                    <strong>Motivo del rechazo:</strong> {data.motivo_rechazo}
                  </p>
                ) : (
                  <p className="small mb-0">{estadoMensaje}</p>
                )}
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* ACCIONES FINALES */}

      {/* {data.estado === "PENDIENTE" && (
        
        <div className="mt-5 p-4 bg-body-tertiary rounded-4 shadow-sm border d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div>
            <h5 className="fw-black mb-1">¿Deseas validar este expediente?</h5>
            <p className="text-muted m-0 small">
              Al aprobarlo, el postulante quedará oficialmente inscrito en el
              sistema.
            </p>
          </div>
          
          <div className="d-flex flex-column flex-sm-row gap-2  w-sm-auto">
            <CButton
              color="danger"
              variant="ghost"
              className="fw-bold w-100 w-sm-auto"
              onClick={() => setModalRechazo(true)}
            >
              RECHAZAR
            </CButton>
            <CButton
              color="success"
              className="px-5 text-white fw-bold shadow  w-sm-auto"
              onClick={() => actualizarEstado("INSCRITO")}
              disabled={accionLoading}
            >
              {accionLoading ? <CSpinner size="sm" /> : "APROBAR INSCRIPCIÓN"}
            </CButton>
          </div>
        </div>
        
      )} */}

      {data.estado === "PENDIENTE" && (
        <div className="mt-5 p-4 bg-body-tertiary rounded-4 shadow-sm border d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div>
            <h5 className="fw-black mb-1">¿Deseas validar este expediente?</h5>
            <p className="text-muted m-0 small">
              Al aprobarlo, el postulante quedará oficialmente inscrito en el
              sistema.
            </p>
          </div>
          <div className="d-flex flex-column flex-sm-row gap-2 w-sm-auto">
            <CButton
              color="danger"
              variant="ghost"
              className="fw-bold w-100 w-sm-auto"
              onClick={() => setModalRechazo(true)}
            >
              RECHAZAR
            </CButton>
            <CButton
              color="success"
              className="px-5 text-white fw-bold shadow w-100 w-sm-auto"
              onClick={() => actualizarEstado("INSCRITO")}
              disabled={accionLoading}
            >
              {accionLoading ? <CSpinner size="sm" /> : "APROBAR INSCRIPCIÓN"}
            </CButton>
          </div>
        </div>
      )}

      {/* MODAL RECHAZO */}
      <CModal
        visible={modalRechazo}
        onClose={() => setModalRechazo(false)}
        alignment="center"
      >
        <CModalHeader className="bg-danger text-tertiary border-0 py-3">
          <h5 className="m-0 fw-bold">Motivo de Rechazo</h5>
        </CModalHeader>
        <CModalBody className="p-4 text-tertiary">
          <p className="text-muted mb-3 small">
            Sea específico con el motivo, esta información será enviada al
            postulante.
          </p>
          <CFormTextarea
            value={motivoRechazo}
            onChange={(e) => setMotivoRechazo(e.target.value)}
            rows={4}
            // placeholder="Escriba aquí por qué no procede la preinscripción..."
            className="border-0 bg-body-tertiary"
          />
        </CModalBody>
        <CModalFooter className="border-0">
          <CButton
            color="secondary"
            variant="ghost"
            onClick={() => setModalRechazo(false)}
          >
            Cancelar
          </CButton>
          <CButton
            color="danger"
            className="text-white px-4 fw-bold"
            onClick={() => actualizarEstado("RECHAZADO")}
            disabled={accionLoading}
          >
            CONFIRMAR RECHAZO
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default PreinscripcionDetalle;
