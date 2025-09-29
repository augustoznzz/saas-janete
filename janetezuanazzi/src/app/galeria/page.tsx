"use client";
import Image from 'next/image';
import { useState } from 'react';

const images = [
  'https://i.imgur.com/pvIDsyt.jpg',
  'https://i.imgur.com/DUTqYb7.jpg',
  'https://i.imgur.com/u5KKvlw.jpg'
];

export default function GaleriaPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="container-narrow mt-6">
      <h1 className="section-title mb-8">Galeria de Trabalhos</h1>
      <div className="columns-2 md:columns-3 gap-4">
        {images.map((src, i) => (
          <button
            key={i}
            className="mb-4 break-inside-avoid overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20"
            onClick={() => setActive(src)}
            aria-label="Ampliar imagem"
          >
            <Image
              src={src}
              alt="Obra"
              width={1000}
              height={800}
              className="w-full h-auto object-cover hover:opacity-90 transition"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="transform scale-150 transition-transform duration-300 origin-center">
              <Image
                src={active}
                alt="Obra ampliada"
                width={800}
                height={600}
                className="w-[520px] md:w-[600px] h-auto rounded-xl shadow-2xl"
              />
            </div>
            <button
              className="absolute -top-3 -right-3 bg-white text-black rounded-full px-3 py-1 text-sm shadow"
              onClick={() => setActive(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

