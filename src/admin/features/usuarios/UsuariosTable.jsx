const UsuariosTable = ({ usuarios, onDelete }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {usuarios.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <span
                className={`badge ${
                  user.role === "admin"
                    ? "bg-danger"
                    : "bg-secondary"
                }`}
              >
                {user.role}
              </span>
            </td>
            <td>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(user.id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsuariosTable;