import React from 'react';
import { Container } from 'react-bootstrap';
// import './App.css'
import logo from '../../assets/logo.png';

const Banner = () => {
  const scrollToOptions = () => {
    const optionsSection = document.getElementById('options-section');
    if (optionsSection) {
      optionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="banner-section">
      {/* <img src={logo} alt="Logo" className="banner-logo" /> */}

      <Container>
         <img src={logo} alt="Logo" className="banner-logo" />
        <h1 className="banner-title text-center">
          PROCESO DE PREINSCRIPCIÓN
        </h1>
        <p className="banner-subtitle text-center">
          Sigue estos sencillos pasos para asegurar tu vacante:
        </p>
        
          {/* <div className="steps-list">
            <ol>
              <li>✓ Verifica tu DNI y el código CAPTCHA.</li>
              <li>✓ Completa el formulario de pre-inscripción.</li>
              <li>✓ Descarga e imprime tu ficha final.</li>
              <li>✓ Si durante el formulario se le solicitó presentar declaraciones juradas, imprímalas también.</li>
              <li>✓ Realice el pago por derecho de inscripción.</li>
              <li>✓ Acérquese a las oficinas de la Sede Santa Catalina para completar su inscripción.</li>
            </ol>
          </div> */}

          <div className="steps-container">
              <div className="step-card">
                <div className="step-number">1</div>
                <p className="step-text">Verifica tu DNI y el código CAPTCHA.</p>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <p className="step-text">Completa el formulario de pre-inscripción.</p>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <p className="step-text">Descarga e imprime tu ficha final.</p>
              </div>
              <div className="step-card">
                <div className="step-number">4</div>
                <p className="step-text">Si durante el formulario se le solicitó presentar declaraciones juradas, imprímalas también.</p>
              </div>
              <div className="step-card">
                <div className="step-number">5</div>
                <p className="step-text">Realice el pago por derecho de inscripción.</p>
              </div>
              <div className="step-card">
                <div className="step-number">6</div>
                <p className="step-text">Acérquese a las oficinas de la Sede Santa Catalina para completar su inscripción.</p>
              </div>
            </div>

        <div className="text-center">
          <button 
            className="btn btn-start-inscription"
            onClick={scrollToOptions}
          >
            ¡PRE INSCRÍBETE AHORA!
          </button>
        </div>
      </Container>
    </section>

    
  );
};

export default Banner;