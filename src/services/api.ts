import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Interceptor para adicionar o token de autenticação automaticamente
api.interceptors.request.use(
  (config) => {
    // Verificar se estamos no lado do cliente
    if (typeof window !== "undefined") {
      const authData = localStorage.getItem("auth-storage");
      if (authData) {
        try {
          const parsed = JSON.parse(authData);
          const token = parsed.state?.token;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error("Erro ao parsear dados de autenticação:", error);
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com respostas de erro 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Se receber 401, limpar o token e redirecionar para login
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth-storage");
        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  }
);
