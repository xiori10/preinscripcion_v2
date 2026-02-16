

  const Charts = () => {
    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <div className="chart-wrapper">
                    <canvas id="chart-area" width="100%" height="300"></canvas>
                  </div>
                </div>
              </div>
            </div>
            
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Usuario</th>
                  <th>Tipo de documento</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2021-01-01</td>
                  <td>John Doe</td>
                  <td>DNI</td>
                  <td>Pendiente</td>
                  <td>
                    <a href="#" className="btn btn-sm btn-primary">
                      Ver
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>2021-01-02</td>
                  <td>Jane Doe</td>
                  <td>DNI</td>
                  <td>Pendiente</td>
                  <td>
                    <a href="#" className="btn btn-sm btn-primary">
                      Ver
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>2021-01-03</td>
                  <td>John Doe</td>
                  <td>DNI</td>
                  <td>Pendiente</td>
                  <td>
                    <a href="#" className="btn btn-sm btn-primary">
                      Ver
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>2021-01-04</td>
                  <td>Jane Doe</td>
                  <td>DNI</td>
                  <td>Pendiente</td>
                  <td>
                    <a href="#" className="btn btn-sm btn-primary">
                      Ver
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  
  };
  export default Charts