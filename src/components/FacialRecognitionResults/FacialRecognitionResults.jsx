import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './FacialRecognitionResults.module.css';

const FacialRecognitionResults = () => {
  const location = useLocation();
  const { state } = location;
  const uploadedImage = state?.image;

  return (
    <div className={styles.resultsContainer}>
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

      
      <div className={styles.resultsSimilarity}>95% de similaridade</div>

      <div className={styles.resultsUserData}>
        <div className={styles.resultsDataItem}>
          <span className={styles.resultsDataLabel}>Nome:</span> João da Silva
        </div>
        <div className={styles.resultsDataItem}>
          <span className={styles.resultsDataLabel}>CPF:</span> 123.456.789-00
        </div>
        <div className={styles.resultsDataItem}>
          <span className={styles.resultsDataLabel}>Data de Nascimento:</span> 15/03/1985
        </div>
        <div className={styles.resultsDataItem}>
          <span className={styles.resultsDataLabel}>Matrícula:</span> 20240001
        </div>
      </div>

      <div className={styles.resultsActions}>
        <button className={`${styles.resultsBtn} ${styles.resultsBtnPrimary}`}>
          Exportar Relatório
        </button>
        <button className={`${styles.resultsBtn} ${styles.resultsBtnSecondary}`}>
          Nova Consulta
        </button>
      </div>
    </div>
  );
};

export default FacialRecognitionResults;