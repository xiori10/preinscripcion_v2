import React from 'react';
import { ProgressBar as BSProgressBar } from 'react-bootstrap';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, label: 'Declaraciones' },
    { number: 2, label: 'Datos Generales' },
    { number: 3, label: 'Nacimiento/Residencia' },
    { number: 4, label: 'Datos Colegio' },
    { number: 5, label: 'Info. Adicional' }
  ];

  return (
    <div className="mb-4">
      <BSProgressBar 
        now={progress} 
        className="progress-bar-custom mb-3"
        style={{ height: '8px' }}
      />
      
      <div className="step-indicator">
        {steps.map((step) => (
          <div key={step.number} className="step-item">
            <div className={`step-circle ${
              currentStep === step.number ? 'active' : 
              currentStep > step.number ? 'completed' : ''
            }`}>
              {currentStep > step.number ? '✓' : step.number}
            </div>
            <span className={`step-label ${currentStep === step.number ? 'active' : ''}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;