'use client';

import { useAuth } from '@/context/AuthContext';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  if (!user) return null;

  return (
    <header className="w-full bg-blue-900 py-4 px-6 flex justify-between items-center shadow-md">
      {/* Logo y texto */}
      <div className="flex items-center gap-4">
        <Image src="/shopping-cart.png" alt="Logo" width={50} height={40} />
        <div>
          <h2 className="text-xl font-bold text-white">
            Bienvenido, <span className="text-blue-200">{user.name}</span>
          </h2>
        </div>
      </div>

      {/* Carrito y logout */}
      <div className="flex items-center gap-4">
        {user.role === 'user' && (
          <a
            href="#cart"
            className="relative text-white hover:text-blue-200 transition"
            title="Ver carrito"
          >
            <ShoppingCart size={26} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                {cart.length}
              </span>
            )}
          </a>
        )}

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow transition-all duration-150"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Header;
