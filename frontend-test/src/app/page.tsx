'use client';

import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/login';
import Header from '@/components/Header';
import Table from '@/components/Table';
import Cart from '@/components/Cart';

export default function Home() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background.jpg')" }}>
      {user ? (
        <>
          <Header />
          <div className="flex justify-center items-start mt-10 px-4 gap-8">
            <div className="flex-1 max-w-4xl">
              <Table />
            </div>

            {user?.role === 'user' && (
              <div className="w-[500px] bg-purple-950 shadow-lg rounded-xl p-4 ">
                <Cart />
              </div>
            )}
          </div>

        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen px-4">
          <LoginForm />
        </div>
      )}
    </main>
  );
}
