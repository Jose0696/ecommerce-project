import RegisterForm from '@/components/register';

export default function RegisterPage() {
  return (
    <main 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <RegisterForm />
    </main>
  );
}
