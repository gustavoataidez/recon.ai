import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styles from './FacialRecognitionResults.module.css';

const FacialRecognitionResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const uploadedImage = state?.image;
  const reportRef = useRef(null); // Ref para capturar a área do relatório

  const handleNewSearch = () => {
    navigate('/');
  };


  

  const handleExportReport = async () => {
    if (reportRef.current) {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pageWidth;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('relatorio-reconhecimento.pdf');
    }
  };

  return (
    <div className={styles.resultsContainer} ref={reportRef}>
      <h1 className={styles.resultsTitle}>Resultado do Reconhecimento</h1>
      
      <div className={styles.resultsImageComparison}>
        <div className={styles.resultsImageBox}>
          <h4>Imagem Enviada</h4>
          {uploadedImage ? (
            <img 
              src={URL.createObjectURL(uploadedImage)} 
              alt="Imagem enviada"
              className={styles.resultsImage} 
            />
          ) : (
            <img 
              src="https://www.protrusmoto.com/wp-content/uploads/2015/04/placeholder-200x200.png" 
              alt="Imagem padrão"
              className={styles.resultsImage}
            />
          )}
        </div>
        <div className={styles.resultsImageBox}>
          <h4>Imagem do Banco</h4>
          <img 
            src="https://www.protrusmoto.com/wp-content/uploads/2015/04/placeholder-200x200.png" 
            alt="Imagem do banco"
            className={styles.resultsImage}
          />
        </div>
      </div>

      <div className={styles.resultsSimilarity}>XX% de similaridade</div>

      <div className={styles.resultsUserData}>
        <div className={styles.resultsDataItem}>
          <span className={styles.resultsDataLabel}>Nome:</span> XXXX XXXX XXXX
        </div>
        <div className={styles.resultsDataItem}>
          <span className={styles.resultsDataLabel}>CPF:</span> XXX.XXX.XXX-XX
        </div>
        <div className={styles.resultsDataItem}>
          <span className={styles.resultsDataLabel}>Data de Nascimento:</span> XX/XX/XXXX
        </div>
        <div className={styles.resultsDataItem}>
          <span className={styles.resultsDataLabel}>Status:</span> <span className={styles.resultsSimilarity}>PROCURADO</span>
        </div>
      </div>

      <div className={styles.resultsActions}>
        <button 
          className={`${styles.resultsBtn} ${styles.resultsBtnPrimary}`}
          onClick={handleExportReport}
        >
          Exportar Relatório
        </button>
        <button 
          className={`${styles.resultsBtn} ${styles.resultsBtnSecondary}`}
          onClick={handleNewSearch}
        >
          Nova Consulta
        </button>
      </div>
    </div>
  );
};

export default FacialRecognitionResults;
