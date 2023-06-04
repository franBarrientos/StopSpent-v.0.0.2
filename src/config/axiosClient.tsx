import axios from 'axios';
const apiUrl: string = import.meta.env.VITE_BASE_URL;
const apiClient = axios.create({
  baseURL: apiUrl, // URL base de la API
  timeout: 5000, // Tiempo de espera máximo en milisegundos
  headers: {
    'Content-Type': 'application/json', // Tipo de contenido para las solicitudes
    // Puedes agregar cualquier otra configuración de encabezado que necesites
  },
});

export default apiClient;