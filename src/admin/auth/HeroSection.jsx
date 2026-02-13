// src/admin/auth/HeroSection.jsx
import { Activity, ShieldCheck, GraduationCap } from 'lucide-react';
import miImagen from "../../assets/manuel.png";

export default function HeroSection() {
  return (
    <div
      className="hero-container position-relative overflow-hidden d-flex align-items-center justify-content-center p-5"
      style={{ 
        backgroundColor: '#0a1128', 
        height: '100vh', // Altura completa para machacar con el login
        color: 'white',
        width: '100%' 
      }}
    >
      {/* Brillo de fondo mejorado */}
      <div
        className="position-absolute top-50 start-50 translate-middle w-100 h-100"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(10, 17, 40, 0) 70%)',
          opacity: 0.8,
          zIndex: 0,
        }}
      />

      <div className="container position-relative z-1 text-center">
        {/* Imagen con animación float */}
        <div className="mb-5">
          <img
            src={miImagen}
            alt="Dashboard"
            className="img-fluid animate-float"
            style={{
              maxWidth: '550px',
              filter: 'drop-shadow(0 0 50px rgba(59, 130, 246, 0.25))',
            }}
          />
        </div>

        <div className="mx-auto" style={{ maxWidth: '650px' }}>
          <h2 className="d-none d-md-flex align-items-center justify-content-center gap-2 fw-light text-white mb-2">
            <GraduationCap className="text-primary" size={38} />
            Gestión de Admisión.
          </h2>

          <h1 className="display-3 fw-bold text-primary mb-4 tracking-tight">
            Control centralizado.
          </h1>

          <div className="d-none d-md-block">
            <p className=".text-secondary-emphasis fs-5 mb-5 mx-auto opacity-75" style={{ maxWidth: '500px' }}>
              Administra las preinscripciones, valida documentos y organiza los
              procesos de admisión desde un solo panel de control.
            </p>

            <div className="row border-top border-secondary border-opacity-25 pt-5 mt-2">
              <div className="col-6 border-end border-secondary border-opacity-25">
                <div className="p-3 rounded-4 bg-primary bg-opacity-10 d-inline-block mb-3">
                  <Activity className="text-info" size={28} />
                </div>
                <h5 className="text-light mb-1">Monitoreo en Vivo</h5>
                <small className="">Postulantes registrados</small>
              </div>

              <div className="col-6">
                <div className="p-3 rounded-4 bg-primary bg-opacity-10 d-inline-block mb-3">
                  <ShieldCheck className="text-info" size={28} />
                </div>
                <h5 className="text-light mb-1">Validación Ágil</h5>
                <small className="">Documentación y pagos</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }
        .tracking-tight { letter-spacing: -0.05em; }
      `}</style>
    </div>
  );
}