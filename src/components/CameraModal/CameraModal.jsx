import styles from './CameraModal.module.css'

const CameraModal = ({ videoRef, onTakePhoto, onClose, onToggleCamera, usingFrontCamera }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Fechar câmera">
          &times;
        </button>

        <div className={styles.videoContainer}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={styles.cameraView}
            style={{ transform: usingFrontCamera ? 'scaleX(-1)' : 'none' }}
          />
        </div>

        <div className={styles.controls}>
          <button onClick={onToggleCamera}>🔄 Trocar Câmera</button>
          <button className={styles.captureButton} onClick={onTakePhoto}>
            <div className={styles.captureIcon} />
          </button>
        </div>
      </div>
    </div>
  )
}



export default CameraModal