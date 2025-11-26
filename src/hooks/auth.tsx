import React, { createContext, useContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@config/api';

type User = { id: string; name: string; email?: string | null; role: 'CLIENT' | 'PRO'; avatarUrl?: string | null };

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signUp: (data: { fullName: string; email: string; password: string }) => Promise<void>;
};

const TOKEN_KEY = '@client_token';
const USER_KEY = '@client_user';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const [token, userJson] = await Promise.all([
          AsyncStorage.getItem(TOKEN_KEY),
          AsyncStorage.getItem(USER_KEY),
        ]);
        if (token && userJson) {
          const parsedUser = JSON.parse(userJson);
          // Verifica se o usuário salvo tem role CLIENT antes de restaurar a sessão
          if (parsedUser.role !== 'CLIENT') {
            // Limpa dados inválidos do AsyncStorage
            await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
            delete api.defaults.headers.common.Authorization;
            return;
          }
          api.defaults.headers.common.Authorization = `Bearer ${token}`;
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    const { token, user: returnedUser } = res.data as { token: string; user: User };
    
    // Verifica se o usuário tem role CLIENT antes de permitir login no app
    if (returnedUser.role !== 'CLIENT') {
      throw new Error('Esta aplicação é apenas para clientes. Por favor, use a aplicação de profissionais.');
    }
    
    await Promise.all([
      AsyncStorage.setItem(TOKEN_KEY, token),
      AsyncStorage.setItem(USER_KEY, JSON.stringify(returnedUser)),
    ]);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    setUser(returnedUser);
    setIsAuthenticated(true);
  }, []);

  const signUp = useCallback(async (data: { fullName: string; email: string; password: string }) => {
    const res = await api.post('/auth/signup', { fullName: data.fullName, email: data.email, password: data.password, role: 'CLIENT' });
    const { token, user: returnedUser } = res.data as { token: string; user: User };
    await Promise.all([
      AsyncStorage.setItem(TOKEN_KEY, token),
      AsyncStorage.setItem(USER_KEY, JSON.stringify(returnedUser)),
    ]);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    setUser(returnedUser);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
    delete api.defaults.headers.common.Authorization;
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};


