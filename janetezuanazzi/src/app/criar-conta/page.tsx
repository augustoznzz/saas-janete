'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { signup } from '@/lib/identity';

export default function CreateAccountPage() {
  const router = useRouter();
  const [redirect, setRedirect] = React.useState('/aluno/dashboard');

  React.useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const r = sp.get('redirect');
      if (r) setRedirect(r);
    } catch {}
  }, []);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (!email || !password) throw new Error('Preencha email e senha.');
      await signup(email, password, name);
      const to = new URL('/login', window.location.origin);
      to.searchParams.set('message', 'conta-criada');
      to.searchParams.set('redirect', redirect);
      router.replace(to.toString());
    } catch (err: any) {
      setError(err?.message || 'Falha ao criar conta');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white">
          <h1 className="text-2xl font-semibold mb-6 text-center">Criar conta</h1>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm mb-1">Nome completo</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-pink"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-pink"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-brand-pink"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="Mínimo 8 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-3 my-auto text-xs text-black/60 hover:text-black/80"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-pinkMuted text-brand-text rounded-md py-3 disabled:opacity-70 transition-colors hover:bg-brand-pink font-medium"
            >
              {loading ? 'Criando…' : 'Criar conta'}
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            Já tem conta?{' '}
            <a
              href={`/login?redirect=${encodeURIComponent(redirect)}`}
              className="text-brand-text hover:underline"
            >
              Fazer login
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}



