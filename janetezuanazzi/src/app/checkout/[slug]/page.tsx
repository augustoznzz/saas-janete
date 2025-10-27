'use client';

import { useState } from 'react';
import Link from 'next/link';

type Course = {
  slug: string;
  title: string;
  description: string;
  price: string;
  modules: string[];
};

const courses: Course[] = [
  {
    slug: 'introducao-ao-bordado',
    title: 'Introdução ao Bordado',
    description: 'Aprenda os pontos essenciais e materiais do bordado à mão.',
    price: 'R$ 199,00',
    modules: [
      'Materiais e preparação do tecido',
      'Pontos básicos: alinhavo, atrás e corrente',
      'Aplicações, preenchimentos e acabamento',
      'Projeto final: mini floral bordado'
    ],
  },
];

export default function PasswordSetupPage({ params }: { params: { slug: string } }) {
  const course = courses.find((c) => c.slug === params.slug);

  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const normalizeCpf = (v: string) => v.replace(/\D/g, '');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const cleanCpf = normalizeCpf(cpf);
    if (cleanCpf.length !== 11) {
      setError('Informe um CPF válido.');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/account/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf: cleanCpf, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'Falha ao definir senha');
      setSuccess('Senha definida com sucesso! Agora você pode fazer login com seu CPF.');
    } catch (err: any) {
      setError(err?.message || 'Falha ao definir senha');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-pinkLight py-10">
      <div className="container-narrow">
        <div className="mb-8">
          <Link href={`/cursos/${params.slug}`} className="text-sm text-black/60 hover:text-black transition-colors">
            ← Voltar ao curso
          </Link>
          <h1 className="section-title mt-4">Definir senha de acesso</h1>
          <p className="text-black/70 mt-2">Use o CPF informado na compra para criar sua senha.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div>
            <div className="bg-white rounded-2xl border border-black/10 p-6 md:p-8">
              <h2 className="font-serif text-2xl mb-6">Criar senha</h2>
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label htmlFor="cpf" className="block text-sm font-medium mb-1.5">CPF *</label>
                  <input
                    id="cpf"
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="000.000.000-00"
                    className="w-full px-4 py-2.5 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all"
                    maxLength={14}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1.5">Senha *</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full px-4 py-2.5 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all"
                    required
                    minLength={8}
                  />
                </div>
                <div>
                  <label htmlFor="confirm" className="block text-sm font-medium mb-1.5">Confirmar senha *</label>
                  <input
                    id="confirm"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all"
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
                )}
                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">{success}</div>
                )}

                <button type="submit" disabled={loading} className="cta-button w-full mt-2">
                  {loading ? 'Salvando…' : 'Salvar senha'}
                </button>
                <p className="text-xs text-black/50 text-center mt-4">
                  Depois, acesse a <Link href="/login" className="underline">página de login</Link> e entre com seu CPF e senha.
                </p>
              </form>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl border border-black/10 p-6">
              <h3 className="font-serif text-xl mb-4">Resumo do curso</h3>
              {course ? (
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">{course.title}</p>
                    <p className="text-sm text-black/60 mt-1">{course.description}</p>
                  </div>
                  <div className="border-t border-black/10 pt-4">
                    <h4 className="text-sm font-medium mb-2">Conteúdo incluso:</h4>
                    <ul className="text-sm text-black/70 space-y-1">
                      {course.modules.slice(0, 3).map((module, idx) => (
                        <li key={idx} className="flex items-start"><span className="text-brand-pink mr-2">✓</span>{module}</li>
                      ))}
                      {course.modules.length > 3 && (
                        <li className="text-black/50">+ {course.modules.length - 3} módulos</li>
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-black/60">Curso não encontrado.</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

