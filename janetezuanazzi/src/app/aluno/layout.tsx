import React from 'react';
import { getUserFromSession } from '@/lib/auth';

export default function AlunoLayout({ children }: { children: React.ReactNode }) {
  // This runs on server; middleware has already protected access
  const user = getUserFromSession();
  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="/aluno/dashboard" className="font-semibold text-gray-800">Área do Aluno</a>
          <div className="flex items-center gap-3">
            <form action="/api/logout" method="post">
              <button className="text-red-600 hover:underline" style={{ fontSize: '14px' }}>Sair</button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}


