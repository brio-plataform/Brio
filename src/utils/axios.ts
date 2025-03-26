import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Criar instância do Axios com configuração para incluir cookies
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Importante: esta configuração permite enviar cookies com as requisições
  withCredentials: true, 
});

// Interceptor para requisições
api.interceptors.request.use(
  (config) => {
    // Aqui você pode adicionar um token de autenticação se necessário
    const token = localStorage.getItem('brio_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para respostas
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Tratamento de erros global
    if (error.response) {
      // Erro do servidor (status code fora do range 2xx)
      switch (error.response.status) {
        case 401:
          // Não autorizado - fazer logout ou renovar token
          localStorage.removeItem('brio_token');
          window.location.href = '/login';
          break;
        case 403:
          // Acesso proibido
          console.error('Acesso proibido');
          break;
        case 404:
          // Não encontrado
          console.error('Recurso não encontrado');
          break;
        case 500:
          // Erro interno do servidor
          console.error('Erro interno do servidor', error.response.data);
          break;
        default:
          console.error('Ocorreu um erro na requisição');
      }
    } else if (error.request) {
      // Erro de rede ou servidor não respondeu
      console.error('Erro de conexão com o servidor');
    }
    return Promise.reject(error);
  }
);

export default api;
