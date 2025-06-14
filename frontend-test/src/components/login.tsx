'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Input from './Input';
import Link from 'next/link';

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err: unknown) { 
        if (err instanceof Error) {            
                setError(err.message || 'Error inesperado');
            } else if (typeof err === 'string') {                
                setError(err);
            } else if (typeof err === 'object' && err !== null && 'message' in err && typeof (err as { message: unknown }).message === 'string') {
                
                setError((err as { message: string }).message);
            } else {
                
                setError('Ocurrió un error desconocido');
            }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-700 shadow-md rounded p-6 max-w-md w-full">
    <h2 className="text-xl font-semibold mb-4 text-center text-black">Iniciar Sesión</h2>
    {error && <p className="text-red-500 mb-4">{error}</p>}

    <Input label="Correo electrónico" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    <Input label="Contraseña" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

    <div className="flex justify-between mt-4">
        <button type="submit" className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition">
        Iniciar sesión
        </button>
        <Link href="/register" className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition">
        Registrarse
        </Link>
    </div>
    </form>

  );
};

export default LoginForm;
