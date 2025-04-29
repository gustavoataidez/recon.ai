import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PessoaEncontrada from '../PessoaEncontrada/PessoaEncontrada';
import styles from './FacialRecognitionResults.module.css';

const FacialRecognitionResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const uploadedImage = state?.image;
  const reportRef = useRef(null);

  const [pessoasEncontradas, setPessoasEncontradas] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const response = await fetch('http://localhost:3000/pessoasEncontradas');
        const data = await response.json();
        console.log('DATA RECEBIDA:', data); // <--- TESTE IMPORTANTE
        setPessoasEncontradas(data || []);
      } catch (error) {
        console.error('Erro ao buscar pessoas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPessoas();
  }, []);

  return (
    <div className={styles.resultsContainer} ref={reportRef}>
      <h1 className={styles.resultsTitle}>Resultado do Reconhecimento</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className={styles.pessoasList}>
          {pessoasEncontradas.length > 0 ? (
            pessoasEncontradas.map((pessoa, index) => (
              <PessoaEncontrada key={index} pessoa={{
                ...pessoa,
                imagemEnviada: uploadedImage
              }} />
            ))
          ) : (
            <p>Nenhuma pessoa encontrada.</p>
          )}
        </div>
      )}

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
