import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import * as api from './Auth'; 
import type { LoginProps } from './Auth';
import { Loading } from '../components/common/Loading'


interface User {
  id: string; 
  username: string;
  nomeCompleto?: string;
  email?: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (data: LoginProps) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (userData: Partial<User>) => void;
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
    const { user, token } = await api.Login(data); 
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
  };

  // Função de logout que limpa tudo
  const logout = () => {
    api.logout();
    setCurrentUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (!currentUser) return;

    // Mescla os dados atuais com os novos
    const updated = { ...currentUser, ...userData };

    // Atualiza o estado (reflete na tela imediatamente)
    setCurrentUser(updated);

    // Atualiza o localStorage (persiste se der F5)
    localStorage.setItem('user', JSON.stringify(updated));
  };

  if (isLoading) {
     return <Loading/>
  }

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      login, 
      logout, 
      isAuthenticated: !!currentUser, 
      updateUser
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