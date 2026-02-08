import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const Step1DeclaracionesJuradas = ({ data, updateData, nextStep }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    updateData({ [field]: value });
    // Limpiar error del campo cuando se modifica
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateAndNext = () => {
    const newErrors = {};

    if (!data.tieneDNI) {
      newErrors.tieneDNI = 'Debe responder esta pregunta';
    }
    if (!data.tieneCertificadoEstudios) {
      newErrors.tieneCertificadoEstudios = 'Debe responder esta pregunta';
    }
    if (!data.cursara5toAnio) {
      newErrors.cursara5toAnio = 'Debe responder esta pregunta';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Validaciones especiales
    if (data.tieneDNI === 'NO') {
      alert('Para continuar con la pre-inscripción es obligatorio contar con DNI vigente.');
      return;
    }

    if (data.tieneCertificadoEstudios === 'NO') {
      alert('Para continuar con la pre-inscripción es obligatorio contar con certificado de estudios.');
      return;
    }

    nextStep();
  };

  return (
    <div className="wizard-form-section">
      <h3 className="form-section-title">
        Paso 1: Declaraciones Juradas
      </h3>

      <Alert variant="info" className="mb-4">
        <i className="bi bi-info-circle-fill me-2"></i>
        Por favor responda las siguientes preguntas con sinceridad. Sus respuestas son importantes para el proceso de admisión.
      </Alert>

      <Form>
        {/* Pregunta 1 */}
        <Form.Group className="mb-4">
          
          {/* <Form.Label className="fs-5">
            ¿Cuentas con DNI vigente?
            <span className="text-danger ms-1">*</span>
          </Form.Label>  */}

            <Form.Label className="fs-5">
              {data.tipoDocumento === "DNI"
                ? "¿Cuentas con DNI vigente?"
                : "¿Tu Carné de Extranjería está vigente?"}
              <span className="text-danger ms-1">*</span>
            </Form.Label>
{/* 
            <Form.Select
                value={data.tipoDocumento}
                onChange={(e) => {
                  updateData({ tipoDocumento: e.target.value });

                  // 🔥 sincroniza país automáticamente
                  if (e.target.value === "DNI") {
                    updateData({ paisNacimiento: "PERÚ" });
                  } else {
                    updateData({ paisNacimiento: "" });
                  }
                }}
              >
                <option value="DNI">DNI</option>
                <option value="CARNE_EXTRANJERIA">Carné de Extranjería</option>
              </Form.Select> */}


          <div className="radio-group">
            <Form.Check
              type="radio"
              label="Sí"
              name="tieneDNI"
              id="dni-si"
              checked={data.tieneDNI === 'SI'}
              onChange={() => handleChange('tieneDNI', 'SI')}
              isInvalid={!!errors.tieneDNI}
            />
            <Form.Check
              type="radio"
              label="No"
              name="tieneDNI"
              id="dni-no"
              checked={data.tieneDNI === 'NO'}
              onChange={() => handleChange('tieneDNI', 'NO')}
              isInvalid={!!errors.tieneDNI}
            />
          </div>
          {errors.tieneDNI && (
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.tieneDNI}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        {/* Pregunta 2 */}
        <Form.Group className="mb-4">
          <Form.Label className="fs-5">
            ¿Cuentas con certificado de estudios?
            <span className="text-danger ms-1">*</span>
          </Form.Label>
          <div className="radio-group">
            <Form.Check
              type="radio"
              label="Sí"
              name="tieneCertificadoEstudios"
              id="certificado-si"
              checked={data.tieneCertificadoEstudios === 'SI'}
              onChange={() => handleChange('tieneCertificadoEstudios', 'SI')}
              isInvalid={!!errors.tieneCertificadoEstudios}
            />
            <Form.Check
              type="radio"
              label="No"
              name="tieneCertificadoEstudios"
              id="certificado-no"
              checked={data.tieneCertificadoEstudios === 'NO'}
              onChange={() => handleChange('tieneCertificadoEstudios', 'NO')}
              isInvalid={!!errors.tieneCertificadoEstudios}
            />
          </div>
          {errors.tieneCertificadoEstudios && (
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.tieneCertificadoEstudios}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        {/* Pregunta 3 */}
        <Form.Group className="mb-4">
          <Form.Label className="fs-5">
            ¿Cursarás 5to año de secundaria en 2026 o después?
            <span className="text-danger ms-1">*</span>
          </Form.Label>
          <div className="radio-group">
            <Form.Check
              type="radio"
              label="Sí"
              name="cursara5toAnio"
              id="quinto-si"
              checked={data.cursara5toAnio === 'SI'}
              onChange={() => handleChange('cursara5toAnio', 'SI')}
              isInvalid={!!errors.cursara5toAnio}
            />
            <Form.Check
              type="radio"
              label="No"
              name="cursara5toAnio"
              id="quinto-no"
              checked={data.cursara5toAnio === 'NO'}
              onChange={() => handleChange('cursara5toAnio', 'NO')}
              isInvalid={!!errors.cursara5toAnio}
            />
          </div>
          {errors.cursara5toAnio && (
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.cursara5toAnio}
            </Form.Control.Feedback>
          )}
          {data.cursara5toAnio === 'SI' && (
            <Alert variant="warning" className="mt-3">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Deberá presentar una carta de compromiso de estudios firmada por su colegio al momento de la inscripción presencial.
            </Alert>
          )}
        </Form.Group>

        <div className="wizard-buttons">
          <div></div>
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

export default Step1DeclaracionesJuradas;