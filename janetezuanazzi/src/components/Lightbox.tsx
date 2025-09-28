'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PortfolioItem } from '@/types';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: PortfolioItem[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Lightbox({
  isOpen,
  onClose,
  items,
  currentIndex,
  onPrevious,
  onNext,
}: LightboxProps) {
  const currentItem = items[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrevious, onNext]);

  if (!currentItem) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-full bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
              aria-label="Fechar lightbox"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            {items.length > 1 && (
              <>
                <button
                  onClick={onPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={onNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Image */}
            <div className="relative aspect-square max-h-[70vh]">
              <Image
                src={currentItem.image}
                alt={currentItem.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Info */}
            <div className="p-6 bg-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display font-semibold text-xl text-ink mb-2">
                    {currentItem.title}
                  </h3>
                  <span className="px-3 py-1 bg-accent text-ink text-sm font-medium rounded-full">
                    {currentItem.category}
                  </span>
                </div>
                {items.length > 1 && (
                  <span className="text-ink/50 text-sm">
                    {currentIndex + 1} de {items.length}
                  </span>
                )}
              </div>
              
              <p className="text-ink/70 mb-4 leading-relaxed">
                {currentItem.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-ink">Técnica:</span>
                  <p className="text-ink/70">{currentItem.technique}</p>
                </div>
                <div>
                  <span className="font-medium text-ink">Material:</span>
                  <p className="text-ink/70">{currentItem.material}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
