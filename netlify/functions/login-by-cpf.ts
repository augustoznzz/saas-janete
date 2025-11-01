import type { Handler } from '@netlify/functions';

// Utility: simple fetch with JSON
async function jsonFetch(url: string, init: RequestInit = {}) {
  const res = await fetch(url, init);
  const ct = res.headers.get('content-type') || '';
  const body = ct.includes('application/json') ? await res.json().catch(() => ({})) : await res.text();
  return { res, body } as const;
}

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { action, cpf, password } = JSON.parse(event.body || '{}');
    const cleanCpf = String(cpf || '').replace(/\D/g, '');
    if (!cleanCpf || cleanCpf.length !== 11) {
      return { statusCode: 400, body: JSON.stringify({ error: 'CPF inválido' }) };
    }

    const identityBase = process.env.URL || 'http://localhost:8888';

    // Admin token is required to query and update users
    const adminToken = process.env.NETLIFY_ADMIN_TOKEN || (context as any)?.clientContext?.identity?.token;
    if (!adminToken) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Admin token ausente' }) };
    }

    // 1) Search user by CPF inside user_metadata (requires admin token)
    const { res: listRes, body: listBody } = await jsonFetch(`${identityBase}/.netlify/identity/admin/users`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    if (!listRes.ok) {
      return { statusCode: listRes.status, body: JSON.stringify({ error: 'Falha ao consultar usuários' }) };
    }
    const users = Array.isArray(listBody) ? listBody : [];
    const user = users.find((u: any) => (u?.user_metadata?.cpf || '').replace(/\D/g, '') === cleanCpf);
    if (!user) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Usuário não encontrado para este CPF' }) };
    }

    if (action === 'set_password') {
      if (!password || String(password).length < 8) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Senha inválida' }) };
      }
      // 2) Update password via admin endpoint
      const { res: updRes, body: updBody } = await jsonFetch(`${identityBase}/.netlify/identity/admin/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
        body: JSON.stringify({ password }),
      });
      if (!updRes.ok) {
        return { statusCode: updRes.status, body: JSON.stringify({ error: 'Falha ao atualizar senha', details: updBody }) };
      }
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }

    if (action === 'get_email') {
      return { statusCode: 200, body: JSON.stringify({ email: user.email }) };
    }

    return { statusCode: 400, body: JSON.stringify({ error: 'Ação inválida' }) };
  } catch (e: any) {
    return { statusCode: 500, body: JSON.stringify({ error: e?.message || 'Erro interno' }) };
  }
};

export default {};


