'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PortfolioCard from '@/components/PortfolioCard';
import Lightbox from '@/components/Lightbox';
import { portfolioItems } from '@/data/portfolio';
import { PortfolioItem } from '@/types';

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'enxoval', name: 'Enxoval' },
  { id: 'patches', name: 'Patches' },
  { id: 'monogramas', name: 'Monogramas' },
  { id: 'presentes', name: 'Presentes' },
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') {
      return portfolioItems;
    }
    return portfolioItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const handlePortfolioClick = (item: PortfolioItem) => {
    const index = portfolioItems.findIndex(i => i.id === item.id);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? portfolioItems.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => 
      prev === portfolioItems.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-bg to-accent/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-ink mb-6">
              Portfólio
            </h1>
            <p className="text-xl text-ink/70 leading-relaxed">
              Explore nossa coleção de bordados únicos e personalizados. 
              Cada peça conta uma história especial.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-bg border-b border-accent/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-accent text-ink'
                    : 'bg-white text-ink/70 hover:bg-accent/20 hover:text-ink border border-accent/20'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-bg">
        <div className="container-custom">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <h3 className="text-2xl font-display font-semibold text-ink mb-4">
                Nenhuma peça encontrada
              </h3>
              <p className="text-ink/70 mb-8">
                Não encontramos peças nesta categoria. Tente selecionar outra categoria.
              </p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="btn-primary"
              >
                Ver Todas as Peças
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <PortfolioCard item={item} onClick={handlePortfolioClick} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent/10">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-display font-bold text-ink mb-6">
              Gostou do que Viu?
            </h2>
            <p className="text-lg text-ink/70 mb-8">
              Entre em contato e vamos criar algo único e especial para você. 
              Cada peça é feita com amor e dedicação.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/contato"
                className="btn-primary inline-flex items-center justify-center"
              >
                Solicitar Orçamento
              </a>
              <a
                href="/servicos"
                className="btn-secondary inline-flex items-center justify-center"
              >
                Ver Serviços
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={portfolioItems}
        currentIndex={currentImageIndex}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}
