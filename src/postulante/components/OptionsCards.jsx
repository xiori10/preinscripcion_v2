import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { verificarDNI, consultarParaModificar, imprimirFicha, obtenerCaptcha, validarCaptcha } from '@/services/api';
import { useNavigate } from "react-router-dom";

const OptionsCards = () => {
  const navigate = useNavigate();

  // OPCIÓN 1: Iniciar Pre-inscripción
  const [tipoDocumento, setTipoDocumento] = useState('DNI');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const maxLengthDocumento = tipoDocumento === 'DNI' ? 8 : 12;
  const [error1, setError1] = useState('');
  const [loading1, setLoading1] = useState(false);

  const handleTipoDocumentoChange = (e) => {
    setTipoDocumento(e.target.value);
    setNumeroDocumento('');
    setError1('');
  };

  // OPCIÓN 2: Modificar Datos
  const [dniModificar, setDniModificar] = useState('');
  const [codigoSeguridad, setCodigoSeguridad] = useState('');
  const [error2, setError2] = useState('');
  const [loading2, setLoading2] = useState(false);

  // OPCIÓN 3: Imprimir Ficha
  const [dniImprimir, setDniImprimir] = useState('');
  const [error3, setError3] = useState('');
  const [loading3, setLoading3] = useState(false);

  // CAPTCHA
  const [captchaText, setCaptchaText] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  const cargarCaptcha = async () => {
    try {
      const res = await obtenerCaptcha();
      setCaptchaText(res.data.captcha);
      setCaptchaToken(res.data.token);
      setCaptchaInput('');
      setCaptchaError('');
    } catch (error) {
      console.error('Error al cargar captcha', error);
      setCaptchaError('No se pudo cargar el CAPTCHA');
    }
  };



  // const validarCaptchaBackend = async () => {
  //   try {
  //     const res = await validarCaptcha(captchaToken, captchaInput);
  //     return res.data.message === 'CAPTCHA válido';
  //   } catch (error) {
  //     console.error(error);
  //     return false;
  //   }
  // };

    const validarCaptchaBackend = async () => {
      try {
        await validarCaptcha(captchaToken, captchaInput);
        return { ok: true };
      } catch (error) {
        return {
          ok: false,
          message: error.response?.data?.message || 'Error al validar CAPTCHA'
        };
      }
    };


  


      useEffect(() => {
      cargarCaptcha();
    }, []);

  const handleIniciarPreinscripcion = async (e) => {
    e.preventDefault();
    setError1('');

    if (!numeroDocumento || numeroDocumento.length < 8) {
      setError1('Por favor ingrese un número de documento válido');
      return;
    }

    setLoading1(true);
    try {
      setError1('');

      // const captchaOk = await validarCaptchaBackend();
      // if (!captchaOk) {
      //   setError1('El código CAPTCHA es incorrecto');
      //   cargarCaptcha();
      //   return;
      // }

      const captchaOk = await validarCaptchaBackend();
      if (!captchaOk) {
        setError1('El código CAPTCHA es incorrecto');
        await cargarCaptcha();
        setLoading1(false); // ✅ CLAVE
        return;
      }


      const response = await verificarDNI(tipoDocumento, numeroDocumento);
      if (response.data.existe) {
        setError1('Este documento ya está registrado. Use la opción "Modificar Datos" para editar su información.');
        return;
      }

      navigate(`/postulante/preinscripcion?dni=${numeroDocumento}&tipo=${tipoDocumento}`);

    } catch (error) {
      console.error(error);
      if (error.response?.data?.errors) {
        const firstError = Object.values(error.response.data.errors)[0][0];
        setError1(firstError);
      } else if (error.response?.data?.message) {
        setError1(error.response.data.message);
      } else {
        setError1('No se pudo conectar con el servidor. Verifique que Laravel esté activo.');
      }
    } finally {
      setLoading1(false);
    }
  };

  const handleModificarDatos = async (e) => {
    e.preventDefault();
    setError2('');

    if (!dniModificar || !codigoSeguridad) {
      setError2('Por favor complete todos los campos');
      return;
    }

    if (codigoSeguridad.length !== 5) {
      setError2('El código de seguridad debe tener 5 caracteres');
      return;
    }

    setLoading2(true);

    try {
      const response = await consultarParaModificar(dniModificar, codigoSeguridad);
      navigate('/postulante/modificar', {
        state: {
          preinscripcion: response.data.data,
          codigoSeguridad,
        },
      });
    } catch (error) {
      if (error.response?.status === 404) {
        setError2('No se encontró ninguna pre-inscripción con estos datos');
      } else if (error.response?.status === 403) {
        setError2(error.response.data.message);
      } else {
        setError2('Error al consultar los datos. Intente nuevamente.');
      }
    } finally {
      setLoading2(false);
    }
  };

  const handleImprimirFicha = async (e) => {
    e.preventDefault();
    setError3('');

    if (!dniImprimir || dniImprimir.length < 8) {
      setError3('Por favor ingrese un número de documento válido');
      return;
    }

    setLoading3(true);
    try {
      const response = await imprimirFicha(dniImprimir);
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ficha_inscripcion_${dniImprimir}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      if (error.response?.status === 404) {
        setError3('No se encontró ninguna pre-inscripción con este documento');
      } else {
        setError3('Error al generar la ficha. Por favor intente nuevamente.');
      }
    } finally {
      setLoading3(false);
    }
  };

  return (
    <section className="options-section" id="options-section">
      <Row className="g-4">

        {/* OPCIÓN 1: INICIAR PRE-INSCRIPCIÓN */}
        <Col lg={4} md={6}>
          <Card className="option-card h-100">
            <Card.Header className="card-header-custom card-header-primary">
              <i className="bi bi-person-plus-fill me-2"></i>
              INICIAR PRE-INSCRIPCIÓN
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleIniciarPreinscripcion}>
                <Form.Group className="mb-3">
                  <Form.Label>Tipo de Documento</Form.Label>
                  <Form.Select value={tipoDocumento} onChange={handleTipoDocumentoChange}>
                    <option value="DNI">DNI</option>
                    <option value="CARNE_EXTRANJERIA">Carné de Extranjería</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Número de Documento</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={tipoDocumento === 'DNI' ? 'Ej: 72142314' : 'Ej: 001234567890'}
                    value={numeroDocumento}
                    onChange={(e) =>
                      setNumeroDocumento(e.target.value.replace(/\D/g, '').slice(0, maxLengthDocumento))
                    }
                    maxLength={maxLengthDocumento}
                  />
                </Form.Group>

                {/* CAPTCHA */}

                <div className="captcha-box mb-2">
                  <strong>{captchaText}</strong>
                </div>
                <div className="d-flex justify-content-end mb-3">
                  <Button variant="outline-secondary" size="sm" onClick={cargarCaptcha} type="button">
                    🔄 Recargar
                  </Button>
                </div>

                <Form.Group className="mb-3">
                  <Form.Label>Ingrese el código CAPTCHA</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Código CAPTCHA"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                    maxLength="6"
                  />
                </Form.Group>

                {captchaError && (
                  <Alert variant="danger" className="py-2">
                    {captchaError}
                  </Alert>
                )}

                {error1 && (
                  <Alert variant="danger" className="py-2">
                    {error1}
                  </Alert>
                )}

                <Button variant="primary" type="submit" className="w-100" disabled={loading1}>
                  {loading1 ? 'Verificando...' : 'Iniciar Pre-Inscripción'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* OPCIÓN 2: MODIFICAR DATOS */}
        <Col lg={4} md={6}>
          <Card className="option-card h-100">
            <Card.Header className="card-header-custom card-header-warning">
              <i className="bi bi-pencil-square me-2"></i>
              MODIFICAR DATOS
            </Card.Header>
            <Card.Body>
              <Alert variant="warning" className="alert-custom">
                <small>
                  <strong className="text-danger">⚠️ ADVERTENCIA:</strong> Solo dispone de una única oportunidad para modificar sus datos.
                </small>
              </Alert>

              <Form onSubmit={handleModificarDatos}>
                <Form.Group className="mb-3">
                  <Form.Label>DNI / Número de Documento</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su DNI"
                    value={dniModificar}
                    onChange={(e) => setDniModificar(e.target.value.replace(/\D/g, ''))}
                    maxLength="12"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Código de Seguridad</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="5 dígitos alfanuméricos"
                    value={codigoSeguridad}
                    onChange={(e) => setCodigoSeguridad(e.target.value.toUpperCase())}
                    maxLength="5"
                  />
                  <Form.Text className="text-muted">
                    El código fue enviado a su correo al momento de registrarse
                  </Form.Text>
                </Form.Group>

                {error2 && (
                  <Alert variant="danger" className="py-2">
                    {error2}
                  </Alert>
                )}

                <Button variant="warning" type="submit" className="w-100" disabled={loading2}>
                  {loading2 ? 'Consultando...' : 'Consultar para Modificar'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* OPCIÓN 3: IMPRIMIR FICHA */}
        <Col lg={4} md={6}>
          <Card className="option-card h-100">
            <Card.Header className="card-header-custom card-header-success">
              <i className="bi bi-printer-fill me-2"></i>
              IMPRIMIR FICHA
            </Card.Header>
            <Card.Body>
              <Alert variant="info" className="alert-custom">
                <small>
                  <strong> IMPORTANTE:</strong> Es obligatorio imprimir su ficha de inscripción y presentarla al momento de realizar su inscripción presencial.
                </small>
                <br />
                <small>
                  <strong>NOTA:</strong> Si se solicitó firma de declaraciones juradas, también deben imprimirse, firmarse y presentarse.
                </small>
              </Alert>

              <Form onSubmit={handleImprimirFicha}>
                <Form.Group className="mb-3">
                  <Form.Label>DNI / Número de Documento</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su DNI"
                    value={dniImprimir}
                    onChange={(e) => setDniImprimir(e.target.value.replace(/\D/g, ''))}
                    maxLength="12"
                  />
                </Form.Group>

                {error3 && (
                  <Alert variant="danger" className="py-2">
                    {error3}
                  </Alert>
                )}

                <Button variant="success" type="submit" className="w-100" disabled={loading3}>
                  {loading3 ? 'Generando...' : ' Imprimir Ficha '}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </section>
  );
};

export default OptionsCards;
