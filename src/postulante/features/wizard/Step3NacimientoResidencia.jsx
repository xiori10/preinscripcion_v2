import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";

import apiClient from "../../../services/api";

// import { format } from 'date-fns';

const Step3NacimientoResidencia = ({
  data,
  updateData,
  nextStep,
  prevStep,
}) => {
  const [errors, setErrors] = useState({});

  const [departamentos, setDepartamentos] = useState([]);
  const [provinciasNacimiento, setProvinciasNacimiento] = useState([]);
  const [distritosNacimiento, setDistritosNacimiento] = useState([]);

  const [provinciasResidencia, setProvinciasResidencia] = useState([]);
  const [distritosResidencia, setDistritosResidencia] = useState([]);

  // 🔹 CAMBIO AQUÍ - Función helper para generar ubigeo completo
  const getUbigeoCompleto = (
    departamentoId,
    provinciaId,
    distritoId,
    listaDepartamentos,
    listaProvincias,
    listaDistritos,
  ) => {
    const dep = listaDepartamentos.find(
      (d) => String(d.id_ubigeo) === String(departamentoId),
    );
    const prov = listaProvincias.find(
      (p) => String(p.id_ubigeo) === String(provinciaId),
    );
    const dist = listaDistritos.find(
      (d) => String(d.id_ubigeo) === String(distritoId),
    );

    if (!dep || !prov || !dist) return "";

    // Código de 2 dígitos departamento + 2 dígitos provincia + 2 dígitos distrito
    return dep.codigo_ubigeo + prov.codigo_ubigeo + dist.codigo_ubigeo;
  };

  // importar departamentos
  useEffect(() => {
    apiClient
      .get("/ubigeos/departamentos")
      .then((res) => setDepartamentos(res.data))
      .catch(() => setDepartamentos([]));
  }, []);

  // importar provincias
  useEffect(() => {
    if (!data.departamentoNacimiento) return;

    apiClient
      .get("/ubigeos/provincias", {
        params: { departamento: data.departamentoNacimiento },
      })
      .then((res) => {
        setProvinciasNacimiento(res.data);
        // setDistritosNacimiento(res.data);
        updateData({ provinciaNacimiento: "", distritoNacimiento: "" });
      });
  }, [data.departamentoNacimiento]);

  // importar distritos
  useEffect(() => {
    if (!data.provinciaNacimiento) return;

    apiClient
      .get("/ubigeos/distritos", {
        params: {
          departamento: data.departamentoNacimiento,
          provincia: data.provinciaNacimiento,
        },
      })
      .then((res) => setDistritosNacimiento(res.data));
  }, [data.provinciaNacimiento, data.departamentoNacimiento]);

  // 🔹 Autocompletar ubigeo de nacimiento desde el distrito seleccionado
  // useEffect(() => {
  //   if (data.distritoNacimiento) {
  //     updateData({
  //       ubigeoNacimiento: data.distritoNacimiento,
  //     });
  //   }
  // }, [data.distritoNacimiento]);

  useEffect(() => {
    if (!data.departamentoResidencia) {
      setProvinciasResidencia([]);
      setDistritosResidencia([]);
      return;
    }

    apiClient
      .get("/ubigeos/provincias", {
        params: { departamento: data.departamentoResidencia },
      })
      .then((res) => {
        setProvinciasResidencia(res.data);
        updateData({
          provinciaResidencia: "",
          distritoResidencia: "",
        });
      })
      .catch(() => {
        setProvinciasResidencia([]);
        setDistritosResidencia([]);
      });
  }, [data.departamentoResidencia]);

  useEffect(() => {
    if (!data.provinciaResidencia) {
      setDistritosResidencia([]);
      return;
    }

    apiClient
      .get("/ubigeos/distritos", {
        params: {
          provincia: data.provinciaResidencia,
        },
      })
      .then((res) => setDistritosResidencia(res.data))
      .catch(() => setDistritosResidencia([]));
  }, [data.provinciaResidencia]);

  // const handleChange = (field, value) => {
  //   const updates = { [field]: value };

  //   // Lógica de reseteo para Nacimiento
  //   if (field === "departamentoNacimiento") {
  //     updates.provinciaNacimiento = "";
  //     updates.distritoNacimiento = "";
  //     setDistritosNacimiento([]);
  //   }
  //   if (field === "provinciaNacimiento") {
  //     updates.distritoNacimiento = "";
  //   }

  //   // Lógica de reseteo para Residencia
  //   if (field === "departamentoResidencia") {
  //     updates.provinciaResidencia = "";
  //     updates.distritoResidencia = "";
  //     setDistritosResidencia([]);
  //   }
  //   if (field === "provinciaResidencia") {
  //     updates.distritoResidencia = "";
  //   }

  //   updateData(updates);

  //   if (errors[field]) {
  //     setErrors((prev) => ({ ...prev, [field]: "" }));
  //   }
  // };

  const handleChange = (field, value) => {
    const updates = { [field]: value };

    // Departamento Nacimiento
    if (field === "departamentoNacimiento") {
      updates.provinciaNacimiento = "";
      updates.distritoNacimiento = "";
      setDistritosNacimiento([]);

      const dep = departamentos.find(
        (d) => String(d.nombre.id_ubigeo) === String(value),
      );
      const codDep = dep?.nombre.codigo_ubigeo || "";
      updates.codigoDepartamentoNacimiento = codDep; // 2 dígitos
    }

    // Provincia Nacimiento
    if (field === "provinciaNacimiento") {
      updates.distritoNacimiento = "";

      const prov = provinciasNacimiento.find(
        (p) => String(p.nombre.id_ubigeo) === String(value),
      );
      const codProv = prov?.nombre.codigo_ubigeo || "";
      const codDep = data.codigoDepartamentoNacimiento || "";

      updates.codigoProvinciaNacimiento = codDep + codProv;
    }

    // Distrito Nacimiento
    if (field === "distritoNacimiento") {
      const dist = distritosNacimiento.find(
        (d) => String(d.id_ubigeo) === String(value),
      );
      const codDist = dist?.codigo_ubigeo || "";
      const codProv = data.codigoProvinciaNacimiento || "";

      updates.codigoDistritoNacimiento = codProv + codDist;
    }

    // Departamento Residencia
    if (field === "departamentoResidencia") {
      updates.provinciaResidencia = "";
      updates.distritoResidencia = "";
      setDistritosResidencia([]);

      const dep = departamentos.find(
        (d) => String(d.nombre.id_ubigeo) === String(value),
      );
      const codDep = dep?.nombre.codigo_ubigeo || "";
      updates.codigoDepartamentoResidencia = codDep;
    }

    // Provincia Residencia
    if (field === "provinciaResidencia") {
      updates.distritoResidencia = "";

      const prov = provinciasResidencia.find(
        (p) => String(p.nombre.id_ubigeo) === String(value),
      );
      const codProv = prov?.nombre.codigo_ubigeo || "";
      const codDep = data.codigoDepartamentoResidencia || "";

      updates.codigoProvinciaResidencia = codDep + codProv;
    }

    // Distrito Residencia
    if (field === "distritoResidencia") {
      const dist = distritosResidencia.find(
        (d) => String(d.id_ubigeo) === String(value),
      );
      const codDist = dist?.codigo_ubigeo || "";
      const codProv = data.codigoProvinciaResidencia || "";

      updates.codigoDistritoResidencia = codProv + codDist;
    }
    updateData(updates);

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return null;
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const validateAndNext = () => {
    // console.log("DATA AL VALIDAR:", data);
    const newErrors = {};

    // Validar fecha de nacimiento
    if (!data.fechaNacimiento) {
      newErrors.fechaNacimiento = "La fecha de nacimiento es obligatoria";
    } else {
      const edad = calcularEdad(data.fechaNacimiento);
      if (edad < 16) {
        newErrors.fechaNacimiento = "Debe tener al menos 16 años para postular";
      } else if (edad > 100) {
        newErrors.fechaNacimiento =
          "Por favor verifique la fecha de nacimiento";
      }
    }

    // Nacimiento
    if (!data.departamentoNacimiento) {
      newErrors.departamentoNacimiento =
        "Seleccione el departamento de nacimiento";
    }

    if (!data.provinciaNacimiento) {
      newErrors.provinciaNacimiento = "Ingrese la provincia de nacimiento";
    }

    if (!data.distritoNacimiento) {
      newErrors.distritoNacimiento = "Ingrese el distrito de nacimiento";
    }

    // if (!data.ubigeoNacimiento?.trim() || data.ubigeoNacimiento.length !== 6) {
    //   newErrors.ubigeoNacimiento = "Ingrese el ubigeo completo (6 dígitos)";
    // }

    // Residencia
    if (!data.departamentoResidencia) {
      newErrors.departamentoResidencia =
        "Seleccione el departamento de residencia";
    }

    if (!data.provinciaResidencia) {
      newErrors.provinciaResidencia = "Ingrese la provincia de residencia";
    }

    if (!data.distritoResidencia) {
      newErrors.distritoResidencia = "Ingrese el distrito de residencia";
    }

    if (!data.direccionCompleta?.trim()) {
      newErrors.direccionCompleta = "Ingrese su dirección completa";
    }

    // Mostrar errores si existen
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    nextStep();
  };

  return (
    <div className="wizard-form-section">
      <h3 className="form-section-title">
        Paso 3: Datos de Nacimiento y Residencia
      </h3>

      <Form>
        {/* DATOS DE NACIMIENTO */}
        <div className="mb-5">
          <h4 className="text-primary mb-4">
            <i className="bi bi-calendar-heart me-2"></i>
            Datos de Nacimiento
          </h4>

          <Alert variant="info">
            <i className="bi bi-info-circle-fill me-2"></i>
            Para validar el ubigeo, consulte su DNI. El código se encuentra en
            la parte posterior del documento.
          </Alert>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>
                  Fecha de Nacimiento <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  value={data.fechaNacimiento}
                  onChange={(e) =>
                    handleChange("fechaNacimiento", e.target.value)
                  }
                  isInvalid={!!errors.fechaNacimiento}
                  max={new Date().toISOString().split("T")[0]}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fechaNacimiento}
                </Form.Control.Feedback>
                {data.fechaNacimiento && !errors.fechaNacimiento && (
                  <Form.Text className="text-success">
                    ✓ Edad: {calcularEdad(data.fechaNacimiento)} años
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>
                  País de Nacimiento <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={data.paisNacimiento}
                  readOnly
                  className="bg-light"
                />
              </Form.Group>
            </Col>

            {/* DEPARTAMENTO NACIMIENTO */}

            <Col md={4} className="mb-3">
              <Form.Group>
                <Form.Label>
                  Departamento <span className="text-danger">*</span>
                </Form.Label>

                <Form.Select
                  value={data.departamentoNacimiento}
                  // onChange={e => handleChange('departamentoNacimiento', e.target.value)}}

                  onChange={(e) =>
                    handleChange(
                      "departamentoNacimiento",
                      String(e.target.value),
                    )
                  }
                >
                  <option value="">Seleccione...</option>
                  {departamentos.map((dep) => (
                    <option
                      key={dep.nombre.id_ubigeo}
                      value={dep.nombre.id_ubigeo}
                    >
                      {dep.nombre.nombre_ubigeo}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.departamentoNacimiento}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* PROVINCIA NACIMIENTO */}

            <Col md={4} className="mb-3">
              <Form.Group>
                <Form.Label>
                  Provincia <span className="text-danger">*</span>
                </Form.Label>

                <Form.Select
                  value={data.provinciaNacimiento || ""}
                  // onChange={e => handleChange('provinciaNacimiento', e.target.value)}

                  onChange={(e) =>
                    handleChange("provinciaNacimiento", String(e.target.value))
                  }
                >
                  <option value="">Seleccione...</option>

                  {provinciasNacimiento.map((p) => (
                    <option key={p.nombre.id_ubigeo} value={p.nombre.id_ubigeo}>
                      {p.nombre.nombre_ubigeo}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.provinciaNacimiento}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* distrito de nacimiento */}

            <Col md={4} className="mb-3">
              <Form.Group>
                <Form.Label>
                  Distrito <span className="text-danger">*</span>
                </Form.Label>

                {/* <Form.Select
                value={data.distritoNacimiento || ""}
                // onChange={e => handleChange('distritoNacimiento', e.target.value)}
                onChange={e => handleChange('distritoNacimiento', String(e.target.value))}


              > */}

                <Form.Select
                  value={String(data.distritoNacimiento || "")}
                  onChange={(e) => {
                    const distritoId = String(e.target.value);
                    handleChange("distritoNacimiento", distritoId); // para código

                    updateData({
                      ubigeoNacimiento: getUbigeoCompleto(
                        data.departamentoNacimiento,
                        data.provinciaNacimiento,
                        distritoId,
                        departamentos.map((d) => d.nombre),
                        provinciasNacimiento.map((p) => p.nombre),
                        distritosNacimiento,
                      ),
                    });

                    if (errors.distritoNacimiento) {
                      setErrors((prev) => ({
                        ...prev,
                        distritoNacimiento: "",
                      }));
                    }
                  }}
                >
                  <option value="">Seleccione...</option>

                  {distritosNacimiento.map((d) => (
                    <option key={d.id_ubigeo} value={d.id_ubigeo}>
                      {d.nombre_ubigeo}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.distritoNacimiento}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12} className="mb-3">
              <Form.Group>
                <Form.Label>
                  Ubigeo de Nacimiento (DNI){" "}
                  <span className="text-danger">*</span>
                </Form.Label>

                {/* <Form.Control
                  type="text"
                  placeholder="6 dígitos - Ej: 210101"
                  value={data.ubigeoNacimiento}
                  onChange={(e) =>
                    handleChange(
                      "ubigeoNacimiento",
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  maxLength="6"
                  isInvalid={!!errors.ubigeoNacimiento}
                /> */}
                <Form.Control
                  type="text"
                  value={data.ubigeoNacimiento}
                  readOnly
                  className="bg-light"
                  isInvalid={!!errors.ubigeoNacimiento}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.ubigeoNacimiento}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  Ubique el código de 6 dígitos en la parte posterior de su DNI
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
        </div>

        {/* DATOS DE RESIDENCIA */}
        <div className="mb-4">
          <h4 className="text-primary mb-4">
            <i className="bi bi-house-door me-2"></i>
            Datos de Residencia Actual
          </h4>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>
                  País de Residencia <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={data.paisResidencia}
                  readOnly
                  className="bg-light"
                />
              </Form.Group>
            </Col>

            {/* departamento de residencia */}

            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>
                  Departamento <span className="text-danger">*</span>
                </Form.Label>

                <Form.Select
                  value={data.departamentoResidencia}
                  // onChange={e => handleChange('departamentoResidencia', e.target.value)}

                  onChange={(e) =>
                    handleChange(
                      "departamentoResidencia",
                      String(e.target.value),
                    )
                  }
                >
                  <option value="">Seleccione...</option>
                  {departamentos.map((dep) => (
                    <option
                      key={dep.nombre.id_ubigeo}
                      value={dep.nombre.id_ubigeo}
                    >
                      {dep.nombre.nombre_ubigeo}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.departamentoResidencia}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* provincia de residencia */}

            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>
                  Provincia <span className="text-danger">*</span>
                </Form.Label>

                <Form.Select
                  value={data.provinciaResidencia}
                  // onChange={e => handleChange('provinciaResidencia', e.target.value)}

                  onChange={(e) =>
                    handleChange("provinciaResidencia", String(e.target.value))
                  }
                >
                  <option value="">Seleccione...</option>

                  {provinciasResidencia.map((p) => (
                    <option key={p.nombre.id_ubigeo} value={p.nombre.id_ubigeo}>
                      {p.nombre.nombre_ubigeo}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.provinciaResidencia}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* distrito de residencia */}

            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>
                  Distrito <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  value={String(data.distritoResidencia || "")}
                  onChange={(e) => {
                    const distritoId = String(e.target.value);
                    handleChange("distritoResidencia", distritoId);

                    updateData({
                      ubigeoResidencia: getUbigeoCompleto(
                        data.departamentoResidencia,
                        data.provinciaResidencia,
                        distritoId,
                        departamentos.map((d) => d.nombre),
                        provinciasResidencia.map((p) => p.nombre),
                        distritosResidencia,
                      ),
                    });

                    if (errors.distritoResidencia) {
                      setErrors((prev) => ({
                        ...prev,
                        distritoResidencia: "",
                      }));
                    }
                  }}
                >
                  <option value="">Seleccione...</option>

                  {distritosResidencia.map((d) => (
                    <option key={d.id_ubigeo} value={d.id_ubigeo}>
                      {d.nombre_ubigeo}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.distritoResidencia}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12} className="mb-3">
              <Form.Group>
                <Form.Label>
                  Dirección Completa <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Av/Jr/Calle, número, urbanización, referencia..."
                  value={data.direccionCompleta}
                  onChange={(e) =>
                    handleChange(
                      "direccionCompleta",
                      e.target.value.toUpperCase(),
                    )
                  }
                  isInvalid={!!errors.direccionCompleta}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.direccionCompleta}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </div>

        <div className="wizard-buttons">
          <Button variant="secondary" onClick={prevStep} className="btn-wizard">
            ← Anterior
          </Button>
          <Button
            variant="primary"
            onClick={validateAndNext}
            className="btn-wizard"
          >
            Siguiente →
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Step3NacimientoResidencia;
