"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Instagram, Phone, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

const nav = [
  { href: '/', label: 'Início' },
  { href: '/cursos', label: 'Cursos' },
  { href: '/galeria', label: 'Galeria' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-brand-pinkLight/80 backdrop-blur border-b border-black/5">
      <div className="container-narrow flex h-16 md:h-[67.2px] items-center justify-between">
        <Link href="/" className="font-serif text-xl">
          Janete Zuanazzi
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={clsx('text-sm md:text-[0.919rem]', active && 'underline underline-offset-8')}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="https://www.instagram.com/janetezuanazzi/" target="_blank" aria-label="Instagram" className="p-2 rounded-full hover:bg-black/5">
            <Instagram className="h-5 w-5" />
          </Link>
          <Link href="https://wa.me/554899819211?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20melhor%20sobre%20o%20seu%20trabalho%20e%20os%20valores%20das%20aulas%20presenciais" target="_blank" aria-label="WhatsApp" className="p-2 rounded-full hover:bg-black/5">
            <Phone className="h-5 w-5" />
          </Link>
          <Link href="/login" className="cta-button ml-2 hidden md:inline-flex whitespace-nowrap">Área do Aluno</Link>
          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Abrir menu"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
            className="ml-2 md:hidden p-2 rounded-md hover:bg-black/5"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={clsx(
          'md:hidden overflow-hidden border-t border-black/5 bg-white',
          isOpen ? 'max-h-[60vh] shadow-lg' : 'max-h-0'
        )}
      >
        <div className="container-narrow py-4">
          <nav className="grid">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'px-2 py-3 rounded-lg text-base hover:bg-black/5',
                    active && 'underline underline-offset-8'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-3 flex items-center gap-3">
            <Link href="https://www.instagram.com/janetezuanazzi/" target="_blank" aria-label="Instagram" className="p-2 rounded-full hover:bg-black/5">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="https://wa.me/554899819211?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20melhor%20sobre%20o%20seu%20trabalho%20e%20os%20valores%20das%20aulas%20presenciais" target="_blank" aria-label="WhatsApp" className="p-2 rounded-full hover:bg-black/5">
              <Phone className="h-5 w-5" />
            </Link>
          </div>
          <Link href="/login" className="cta-button w-full mt-4">Área do Aluno</Link>
        </div>
      </div>
    </header>
  );
}

