import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import * as api from './Auth'; 
import type { LoginProps } from './Auth';

interface User {
  id: string; // CRUCIAL: Assumindo que seu 'user' tem um 'id'
  username: string;
  nomeCompleto?: string;
  email?: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (data: LoginProps) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Crie o Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crie o Provedor (Provider)
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ao carregar o app, tente buscar o usuário do localStorage
  useEffect(() => {
    try {
      const user = api.getCurrentUser();
      const token = localStorage.getItem('token');
      if (user && token) {
        setCurrentUser(user);
      }
    } catch (error) {
      console.error("Falha ao carregar usuário:", error);
      api.logout(); // Limpa dados corrompidos
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Função de login que atualiza o estado E o localStorage
  const login = async (data: LoginProps) => {
    const { user, token } = await api.Login(data); // Chama sua API
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
  };

  // Função de logout que limpa tudo
  const logout = () => {
    api.logout();
    setCurrentUser(null);
  };

  // Não renderize o app até sabermos se o usuário está logado
  if (isLoading) {
    return <div>Carregando...</div>; // Ou um componente de Spinner
  }

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      login, 
      logout, 
      isAuthenticated: !!currentUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};