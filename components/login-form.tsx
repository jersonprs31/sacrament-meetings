'use client';
import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
        <input 
          id="email" type="email" name="email" required 
          className="w-full rounded-md border p-2 text-black"
          defaultValue="admin@admin.com" 
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">Contraseña</label>
        <input 
          id="password" type="password" name="password" minLength={6} required 
          className="w-full rounded-md border p-2 text-black"
          defaultValue="123456"
        />
      </div>
      <button 
        aria-disabled={isPending} 
        type="submit"
        className="mt-2 w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending ? 'Ingresando...' : 'Entrar'}
      </button>
      {errorMessage && <p className="text-red-500 text-sm mt-2" role="alert">{errorMessage}</p>}
    </form>
  );
}