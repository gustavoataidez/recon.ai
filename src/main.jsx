import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import FacialRecognitionResults from './components/FacialRecognitionResults/FacialRecognitionResults'
import Header from './components/Header/Header' // Importe o Header aqui
import './assets/styles/variables.css'
import './assets/styles/globals.css'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/resultados" element={<FacialRecognitionResults />} />
      </Routes>
    </Router>
  </React.StrictMode>
)