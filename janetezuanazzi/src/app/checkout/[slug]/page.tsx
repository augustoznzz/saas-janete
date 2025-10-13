'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

type Course = {
  slug: string;
  title: string;
  description: string;
  price: string;
  priceValue: number;
  modules: string[];
};

const courses: Course[] = [
  {
    slug: 'aquarela-iniciantes',
    title: 'Aquarela para Iniciantes',
    description: 'Curso completo para começar na aquarela com confiança. Materiais, técnicas e projetos.',
    price: 'R$ 249,00',
    priceValue: 249.00,
    modules: [
      'Introdução e materiais',
      'Lavagens e gradações',
      'Texturas e salpicos',
      'Flores simples',
      'Projeto final: composição botânica'
    ],
  },
  {
    slug: 'ilustracao-botanica',
    title: 'Ilustração Botânica',
    description: 'Do esboço à pintura final, com foco em observação e precisão das formas.',
    price: 'R$ 299,00',
    priceValue: 299.00,
    modules: [
      'Referências e esboço',
      'Volume e luz',
      'Cores e camadas',
      'Detalhes e acabamento',
      'Projeto final: lâmina botânica'
    ],
  },
  {
    slug: 'pintura-a-oleo',
    title: 'Pintura a óleo',
    description: 'Técnicas essenciais de pintura a óleo: materiais, mistura de cores e camadas.',
    price: 'R$ 349,00',
    priceValue: 349.00,
    modules: [
      'Materiais e preparação da tela',
      'Cores, solventes e médiums',
      'Blocos de cor e valores',
      'Camadas e acabamento',
      'Projeto final: paisagem a óleo'
    ],
  },
  {
    slug: 'introducao-ao-bordado',
    title: 'Introdução ao Bordado',
    description: 'Aprenda os pontos essenciais e materiais do bordado à mão.',
    price: 'R$ 199,00',
    priceValue: 199.00,
    modules: [
      'Materiais e preparação do tecido',
      'Pontos básicos: alinhavo, atrás e corrente',
      'Aplicações, preenchimentos e acabamento',
      'Projeto final: mini floral bordado'
    ],
  },
];

type CheckoutStep = 'form' | 'payment' | 'success';

export default function CheckoutPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [step, setStep] = useState<CheckoutStep>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // Payment data
  const [paymentData, setPaymentData] = useState<{
    transactionId: string;
    qrCode: string;
    qrCodeBase64: string;
    expiresAt: string;
  } | null>(null);

  const course = courses.find((c) => c.slug === params.slug);

  useEffect(() => {
    if (step === 'payment' && paymentData) {
      // Poll payment status every 5 seconds
      const interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/checkout/status?transactionId=${paymentData.transactionId}`);
          const data = await res.json();
          
          if (data.status === 'paid') {
            clearInterval(interval);
            setStep('success');
          }
        } catch (err) {
          console.error('Error checking payment status:', err);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [step, paymentData]);

  if (!course) {
    return (
      <div className="container-narrow py-16">
        <p>Curso não encontrado. <Link className="underline" href="/cursos">Voltar aos cursos</Link></p>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    // Validate email domains
    const allowedDomains = [
      'gmail.com', 'gmail.com.br',
      'outlook.com', 'outlook.com.br',
      'hotmail.com', 'hotmail.com.br',
      'live.com', 'live.com.br',
      'yahoo.com', 'yahoo.com.br',
    ];
    const emailDomain = formData.email.split('@')[1]?.toLowerCase();
    if (!emailDomain || !allowedDomains.includes(emailDomain)) {
      setError('Use um email do Gmail, Outlook/Hotmail/Live ou Yahoo.');
      setLoading(false);
      return;
    }

    // Validate password strength
    const pwd = formData.password;
    const lettersCount = (pwd.match(/[A-Za-z]/g) ?? []).length;
    const numbersCount = (pwd.match(/[0-9]/g) ?? []).length;
    const specialsCount = (pwd.match(/[^A-Za-z0-9]/g) ?? []).length;
    const lengthOk = pwd.length >= 8;
    if (!lengthOk || lettersCount < 4 || numbersCount < 4 || specialsCount < 2) {
      setError('A senha deve ter no mínimo 8 caracteres, com pelo menos 4 letras, 4 números e 2 caracteres especiais.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course: {
            slug: course.slug,
            title: course.title,
            price: course.priceValue,
          },
          customer: {
            name: formData.name,
            email: formData.email,
            cpf: formData.cpf,
            phone: formData.phone,
            password: formData.password,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar pagamento');
      }

      setPaymentData(data);
      setStep('payment');
    } catch (err: any) {
      setError(err.message || 'Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Código PIX copiado!');
  };

  return (
    <div className="min-h-screen bg-brand-pinkLight py-10">
      <div className="container-narrow">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/cursos/${params.slug}`} className="text-sm text-black/60 hover:text-black transition-colors">
            ← Voltar ao curso
          </Link>
          <h1 className="section-title mt-4">Finalizar inscrição</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Main Content */}
          <div>
            {step === 'form' && (
              <div className="bg-white rounded-2xl border border-black/10 p-6 md:p-8">
                <h2 className="font-serif text-2xl mb-6">Dados pessoais</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="cpf" className="block text-sm font-medium mb-1.5">
                      CPF *
                    </label>
                    <input
                      type="text"
                      id="cpf"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      required
                      maxLength={14}
                      className="w-full px-4 py-2.5 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all"
                      placeholder="000.000.000-00"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all"
                      placeholder="(00) 00000-0000"
                    />
                  </div>

                  <div className="border-t border-black/10 pt-4 mt-4">
                    <h3 className="font-medium mb-3">Crie sua senha de acesso</h3>
                    <p className="text-sm text-black/60 mb-4">
                      Após o pagamento, você receberá acesso ao curso e poderá fazer login com seu e-mail e senha.
                    </p>
                    
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium mb-1.5">
                        Senha *
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        minLength={8}
                        className="w-full px-4 py-2.5 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all"
                        placeholder="Mínimo 8 caracteres"
                      />
                      <p className="text-xs text-black/50 mt-1">
                        Mínimo 8 caracteres, 4 letras, 4 números e 2 caracteres especiais
                      </p>
                    </div>

                    <div className="mt-3">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1.5">
                        Confirmar senha *
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all"
                        placeholder="Digite a senha novamente"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="cta-button w-full mt-6"
                  >
                    {loading ? 'Processando...' : 'Continuar para pagamento'}
                  </button>

                  <p className="text-xs text-black/50 text-center mt-4">
                    Ao continuar, você concorda com nossos termos de uso e política de privacidade.
                  </p>
                </form>
              </div>
            )}

            {step === 'payment' && paymentData && (
              <div className="bg-white rounded-2xl border border-black/10 p-6 md:p-8">
                <h2 className="font-serif text-2xl mb-2">Pague com PIX</h2>
                <p className="text-black/70 mb-6">
                  Escaneie o QR Code ou copie o código PIX para finalizar o pagamento
                </p>

                <div className="flex flex-col items-center space-y-6">
                  {/* QR Code */}
                  <div className="bg-white p-4 rounded-xl border-2 border-black/10">
                    <img 
                      src={paymentData.qrCodeBase64} 
                      alt="QR Code PIX" 
                      className="w-64 h-64"
                    />
                  </div>

                  {/* PIX Code */}
                  <div className="w-full">
                    <label className="block text-sm font-medium mb-2">
                      Código PIX Copia e Cola
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={paymentData.qrCode}
                        readOnly
                        className="flex-1 px-4 py-2.5 border border-black/20 rounded-lg bg-gray-50 text-sm font-mono"
                      />
                      <button
                        onClick={() => copyToClipboard(paymentData.qrCode)}
                        className="px-6 py-2.5 bg-brand-pinkMuted hover:bg-brand-pink rounded-lg font-medium transition-colors"
                      >
                        Copiar
                      </button>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="w-full bg-brand-pinkLight rounded-lg p-4 text-sm space-y-2">
                    <p className="font-semibold">Como pagar:</p>
                    <ol className="list-decimal pl-5 space-y-1 text-black/70">
                      <li>Abra o app do seu banco</li>
                      <li>Escolha a opção Pix</li>
                      <li>Escaneie o QR Code ou cole o código</li>
                      <li>Confirme o pagamento</li>
                    </ol>
                  </div>

                  {/* Expiration */}
                  <p className="text-sm text-black/60">
                    Este código expira em: <strong>{new Date(paymentData.expiresAt).toLocaleString('pt-BR')}</strong>
                  </p>

                  {/* Loading indicator */}
                  <div className="flex items-center gap-2 text-sm text-black/70">
                    <div className="w-4 h-4 border-2 border-brand-pink border-t-transparent rounded-full animate-spin"></div>
                    Aguardando pagamento...
                  </div>
                </div>
              </div>
            )}

            {step === 'success' && (
              <div className="bg-white rounded-2xl border border-black/10 p-6 md:p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h2 className="font-serif text-3xl mb-2">Pagamento confirmado!</h2>
                <p className="text-black/70 mb-8">
                  Sua inscrição foi realizada com sucesso. Enviamos um e-mail com os detalhes de acesso ao curso.
                </p>

                <div className="space-y-3">
                  <Link href="/aluno/dashboard" className="cta-button w-full">
                    Acessar meus cursos
                  </Link>
                  <Link href="/cursos" className="block text-sm text-black/60 hover:text-black transition-colors">
                    Ver outros cursos
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Order Summary */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl border border-black/10 p-6">
              <h3 className="font-serif text-xl mb-4">Resumo do pedido</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium">{course.title}</p>
                  <p className="text-sm text-black/60 mt-1">{course.description}</p>
                </div>

                <div className="border-t border-black/10 pt-4">
                  <h4 className="text-sm font-medium mb-2">Conteúdo incluso:</h4>
                  <ul className="text-sm text-black/70 space-y-1">
                    {course.modules.slice(0, 3).map((module, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-brand-pink mr-2">✓</span>
                        {module}
                      </li>
                    ))}
                    {course.modules.length > 3 && (
                      <li className="text-black/50">+ {course.modules.length - 3} módulos</li>
                    )}
                  </ul>
                </div>

                <div className="border-t border-black/10 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{course.price}</span>
                  </div>
                  <div className="flex justify-between font-serif text-xl">
                    <span>Total</span>
                    <span className="text-brand-pink">{course.price}</span>
                  </div>
                </div>

                <div className="bg-brand-pinkLight rounded-lg p-3 text-xs text-black/70">
                  <p className="font-medium mb-1">🔒 Compra segura</p>
                  <p>Seus dados estão protegidos e criptografados</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

