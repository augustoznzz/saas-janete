"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

function DefinePasswordPageContent() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (!email || !email.includes('@')) {
        throw new Error('Informe um email válido.');
      }
      if (password.length < 8) {
        throw new Error('A senha deve ter pelo menos 8 caracteres.');
      }
      const res = await fetch('/api/account/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || 'Falha ao definir senha');
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'Erro ao definir senha');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-semibold mb-6 text-center">Definir nova senha</h1>

          {success ? (
            <div className="space-y-4">
              <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-sm">
                Senha atualizada com sucesso! Agora você já pode fazer login.
              </div>
              <button
                onClick={() => router.push('/login')}
                className="w-full bg-brand-pinkMuted text-brand-text rounded-md py-3 transition-colors hover:bg-brand-pink font-medium"
              >
                Ir para o login
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-pink"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Nova senha</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-brand-pink"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    required
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
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-pinkMuted text-brand-text rounded-md py-3 disabled:opacity-70 transition-colors hover:bg-brand-pink font-medium"
              >
                {loading ? 'Salvando…' : 'Definir senha'}
              </button>
            </form>
          )}
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/login')}
            className="text-sm text-brand-text font-medium hover:underline"
          >
            Voltar ao login →
          </button>
        </div>
      </div>
    </main>
  );
}

export default function DefinePasswordPage() {
  return <DefinePasswordPageContent />;
}


