import { useState, useRef, useEffect } from 'react'
import Header from './components/Header/Header'
import MainContent from './components/MainContent/MainContent'
import CameraModal from './components/CameraModal/CameraModal'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [statusMessage, setStatusMessage] = useState('Nenhum arquivo selecionado')
  const [showCamera, setShowCamera] = useState(false)
  const videoRef = useRef(null)
  const [stream, setStream] = useState(null)

  const handleFileChange = (file) => {
    setSelectedFile(file)
    setStatusMessage(file ? `Arquivo selecionado: ${file.name}` : 'Nenhum arquivo selecionado')
  }

  const startCamera = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const hasCamera = devices.some(device => device.kind === 'videoinput')
      
      if (!hasCamera) {
        alert('Nenhuma câmera encontrada neste dispositivo.')
        return
      }

      const constraints = {
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      }

      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        delete constraints.video.width
        delete constraints.video.height
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
      setStream(mediaStream)
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setShowCamera(true)
    } catch (err) {
      console.error('Erro ao acessar a câmera:', err)
      alert('Não foi possível acessar a câmera. Verifique as permissões.')
    }
  }

  const takePhoto = () => {
    const video = videoRef.current
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    // Usa as dimensões reais do vídeo
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Desenha a imagem do vídeo no canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Converte para Blob e depois para File
    canvas.toBlob((blob) => {
      const file = new File([blob], 'foto-camera.png', { type: 'image/png' })
      handleFileChange(file)
      stopCamera()
    }, 'image/png')
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setShowCamera(false)
  }

  useEffect(() => {
    if (showCamera && videoRef.current && stream) {
      videoRef.current.srcObject = stream
      videoRef.current.play().catch(err => {
        console.error('Erro ao iniciar vídeo:', err)
      })
    }
  }, [showCamera, stream])
  
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])
  

  return (
    <div className="app">
      <Header />
      <MainContent 
        onFileChange={handleFileChange}
        onCameraClick={startCamera}
        statusMessage={statusMessage}
        selectedFile={selectedFile}
      />
      
      {showCamera && (
        <CameraModal
          videoRef={videoRef}
          onTakePhoto={takePhoto}
          onClose={stopCamera}
        />
      )}
    </div>
  )
}

export default App