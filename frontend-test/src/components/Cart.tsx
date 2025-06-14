'use client';

import { useCart } from '@/context/CartContext';
import { Trash2 } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, getTotal } = useCart();

  if (cart.length === 0) {
    return (
      <section id="cart" className="max-w-4xl mx-auto mt-10 bg-yellow-400 p-6 rounded shadow text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Tu carrito</h2>
        <p className="text-gray-900">No tienes productos agregados al carrito.</p>
      </section>
    );
  }

  return (
    <section id="cart" className="max-w-4xl mx-auto mt-10 bg-yellow-300 p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-6 text-gray-900">Tu carrito</h2>

      <ul className="divide-y divide-gray-200 mb-6 ">
        {cart.map((item) => (
          <li key={item.id} className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <img src={item.image_url} alt={item.name} className="h-16 w-16 rounded border" />
              <div>
                <h4 className="font-semibold text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                <p className="text-sm text-gray-700">
                    Precio unitario: ${Number(item.price).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-semibold text-green-600">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800"
                title="Quitar"
              >
                <Trash2 />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="text-right font-bold text-lg text-blue-700">
        Total: ${getTotal().toFixed(2)}
      </div>
    </section>
  );
};

export default Cart;
