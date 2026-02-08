import { useSearchParams } from "react-router-dom";
import WizardForm from "@/postulante/features/wizard/WizardForm"


const Preinscripcion = () => {
  const [searchParams] = useSearchParams();
  const dni = searchParams.get("dni") || "";
  const tipoDocumento = searchParams.get("tipo") || "DNI";

  // return <WizardForm dni={dni} />;
  return <WizardForm dni={dni} tipoDocumento={tipoDocumento} />;
};

export default Preinscripcion;
