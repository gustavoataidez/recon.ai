import { useRef, useState } from "react";
import styles from "./FacialRecognitionPage.module.css";
import Modal from "../ModalResult/ModalResult";

const FacialRecognitionPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [results, setResults] = useState([]);
  const [processedImage, setProcessedImage] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Arquivo selecionado:", file);
      setSelectedFile(file);
      setStatusMessage("");
    } else {
      setSelectedFile(null);
      setStatusMessage("Nenhum arquivo selecionado ou arquivo inválido");
    }
  };

  const handleGalleryClick = () => fileInputRef.current.click();
  const handleCancelFile = () => {
    fileInputRef.current.value = "";
    setSelectedFile(null);
    setStatusMessage("Envio cancelado.");
  };

  const onRecognitionClick = async () => {
    if (!selectedFile) {
      setStatusMessage("Selecione uma imagem para continuar.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setStatusMessage("Processando...");
      const response = await fetch("http://localhost:5001/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.error) {
        setStatusMessage(data.error);
        setResults([]);
        setProcessedImage(null);
      } else {
        setResults(data.results || []);
        setProcessedImage(data.image || null);
        setStatusMessage("");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      setStatusMessage("Erro ao enviar a imagem. Tente novamente.");
    }
  };

  return (
    <main className={styles.mainContent}>
      <div className={styles.titleContainer}>
        <div className={styles.titleImage}>
          <img
            src="https://raw.githubusercontent.com/gustavoataidez/site-ssp/main/assets/recon-face.png"
            alt="Reconhecimento Facial"
          />
        </div>
        <h1 className={styles.mainTitle}>Busque por reconhecimento facial</h1>
      </div>

      <div className={styles.optionsContainer}>
        <div
          className={styles.optionCard}
          onClick={() => alert("Função de câmera ainda não implementada.")}
        >
          <div className={styles.optionIcon}>
            <img
              src="https://raw.githubusercontent.com/gustavoataidez/site-ssp/main/assets/camera.png"
              alt="Câmera"
            />
          </div>
          <span className={styles.optionLabel}>Câmera</span>
        </div>
        <div className={styles.optionCard} onClick={handleGalleryClick}>
          <div className={styles.optionIcon}>
            <img
              src="https://raw.githubusercontent.com/gustavoataidez/site-ssp/main/assets/gallery.png"
              alt="Galeria"
            />
          </div>
          <span className={styles.optionLabel}>Galeria</span>
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className={styles.fileInput}
      />

      <div className={styles.statusMessage}>
        {selectedFile ? (
          <>
            Arquivo:{" "}
            <span className={styles.fileName}>{selectedFile.name}</span>
            <span className={styles.cancelButton} onClick={handleCancelFile}>
              ×
            </span>
          </>
        ) : (
          statusMessage
        )}
      </div>

      <button className={styles.actionButton} onClick={onRecognitionClick}>
        Fazer reconhecimento
      </button>

      <p className={styles.instructionText}>
        Carregue uma foto ou abra a câmera para poder tirar uma foto no seu
        aparelho.
      </p>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {processedImage && (
          <img
            src={`data:image/png;base64,${processedImage}`}
            alt="Imagem Processada"
            className={styles.resultImage}
          />
        )}

        {results.length > 0 && (
          <table className={styles.resultTable}>
            <thead>
              <tr>
                <th>Face</th>
                <th>Nome</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={`data:image/png;base64,${item.face_image}`}
                      alt="Face"
                      style={{ width: 80 }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Modal>
    </main>
  );
};

export default FacialRecognitionPage;
