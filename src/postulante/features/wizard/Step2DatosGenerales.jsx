import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

const Step2DatosGenerales = ({ data, updateData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    updateData({ [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateAndNext = () => {
    const newErrors = {};

    if (!data.apellidoPaterno.trim()) {
      newErrors.apellidoPaterno = 'El apellido paterno es obligatorio';
    }

    if (!data.apellidoMaterno.trim()) {
      newErrors.apellidoMaterno = 'El apellido materno es obligatorio';
    }

    if (!data.nombres.trim()) {
      newErrors.nombres = 'Los nombres son obligatorios';
    }

    if (!data.celularPersonal || data.celularPersonal.length !== 9) {
      newErrors.celularPersonal = 'Ingrese un número de celular válido (9 dígitos)';
    }

    if (!data.celularApoderado || data.celularApoderado.length !== 9) {
      newErrors.celularApoderado = 'Ingrese un número de celular válido (9 dígitos)';
    }

    if (!data.correoElectronico) {
      newErrors.correoElectronico = 'El correo electrónico es obligatorio';
    } else if (!validateEmail(data.correoElectronico)) {
      newErrors.correoElectronico = 'Ingrese un correo electrónico válido';
    }

    if (!data.genero) {
      newErrors.genero = 'Seleccione su género';
    }

    if (!data.estadoCivil) {
      newErrors.estadoCivil = 'Seleccione su estado civil';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    nextStep();
  };

  return (
    <div className="wizard-form-section">
      <h3 className="form-section-title">
        Paso 2: Datos Generales
      </h3>

      <Alert variant="info" className="mb-4">
        <i className="bi bi-info-circle-fill me-2"></i>
        Complete sus datos personales tal como aparecen en su DNI. Todos los campos marcados con (*) son obligatorios.
      </Alert>

      <Form>
        <Row>
          {/* DNI - Solo lectura */}
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>
                DNI <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={data.dni}
                readOnly
                className="bg-light"
              />
              <Form.Text className="text-muted">
                Número de documento verificado
              </Form.Text>
            </Form.Group>
          </Col>

          {/* Apellido Paterno */}
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>
                Apellido Paterno <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su apellido paterno"
                value={data.apellidoPaterno}
                onChange={(e) => handleChange('apellidoPaterno', e.target.value.toUpperCase())}
                isInvalid={!!errors.apellidoPaterno}
              />
              <Form.Control.Feedback type="invalid">
                {errors.apellidoPaterno}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Apellido Materno */}
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>
                Apellido Materno <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su apellido materno"
                value={data.apellidoMaterno}
                onChange={(e) => handleChange('apellidoMaterno', e.target.value.toUpperCase())}
                isInvalid={!!errors.apellidoMaterno}
              />
              <Form.Control.Feedback type="invalid">
                {errors.apellidoMaterno}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Nombres */}
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>
                Nombres <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese sus nombres completos"
                value={data.nombres}
                onChange={(e) => handleChange('nombres', e.target.value.toUpperCase())}
                isInvalid={!!errors.nombres}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombres}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Celular Personal */}
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>
                Celular Personal (WhatsApp) <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="tel"
                placeholder="9 dígitos"
                value={data.celularPersonal}
                onChange={(e) => handleChange('celularPersonal', e.target.value.replace(/\D/g, ''))}
                maxLength="9"
                isInvalid={!!errors.celularPersonal}
              />
              <Form.Control.Feedback type="invalid">
                {errors.celularPersonal}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Se usará para comunicaciones importantes
              </Form.Text>
            </Form.Group>
          </Col>

          {/* Celular Apoderado */}
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>
                Celular del Apoderado <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="tel"
                placeholder="9 dígitos"
                value={data.celularApoderado}
                onChange={(e) => handleChange('celularApoderado', e.target.value.replace(/\D/g, ''))}
                maxLength="9"
                isInvalid={!!errors.celularApoderado}
              />
              <Form.Control.Feedback type="invalid">
                {errors.celularApoderado}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Correo Electrónico */}
          <Col md={12} className="mb-3">
            <Form.Group>
              <Form.Label>
                Correo Electrónico <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="ejemplo@correo.com"
                value={data.correoElectronico}
                onChange={(e) => handleChange('correoElectronico', e.target.value.toLowerCase())}
                isInvalid={!!errors.correoElectronico}
              />
              <Form.Control.Feedback type="invalid">
                {errors.correoElectronico}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Se enviará su código de seguridad y ficha de inscripción a este correo
              </Form.Text>
            </Form.Group>
          </Col>

          {/* Género */}
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>
                Género <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={data.genero}
                onChange={(e) => handleChange('genero', e.target.value)}
                isInvalid={!!errors.genero}
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

          {/* Estado Civil */}
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>
                Estado Civil <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={data.estadoCivil}
                onChange={(e) => handleChange('estadoCivil', e.target.value)}
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
        </Row>

        <div className="wizard-buttons">
          <Button 
            variant="secondary" 
            onClick={prevStep}
            className="btn-wizard"
          >
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

export default Step2DatosGenerales;