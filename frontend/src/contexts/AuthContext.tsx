// frontend/src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, type ReactNode } from 'react';
import { apiService } from '../services/api';
import type { User, LoginData, RegisterData } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginData) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger l'utilisateur depuis localStorage au montage
  useEffect(() => {
    const savedToken = localStorage.getItem('snipshare-token');
    const savedUser = localStorage.getItem('snipshare-user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginData) => {
    try {
      const response = await apiService.login(credentials);
      setUser(response.user);
      setToken(response.token);
      
      // Sauvegarder dans localStorage
      localStorage.setItem('snipshare-token', response.token);
      localStorage.setItem('snipshare-user', JSON.stringify(response.user));
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await apiService.register(userData);
      setUser(response.user);
      setToken(response.token);
      
      // Sauvegarder dans localStorage
      localStorage.setItem('snipshare-token', response.token);
      localStorage.setItem('snipshare-user', JSON.stringify(response.user));
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('snipshare-token');
    localStorage.removeItem('snipshare-user');
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};