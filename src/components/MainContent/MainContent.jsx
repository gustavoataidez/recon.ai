import { useRef } from 'react'
import styles from './MainContent.module.css'
import TitleContainer from '../TitleContainer/TitleContainer'
import OptionCard from '../OptionCard/OptionCard'

const MainContent = ({ onFileChange, onCameraClick, statusMessage, selectedFile, onRecognitionClick }) => {
  const fileInputRef = useRef()

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      onFileChange(file)
    }
  }

  const handleGalleryClick = () => fileInputRef.current.click()
  const handleCancelFile = () => {
    fileInputRef.current.value = ''
    onFileChange(null)
  }

  return (
    <main className={styles.mainContent}>
      <TitleContainer />
      
      <div className={styles.optionsContainer}>
        <OptionCard 
          iconSrc="https://raw.githubusercontent.com/gustavoataidez/site-ssp/main/assets/camera.png"
          label="Câmera"
          onClick={onCameraClick}
        />
        <OptionCard 
          iconSrc="https://raw.githubusercontent.com/gustavoataidez/site-ssp/main/assets/gallery.png"
          label="Galeria"
          onClick={handleGalleryClick}
        />
      </div>
      
      <input 
        type="file" 
        id="file-input" 
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />
      
      <div className={styles.statusMessage}>
        {selectedFile ? (
          <>
            Arquivo selecionado: <span className={styles.fileName}>{selectedFile.name}</span>
            <span className={styles.cancelButton} onClick={handleCancelFile}>×</span>
          </>
        ) : (
          statusMessage
        )}
      </div>
      
      <button 
        className={styles.actionButton}
        onClick={onRecognitionClick} // Use a prop passada
      >
        Fazer reconhecimento
      </button>
      
      <p className={styles.instructionText}>
        Carregue uma foto ou abra a câmera para poder tirar uma foto no seu aparelho.
      </p>
    </main>
  )
}

export default MainContent