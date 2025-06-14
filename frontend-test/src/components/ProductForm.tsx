'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface ProductFormProps {
  onSuccess: () => void;
}

const ProductForm = ({ onSuccess }: ProductFormProps) => {
  const { token, user } = useAuth();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');

  if (user?.role !== 'admin') return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !price || !image) {
      return setError('Todos los campos son requeridos.');
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('image', image);

      const res = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Error al crear producto');
      }

      onSuccess();
      setName('');
      setDescription('');
      setPrice('');
      setImage(null);
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
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl max-w-xl w-full space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Crear nuevo producto</h2>

    {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

    <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">Nombre</label>
        <input
        type="text"
        placeholder="Nombre del producto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
        />
    </div>

    <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">Descripción</label>
        <textarea
        placeholder="Descripción breve del producto"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 shadow-sm resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
    </div>

    <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">Precio</label>
        <input
        type="number"
        placeholder="$0.00"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
        />
    </div>

    <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">Imagen</label>
        <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="w-full text-gray-700 bg-gray-50 border border-gray-400 rounded-lg px-3 py-2 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
        required
        />
    </div>

    <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium shadow hover:bg-blue-700 transition"
    >
        Guardar producto
    </button>
    </form>

  );
};

export default ProductForm;
