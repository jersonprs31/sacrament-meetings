import { signOut } from '@/auth';

export function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/login' });
      }}
    >
      <button type="submit" className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700">
        Cerrar Sesión
      </button>
    </form>
  );
}