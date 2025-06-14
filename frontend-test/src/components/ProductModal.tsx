'use client';

import { useState } from 'react';
import ProductForm from './ProductForm';
import { SquarePlus } from 'lucide-react';

const ProductModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen((prev) => !prev);

  return (
    <>
      <button
        onClick={toggleModal}
        className="bg-green-600 text-white px-4 py-2 rounded-full shadow hover:bg-green-700 transition flex items-center justify-center"
        title="Agregar nuevo producto"
      >
        <SquarePlus size={30} />
         
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-gray-700 rounded-lg p-6 shadow-lg w-full max-w-xl relative">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
              title="Cerrar"
            >
              ✕
            </button>
            <ProductForm
              onSuccess={() => {
                toggleModal();
                window.location.reload();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductModal;
