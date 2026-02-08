import React from 'react';
import { Button } from 'react-bootstrap';
import { descargarDocumento } from '../../services/documentosService';

const DocumentsDownload = () => {
  const documents = [
    {
      id: 1,
      title: 'Declaración Jurada (Mayores de 18 años)',
      icon: '📄',
      filename: 'declaracion_mayores.pdf'
    },
    {
      id: 2,
      title: 'Declaración Jurada (Menores de 18 años)',
      icon: '📄',
      filename: 'declaracion_menores.pdf'
    },
    {
      id: 3,
      title: 'Carta de Compromiso',
      icon: '📋',
      filename: 'carta_compromiso.pdf'
    }
  ];

  // const handleDownload = (filename) => {
  //   // En producción, esto debería descargar el archivo real desde el servidor
  //   alert(`Descargando: ${filename}\n\nEn producción, este archivo se descargará automáticamente.`);
  //   // Simulación de descarga
  //   // window.open(`/api/documentos/descargar/${filename}`, '_blank');
  // };

  
    const handleDownload = async (filename) => {
      try {
        const response = await descargarDocumento(filename);

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');

        link.href = url;
        link.setAttribute('download', filename);

        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);

      } catch (error) {
        console.error('Error al descargar el documento', error);
        alert('No se pudo descargar el documento');
      }
    };

  return (
    <section className="documents-section">
      <h2 className="text-center mb-4">
        <i className="bi bi-file-earmark-arrow-down me-2"></i>
        DESCARGA DE DOCUMENTOS NECESARIOS
      </h2>
      <p className="text-center text-muted mb-4">
        Descargue los siguientes documentos, complétalos y tráelos impresos el día de su inscripción presencial.
      </p>

      <div className="documents-list">
        {documents.map((doc) => (
          <div key={doc.id} className="document-item">
            <div className="d-flex align-items-center">
              <span className="fs-3 me-3">{doc.icon}</span>
              <div>
                <h5 className="mb-0">{doc.title}</h5>
                <small className="text-muted">Formato PDF</small>
              </div>
            </div>
            <Button 
              variant="outline-primary"
              onClick={() => handleDownload(doc.filename)}
            >
              <i className="bi bi-download me-2"></i>
              Descargar PDF
            </Button>
          </div>
        ))}
      </div>

      <div className="alert alert-info mt-4">
        <i className="bi bi-info-circle-fill me-2"></i>
        <strong>Nota:</strong> Estos documentos son obligatorios según su edad y situación. 
        El sistema le indicará cuáles necesita presentar al finalizar su pre-inscripción.
      </div>
    </section>
  );
};

export default DocumentsDownload;