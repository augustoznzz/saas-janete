"use client";
import Image from 'next/image';
import { useState } from 'react';

const images = Array.from({ length: 12 }).map((_, i) =>
  `https://images.unsplash.com/photo-15${Math.floor(1000000000000 + Math.random()*999999999999)}?q=80&w=1600&auto=format&fit=crop`
);

export default function GaleriaPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="container-narrow mt-6">
      <h1 className="section-title mb-8">Galeria de Trabalhos</h1>
      <div className="columns-2 md:columns-3 gap-4">
        {images.map((src, i) => (
          <button key={i} className="mb-4 break-inside-avoid overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20" onClick={() => setActive(src)}>
            <Image src={src} alt="Obra" width={1000} height={800} className="w-full h-auto object-cover hover:opacity-90 transition" />
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setActive(null)}>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <Image src={active} alt="Obra" width={1600} height={1200} className="w-full h-auto rounded-xl" />
            <button className="absolute top-3 right-3 bg-white/90 rounded-full px-3 py-1 text-sm" onClick={() => setActive(null)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

