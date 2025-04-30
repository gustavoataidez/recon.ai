import React from 'react';
import styles from './PessoaEncontrada.module.css';

const DEFAULT_IMAGE = 'https://raw.githubusercontent.com/gustavoataidez/recon.ai/refs/heads/main/src/assets/img/homem1.png';

const PessoaEncontrada = ({ pessoa, uploadedFaceImage }) => {
  // Usa a imagem padrão se não houver imagem do banco
  const databaseImage = pessoa?.imagem || DEFAULT_IMAGE;
  
  // Usa a imagem padrão se não houver imagem enviada
  const uploadedImage = uploadedFaceImage || DEFAULT_IMAGE;

  return (
    <div className={styles.reconhecimentoIndividual}>
      <div className={styles.imagesComparisonContainer}>
        {/* Imagem do banco de dados */}
        <div className={styles.imageComparisonBox}>
          <h4>Imagem Banco</h4>
          <img
            src={databaseImage}
            alt={`Imagem de ${pessoa?.nome_completo || 'Não identificado'}`}
            className={styles.comparisonImage}
            onError={(e) => {
              e.target.src = DEFAULT_IMAGE;
            }}
          />
        </div>

        {/* Imagem enviada para reconhecimento */}
        <div className={styles.imageComparisonBox}>
          <h4>Imagem Enviada</h4>
          <img
            src={uploadedImage}
            alt="Face detectada na imagem enviada"
            className={styles.comparisonImage}
            onError={(e) => {
              e.target.src = DEFAULT_IMAGE;
            }}
          />
        </div>
      </div>

      <div className={styles.resultsUserData}>
        <div className={styles.resultsDataItem}>
          <span className={styles.resultsDataLabel}>Nome:</span> {pessoa?.nome_completo || 'Não identificado'}
        </div>
        {pessoa?.cpf && (
          <div className={styles.resultsDataItem}>
            <span className={styles.resultsDataLabel}>CPF:</span> {pessoa.cpf}
          </div>
        )}
        {pessoa?.data_nascimento && (
          <div className={styles.resultsDataItem}>
            <span className={styles.resultsDataLabel}>Data de Nascimento:</span> {pessoa.data_nascimento}
          </div>
        )}
        <div className={styles.resultsDataItem}>
          <span className={styles.resultsDataLabel}>Status:</span>{' '}
          <span className={`${styles.resultsStatus} ${pessoa?.status === 'Desconhecido' ? styles.unknown : ''}`}>
            {(pessoa?.status || 'Desconhecido').toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PessoaEncontrada;