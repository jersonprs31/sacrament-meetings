'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const pathname = usePathname();
  const links = [
    { name: 'Home', href: '/' },
    { name: 'Meetings', href: '/meetings' },
  ];

  return (
    <nav className="flex gap-4">
      {links.map((link) => (
        <Link 
          key={link.name} 
          href={link.href}
          className={`px-3 py-2 rounded-md transition-colors ${
            pathname === link.href ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}