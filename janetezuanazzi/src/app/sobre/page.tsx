'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Heart, Award, Users } from 'lucide-react';
import { faqs } from '@/data/faq';

export default function AboutPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
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
              Sobre Janete Zuanazzi
            </h1>
            <p className="text-xl text-ink/70 leading-relaxed">
              Uma história de paixão pelo artesanato e dedicação ao trabalho manual
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold text-ink mb-6">
                Minha História
              </h2>
              <div className="space-y-6 text-ink/70 leading-relaxed">
                <p>
                  Há mais de 15 anos, descobri minha paixão pelo bordado através de minha avó, 
                  que me ensinou os primeiros pontos quando eu era criança. O que começou como 
                  um hobby se transformou em uma verdadeira vocação.
                </p>
                <p>
                  Cada peça que crio é única e carrega um pedaço da minha história. Acredito 
                  que o artesanato tem o poder de conectar pessoas e criar memórias especiais 
                  que duram para sempre.
                </p>
                <p>
                  Meu ateliê é um espaço onde tradição e modernidade se encontram, criando 
                  peças contemporâneas que honram as técnicas ancestrais do bordado.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square relative rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&h=600&fit=crop&crop=face"
                  alt="Janete Zuanazzi em seu ateliê"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-accent/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-ink mb-6">
              Nossos Valores
            </h2>
            <p className="text-lg text-ink/70 max-w-2xl mx-auto">
              Os princípios que guiam cada trabalho e cada decisão
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Amor pelo Artesanato',
                description: 'Cada peça é criada com carinho e dedicação, transformando tecidos em obras de arte únicas.',
              },
              {
                icon: Award,
                title: 'Qualidade Excepcional',
                description: 'Utilizamos apenas os melhores materiais e técnicas para garantir durabilidade e beleza.',
              },
              {
                icon: Users,
                title: 'Atendimento Personalizado',
                description: 'Cada cliente é único. Criamos peças sob medida que refletem sua personalidade e estilo.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center bg-white p-8 rounded-2xl shadow-sm border border-accent/20"
              >
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="text-ink" size={24} />
                </div>
                <h3 className="text-xl font-display font-semibold text-ink mb-4">
                  {value.title}
                </h3>
                <p className="text-ink/70 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-ink mb-6">
              Como Trabalhamos
            </h2>
            <p className="text-lg text-ink/70 max-w-2xl mx-auto">
              Um processo cuidadoso e artesanal para cada peça
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Consulta',
                description: 'Conversamos sobre suas ideias, preferências e necessidades específicas.',
              },
              {
                step: '2',
                title: 'Design',
                description: 'Criamos um design exclusivo e personalizado para sua peça.',
              },
              {
                step: '3',
                title: 'Produção',
                description: 'Executamos o bordado com técnicas artesanais e materiais de qualidade.',
              },
              {
                step: '4',
                title: 'Entrega',
                description: 'Enviamos sua peça com cuidado e carinho para todo o Brasil.',
              },
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-accent text-ink font-bold rounded-full flex items-center justify-center mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-lg font-display font-semibold text-ink mb-3">
                  {process.title}
                </h3>
                <p className="text-ink/70 text-sm leading-relaxed">
                  {process.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-accent/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-ink mb-6">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-ink/70 max-w-2xl mx-auto">
              Tire suas dúvidas sobre nossos serviços e processos
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm border border-accent/20 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent/5 transition-colors"
                >
                  <span className="font-medium text-ink">{faq.question}</span>
                  {openFAQ === index ? (
                    <ChevronUp className="text-ink/50" size={20} />
                  ) : (
                    <ChevronDown className="text-ink/50" size={20} />
                  )}
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === index ? 'auto' : 0,
                    opacity: openFAQ === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 text-ink/70 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bg">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-display font-bold text-ink mb-6">
              Vamos Criar Algo Especial Juntas?
            </h2>
            <p className="text-lg text-ink/70 mb-8">
              Entre em contato e vamos conversar sobre suas ideias. Estou aqui para ajudar 
              a transformar seus sonhos em peças únicas e personalizadas.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/contato"
                className="btn-primary inline-flex items-center justify-center"
              >
                Solicitar Orçamento
              </a>
              <a
                href="/portfolio"
                className="btn-secondary inline-flex items-center justify-center"
              >
                Ver Portfólio
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
