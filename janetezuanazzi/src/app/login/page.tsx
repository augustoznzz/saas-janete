"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { login as identityLogin, getAccessToken } from '@/lib/identity';

function LoginPageContent() {
  const router = useRouter();
  const [identifier, setIdentifier] = React.useState(''); // email ou CPF
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [redirectPath, setRedirectPath] = React.useState<string>('/aluno/dashboard');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const redirect = sp.get('redirect');
      if (redirect) setRedirectPath(redirect);
      if (sp.get('message') === 'conta-criada') {
        setSuccessMessage('Conta criada com sucesso! Agora você pode fazer login.');
      }
    } catch {}
    setMounted(true);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Identity login
      const maybeCpf = identifier.replace(/\D/g, '');
      let emailToUse = identifier;
      if (maybeCpf.length === 11) {
        // resolve CPF -> email via Netlify function
        const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
        const res = await fetch(`${siteUrl}/.netlify/functions/login-by-cpf`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'get_email', cpf: maybeCpf }),
        });
        if (!res.ok) {
          const t = await res.text();
          throw new Error(t || 'CPF não encontrado');
        }
        const data = await res.json();
        emailToUse = data.email;
      }
      await identityLogin(emailToUse, password);
      const token = await getAccessToken();
      if (!token) throw new Error('Falha ao obter token');
      // Set SSR cookie via Netlify Function
      const sres = await fetch('/.netlify/functions/session', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!sres.ok) throw new Error('Falha ao iniciar sessão');
      // ensure profile exists
      await fetch('/.netlify/functions/me', { headers: { Authorization: `Bearer ${token}` } });
      router.replace(redirectPath);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) return null;

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Login */}
        <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-semibold mb-6 text-center">Área do Aluno</h1>
          
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-sm">
              {successMessage}
            </div>
          )}
          
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-pink"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
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
              {loading ? 'Entrando…' : 'Entrar'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="/definir-senha" className="text-sm text-brand-text/60 hover:text-brand-text hover:underline">Esqueci minha senha</a>
          </div>
        </div>

        {/* Link to courses */}
        <div className="mt-6 text-center">
          <p className="text-sm text-black/60 mb-3">
            Não tem conta?
          </p>
          <a
            href={`/criar-conta?redirect=${encodeURIComponent('/aluno/dashboard')}`}
            className="text-sm text-brand-text font-medium hover:underline"
          >
            Criar conta →
          </a>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return <LoginPageContent />;
}


