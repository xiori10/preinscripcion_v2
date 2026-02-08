import React, { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";

const Step5InformacionAdicional = ({
  data,
  updateData,
  prevStep,
  handleFinish,
  loading,
}) => {
  const [errors, setErrors] = useState({});
  const [confirmacion, setConfirmacion] = useState(false);

  const escuelasProfesionales = [
    "DESARROLLO DE SISTEMAS DE INFORMACION",
    "CONTABILIDAD-DIURNO",
    "CONTABILIDAD-NOCTURNO",
    "SECRETARIADO EJECUTIVO",
    "ENFERMERÍA TÉCNICA",
    "LABORATORIO CLINICO Y ANATOMIA PATOLOGICA",
    "PROTESIS DENTAL",
    "EXPLOTACION MINERA",
    "MECANICA PRODUCCION INDUSTRIAL",
    "MECANICA AUTOMOTRIZ",
    
  ];

  const identidadesEtnicas = [
    "QUECHUA",
    "AIMARA",
    "NATIVO O INDÍGENA DE LA AMAZONÍA",
    "PERTENECIENTE A OTRO PUEBLO INDÍGENA U ORIGINARIO",
    "NEGRO, MORENO, ZAMBO, MULATO/PUEBLO AFROPERUANO",
    "BLANCO",
    "MESTIZO",
    "OTRO",
  ];

  const lenguasMaternas = [
    "ESPAÑOL",
    "QUECHUA",
    "AIMARA",
    "ASHÁNINKA",
    "AWAJÚN",
    "SHIPIBO-KONIBO",
    "OTRA LENGUA NATIVA",
    "OTRA",
  ];

  const handleChange = (field, value) => {
    updateData({ [field]: value });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateAndFinish = () => {
    const newErrors = {};

    if (!data.escuelaProfesional) {
      newErrors.escuelaProfesional = "Seleccione una escuela profesional";
    }

    if (!data.estaEnOtraUniversidad) {
      newErrors.estaEnOtraUniversidad = "Responda si está en otra universidad";
    }

    if (!data.identidadEtnica) {
      newErrors.identidadEtnica = "Seleccione su identidad étnica";
    }

    if (!data.tieneCONADIS) {
      newErrors.tieneCONADIS = "Responda si cuenta con carnet CONADIS";
    }

    if (!data.lenguaMaterna) {
      newErrors.lenguaMaterna = "Seleccione su lengua materna";
    }

    if (!confirmacion) {
      newErrors.confirmacion = "Debe confirmar que los datos son correctos";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    handleFinish();
  };

  return (
    <div className="wizard-form-section">
      <h3 className="form-section-title">Paso 5: Información Adicional</h3>

      <Alert variant="success" className="mb-4">
        <i className="bi bi-check-circle-fill me-2"></i>
        <strong>¡Último paso!</strong> Complete la siguiente información para
        finalizar su pre-inscripción.
      </Alert>

      <Form>
        <Row>
          <Col md={12} className="mb-3">
            <Form.Group>
              <Form.Label>
                Escuela Profesional a la que postula{" "}
                <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={data.escuelaProfesional}
                onChange={(e) =>
                  handleChange("escuelaProfesional", e.target.value)
                }
                isInvalid={!!errors.escuelaProfesional}
              >
                <option value="">Seleccione una escuela profesional...</option>
                {escuelasProfesionales.map((escuela) => (
                  <option key={escuela} value={escuela}>
                    {escuela}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.escuelaProfesional}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>
                ¿Estás actualmente en otra universidad?{" "}
                <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={data.estaEnOtraUniversidad}
                onChange={(e) =>
                  handleChange("estaEnOtraUniversidad", e.target.value)
                }
                isInvalid={!!errors.estaEnOtraUniversidad}
              >
                <option value="">Seleccione...</option>
                <option value="SI">Sí</option>
                <option value="NO">No</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.estaEnOtraUniversidad}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>
                ¿Cuentas con carnet CONADIS?{" "}
                <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={data.tieneCONADIS}
                onChange={(e) => handleChange("tieneCONADIS", e.target.value)}
                isInvalid={!!errors.tieneCONADIS}
              >
                <option value="">Seleccione...</option>
                <option value="SI">Sí</option>
                <option value="NO">No</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.tieneCONADIS}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Consejo Nacional para la Integración de la Persona con
                Discapacidad
              </Form.Text>
            </Form.Group>
          </Col>

          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>
                Identidad Étnica <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={data.identidadEtnica}
                onChange={(e) =>
                  handleChange("identidadEtnica", e.target.value)
                }
                isInvalid={!!errors.identidadEtnica}
              >
                <option value="">Seleccione...</option>
                {identidadesEtnicas.map((identidad) => (
                  <option key={identidad} value={identidad}>
                    {identidad}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.identidadEtnica}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>
                Lengua Materna <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={data.lenguaMaterna}
                onChange={(e) => handleChange("lenguaMaterna", e.target.value)}
                isInvalid={!!errors.lenguaMaterna}
              >
                <option value="">Seleccione...</option>
                {lenguasMaternas.map((lengua) => (
                  <option key={lengua} value={lengua}>
                    {lengua}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.lenguaMaterna}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Alert variant="warning" className="mt-4">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <strong>Importante:</strong> Revise cuidadosamente todos los datos
          antes de finalizar. Solo tendrá UNA oportunidad para modificar su
          información después del registro.
        </Alert>

        <div className="mb-4 mt-4">
          <Form.Check
            type="checkbox"
            id="confirmacion"
            label={
              <span>
                <strong>
                  Declaro que toda la información proporcionada es verídica y
                  correcta.
                </strong>
                <span className="text-danger"> *</span>
              </span>
            }
            checked={confirmacion}
            onChange={(e) => {
              setConfirmacion(e.target.checked);
              if (errors.confirmacion) {
                setErrors((prev) => ({ ...prev, confirmacion: "" }));
              }
            }}
            isInvalid={!!errors.confirmacion}
          />
          {errors.confirmacion && (
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.confirmacion}
            </Form.Control.Feedback>
          )}
        </div>

        <div className="wizard-buttons">
          <Button
            variant="secondary"
            onClick={prevStep}
            className="btn-wizard"
            disabled={loading}
          >
            ← Anterior
          </Button>
          <Button
            variant="success"
            onClick={validateAndFinish}
            className="btn-wizard"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Guardando...
              </>
            ) : (
              "✓ Finalizar Pre-Inscripción"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Step5InformacionAdicional;
