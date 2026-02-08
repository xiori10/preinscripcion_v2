import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Button, Alert } from "react-bootstrap";
// import ProgressBar from '../../ProgressBar';
import ProgressBar from "@/shared/components/progressBar"

import Step1DeclaracionesJuradas from "./Step1DeclaracionesJuradas";
import Step2DatosGenerales from "./Step2DatosGenerales";
import Step3NacimientoResidencia from "./Step3NacimientoResidencia";
import Step4DatosColegio from "./Step4DatosColegio";
import Step5InformacionAdicional from "./Step5InformacionAdicional";
// import { guardarPreinscripcion } from '../services/api';
import { guardarPreinscripcion } from "../../../services/api";

import { imprimirFicha } from "../../../services/api";

// import Step0TipoDocumento from "./Step0TipoDocumento";

const WizardForm = ({ dni, tipoDocumento }) => {
  // ,onClose
  const navigate = useNavigate();
  // const [currentStep, setCurrentStep] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [codigoSeguridad, setCodigoSeguridad] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    // Paso 0 - Inicio
    // tipoDocumento: "DNI",

    // Paso 1
    // tipoDocumento: "DNI",
    tieneDNI: "",
    tieneCertificadoEstudios: "",
    cursara5toAnio: "",
    // Paso 2
    tipoDocumento: tipoDocumento,
    dni: dni,
    apellidoPaterno: "",
    apellidoMaterno: "",
    nombres: "",
    celularPersonal: "",
    celularApoderado: "",
    correoElectronico: "",
    genero: "",
    estadoCivil: "",
    // Paso 3
    fechaNacimiento: "",
    paisNacimiento: "PERÚ",
    //peru
    departamentoNacimiento: "",
    provinciaNacimiento: "",
    distritoNacimiento: "",

    ubigeoNacimiento: "",

    paisResidencia: "PERÚ",
    departamentoResidencia: "",
    provinciaResidencia: "",
    distritoResidencia: "",
    ubigeoResidencia: "",
    direccionCompleta: "",
    // Paso 4
    anioTerminoSecundaria: "",
    paisColegio: "PERÚ",
    departamentoColegio: "",
    provinciaColegio: "",
    distritoColegio: "",

    nombreColegio: "",
    // Paso 5
    escuelaProfesional: "",
    estaEnOtraUniversidad: "",
    identidadEtnica: "",
    tieneCONADIS: "",
    lenguaMaterna: "",
  });

  const totalSteps = 5;

  // const updateFormData = (stepData) => {
  //   setFormData((prev) => ({ ...prev, ...stepData }));
  // };

  const updateFormData = useCallback((stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
  }, []);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      // Aquí capturamos la respuesta del backend
      const response = await guardarPreinscripcion(formData);
      // Esto solo si todo salió bien
      const { codigo_seguridad } = response.data;
      setCodigoSeguridad(codigo_seguridad);
      setShowSuccess(true);
    } catch (error) {
      // catch (error) {
      //   // Aquí vemos el detalle exacto de los errores de validación
      //   console.error("❌ Error al guardar la pre-inscripción:", error.response?.data);
      //   setErrorMessage("Ocurrió un error al guardar la pre-inscripción.");
      // }

      const errData = error.response?.data;

      if (errData?.errors) {
        // Muestra los primeros errores de validación visibles para el usuario
        const firstError =
          Object.values(errData.errors)[0]?.[0] || "Error de validación";
        setErrorMessage(firstError);
      } else {
        setErrorMessage(
          "Error al conectar con el servidor. Verifica tu conexión.",
        );
      }

      // Log seguro: solo status + mensaje general (NUNCA el input completo)
      if (import.meta.env.DEV) {
        console.error("Error preinscripción:", {
          status: error.response?.status,
          message: errData?.message,
          // NO pongas errData?.input ni errData completo
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePrintAndClose = async () => {
    try {
      const response = await imprimirFicha(formData.dni);

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ficha_inscripcion_${formData.dni}.pdf`;
      link.click();

      window.URL.revokeObjectURL(url);

      navigate("/"); // volver al inicio después
    } catch (err) {
      alert("Error al generar la ficha PDF");
      console.error(err);
    }
  };

  if (showSuccess) {
    return (
      <div className="wizard-container">
        <Container>
          <div className="wizard-form-section">
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h1 className="success-title">¡Pre-inscripción Exitosa!</h1>

              <div className="alert alert-success">
                <h4>Su pre-inscripción ha sido registrada correctamente</h4>
                <p className="mb-0">
                  Guarde el siguiente código de seguridad para futuras consultas
                  o modificaciones:
                </p>
              </div>

              <div className="success-code">{codigoSeguridad}</div>

              <div className="alert alert-info">
                <h5>📋 Próximos Pasos:</h5>
                <ol className="text-start">
                  <li>Descargue e imprima su ficha de inscripción</li>
                  <li>Descargue las declaraciones juradas correspondientes</li>
                  <li>Realice el pago por derecho de inscripción</li>
                  <li>
                    Acérquese a la Sede Santa Catalina con todos los documentos
                  </li>
                </ol>
              </div>

              <div className="d-flex gap-3 justify-content-center mt-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handlePrintAndClose}
                >
                  🖨️ Imprimir Ficha
                </Button>

                {/* <Button variant="outline-primary" size="lg" onClick={onClose}>
                  Volver al Inicio
                </Button> */}

                <Button
                  variant="outline-primary"
                  size="lg"
                  onClick={() => navigate("/")}
                >
                  Volver al Inicio
                </Button>
              </div>

              <div className="mt-4">
                <small className="text-muted">
                  Se ha enviado una copia de esta información a su correo
                  electrónico: {formData.correoElectronico}
                </small>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="wizard-container">
      <Container>
        <div className="wizard-header">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">Formulario de Pre-Inscripción</h2>
            <Button variant="light" onClick={() => navigate("/")}>
              ✕ Cerrar
            </Button>
          </div>
          <p className="mb-0 mt-2">DNI: {dni}</p>
        </div>

        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        {errorMessage && (
          <Alert variant="danger" className="mt-3">
            {errorMessage}
          </Alert>
        )}

        {/* {currentStep === 0 && (
          <Step0TipoDocumento
            updateData={updateFormData}
            nextStep={nextStep}
          />
        )} */}

        {currentStep === 1 && (
          <Step1DeclaracionesJuradas
            data={formData}
            updateData={updateFormData}
            nextStep={nextStep}
          />
        )}

        {currentStep === 2 && (
          <Step2DatosGenerales
            data={formData}
            updateData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {currentStep === 3 && (
          <Step3NacimientoResidencia
            data={formData}
            updateData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {currentStep === 4 && (
          <Step4DatosColegio
            data={formData}
            updateData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {currentStep === 5 && (
          <Step5InformacionAdicional
            data={formData}
            updateData={updateFormData}
            prevStep={prevStep}
            handleFinish={handleFinish}
            loading={loading}
          />
        )}
      </Container>

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

export default WizardForm;
