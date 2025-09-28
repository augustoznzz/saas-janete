'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Clock, Truck, Star } from 'lucide-react';
import Button from '@/components/Button';
import PortfolioCard from '@/components/PortfolioCard';
import Lightbox from '@/components/Lightbox';
import { portfolioItems } from '@/data/portfolio';
import { testimonials } from '@/data/testimonials';
import { PortfolioItem } from '@/types';

export default function HomePage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const featuredItems = portfolioItems.filter(item => item.featured);

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
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-bg to-accent/10">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-ink mb-6">
              Janete Zuanazzi
            </h1>
            <p className="text-xl md:text-2xl text-ink/70 mb-12 font-light">
              Bordados autorais e personalizados
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button href="/portfolio" size="lg">
                Ver Portfólio
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button href="/contato" variant="secondary" size="lg">
                Pedir Orçamento
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Decorative SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowRight className="text-ink/30" size={24} />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Portfolio */}
      <section className="py-20 bg-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ink mb-6">
              Destaques do Portfólio
            </h2>
            <p className="text-lg text-ink/70 max-w-2xl mx-auto">
              Peças únicas criadas com amor e dedicação, cada uma contando uma história especial
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <PortfolioCard item={item} onClick={handlePortfolioClick} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button href="/portfolio" size="lg">
              Ver Portfólio Completo
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-accent/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ink mb-6">
              Processo de Criação
            </h2>
            <p className="text-lg text-ink/70 max-w-2xl mx-auto">
              Cada peça passa por um processo cuidadoso e artesanal
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Consulta e Design',
                description: 'Conversamos sobre suas ideias e criamos um design exclusivo para sua peça',
                icon: Heart,
              },
              {
                step: '02',
                title: 'Seleção de Materiais',
                description: 'Escolhemos os melhores tecidos e linhas para garantir qualidade e durabilidade',
                icon: Star,
              },
              {
                step: '03',
                title: 'Bordado Artesanal',
                description: 'Cada ponto é feito com cuidado e precisão, transformando tecido em arte',
                icon: Clock,
              },
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <process.icon className="text-ink" size={24} />
                </div>
                <div className="text-sm font-medium text-accent mb-2">{process.step}</div>
                <h3 className="text-xl font-display font-semibold text-ink mb-4">
                  {process.title}
                </h3>
                <p className="text-ink/70 leading-relaxed">
                  {process.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ink mb-6">
              O que Nossas Clientes Dizem
            </h2>
            <p className="text-lg text-ink/70 max-w-2xl mx-auto">
              Depoimentos reais de quem já experimentou nossos bordados
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-accent/20"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-accent fill-current" size={16} />
                  ))}
                </div>
                <p className="text-ink/70 mb-6 leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-ink">{testimonial.name}</div>
                  {testimonial.location && (
                    <div className="text-sm text-ink/50">{testimonial.location}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ink mb-6">
              Pronta para Criar Algo Especial?
            </h2>
            <p className="text-lg text-ink/70 mb-8">
              Entre em contato e vamos transformar suas ideias em peças únicas e personalizadas
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button href="/contato" size="lg">
                Solicitar Orçamento
              </Button>
              <Button href="/servicos" variant="secondary" size="lg">
                Ver Serviços
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex items-center justify-center space-x-2 text-ink/70">
                <Clock size={20} />
                <span>Prazo médio: 15-30 dias</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-ink/70">
                <Truck size={20} />
                <span>Envio para todo o Brasil</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-ink/70">
                <Heart size={20} />
                <span>Feito com amor e carinho</span>
              </div>
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