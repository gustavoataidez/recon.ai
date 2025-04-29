import React from 'react';
import styles from './PessoaEncontrada.module.css'; // mesmo CSS de antes

const PessoaEncontrada = ({ pessoa }) => {
  return (
    <div className={styles.reconhecimentoIndividual}>
      <div className={styles.resultsImageComparison}>
        <div className={styles.resultsImageBox}>
          <h4>Imagem do Banco</h4>
          <img
            src={pessoa.imagem}
            alt={`Imagem de ${pessoa.nome_completo}`}
            className={styles.resultsImage}
          />
        </div>
      </div>

      <div className={styles.resultsSimilarity}>
        {/* Você pode colocar % de similaridade aqui se quiser depois */}
      </div>

      <div className={styles.resultsUserData}>
        <div className={styles.resultsDataItem}>
          <span className={styles.resultsDataLabel}>Nome:</span> {pessoa.nome_completo}
        </div>
        <div className={styles.resultsDataItem}>
          <span className={styles.resultsDataLabel}>CPF:</span> {pessoa.cpf}
        </div>
        <div className={styles.resultsDataItem}>
          <span className={styles.resultsDataLabel}>Data de Nascimento:</span> {pessoa.data_nascimento}
        </div>
        <div className={styles.resultsDataItem}>
          <span className={styles.resultsDataLabel}>Status:</span>{' '}
          <span className={styles.resultsSimilarity}>
            {pessoa.status.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PessoaEncontrada;
