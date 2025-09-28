'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check, Clock, Star, Heart } from 'lucide-react';
import { services } from '@/data/services';

export default function ServicesPage() {
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
              Nossos Serviços
            </h1>
            <p className="text-xl text-ink/70 leading-relaxed">
              Oferecemos uma variedade de serviços de bordado personalizado 
              para atender suas necessidades e criar peças únicas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm border border-accent/20 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Service Image */}
                <div className="aspect-video relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Service Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-display font-semibold text-ink">
                      {service.title}
                    </h3>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-accent">
                        {service.priceFrom}
                      </div>
                      <div className="text-sm text-ink/50">a partir de</div>
                    </div>
                  </div>

                  <p className="text-ink/70 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* What's Included */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-ink mb-3">O que inclui:</h4>
                    <ul className="space-y-2">
                      {service.includes.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-2 text-sm text-ink/70">
                          <Check className="text-accent flex-shrink-0" size={16} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Service Details */}
                  <div className="flex items-center justify-between mb-6 text-sm">
                    <div className="flex items-center space-x-2 text-ink/70">
                      <Clock size={16} />
                      <span>Prazo: {service.estimatedTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="text-accent fill-current" size={14} />
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <a
                    href="/contato"
                    className="w-full btn-primary text-center inline-block"
                  >
                    Solicitar Orçamento
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-4xl font-display font-bold text-ink mb-6">
              Como Funciona
            </h2>
            <p className="text-lg text-ink/70 max-w-2xl mx-auto">
              Um processo simples e transparente para garantir a melhor experiência
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Escolha o Serviço',
                description: 'Selecione o tipo de bordado que melhor atende suas necessidades.',
                icon: Heart,
              },
              {
                step: '2',
                title: 'Solicite Orçamento',
                description: 'Entre em contato conosco com os detalhes do seu projeto.',
                icon: Star,
              },
              {
                step: '3',
                title: 'Aprovação do Design',
                description: 'Criamos um design exclusivo e aguardamos sua aprovação.',
                icon: Check,
              },
              {
                step: '4',
                title: 'Produção e Entrega',
                description: 'Executamos o bordado e enviamos sua peça com cuidado.',
                icon: Clock,
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
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <process.icon className="text-ink" size={24} />
                </div>
                <div className="text-sm font-medium text-accent mb-2">
                  Passo {process.step}
                </div>
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

      {/* Why Choose Us */}
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
              Por que Escolher Nossos Serviços?
            </h2>
            <p className="text-lg text-ink/70 max-w-2xl mx-auto">
              Diferenciais que fazem a diferença na qualidade e experiência
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Qualidade Garantida',
                description: 'Utilizamos apenas materiais de primeira qualidade e técnicas artesanais comprovadas.',
              },
              {
                title: 'Design Exclusivo',
                description: 'Cada peça é única e personalizada, criada especialmente para você.',
              },
              {
                title: 'Atendimento Personalizado',
                description: 'Acompanhamento completo desde o primeiro contato até a entrega final.',
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center bg-white p-8 rounded-2xl shadow-sm border border-accent/20"
              >
                <h3 className="text-xl font-display font-semibold text-ink mb-4">
                  {benefit.title}
                </h3>
                <p className="text-ink/70 leading-relaxed">
                  {benefit.description}
                </p>
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
            <h2 className="text-4xl font-display font-bold text-ink mb-6">
              Pronta para Começar?
            </h2>
            <p className="text-lg text-ink/70 mb-8">
              Entre em contato conosco e vamos transformar suas ideias em peças únicas e especiais. 
              Estamos aqui para ajudar em cada etapa do processo.
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
