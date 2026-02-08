import { Button } from "react-bootstrap";

const Step0TipoDocumento = ({ updateData, nextStep }) => {
  const seleccionar = (tipo) => {
    updateData({ tipoDocumento: tipo });
    nextStep();
  };

  return (
    <div className="wizard-form-section text-center">
      <h3 className="form-section-title">
        Paso 0: Tipo de Documento
      </h3>

      <p className="text-muted mb-4">
        Seleccione el tipo de documento con el que realizará su pre-inscripción.
      </p>

      <div className="d-flex justify-content-center gap-4">
        <Button size="lg" onClick={() => seleccionar("DNI")}>
          DNI (Peruano)
        </Button>

        <Button
          size="lg"
          variant="outline-primary"
          onClick={() => seleccionar("CARNE_EXTRANJERIA")}
        >
          Carné de Extranjería
        </Button>
      </div>
    </div>
  );
};

export default Step0TipoDocumento;
