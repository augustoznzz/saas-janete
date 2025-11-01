"use client";
import Image from 'next/image';
import { useState } from 'react';

// Match the homepage gallery preview images
const images = [
  'https://i.imgur.com/pvIDsyt.jpg',
  'https://i.imgur.com/DUTqYb7.jpg',
  'https://i.imgur.com/u5KKvlw.jpg',
  'https://i.imgur.com/4PUUadq.jpg',
  'https://i.imgur.com/eprkf4Y.jpg',
];

export default function GaleriaPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="container-narrow mt-6">
      <h1 className="section-title mb-8">Galeria de Bordados das Alunas</h1>
      <div className="columns-2 md:columns-3 gap-4">
        {images.map((src, i) => (
          <button key={i} className="mb-4 break-inside-avoid overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20" onClick={() => setActive(src)}>
            <Image src={src} alt="Obra" width={1000} height={800} className="w-full h-auto object-cover hover:opacity-90 transition" />
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setActive(null)}>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <div className="transition-transform duration-300 origin-center scale-[1.2]">
              <Image
                src={active}
                alt="Obra ampliada"
                width={800}
                height={600}
                className="w-[500px] md:w-[560px] h-auto rounded-xl shadow-2xl"
              />
            </div>
            <button className="absolute -top-3 -right-3 bg-white text-black rounded-full px-3 py-1 text-sm shadow" onClick={() => setActive(null)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

