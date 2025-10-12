"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { signup as identitySignup, login as identityLogin, getAccessToken } from '@/lib/identity';

export default function CriarContaPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Validate allowed email domains: Gmail, Microsoft (Outlook/Hotmail/Live), Yahoo
    const allowedDomains = [
      'gmail.com', 'gmail.com.br',
      'outlook.com', 'outlook.com.br',
      'hotmail.com', 'hotmail.com.br',
      'live.com', 'live.com.br',
      'yahoo.com', 'yahoo.com.br',
    ];
    const emailDomain = formData.email.split('@')[1]?.toLowerCase();
    if (!emailDomain || !allowedDomains.includes(emailDomain)) {
      setError('Use um email do Gmail, Outlook/Hotmail/Live ou Yahoo para criar a conta.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    // Password rules: at least 8 chars, min 4 letters, 4 numbers, 2 special chars
    const pwd = formData.password;
    const lettersCount = (pwd.match(/[A-Za-z]/g) ?? []).length;
    const numbersCount = (pwd.match(/[0-9]/g) ?? []).length;
    const specialsCount = (pwd.match(/[^A-Za-z0-9]/g) ?? []).length;
    const lengthOk = pwd.length >= 8;
    if (!lengthOk || lettersCount < 4 || numbersCount < 4 || specialsCount < 2) {
      setError('A senha deve ter no mínimo 8 caracteres, com pelo menos 4 letras, 4 números e 2 caracteres especiais.');
      return;
    }

    setLoading(true);
    try {
      await identitySignup(formData.email, formData.password, formData.name);
      // Não tentar login automático: muitas configurações exigem confirmação por email
      router.push('/login?message=conta-criada');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-semibold mb-6 text-center">Criar Conta</h1>
          <p className="text-gray-600 text-center mb-6">
            Preencha os dados abaixo para criar sua conta e acessar os cursos.
          </p>
          
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm mb-1">Nome completo</label>
              <input
                type="text"
                name="name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">Senha</label>
              <input
                type="password"
                name="password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">Confirmar senha</label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            {error && <p className="text-sm text-red-600">{error}</p>}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white rounded-md py-3 hover:bg-emerald-700 disabled:opacity-70 transition-colors font-medium"
            >
              {loading ? 'Criando conta…' : 'Criar Conta'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{' '}
              <button
                onClick={() => router.push('/login')}
                className="text-emerald-700 hover:underline font-medium"
              >
                Fazer login
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
