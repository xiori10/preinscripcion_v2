  const StatsCards = () => {
    return (
      <div className="row">
        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5 className="mb-0">Total de usuarios</h5>
                  <span className="text-muted">3.247</span>
                </div>
                <div className="icon icon-shape bg-primary-subtle rounded-circle text-primary">
                  <i className="bi bi-person-fill"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5 className="mb-0">Total de documentos</h5>
                  <span className="text-muted">2.426</span>
                </div>
                <div className="icon icon-shape bg-success rounded-circle text-white">
                  <i className="bi bi-file-text"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5 className="mb-0">Total de pre-inscripciones</h5>
                  <span className="text-muted">1.987</span>
                </div>
                <div className="icon icon-shape bg-warning rounded-circle text-white">
                  <i className="bi bi-file-earmark-check"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">          
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5 className="mb-0">Estado de la aplicación</h5>
                  <span className="text-muted">Estado de la aplicación</span>
                </div>
                <div className="icon icon-shape bg-danger rounded-circle text-white">
                  <i className="bi bi-exclamation-triangle"></i>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  };
  export default StatsCards