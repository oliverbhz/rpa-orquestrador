import { createContext, useContext, useState, ReactNode } from 'react';
import axios, { AxiosError } from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      // Criar FormData e adicionar os campos necessários
      const formData = new FormData();
      formData.append('username', email); // FastAPI espera 'username', mesmo sendo email
      formData.append('password', password);

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const token = response.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      setError(null);
      
      // Configura o token para todas as requisições futuras
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      let errorMessage = 'Erro ao fazer login';
      if (error instanceof AxiosError && error.response) {
        errorMessage = error.response.data.detail || errorMessage;
      }
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        token,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 