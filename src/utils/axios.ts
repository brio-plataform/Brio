import axios from 'axios';

// Criando uma instância personalizada do axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
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
          console.error('Erro interno do servidor');
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
