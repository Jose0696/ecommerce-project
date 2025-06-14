'use client';

import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import ProductModal from '@/components/ProductModal';
import EditProductModal from './EditProductModal';
import DeleteProductModal from './DeleteProductModal';
import AddToCartButton from './AddToCartButton';
import { useAuth } from '@/context/AuthContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

const Table = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => { 
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
      setFiltered(data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredData = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredData);
    setCurrentPage(1);
  }, [search, products]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full max-w-6xl mx-auto bg-purple-950 p-8 rounded-2xl shadow-xl">
    <div >
        {user?.role === 'admin' && (
            <div className="flex justify-end mb-6">
              <ProductModal />
            </div>
          )}

          
    </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-black">Productos</h2>
            <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar por nombre..."
            />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-400">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Imagen</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Descripción</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Precio</th>

            {user?.role === 'admin' && (
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Editar </th>                
            )}

            {user?.role === 'admin' && (
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Eliminar </th>                
            )}

            {user?.role === 'user' && (
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Carrito</th>
            )}

              
            </tr>
          </thead>
          <tbody className="bg-yellow-300 divide-y divide-gray-100">
            {currentItems.map((product) => (
              <tr key={product.id} className="hover:bg-gray-400 transition">
                <td className="px-6 py-4">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-16 w-16 object-cover rounded-md shadow-sm border border-gray-200"
                  />
                </td>
                <td className="px-6 py-4 text-gray-800">{product.name}</td>
                <td className="px-6 py-4 text-gray-600">{product.description}</td>
                <td className="px-6 py-4 font-semibold text-green-600">
                ${Number(product.price).toFixed(2)}
                </td>

                {user?.role === 'admin' && (
                <td className="px-6 py-4">
                    <EditProductModal product={product} onSuccess={() => window.location.reload()} />
                </td>
                )}

                {user?.role === 'admin' && (
                <td className="px-6 py-4">
                    <DeleteProductModal product={product} onSuccess={() => window.location.reload()} />
                </td>
                )}

                {user?.role === 'user' && (
                    <td className="px-6 py-4">
                        <AddToCartButton
                        product={{
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image_url: product.image_url,
                        }}
                        />
                    </td>
                )}


              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
};

export default Table;
