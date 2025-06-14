'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Trash } from 'lucide-react';

interface Product {
  id: number;
  name: string;
}

interface Props {
  product: Product;
  onSuccess: () => void;
}

const DeleteProductModal = ({ product, onSuccess }: Props) => {
  const { user, token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');

  if (user?.role !== 'admin') return null;

  const handleDelete = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${product.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Error al eliminar');
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
        className="bg-red-600 text-white px-4 py-2 rounded-full shadow hover:bg-red-700 transition flex items-center justify-center"
      >
        <Trash className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">¿Eliminar producto?</h2>
            <p className="mb-4 text-gray-900">
              ¿Estás seguro que deseas eliminar <strong>{product.name}</strong>?
            </p>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 shadow-sm transition-colors duration-150"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteProductModal;
