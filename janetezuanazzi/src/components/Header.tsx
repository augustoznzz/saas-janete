"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Instagram, Phone } from 'lucide-react';
import { clsx } from 'clsx';

const nav = [
  { href: '/', label: 'Início' },
  { href: '/cursos', label: 'Cursos' },
  { href: '/galeria', label: 'Galeria' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-brand-pinkLight/80 backdrop-blur border-b border-black/5">
      <div className="container-narrow flex h-16 items-center justify-between">
        <Link href="/" className="font-serif text-xl">
          Ateliê
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={clsx('text-sm', active && 'underline underline-offset-8')}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="https://instagram.com" target="_blank" aria-label="Instagram" className="p-2 rounded-full hover:bg-black/5">
            <Instagram className="h-5 w-5" />
          </Link>
          <Link href="https://wa.me/5500000000000" target="_blank" aria-label="WhatsApp" className="p-2 rounded-full hover:bg-black/5">
            <Phone className="h-5 w-5" />
          </Link>
          <Link href="#" className="cta-button ml-2">Área do Aluno</Link>
        </div>
      </div>
    </header>
  );
}

