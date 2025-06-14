'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`flex items-center gap-1 text-sm px-4 py-2 rounded transition ${
        added ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      <ShoppingCart size={16} />
      {added ? 'Agregado' : 'Agregar'}
    </button>
  );
};

export default AddToCartButton;
