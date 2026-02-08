import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import apiClient from "../../../services/api";

const Step4DatosColegio = ({ data, updateData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({});

  const [departamentos, setDepartamentos] = useState([]);
  const [provinciasColegio, setProvinciasColegio] = useState([]);
  const [distritosColegio, setDistritosColegio] = useState([]);

  const [colegios, setColegios] = useState([]);
  // const [loadingColegios, setLoadingColegios] = useState(false);
  const [loadingColegios, setLoadingColegios] = useState(false);

  /* ================= DEPARTAMENTOS ================= */
  useEffect(() => {
    apiClient
      .get("/ubigeos/departamentos")
      .then((res) => setDepartamentos(res.data))
      .catch(() => setDepartamentos([]));
  }, []);

  /* ================= PROVINCIAS ================= */
  // useEffect(() => {
  //   if (!data.departamentoColegio) return;

  //   apiClient.get('/ubigeos/provincias', {
  //     params: { departamento: data.departamentoColegio }
  //   }).then(res => {
  //     setProvinciasColegio(res.data);
  //     updateData({ provinciaColegio: '', distritoColegio: '' });
  //   });
  // }, [data.departamentoColegio]);

  useEffect(() => {
    if (!data.departamentoColegio) return;

    apiClient
      .get("/ubigeos/provincias", {
        params: { departamento: data.departamentoColegio },
      })
      .then((res) => {
        setProvinciasColegio(res.data);
        updateData({ provinciaColegio: "", distritoColegio: "" });
      });
  }, [data.departamentoColegio, updateData]);

  /* ================= DISTRITOS ================= */
  useEffect(() => {
    if (!data.provinciaColegio) return;

    apiClient
      .get("/ubigeos/distritos", {
        params: {
          departamento: data.departamentoColegio,
          provincia: data.provinciaColegio,
        },
      })
      .then((res) => setDistritosColegio(res.data));
  }, [data.provinciaColegio, data.departamentoColegio]);

  /* ================= COLEGIOS ================= */
  // useEffect(() => {
  //   if (
  //     data.departamentoColegio &&
  //     data.provinciaColegio &&
  //     data.distritoColegio &&
  //     departamentos.length > 0 &&
  //     provinciasColegio.length > 0 &&
  //     distritosColegio.length > 0
  //   ) {
  //     fetchColegios();
  //   } else {
  //     setColegios([]);
  //   }
  // });
  // , [
  //   data.departamentoColegio,
  //   data.provinciaColegio,
  //   data.distritoColegio,
  //   departamentos,
  //   provinciasColegio,
  //   distritosColegio
  // ]);

  const generarAnios = () => {
    const anioActual = new Date().getFullYear();
    const anios = [];
    for (let i = anioActual + 1; i >= anioActual - 18; i--) {
      anios.push(i);
    }
    return anios;
  };

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (field, value) => {
    const updates = { [field]: value };

    // Departamento
    if (field === "departamentoColegio") {
      updates.provinciaColegio = "";
      updates.distritoColegio = "";
      setDistritosColegio([]);

      const dep = departamentos.find(
        (d) => String(d.nombre.id_ubigeo) === String(value),
      );
      const codDep = dep?.nombre.codigo_ubigeo || "";

      updates.codigoDepartamentoColegio = codDep; // 2 dígitos
      updates.departamentoColegioNombre = dep?.nombre.nombre_ubigeo || "";

      // Reset códigos provincia y distrito
      updates.codigoProvinciaColegio = "";
      updates.codigoDistritoColegio = "";
    }

    // Provincia
    if (field === "provinciaColegio") {
      updates.distritoColegio = "";

      const prov = provinciasColegio.find(
        (p) => String(p.nombre.id_ubigeo) === String(value),
      );
      const codDep = data.codigoDepartamentoColegio || ""; // siempre desde data
      const codProv = prov?.nombre.codigo_ubigeo || "";

      updates.codigoProvinciaColegio = codDep + codProv; // 4 dígitos
      updates.provinciaColegioNombre = prov?.nombre.nombre_ubigeo || "";

      // Reset código distrito
      updates.codigoDistritoColegio = "";
    }

    // Distrito
    if (field === "distritoColegio") {
      const dist = distritosColegio.find(
        (d) => String(d.id_ubigeo) === String(value),
      );

      const codDep = data.codigoDepartamentoColegio || "";
      const codProv = (data.codigoProvinciaColegio || "").slice(-2); // últimos 2 dígitos
      const codDist = dist?.codigo_ubigeo || "";

      updates.codigoDistritoColegio = codDep + codProv + codDist; // 6 dígitos
      updates.distritoColegioNombre = dist?.nombre_ubigeo || "";
    }

    updateData(updates);

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  /* ================= FETCH COLEGIOS ================= */

  const fetchColegios = useCallback(async () => {
    if (
      !data.departamentoColegio ||
      !data.provinciaColegio ||
      !data.distritoColegio
    ) {
      setColegios([]);
      return;
    }

    setLoadingColegios(true);
    try {
      const depNombre = data.departamentoColegioNombre;
      const provNombre = data.provinciaColegioNombre;
      const distNombre = data.distritoColegioNombre;

      if (!depNombre || !provNombre || !distNombre) {
        setColegios([]);
        return;
      }

      const res = await apiClient.get(
        `/colegios/${depNombre}/${provNombre}/${distNombre}`,
      );

      if (res && res.data) {
        setColegios(res.data);
      } else {
        setColegios([]);
      }
    } catch (error) {
      console.error("Error al traer colegios:", error);
      setColegios([]);
    } finally {
      setLoadingColegios(false);
    }
  }, [
    data.departamentoColegio,
    data.provinciaColegio,
    data.distritoColegio,
    data.departamentoColegioNombre,
    data.provinciaColegioNombre,
    data.distritoColegioNombre,
  ]);

  useEffect(() => {
    fetchColegios();
  }, [fetchColegios]);

  /* ================= VALIDATE AND NEXT ================= */
  const validateAndNext = () => {
    const newErrors = {};

    if (!data.anioTerminoSecundaria)
      newErrors.anioTerminoSecundaria = "Seleccione el año";
    if (!data.departamentoColegio)
      newErrors.departamentoColegio = "Seleccione el departamento de colegio";
    if (!data.provinciaColegio)
      newErrors.provinciaColegio = "Ingrese la provincia de colegio";
    if (!data.distritoColegio)
      newErrors.distritoColegio = "Ingrese el distrito de colegio";
    if (!data.nombreColegio?.trim())
      newErrors.nombreColegio = "Ingrese el nombre del colegio";

    // ⭐ VALIDACIÓN CLAVE PARA "OTRO"
    if (data.nombreColegio === "OTRO" && !data.nombreColegioManual?.trim()) {
      newErrors.nombreColegioManual = "Debe ingresar el nombre del colegio";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    nextStep();
  };

  /* ================= RENDER ================= */
  return (
    <div className="wizard-form-section">
      <h3 className="form-section-title">Paso 4: Datos del Colegio</h3>

      <Alert variant="info" className="mb-4">
        <i className="bi bi-info-circle-fill me-2"></i>
        Ingrese la información de la institución educativa donde cursó o cursa
        su educación secundaria.
      </Alert>

      <Form>
        <Row>
          {/* Año término secundaria */}
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>
                Año que terminó o terminará secundaria{" "}
                <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={data.anioTerminoSecundaria}
                onChange={(e) =>
                  handleChange("anioTerminoSecundaria", e.target.value)
                }
                isInvalid={!!errors.anioTerminoSecundaria}
              >
                <option value="">Seleccione el año...</option>
                {generarAnios().map((anio) => (
                  <option key={anio} value={anio}>
                    {anio}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.anioTerminoSecundaria}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* País */}
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>
                País donde estudió <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={data.paisColegio}
                readOnly
                className="bg-light"
              />
            </Form.Group>
          </Col>

          {/* Departamento */}
          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label>
                Departamento <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={data.departamentoColegio || ""}
                onChange={(e) =>
                  handleChange("departamentoColegio", String(e.target.value))
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
                {errors.departamentoColegio}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Provincia */}
          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label>
                Provincia <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={data.provinciaColegio || ""}
                onChange={(e) =>
                  handleChange("provinciaColegio", String(e.target.value))
                }
              >
                <option value="">Seleccione...</option>
                {provinciasColegio.map((p) => (
                  <option key={p.nombre.id_ubigeo} value={p.nombre.id_ubigeo}>
                    {p.nombre.nombre_ubigeo}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.provinciaColegio}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Distrito */}
          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label>
                Distrito <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={data.distritoColegio || ""}
                onChange={(e) =>
                  handleChange("distritoColegio", String(e.target.value))
                }
              >
                <option value="">Seleccione...</option>
                {distritosColegio.map((d) => (
                  <option key={d.id_ubigeo} value={d.id_ubigeo}>
                    {d.nombre_ubigeo}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.distritoColegio}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Nombre del colegio */}
          <Col md={12} className="mb-3">
            <Form.Group>
              <Form.Label>
                Nombre del Colegio <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={data.nombreColegio || ""}
                onChange={(e) => handleChange("nombreColegio", e.target.value)}
                disabled={loadingColegios}
                isInvalid={!!errors.nombreColegio}
              >
                <option value="">Seleccione el colegio...</option>
                {colegios.map((colegio) => (
                  <option key={colegio.id} value={colegio.name}>
                    {colegio.name}
                  </option>
                ))}

                <option value="OTRO">Mi colegio no está en la lista</option>
              </Form.Select>

              {data.nombreColegio === "OTRO" && (
                <Form.Control
                  type="text"
                  placeholder="Escriba el nombre completo de su colegio"
                  className="mt-2"
                  value={data.nombreColegioManual || ""}
                  onChange={(e) =>
                    handleChange("nombreColegioManual", e.target.value)
                  }
                  isInvalid={!!errors.nombreColegioManual}
                />
              )}

              <Form.Control.Feedback type="invalid">
                {errors.nombreColegio}
              </Form.Control.Feedback>

              {loadingColegios && (
                <Spinner animation="border" size="sm" className="mt-2" />
              )}
              <Form.Text className="text-muted">
                Ingrese el nombre completo tal como aparece en su certificado de
                estudios
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        {parseInt(data.anioTerminoSecundaria) > new Date().getFullYear() && (
          <Alert variant="warning">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            <strong>Nota:</strong> Deberá presentar una carta de compromiso de
            su colegio al momento de la inscripción presencial.
          </Alert>
        )}

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

export default Step4DatosColegio;
