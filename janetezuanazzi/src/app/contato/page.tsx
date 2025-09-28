'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { ContactForm } from '@/types';

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    whatsapp: '',
    pieceType: '',
    desiredDeadline: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          whatsapp: '',
          pieceType: '',
          desiredDeadline: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        console.error('Erro:', result.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Erro ao enviar formulário:', error);
    } finally {
      setIsSubmitting(false);
    }
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
              Entre em Contato
            </h1>
            <p className="text-xl text-ink/70 leading-relaxed">
              Vamos conversar sobre suas ideias e criar algo único e especial para você
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold text-ink mb-8">
                Solicite seu Orçamento
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-accent/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-accent/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="whatsapp" className="block text-sm font-medium text-ink mb-2">
                      WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-accent/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="pieceType" className="block text-sm font-medium text-ink mb-2">
                      Tipo de Peça *
                    </label>
                    <select
                      id="pieceType"
                      name="pieceType"
                      value={formData.pieceType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-accent/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="enxoval">Enxoval</option>
                      <option value="patches">Patches</option>
                      <option value="monogramas">Monogramas</option>
                      <option value="presentes">Presentes</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="desiredDeadline" className="block text-sm font-medium text-ink mb-2">
                    Prazo Desejado
                  </label>
                  <select
                    id="desiredDeadline"
                    name="desiredDeadline"
                    value={formData.desiredDeadline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-accent/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                  >
                    <option value="">Selecione um prazo</option>
                    <option value="urgente">Urgente (até 1 semana)</option>
                    <option value="rapido">Rápido (1-2 semanas)</option>
                    <option value="normal">Normal (2-4 semanas)</option>
                    <option value="flexivel">Flexível (mais de 1 mês)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-accent/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors resize-none"
                    placeholder="Conte-nos sobre sua ideia, preferências de cores, tamanhos, ou qualquer detalhe especial..."
                  />
                </div>

                {/* Submit Status */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-2xl"
                  >
                    <CheckCircle size={20} />
                    <span>Mensagem enviada com sucesso! Entraremos em contato em breve.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-2xl"
                  >
                    <AlertCircle size={20} />
                    <span>Erro ao enviar mensagem. Tente novamente ou entre em contato pelo WhatsApp.</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-display font-bold text-ink mb-6">
                  Informações de Contato
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MessageCircle className="text-accent mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-ink mb-1">WhatsApp</h4>
                      <a
                        href="https://wa.me/5511999999999"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink/70 hover:text-accent transition-colors"
                      >
                        (11) 99999-9999
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="text-accent mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-ink mb-1">E-mail</h4>
                      <a
                        href="mailto:contato@janetezuanazzi.com"
                        className="text-ink/70 hover:text-accent transition-colors"
                      >
                        contato@janetezuanazzi.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="text-accent mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-ink mb-1">Localização</h4>
                      <p className="text-ink/70">
                        São Paulo, SP<br />
                        Atendimento em todo o Brasil
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="text-accent mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-ink mb-1">Horário de Atendimento</h4>
                      <p className="text-ink/70">
                        Segunda a Sexta: 9h às 18h<br />
                        Sábado: 9h às 14h
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 p-6 rounded-2xl">
                <h4 className="font-display font-semibold text-ink mb-4">
                  Dicas para um Orçamento Mais Preciso
                </h4>
                <ul className="space-y-2 text-sm text-ink/70">
                  <li>• Descreva detalhadamente o que você imagina</li>
                  <li>• Mencione cores, tamanhos e materiais preferidos</li>
                  <li>• Inclua fotos de referência se possível</li>
                  <li>• Informe o prazo desejado para entrega</li>
                  <li>• Seja específica sobre o uso da peça</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-accent/20">
                <h4 className="font-display font-semibold text-ink mb-4">
                  Resposta Rápida
                </h4>
                <p className="text-ink/70 text-sm mb-4">
                  Para orçamentos urgentes, entre em contato diretamente pelo WhatsApp. 
                  Respondemos em até 2 horas durante o horário comercial.
                </p>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-2xl hover:bg-green-600 transition-colors"
                >
                  <MessageCircle size={16} />
                  <span>Chamar no WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
