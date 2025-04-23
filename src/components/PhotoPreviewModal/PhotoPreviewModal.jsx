import styles from './PhotoPreviewModal.module.css'

const PhotoPreviewModal = ({ imageUrl, onConfirm, onRetake, onClose }) => {
  return (
    <div className={styles.previewOverlay}>
      <div className={styles.previewContent}>
        <button 
          className={styles.closeButton} 
          onClick={onClose}
          aria-label="Fechar pré-visualização"
        >
          &times;
        </button>
        
        <div className={styles.previewImageContainer}>
          <img 
            src={imageUrl} 
            alt="Pré-visualização da foto" 
            className={styles.previewImage}
          />
        </div>
        
        <div className={styles.previewActions}>
          <button 
            className={styles.retakeButton}
            onClick={onRetake}
          >
            Tirar Outra Foto
          </button>
          <button 
            className={styles.confirmButton}
            onClick={onConfirm}
          >
            Usar Esta Foto
          </button>
        </div>
      </div>
    </div>
  )
}

export default PhotoPreviewModal