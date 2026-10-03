import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <h1 className="mb-4 text-2xl font-bold text-center">Iniciar Sesión</h1>
        <LoginForm />
      </div>
    </main>
  );
}