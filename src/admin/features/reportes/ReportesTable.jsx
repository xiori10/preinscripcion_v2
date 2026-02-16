import { Table, Card, ProgressBar, Badge } from "react-bootstrap";

const ReportesTable = ({ data }) => {
  if (!data) return <p>Cargando...</p>;

  return (
    <Card className="shadow-sm border-0">
      <Card.Header className="bg-primary text-white fw-bold">
        Reporte por Escuela
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive className="align-middle">
          <thead className="table-dark">
            <tr>
              <th>Carrera</th>
              <th>%</th>
              <th>Pendientes</th>
              <th>Pagados</th>
              <th>Inscritos</th>
              <th>Rechazados</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {data.por_escuela.map((item, index) => (
              <tr key={index}>
                <td className="fw-semibold">{item.escuela_profesional}</td>
                <td style={{ minWidth: "120px" }}>
                  <ProgressBar
                    now={item.porcentaje}
                    label={`${item.porcentaje}%`}
                    variant={item.porcentaje > 70 ? "success" : "warning"}
                  />
                </td>
                <td>
                  <Badge bg="secondary">{item.pendientes}</Badge>
                </td>
                <td>
                  <Badge bg="success">{item.pagados}</Badge>
                </td>
                <td>
                  <Badge bg="info">{item.inscritos}</Badge>
                </td>
                <td>
                  <Badge bg="danger">{item.rechazados}</Badge>
                </td>
                <td className="fw-bold">{item.total}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ReportesTable;
