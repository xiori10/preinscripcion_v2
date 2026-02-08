import { useLocation, useNavigate } from "react-router-dom";
import { useState , useEffect} from "react";
// import { Form, Button, Alert } from "react-bootstrap";
import { Form, Button, Alert, Row, Col, Container } from "react-bootstrap";
import apiClient ,{ modificarPreinscripcion } from "../../services/api";


// import { modificarPreinscripcion } from "@/services/api";

const ModificarPreinscripcion = () => {

 
  // const resolverUbigeo = (lista, valorBD) => {
  //   if (!valorBD || !Array.isArray(lista)) return "";

  //   // si ya es ubigeo completo
  //   if (valorBD.length > 2) return valorBD;

  //   const codigo = valorBD.padStart(2, "0");

  //   const encontrado = lista.find(item =>
  //     item.nombre.id_ubigeo.endsWith(codigo)
  //   );

  //   return encontrado ? encontrado.nombre.id_ubigeo : "";
  // };


      const resolverUbigeo = (lista, valorBD) => {
        if (!valorBD || !Array.isArray(lista)) return "";

        const str = String(valorBD);

        // 1️⃣ Si ya es id_ubigeo del select
        const porId = lista.find(item =>
          String(item.nombre?.id_ubigeo ?? item.id_ubigeo) === str
        );
        if (porId) return String(porId.nombre?.id_ubigeo ?? porId.id_ubigeo);

        // 2️⃣ Buscar por código (2 dígitos) usando endsWith
        const encontrado = lista.find(item => {
          const codigo = String(item.nombre?.codigo_ubigeo ?? item.codigo_ubigeo);
          return str.endsWith(codigo);
        });

        return encontrado
          ? String(encontrado.nombre?.id_ubigeo ?? encontrado.id_ubigeo)
          : "";
      };



      const [errors , setErrors] = useState({});

      const { state } = useLocation();
      const navigate = useNavigate();

      const [error, setError] = useState("");
      const [loading, setLoading] = useState(false);

    // 🔹 valores seguros por defecto
    const preinscripcion = state?.preinscripcion;
    const codigoSeguridad = state?.codigoSeguridad;

    const formatDateForInput = (date) => {
      if (!date) return "";
      return date.split("T")[0];
      };




  // =======================
// STATE
// =======================
const [formData, setFormData] = useState({
  
  tiene_dni: preinscripcion?.tiene_dni ?? "",
  tiene_certificado_estudios: preinscripcion?.tiene_certificado_estudios ?? "",
  cursara_5to_anio: preinscripcion?.cursara_5to_anio ?? "",
  tipo_documento: preinscripcion?.tipo_documento ?? "",
  numero_documento: preinscripcion?.numero_documento ?? "",

  nombres: preinscripcion?.nombres || "",
  apellido_paterno: preinscripcion?.apellido_paterno || "",
  apellido_materno: preinscripcion?.apellido_materno || "",
  celular_personal: preinscripcion?.celular_personal || "",
  celular_apoderado: preinscripcion?.celular_apoderado || "",
  correo_electronico: preinscripcion?.correo_electronico || "",
  genero: preinscripcion?.genero || "",
  estado_civil: preinscripcion?.estado_civil || "",
  fecha_nacimiento: formatDateForInput(preinscripcion?.fecha_nacimiento),

  pais_nacimiento: preinscripcion?.pais_nacimiento || "",
  departamento_nacimiento: "",
  provincia_nacimiento: "",
  distrito_nacimiento: "",

  pais_residencia: preinscripcion?.pais_residencia || "",
  departamento_residencia: "",
  provincia_residencia: "",
  distrito_residencia: "",

  direccion_completa: preinscripcion?.direccion_completa || "",
  anio_termino_secundaria: preinscripcion?.anio_termino_secundaria || "",
  pais_colegio: preinscripcion?.pais_colegio || "",
  departamento_colegio: preinscripcion?.departamento_colegio || "",
  provincia_colegio: preinscripcion?.provincia_colegio || "",
  distrito_colegio: preinscripcion?.distrito_colegio || "",
  nombre_colegio: preinscripcion?.nombre_colegio || "",
  escuela_profesional: preinscripcion?.escuela_profesional || "",
  esta_en_otra_universidad: preinscripcion?.esta_en_otra_universidad || "",
  identidad_etnica: preinscripcion?.identidad_etnica || "",
  tiene_conadis: preinscripcion?.tiene_conadis || "",
  lengua_materna: preinscripcion?.lengua_materna || "",
});

const [departamentos, setDepartamentos] = useState([]);
const [provinciasNacimiento, setProvinciasNacimiento] = useState([]);
const [distritosNacimiento, setDistritosNacimiento] = useState([]);
const [provinciasResidencia, setProvinciasResidencia] = useState([]);
const [distritosResidencia, setDistritosResidencia] = useState([]);

const precargando = Boolean(preinscripcion);

  // =======================
  // DEPARTAMENTOS
  // =======================
    useEffect(() => {
      apiClient
        .get("/ubigeos/departamentos")
        .then(res => {
          setDepartamentos(Array.isArray(res.data) ? res.data : []);
        })
        .catch(() => setDepartamentos([]));
    }, []);

    useEffect(() => {
      if (!departamentos.length || !preinscripcion) return;

      setFormData(prev => ({
        ...prev,
        departamento_nacimiento: resolverUbigeo(
          departamentos,
          preinscripcion.departamento_nacimiento
        ),
        departamento_residencia: resolverUbigeo(
          departamentos,
          preinscripcion.departamento_residencia
        ),
      }));
    }, [departamentos, preinscripcion]);

    // =======================
    // PROVINCIAS NACIMIENTO
    // =======================
    useEffect(() => {
      if (!formData.departamento_nacimiento) {
        if (!precargando) setProvinciasNacimiento([]);
        return;
      }

      apiClient
        .get("/ubigeos/provincias", {
          params: { departamento: formData.departamento_nacimiento },
        })
        .then(res => {
          setProvinciasNacimiento(Array.isArray(res.data) ? res.data : []);
        })
        .catch(() => setProvinciasNacimiento([]));
    }, [formData.departamento_nacimiento, precargando]);

    useEffect(() => {
      if (!preinscripcion || !provinciasNacimiento.length) return;

      setFormData(prev => ({
        ...prev,
        provincia_nacimiento: resolverUbigeo(
          provinciasNacimiento,
          preinscripcion.provincia_nacimiento
        ),
      }));
    }, [provinciasNacimiento, preinscripcion]);

    // =======================
    // DISTRITOS NACIMIENTO
    // =======================
    useEffect(() => {
      if (!formData.provincia_nacimiento) {
        if (!precargando) setDistritosNacimiento([]);
        return;
      }

      apiClient
        .get("/ubigeos/distritos", {
          params: { provincia: formData.provincia_nacimiento },
        })
        .then(res => {
          setDistritosNacimiento(Array.isArray(res.data) ? res.data : []);
        })
        .catch(() => setDistritosNacimiento([]));
    }, [formData.provincia_nacimiento, precargando]);

    useEffect(() => {
      if (!preinscripcion || !distritosNacimiento.length) return;

      setFormData(prev => ({
        ...prev,
        distrito_nacimiento: resolverUbigeo(
          distritosNacimiento,
          preinscripcion.distrito_nacimiento
        ),
      }));
    }, [distritosNacimiento, preinscripcion]);

    // =======================
    // PROVINCIAS RESIDENCIA
    // =======================
    useEffect(() => {
      if (!formData.departamento_residencia) {
        if (!precargando) {
          setProvinciasResidencia([]);
          setDistritosResidencia([]);
        }
        return;
      }

      apiClient
        .get("/ubigeos/provincias", {
          params: { departamento: formData.departamento_residencia },
        })
        .then(res => {
          setProvinciasResidencia(Array.isArray(res.data) ? res.data : []);
        })
        .catch(() => setProvinciasResidencia([]));
    }, [formData.departamento_residencia, precargando]);

    useEffect(() => {
      if (!preinscripcion || !provinciasResidencia.length) return;

      setFormData(prev => ({
        ...prev,
        provincia_residencia: resolverUbigeo(
          provinciasResidencia,
          preinscripcion.provincia_residencia
        ),
      }));
    }, [provinciasResidencia, preinscripcion]);

    // =======================
    // DISTRITOS RESIDENCIA
    // =======================
    useEffect(() => {
      if (!formData.provincia_residencia) {
        if (!precargando) setDistritosResidencia([]);
        return;
      }

      apiClient
        .get("/ubigeos/distritos", {
          params: { provincia: formData.provincia_residencia },
        })
        .then(res => {
          setDistritosResidencia(Array.isArray(res.data) ? res.data : []);
        })
        .catch(() => setDistritosResidencia([]));
    }, [formData.provincia_residencia, precargando]);

    useEffect(() => {
      if (!preinscripcion || !distritosResidencia.length) return;

      setFormData(prev => ({
        ...prev,
        distrito_residencia: resolverUbigeo(
          distritosResidencia,
          preinscripcion.distrito_residencia
        ),
      }));
    }, [distritosResidencia, preinscripcion]);





    // const handleChange = (e) => {
    // const { name, value } = e.target;

    // setFormData(prev => ({
    //     ...prev,
    //     [name]: value,
    // }));
    // };

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: value
  }));

  if (errors[name]) {
    setErrors(prev => ({ ...prev, [name]: "" }));
  }
};




  // ✅ ahora sí, validación
    if (!state || !preinscripcion) {
      return <Alert variant="danger">Acceso no válido</Alert>;
    }


  //   const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");

  //   try {
  //     await modificarPreinscripcion(
  //       preinscripcion.numero_documento,
  //       codigoSeguridad,
  //       formData
  //     );

  //     alert("Datos modificados correctamente");
  //     navigate("/");
  //   } catch (err) {
  //     console.error("ERROR BACKEND:", err);
  //     setError(
  //       err.response?.data?.message ||
  //         "No se pudo modificar la información"
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      try {
        // Buscar objetos seleccionados
        const depNac = departamentos.find(
          d => String(d.nombre.id_ubigeo) === String(formData.departamento_nacimiento)
        );
        const provNac = provinciasNacimiento.find(
          p => String(p.nombre.id_ubigeo) === String(formData.provincia_nacimiento)
        );
        const distNac = distritosNacimiento.find(
          d => String(d.id_ubigeo) === String(formData.distrito_nacimiento)
        );

        const depRes = departamentos.find(
          d => String(d.nombre.id_ubigeo) === String(formData.departamento_residencia)
        );
        const provRes = provinciasResidencia.find(
          p => String(p.nombre.id_ubigeo) === String(formData.provincia_residencia)
        );
        const distRes = distritosResidencia.find(
          d => String(d.id_ubigeo) === String(formData.distrito_residencia)
        );

        // Construir códigos 2 / 4 / 6 dígitos
        const codDepNac = depNac?.nombre.codigo_ubigeo || "";
        const codProvNac = provNac?.nombre.codigo_ubigeo || "";
        const codDistNac = distNac?.codigo_ubigeo || "";

        const codDepRes = depRes?.nombre.codigo_ubigeo || "";
        const codProvRes = provRes?.nombre.codigo_ubigeo || "";
        const codDistRes = distRes?.codigo_ubigeo || "";

        const payload = {
          ...formData,

          // Nacimiento
          departamento_nacimiento: codDepNac,                       // 2 dígitos
          provincia_nacimiento: codDepNac + codProvNac,            // 4 dígitos
          distrito_nacimiento: codDepNac + codProvNac + codDistNac, // 6 dígitos
          ubigeo_nacimiento: codDepNac + codProvNac + codDistNac,   // 6 dígitos

          // Residencia
          departamento_residencia: codDepRes,
          provincia_residencia: codDepRes + codProvRes,
          distrito_residencia: codDepRes + codProvRes + codDistRes,
        };

        await modificarPreinscripcion(
          preinscripcion.numero_documento,
          codigoSeguridad,
          payload
        );

        alert("Datos modificados correctamente");
        navigate("/");
      } catch (err) {
        console.error("ERROR BACKEND:", err.response?.data || err);
        setError(
          err.response?.data?.message || "No se pudo modificar la información"
        );
      } finally {
        setLoading(false);
      }
    };



  return (
    <div className="wizard-container">
      <Container>
        {/* HEADER */}
        <div className="wizard-header">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">Editar Datos de Pre-Inscripción</h2>

            <Button variant="light" onClick={() => navigate("/")}>
              ✕ Cerrar
            </Button>
          </div>

          <p className="mb-0 mt-2">
            Documento: {preinscripcion.numero_documento}
          </p>
        </div>

        {/* FORMULARIO */}
        <Form onSubmit={handleSubmit}>
          <h5 className="mt-3">Datos Personales</h5>
          {/* datos personales */}
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Nombres</Form.Label>
                <Form.Control
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Apellido Paterno</Form.Label>
                <Form.Control
                  name="apellido_paterno"
                  value={formData.apellido_paterno}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Apellido Materno</Form.Label>
                <Form.Control
                  name="apellido_materno"
                  value={formData.apellido_materno}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* genero, estado civil, fecha de nacimiento */}
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Género</Form.Label>
               <Form.Select
                    // value={data.genero}
                    name="genero"
                    value={formData?.genero || ""}
                    
                    // onChange={(e) => handleChange('genero', e.target.value)}
                    onChange={handleChange}
                    isInvalid={!!errors?.genero}
                >
                    <option value="">Seleccione...</option>
                    <option value="MASCULINO">Masculino</option>
                    <option value="FEMENINO">Femenino</option>
                    <option value="OTRO">Otro</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {errors.genero}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Estado Civil</Form.Label>

                    <Form.Select
                        value={formData?.estado_civil || ""}
                        // onChange={(e) => handleChange('estadoCivil', e.target.value)}
                        name = "estado_civil"
                        onChange={handleChange}
                        isInvalid={!!errors.estadoCivil}
                            >
                                <option value="">Seleccione...</option>
                                <option value="SOLTERO">Soltero(a)</option>
                                <option value="CASADO">Casado(a)</option>
                                <option value="CONVIVIENTE">Conviviente</option>
                                <option value="DIVORCIADO">Divorciado(a)</option>
                                <option value="VIUDO">Viudo(a)</option>
                    </Form.Select>
         

                <Form.Control.Feedback type="invalid">
                                {errors.estadoCivil}
                </Form.Control.Feedback>


              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  name="fecha_nacimiento"
                //   value={formData.fecha_nacimiento}
                    value={formData?.fecha_nacimiento || ""}
                    onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="mt-4">Contacto</h5>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Celular Personal</Form.Label>
                <Form.Control
                  name="celular_personal"
                  value={formData.celular_personal}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Celular Apoderado</Form.Label>
                <Form.Control
                  name="celular_apoderado"
                  value={formData.celular_apoderado}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="correo_electronico"
                  value={formData.correo_electronico}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="mt-4">Lugar de Nacimiento</h5>

          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>País</Form.Label>
                <Form.Control
                  name="pais_nacimiento"
                  value={formData.pais_nacimiento}
                  
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              {/* <Form.Group className="mb-3">
                <Form.Label>Departamento</Form.Label>
                <Form.Control
                  name="departamento_nacimiento"
                  value={formData.departamento_nacimiento}
                  onChange={handleChange}
                />
              </Form.Group> */}


                <Form.Group className="mb-3">
                    <Form.Label>Departamento</Form.Label>

              <Form.Select
                    name="departamento_nacimiento"
                    value={formData.departamento_nacimiento}
                    // value={formData?.departamento_nacimiento || ""}    
                    onChange={handleChange}
                    >
                    <option value="">Seleccione...</option>

                    {departamentos.map(dep => (
                        
                        <option
                        key={dep.nombre.id_ubigeo}
                        value={ dep.nombre.id_ubigeo}
                        >
                        {dep.nombre.nombre_ubigeo}
                        </option>
                    ))}
                    </Form.Select>

                </Form.Group>

            </Col>

            <Col md={3}>
              {/* <Form.Group className="mb-3">
                <Form.Label>Provincia</Form.Label>
                <Form.Control
                  name="provincia_nacimiento"
                  value={formData.provincia_nacimiento}
                  onChange={handleChange}
                />
              </Form.Group> */}

              <Form.Group className="mb-3">
                    <Form.Label>Provincia</Form.Label>

                <Form.Select
                    name="provincia_nacimiento"
                    value={formData.provincia_nacimiento}
                    onChange={handleChange}
                    >
                    <option value="">Seleccione...</option>

                    {provinciasNacimiento.map(prov => (

                        <option
                        key={prov.nombre.id_ubigeo}
                        value={prov.nombre.id_ubigeo}
                        >
                        {prov.nombre.nombre_ubigeo}
                        </option>

                 


                    ))}
                    </Form.Select>


                </Form.Group>

            </Col>

            <Col md={3}>
              {/* <Form.Group className="mb-3">
                <Form.Label>Distrito</Form.Label>
                <Form.Control
                  name="distrito_nacimiento"
                  value={formData.distrito_nacimiento}
                  onChange={handleChange}
                />
              </Form.Group> */}

              <Form.Group className="mb-3">
                <Form.Label>Distrito</Form.Label>

            <Form.Select
                name="distrito_nacimiento"
                value={formData.distrito_nacimiento}
                onChange={handleChange}
                >
                <option value="">Seleccione...</option>

                {distritosNacimiento.map(dist => (

                    <option
                    key={dist.id_ubigeo}
                    value={dist.id_ubigeo}
                    >
                    {dist.nombre_ubigeo}
                    </option>

                  


                ))}
                </Form.Select>


                </Form.Group>

            </Col>
          </Row>

          <h5 className="mt-4">Residencia Actual</h5>

          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>País</Form.Label>
                <Form.Control
                  name="pais_residencia"
                  value={formData.pais_residencia}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Departamento</Form.Label>
                <Form.Select
                    name="departamento_residencia"
                    value={formData.departamento_residencia}
                    onChange={handleChange}
                    >
                    <option value="">Seleccione...</option>

                    {departamentos.map(dep => (
                        <option
                        key={dep.nombre.id_ubigeo}
                        value={dep.nombre.id_ubigeo}
                        >
                        {dep.nombre.nombre_ubigeo}
                        </option>
                    ))}
                    </Form.Select>
            
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Provincia</Form.Label>
                    <Form.Select
                    name="provincia_residencia"
                    value={formData.provincia_residencia}
                    onChange={handleChange}
                    >
                    <option value="">Seleccione...</option>

                    {provinciasResidencia.map(prov => (
                        <option
                        key={prov.nombre.id_ubigeo}
                        value={prov.nombre.id_ubigeo}
                        >
                        {prov.nombre.nombre_ubigeo}
                        </option>
                    ))}
                    </Form.Select>  
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Distrito</Form.Label>
                    <Form.Select
                    name="distrito_residencia"
                    value={formData.distrito_residencia}
                    onChange={handleChange}
                    >
                    <option value="">Seleccione...</option>

                    {distritosResidencia.map(dist => (
                        <option
                        key={dist.id_ubigeo}
                        value={dist.id_ubigeo}
                        >
                        {dist.nombre_ubigeo}
                        </option>
                    ))}
                    </Form.Select>  
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Dirección Completa</Form.Label>
            <Form.Control
              name="direccion_completa"
              value={formData.direccion_completa}
              onChange={handleChange}
            />
          </Form.Group>

          <h5 className="mt-4">Datos Académicos</h5>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Año de Término Secundaria</Form.Label>
                <Form.Control
                  name="anio_termino_secundaria"
                  value={formData.anio_termino_secundaria}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>País del Colegio</Form.Label>
                <Form.Control
                  name="pais_colegio"
                  value={formData.pais_colegio}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del Colegio</Form.Label>
                <Form.Control
                  name="nombre_colegio"
                  value={formData.nombre_colegio}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {error && <Alert variant="danger">{error}</Alert>}

          <Button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </Form>
      </Container>

      {/* SPINNER (opcional, recomendado) */}
      {loading && (
        <div className="spinner-overlay">
          <div
            className="spinner-border text-light"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Guardando...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModificarPreinscripcion;