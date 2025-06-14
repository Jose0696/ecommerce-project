'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, registerUser } from '@/utils/api';

interface User {
  id: number;
  name: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

    const login = async (email: string, password: string) => {
        try {
            const data = await loginUser(email, password);
            setToken(data.token);
            setUser(data.user);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            router.push('/');
        } catch (err: unknown) { 
            console.error(err); 

            let errorMessage = 'Error al iniciar sesión';

            if (err instanceof Error) {
                errorMessage = err.message;
            } else if (
                typeof err === 'object' &&
                err !== null &&
                'response' in err &&
                typeof (err as { response: unknown }).response === 'object' &&
                (err as { response: Record<string, unknown> }).response !== null &&
                'data' in (err as { response: Record<string, unknown> }).response &&
                typeof ((err as { response: Record<string, unknown> }).response as { data: unknown }).data === 'object' &&
                ((err as { response: Record<string, unknown> }).response as { data: Record<string, unknown> }).data !== null &&
                'message' in ((err as { response: Record<string, unknown> }).response as { data: Record<string, unknown> }).data &&
                typeof (((err as { response: Record<string, unknown> }).response as { data: Record<string, unknown> }).data as { message: unknown }).message === 'string'
            ) {
                errorMessage = (((err as { response: Record<string, unknown> }).response as { data: Record<string, unknown> }).data as { message: string }).message;
            } else if (typeof err === 'string') {
                errorMessage = err;
            }

            throw new Error(errorMessage);
            }
    };


  const register = async (name: string, email: string, password: string) => {
    await registerUser(name, email, password);
    await login(email, password);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  }
  return context;
};
