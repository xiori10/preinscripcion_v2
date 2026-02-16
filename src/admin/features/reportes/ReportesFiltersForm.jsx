import { useState } from "react";

const ReportesFiltersForm = ({ setFilters }) => {
  const [form, setForm] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    estado: "",
    escuela: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters(form);
  };

  const handleReset = () => {
    const empty = {
      fecha_inicio: "",
      fecha_fin: "",
      estado: "",
      escuela: ""
    };
    setForm(empty);
    setFilters({});
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">

      {/* Fecha Inicio */}
      <div className="col-md-3">
        <label className="form-label">Fecha Inicio</label>
        <input
          type="date"
          name="fecha_inicio"
          className="form-control"
          value={form.fecha_inicio}
          onChange={handleChange}
        />
      </div>

      {/* Fecha Fin */}
      <div className="col-md-3">
        <label className="form-label">Fecha Fin</label>
        <input
          type="date"
          name="fecha_fin"
          className="form-control"
          value={form.fecha_fin}
          onChange={handleChange}
        />
      </div>

      {/* Estado */}
      <div className="col-md-3">
        <label className="form-label">Estado</label>
        <select
          name="estado"
          className="form-select"
          value={form.estado}
          onChange={handleChange}
        >
          <option value="">Todos</option>
          <option value="PENDIENTE">Pendiente</option>
          <option value="PAGADO">Pagado</option>
          <option value="INSCRITO">Inscrito</option>
          <option value="RECHAZADO">Rechazado</option>
        </select>
      </div>

      {/* Escuela */}
      <div className="col-md-3">
        <label className="form-label">Carrera</label>
        <input
          type="text"
          name="escuela"
          placeholder="Ej: Ingeniería"
          className="form-control"
          value={form.escuela}
          onChange={handleChange}
        />
      </div>

      {/* Botones */}
      <div className="col-12 mt-3 d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          Filtrar
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleReset}
        >
          Limpiar
        </button>
      </div>

    </form>
  );
};

export default ReportesFiltersForm;