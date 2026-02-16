import { Card } from "react-bootstrap";
// import "./estilos.css";
// En tu componente o en App.js
import "../../styles/admin.css";


const ReportesStats = ({ data }) => {
  if (!data) return <p>Cargando...</p>;

  const { totales } = data;

  const stats = [
    { label: "Total Preinscritos", value: totales.total, variant: "primary" },
    { label: "Pendientes", value: totales.pendientes, variant: "warning" },
    { label: "Pagados", value: totales.pagados, variant: "success" },
    { label: "Inscritos", value: totales.inscritos, variant: "info" },
    { label: "Rechazados", value: totales.rechazados, variant: "danger" },
  ];

  return (
    <div className="row g-3 justify-content-center">
      {stats.map((item, index) => (
        <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-2">
          <Card
            className={`shadow-sm border-0 text-center rounded-4 bg-${item.variant}-subtle`}
            data-bs-theme="auto"
          >
            <Card.Body>
              <h5 className="card-title fw-bold fs-5">{item.label}</h5>
              <h1 className={`fw-bold text-${item.variant} display-6`}>
                {item.value}
              </h1>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ReportesStats;
