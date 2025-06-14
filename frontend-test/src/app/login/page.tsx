import LoginForm from '@/components/login';

export default function LoginPage() {
  return (
  <main
    className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/background.jpg')" }}
  >
    <LoginForm />
  </main>
  );
}
