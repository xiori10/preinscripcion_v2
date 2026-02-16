import { useEffect, useState } from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { getReportes } from "@/services/adminService";
import ReportesStats from "@/admin/features/reportes/ReportesStats";
import ReportesFiltersForm from "@/admin/features/reportes/ReportesFiltersForm";
import ReportesTable from "@/admin/features/reportes/ReportesTable";

const Reportes = () => {
  const [reportes, setReportes] = useState(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReportes(filters);
      setReportes(data);
    };
    fetchData();
  }, [filters]);

  return (
    <div>
      <h4 className="fw-bold mb-4">Reportes Estadísticos</h4>

   

      {/* 🔹 Totales */}
      <CCard className="shadow-sm mb-4">
        <CCardHeader>Totales</CCardHeader>
        <CCardBody>
          <ReportesStats data={reportes} />
        </CCardBody>
      </CCard>

         {/* 🔹 Filtros */}
      <CCard className="shadow-sm mb-4">
        <CCardHeader>Filtros</CCardHeader>
        <CCardBody>
          <ReportesFiltersForm setFilters={setFilters} />
        </CCardBody>
      </CCard>

      {/* 🔹 Tabla */}
      <CCard className="shadow-sm">
        <CCardHeader>Detalle por escuela</CCardHeader>
        <CCardBody>
          <ReportesTable data={reportes} />
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Reportes;
