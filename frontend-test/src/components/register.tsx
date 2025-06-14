'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Input from './Input';

const RegisterForm = () => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
    } catch (err) {
        console.error(err);
        setError('Error al registrar. El correo puede estar en uso.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gray-700 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">Crear cuenta</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Input label="Nombre completo" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input label="Correo electrónico" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label="Contraseña" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button type="submit" className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
