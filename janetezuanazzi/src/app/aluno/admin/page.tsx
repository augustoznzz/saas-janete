"use client";
import React from 'react';
import { getAccessToken } from '@/lib/identity';

type AdminUserRow = {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
  total_percent: number;
  courses: number;
};

export default function AdminPage() {
  const [rows, setRows] = React.useState<AdminUserRow[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const token = await getAccessToken();
        if (!token) {
          setError('Faça login como admin');
          return;
        }
        const res = await fetch('/.netlify/functions/admin-list', { headers: { Authorization: `Bearer ${token}` } });
        if (res.status === 403) {
          setError('Acesso negado. Requer papel admin.');
          return;
        }
        if (!res.ok) {
          setError('Falha ao carregar dados');
          return;
        }
        const data = await res.json();
        setRows(data.users || []);
      } catch {
        setError('Erro inesperado');
      }
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p className="text-gray-600">Bem-vindo.</p>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Nome</th>
              <th className="py-2 pr-4">Criado em</th>
              <th className="py-2 pr-4">Cursos</th>
              <th className="py-2 pr-4">Soma %</th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="py-2 pr-4">{u.email}</td>
                <td className="py-2 pr-4">{u.name ?? '-'}</td>
                <td className="py-2 pr-4">{new Date(u.created_at).toLocaleString()}</td>
                <td className="py-2 pr-4">{u.courses}</td>
                <td className="py-2 pr-4">{u.total_percent}</td>
              </tr>
            ))}
            {!rows?.length && !error && (
              <tr><td className="py-4 text-gray-500" colSpan={5}>Sem dados</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


