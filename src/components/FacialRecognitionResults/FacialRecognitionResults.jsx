import React, { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import PessoaEncontrada from '../PessoaEncontrada/PessoaEncontrada'
import styles from './FacialRecognitionResults.module.css'

const FacialRecognitionResults = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const reportRef = useRef(null)

  const resultado = location.state?.resultado
  const uploadedImage = resultado?.image
  const pessoasEncontradas = resultado?.pessoas || [] // Assumindo que a resposta tem essa estrutura

  const handleNewSearch = () => {
    navigate('/')
  }

  const handleExportReport = async () => {
    if (reportRef.current) {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pageWidth
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save('relatorio-reconhecimento.pdf')
    }
  }

  return (
    <div className={styles.resultsContainer} ref={reportRef}>
      <h1 className={styles.resultsTitle}>Resultado do Reconhecimento</h1>

      {pessoasEncontradas.length > 0 ? (
        <div className={styles.pessoasList}>
          {pessoasEncontradas.map((pessoa, index) => (
            <PessoaEncontrada
              key={index}
              pessoa={{ ...pessoa, imagemEnviada: uploadedImage }}
            />
          ))}
        </div>
      ) : (
        <p>Nenhuma pessoa encontrada.</p>
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
  )
}

export default FacialRecognitionResults
