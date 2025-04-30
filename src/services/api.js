// src/services/api.js
const API_URL = 'http://localhost:5001'; // Altere se necessário

export const recognizeFace = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
      // headers não são necessários quando usando FormData
    });

    if (!response.ok) {
      throw new Error('Erro ao processar imagem');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na API:', error);
    throw error;
  }
};