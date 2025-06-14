'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Pencil } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

interface Props {
  product: Product;
  onSuccess: () => void;
}

const EditProductModal = ({ product, onSuccess }: Props) => {
  const { token, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(String(product.price));
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');

  if (user?.role !== 'admin') return null;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      if (image) formData.append('image', image);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Error al actualizar');
      }

      onSuccess();
      setIsOpen(false);
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
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition flex items-center justify-center"
      >
        <Pencil className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Editar producto</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Nombre"
                required
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 shadow-sm resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={3}
                placeholder="Descripción"
              />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Precio"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="w-full text-gray-700 bg-gray-50 border border-gray-400 rounded-lg px-3 py-2 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Guardar cambios
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProductModal;
