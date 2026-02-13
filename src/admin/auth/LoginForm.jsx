// src/admin/auth/LoginForm.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { User, Lock, ChevronRight, LayoutGrid, Eye, EyeOff, ShieldCheck } from "lucide-react";
import apiClient from "@/services/api";
import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    setError(null);
    setLoading(true);
    try {
      const { data } = await apiClient.post("/admin/login", formData);
      login(data.user, data.token);
      navigate("/admin", { replace: true });
    } catch {
      setError("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-4 bg-white min-vh-100 w-100 shadow-lg">
      <div className="w-100" style={{ maxWidth: "320px" }}>
        
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 bg-primary text-white px-4 py-2 rounded-4 mb-4 shadow-sm border border-4 border-light">
            <LayoutGrid size={20} fill="currentColor" />
            <span className="fw-bold">AdmisiónPro</span>
          </div>
          <h2 className="fw-black text-dark h2 mb-1">Portal Admin</h2>
          <p className="text-muted small fw-medium">Gestión Académica Centralizada</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 text-center small border-0 rounded-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3">
          <div className="form-group">
            <label className="small fw-bold text-muted text-uppercase mb-2 d-block tracking-widest" style={{fontSize: '16px'}}>
              Usuario
            </label>
            <div className="position-relative">
              <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                <User size={18} />
              </span>
              <input
                type="text"
                className={`form-control ps-5 py-3 rounded-4 bg-light border-0 ${errors.email ? "is-invalid" : ""}`}
                placeholder="Ej. admin_central"
                {...register("email", { required: true })}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="d-flex justify-content-between mb-2">
              <label className="small fw-bold text-muted text-uppercase tracking-widest" style={{fontSize: '16px'}}>Contraseña</label>
              <a href="#" className="small fw-bold text-primary text-decoration-none" style={{fontSize: '14px'}}>¿Olvidó su clave?</a>
            </div>
            <div className="position-relative">
              <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ps-5 pe-5 py-3 rounded-4 bg-light border-0 ${errors.password ? "is-invalid" : ""}`}
                placeholder="••••••••"
                {...register("password", { required: true })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn border-0 position-absolute top-50 end-0 translate-middle-y me-2 text-muted"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-check my-2">
            <input className="form-check-input" type="checkbox" id="remember" />
            <label className="form-check-label small text-muted fw-medium" htmlFor="remember">
              Mantener sesión activa
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-dark w-100 py-3 rounded-4 fw-bold d-flex align-items-center justify-content-center gap-2 border-0 shadow-sm mt-2"
            style={{ backgroundColor: "#0a1128" }}
          >
            {loading ? "Ingresando..." : "Acceder al Panel"}
            {!loading && <ChevronRight size={18} />}
          </button>
        </form>

        <footer className="mt-5 pt-4 text-center">
          <div className="d-flex align-items-center justify-content-center gap-3 mb-3 opacity-2">
            <hr className="w-25" />
            <ShieldCheck size={20} />
            <hr className="w-25" />
          </div>
          <p className="fw-bold text-muted tracking-widest mb-0" style={{fontSize: '14px'}}>
            PROCESO DE ADMISIÓN 2026
          </p>
          <p className="text-muted mt-1" style={{fontSize: '12px'}}>v4.0.2</p>
        </footer>
      </div>

      <style>{`
        .form-control:focus {
          box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.1) !important;
          background-color: #fff !important;
          border: 1px solid #0d6efd !important;
        }
        .fw-black { font-weight: 900; }
        .btn:active { transform: scale(0.97); }
      `}</style>
    </div>
  );
}